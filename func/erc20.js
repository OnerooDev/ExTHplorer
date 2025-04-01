// Application for fast explore ETH/BSC/MATIC and same EVMs smart-contracts:
// https://github.com/SeerDay

// Before use you must to configure .env

//Use lib
const ethers = require('ethers');
const abi = require('../lib/contract-abi');
const decoder = require('../lib/decode');
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

getTokenName: async function(cont_address) {
    const account = this.BlocksConnect();
		//
		const Contract = abi.token(cont_address, account);
		const name = await Contract.name();
		//
		let obj_res = {
			name: name
		};
		//back
		return obj_res;
},
//Get tokens address from UNIv2 smart-contract
//
getTokenSupply: async function(cont_address) {
    const account = this.BlocksConnect();
		//
		const Contract = abi.token(cont_address, account);
		const supply = await Contract.totalSupply();
		const supply_dec = decoder.to_string(supply);
		//
		let obj_res = {
			supply: supply_dec
		};
		//back
		return obj_res;
},
//Get tokens address from UNIv2 smart-contract
//
getTokenDecimal: async function(cont_address) {
		const account = this.BlocksConnect();
		//
		const Contract = abi.token(cont_address, account);
		const decimal = await Contract.decimals();
		const decimal_dec = decoder.to_string(decimal);
		//
		let obj_res = {
			decimals: decimal_dec
		};
		//back
		return obj_res;
},
//Get tokens address from UNIv2 smart-contract
//
getTokenBalance: async function(cont_address, user_address) {
    const account = this.BlocksConnect();
		//
		const Contract = abi.token(cont_address, account);
		const balance = await Contract.balanceOf(user_address);
		const balance_dec = parseFloat(decoder.to_string(balance));
		//
		let obj_res = {
			token: balance_dec
		};
		//back
		return obj_res;
}

}
