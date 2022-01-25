import web3Context from './context/web3context'
import React, { useState, useContext } from 'react'
import './App.css';

function App() {

  const [receiver, setReceiver] = useState('')

  const {
    account,
    noWallet,
    sendCoin,
    accountTokenBalance
  } = useContext(web3Context);

  const sendCoinClickHandler = async () => {
    console.log(receiver)
    await sendCoin(receiver, 20);
  }

  const inputChangeHandler = (e) => {
    setReceiver(e.target.value)
  }

  console.log(account)

  return (
      noWallet ?
        <div className="App">
          <header className="App-header">
            <h2>Not Signed In to Ethereum Wallet</h2>
          </header>
        </div>
      : 
      <div className="App">
        <header className="App-header">
          <h2>Your Token Balance: { accountTokenBalance }</h2>
          <label htmlFor="receiver-input" className="App-label">Address to send MetaCoin To</label>
          <input id="receiver-input" className="App-input" type="text" onChange={inputChangeHandler}></input>
          <button className="App-button" onClick={sendCoinClickHandler}>Send 20 MetaCoin</button>
        </header>
      </div>
  );
}

export default App;
