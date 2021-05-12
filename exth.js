// Application for fast explore ETH/BSC/MATIC and same EVMs smart-contracts:
// https://github.com/SeerDay

// Before use you must to configure .env

//Use lib
require('dotenv').config();

const express = require("express");
var app = express();

const ethers = require('ethers');
var networks = require('@ethersproject/networks');

var abi = require('./lib/contract-abi.js');
var decoder = require('./lib/decode.js');
var univ2 = require('./func/univ2.js');
var wallet = require('./func/wallet.js');
var ERC20 = require('./func/erc20.js');

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

//ROUTES
//
//ApiRoutes
//UNI
app.get('/api3/UNI/V2/reserves/:cont_address',async function (req, res, next) {
	try{
    var func = await univ2.getReservesUNI_V2(req.params.cont_address)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/api3/UNI/V2/tokens/:cont_address',async function (req, res, next) {
	try{
    var func = await univ2.getTokenUNI_V2(req.params.cont_address)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/api3/UNI/V2/prices/:cont_address',async function (req, res, next) {
	try{
    let func = await univ2.getPriceUNI_V2(req.params.cont_address)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/api3/UNI/V2/info/:cont_address',async function (req, res, next) {
	try{
    let func = await univ2.getInfoUNI_V2(req.params.cont_address)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});
//
//Token
app.get('/api3/token/name/:cont_address',async function (req, res, next) {
	try{
    let func = await ERC20.getTokenName(req.params.cont_address)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/api3/token/supply/:cont_address',async function (req, res, next) {
	try{
    let func = await ERC20.getTokenSupply(req.params.cont_address)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/api3/token/decimals/:cont_address',async function (req, res, next) {
	try{
    let func = await ERC20.getTokenDecimal(req.params.cont_address)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/api3/token/balanceof/:cont_address/:address',async function (req, res, next) {
	try{
    let func = await ERC20.getTokenBalance(req.params.cont_address, req.params.address)

		let finish = {
			balance: func
		};

    res.json(finish)
	}
	catch(err){
		console.log(err)
	}

});
//
//Wallet
app.get('/wallet/func/balance',async function (req, res, next) {
	try{
    let func = await wallet.walletBalance()

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/wallet/func/check_balance/:address',async function (req, res, next) {
	try{
    let func = await wallet.walletBalanceByAddress(req.params.address)
		res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/wallet/func/gas',async function (req, res, next) {
	try{
    let func = await wallet.walletGas()
		const gas = ethers.utils.formatUnits(func.toString());
		const gas_dec = ethers.utils.formatUnits(func.toString(), 9);

		let price = await CoinGeckoClient.simple.price({
			ids: 'ethereum',
			vs_currencies: 'usd'
		});
		const feeETH = gas * 21000 * price.data.ethereum.usd

		let obj_res = {
			gas: gas_dec,
			price_ETH_USD: price.data.ethereum.usd,
			fee_sendETH_USD: feeETH
		};

    res.json(obj_res)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/wallet/func/address',async function (req, res, next) {
	try{
    let func = await wallet.walletAddress()

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

});

app.get('/wallet/func/sendTo/:address/:summ',async function (req, res, next) {
	try{
    let func = await wallet.walletSend(req.params.address, req.params.summ)

    res.json(func)
	}
	catch(err){
		console.log(err)
	}

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
