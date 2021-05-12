// Application for fast explore ETH/BSC/MATIC and same EVMs smart-contracts:
// https://github.com/SeerDay

// Before use you must to configure .env

//Use lib
const ethers = require('ethers');
var networks = require('@ethersproject/networks');

//
module.exports = {

	BlocksConnect: function() {
		//Use URL from .env for make connect to RPC-node
		const provider = new ethers.providers.getDefaultProvider(process.env.URL);
		//Use PRIVATE_KEY from .env for make account connected to $provider
		const signer = new ethers.Wallet(process.env.PRIVATE_KEY);
		const account = signer.connect(provider);
		//back
		return account;
	},

//
//WALLET
//
walletBalance: async function() {
    const account = this.BlocksConnect();
		//
		const balance = await account.getBalance()
		const balance_dec = ethers.utils.formatEther(balance);

		//
		let obj_res = {
			ETH: balance_dec
		};
		//back
		return obj_res;
},

walletBalanceByAddress: async function(address) {
	try{
		const provider = new ethers.providers.getDefaultProvider(process.env.URL);
	//
		const bal = await provider.getBalance(address)
		const balance_dec = ethers.utils.formatEther(bal);

	//back
		return balance_dec;
	}
	catch(err){
		let arr = {
			data: false
		}
		return arr;

	}
},

walletAddress: async function() {
    const account = this.BlocksConnect();
		//
		const balance = await account.getAddress()
		const balance_dec = ethers.utils.formatEther(balance);

		//
		let obj_res = {
			ETH: balance
		};
		//back
		return obj_res;
},

walletGas: async function() {
		const provider = new ethers.providers.getDefaultProvider(process.env.URL);
		//
		const gas = await provider.getGasPrice()
		//back
		return gas;
},

walletSend: async function(address, summ) {
		const account = this.BlocksConnect();
		//
		let amount = ethers.utils.parseEther(summ);
		const gas_price = this.walletGas();
		let gas_limit = ethers.BigNumber.from(55000);
		let obj_tx = {
			to: address,
			value: amount,
			gasLimit: gas_limit,
			gasPrice: gas_price
		};

		const tx = await account.sendTransaction(obj_tx)

		//
		let obj_res = {
			tx: tx
		};
		//back
		return obj_res;
}

}
