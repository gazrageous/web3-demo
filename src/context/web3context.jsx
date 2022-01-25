import React, { createContext, useEffect, useState, useMemo } from 'react'
import Web3 from 'web3'

import MetaCoinContract from '../contracts/MetaCoin.json'

const web3Context = createContext({})
export default web3Context;

export const Web3Provider = (props) => {
	const [account, setAccount] = useState()
	const [contract, setContract] = useState()
	const [accountTokenBalance, setAccountTokenBalance] = useState(0)
	
	const noWallet = useMemo(() => !account, [account])

	const updateAccount = (account) => setAccount(account[0])

	const initialiseContract = async () => {
		const web3 = new Web3(window.ethereum)
		const networkId = await web3.eth.net.getId()

		if (!MetaCoinContract.networks[networkId].address) {
			throw new Error('Contract does not exist on this network')
		} 

		let metacoinContract = await new web3.eth.Contract(MetaCoinContract.abi, MetaCoinContract.networks[networkId].address)
		setContract(metacoinContract)

		return metacoinContract
	}

	const initialiseUserWallet = async () => {
		let provider = window.ethereum 

		if (typeof provider !== 'undefined') {
			// MetaMask is installed!
			provider.request({ method: 'eth_requestAccounts'})
				.then(updateAccount)
				.catch((err) => {
					console.error(err)
				})
		}
	}

	const getBalance = (account) => {
		if (!contract) return
		contract.methods.getBalance(account).call().then((res) => {
			setAccountTokenBalance(parseInt(res, 10))
		})
	}

	const sendCoin = async (receiver, quantity) => {

		if (!contract) throw new Error('No contract set, likely because you are on the wrong network');

		try {
			await contract.methods.sendCoin(String(receiver), quantity).send({
				from: account
			});
			
			getBalance(account)
		}
		catch (error) {
			switch ((error).code) {
				case 4001: {
					console.log('User cancelled transaction');
					break;
				}
				case -32000: {
					console.log('Contract required some state, which failed');
					break;
				}
				default: {
					console.error(error)
				}
			}
		}
	}

	useEffect(() => {
		if (!window.ethereum) return
		window.ethereum.on('accountsChanged', updateAccount)
		window.ethereum.on('chainChanged', () => window.location.reload())
		initialiseContract()
		.then(initialiseUserWallet)
			.catch((e) => {
				console.error("contract not on currently set network")
			})
	}, [])

	useEffect(() => {
		if (!account) return
		getBalance(account)
	}, [account])


	return (
		<web3Context.Provider
			value={{
				account,
				noWallet,
				initialiseUserWallet, 
				getBalance,
				sendCoin,
				accountTokenBalance
			}}
			children={props.children}
		/>
	)
}
