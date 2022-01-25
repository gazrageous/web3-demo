# 1. Setup Ganache

Run Ganache quickstart natively on your local machine

[Download link](https://trufflesuite.com/ganache/)

# 2. Run Truffle 

Ensure that `truffle-config.js` is configred to point at the port setup in Ganache

Truffle will then compile and deploy the smart contract to local Ganache blockchain and provide the JSON ABI to front end src dir with the following command

```
	truffle migrate
```

You can run tests with 

```
	truffle test ./test/metacoin.js
```

# 3. Spin up CRA DAPP

```
	npm run start
```

# 4. Load in Accounts via Private Key

click the "Show Keys" icon in Ganache to get local accounts private keys. You can then load these users into MetaMask with these keys using "Import Account" 

Ensure that MetaMask is also set to the localhost port network that Ganache is running on before importing accounts.

# 5. Account 0 will hold all 10000 MetaCoin at init, can transfer to others and then sent to further accounts