//Functions Lib for decoding datas
//
const ethers = require('ethers');

module.exports = {
  to_string: function(code) {
    decode = ethers.utils.formatUnits(code.toString());
  return decode;
  },
  to_num: function(code) {
    decode = ethers.utils.formatUnits(code.toString());
  return decode;
  },
  //**** For calc rewards per wallet (address) getHiRiskApyForBalance
	//	let price = 15;
	//	const price_hex = ethers.utils.hexValue(price);
  to_hex: function(code) {
    decode = ethers.utils.hexValue(code);
  return decode;
  }

}
