// Application for fast explore ETH/BSC/MATIC and same EVMs smart-contracts:
// https://github.com/SeerDay

// Before use you must to configure .env

//Use lib
require('dotenv').config();
const express = require("express");
const ethers = require('ethers');
var networks = require('@ethersproject/networks');
var app = express();
var abi = require('./lib/contract-abi.js');
var decoder = require('./lib/decode.js');

//

//Connect to Blockchain
function BlocksConnect() {
	//Use URL from .env for make connect to RPC-node
	const provider = new ethers.providers.getDefaultProvider(process.env.URL);
	//Use PRIVATE_KEY from .env for make account connected to $provider
	const signer = new ethers.Wallet(process.env.PRIVATE_KEY);
	const account = signer.connect(provider);
	//back
	return account;
}
//Get reserves from UNIv2 smart-contract
//
async function getReservesUNI_V2(cont_address) {
    const account = BlocksConnect();
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
}
//Get tokens address from UNIv2 smart-contract
//
async function getTokensUNI_V2(cont_address) {
    const account = BlocksConnect();
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
}
//Get tokens address from UNIv2 smart-contract
//
async function getPriceUNI_V2(cont_address) {
    const account = BlocksConnect();
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
}
//Get tokens address from UNIv2 smart-contract
//
async function getInfoUNI_V2(cont_address) {
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
//Get tokens address from UNIv2 smart-contract
//
async function getTokenName(cont_address) {
    const account = BlocksConnect();
		//
		const Contract = abi.token(cont_address, account);
		const name = await Contract.name();
		const name_dec = decoder.to_string(name);
		//
		let obj_res = {
			name: name_dec
		};
		//back
		return obj_res;
}
//Get tokens address from UNIv2 smart-contract
//
async function getTokenSupply(cont_address) {
    const account = BlocksConnect();
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
}
//Get tokens address from UNIv2 smart-contract
//
async function getTokenDecimal(cont_address) {
		const account = BlocksConnect();
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
}
//Get tokens address from UNIv2 smart-contract
//
async function getTokenBalance(cont_address, user_address) {
    const account = BlocksConnect();
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
//
//WALLET
//
async function walletBalance(cont_address, user_address) {
    const account = BlocksConnect();
		//
		const balance = account.getBalance()
		//
		let obj_res = {
			token: balance
		};
		//back
		return obj_res;
}

//ROUTES
//
//ApiRoutes
//UNI
app.get('/api3/UNI/V2/reserves/:cont_address',async function (req, res, next) {
    var func = await getReservesUNI_V2(req.params.cont_address)

    res.json(func)

});

app.get('/api3/UNI/V2/tokens/:cont_address',async function (req, res, next) {
    var func = await getTokenUNI_V2(req.params.cont_address)

    res.json(func)

});

app.get('/api3/UNI/V2/prices/:cont_address',async function (req, res, next) {
    let func = await getPriceUNI_V2(req.params.cont_address)

    res.json(func)

});

app.get('/api3/UNI/V2/info/:cont_address',async function (req, res, next) {
    let func = await getInfoUNI_V2(req.params.cont_address)

    res.json(func)

});
//
//Token
app.get('/api3/token/name/:cont_address',async function (req, res, next) {
    let func = await getTokenName(req.params.cont_address)

    res.json(func)

});

app.get('/api3/token/supply/:cont_address',async function (req, res, next) {
    let func = await getTokenSupply(req.params.cont_address)

    res.json(func)

});

app.get('/api3/token/decimals/:cont_address',async function (req, res, next) {
    let func = await getTokenDecimal(req.params.cont_address)

    res.json(func)

});

app.get('/api3/token/balanceof/:cont_address/:address',async function (req, res, next) {
    let func = await getTokenBalance(req.params.cont_address, req.params.address)

		let finish = {
			balance: func
		};

    res.json(finish)

});
//
//Wallet
app.get('/wallet/func/balance',async function (req, res, next) {
    let func = await walletBalance()

    res.json(func)

});

app.get('/wallet/func/send/:cont_address',async function (req, res, next) {
    let func = await getTokenSupply(req.params.cont_address)

    res.json(func)

});

app.get('/wallet/func/decimals/:cont_address',async function (req, res, next) {
    let func = await getTokenDecimal(req.params.cont_address)

    res.json(func)

});

app.get('/wallet/func/balanceof/:cont_address/:address',async function (req, res, next) {
    let func = await getTokenBalance(req.params.cont_address, req.params.address)

		let finish = {
			balance: func
		};

    res.json(finish)

});
//

//app.use(function(err, req, res, next) {
//	res.status(500).send('Please update page')
//});

//
//
//

//Start WebServer
var server = app.listen(3001, function () {

    var host = "localhost";
    var port = server.address().port;

    console.log("App listen at - http://" + host + ":" + port)

});
//
