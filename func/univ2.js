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

//Get reserves from UNIv2 smart-contract
//
getReservesUNI_V2: async function(cont_address) {
    const account = main.BlocksConnect();
		//
		const Contract = abi.UNI_V2(cont_address, account);
		const reserves = await Contract.getReserves();
		const res0token = decoder.to_string(reserves._reserve0);
		const res1token = decoder.to_string(reserves._reserve1);
		//
		let obj_res = {
			token0: res0token,
			token1: res1token
		};
		let finish = {
			reserves: obj_res
		};

		//back
		return finish;
},
//Get tokens address from UNIv2 smart-contract
//
getTokensUNI_V2: async function(cont_address) {
    const account = main.BlocksConnect();
		//
		const Contract = abi.UNI_V2(cont_address, account);
		const token0 = await Contract.token0();
		const token1 = await Contract.token1();
		const res0token = decoder.to_string(token0);
		const res1token = decoder.to_string(token1);
		//
		let obj_res = {
			token0: res0token,
			token1: res1token
		};
		let finish = {
			addresses: obj_res
		};

		//back
		return finish;
},
//Get tokens address from UNIv2 smart-contract
//
getPriceUNI_V2: async function(cont_address) {
    const account = main.BlocksConnect();
		//
		const Contract = abi.UNI_V2(cont_address, account);
		const price0 = await Contract.price0CumulativeLast();
		const price1 = await Contract.price1CumulativeLast();
		const res0price = decoder.to_string(price0);
		const res1price = decoder.to_string(price1);
		//
		let obj_res = {
			token0: res0price,
			token1: res1price
		};
		let finish = {
			prices: obj_res
		};
		//back
		return finish;
},
//Get tokens address from UNIv2 smart-contract
//
getInfoUNI_V2: async function(cont_address) {
		//
		const reserves = await getReservesUNI_V2(cont_address);
		const price = await getPriceUNI_V2(cont_address);
		const token = await getTokensUNI_V2(cont_address);
		//
		let obj_res = {
			res: reserves,
			price: price,
			token: token
		};
		let finish = {
			info: obj_res
		};
		//back
		return finish;
}

}
