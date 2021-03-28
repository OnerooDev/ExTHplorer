//Functions Lib for gen contract abi scheme
//
const ethers = require('ethers');

module.exports = {
//UNISWAP Contracts
//
// Reserves from UNI v2 LP token contract
  UNI_V2: function(address, acc) {
    const Contract = new ethers.Contract(
        address,
        ['function token0() external view returns (address)',
        'function token1() external view returns (address)',
        'function price0CumulativeLast() external view returns (uint)',
        'function price1CumulativeLast() external view returns (uint)',
        'function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)'],
        acc
    );
    return Contract;
  },

//
//
//OTHERS Contracts
//
//Check contract-token balance by address
  token: function(address, acc) {
    const Contract = new ethers.Contract(
        address,
        ['function name() external pure returns (string memory)',
        'function symbol() external pure returns (string memory)',
        'function decimals() external pure returns (uint8)',
        'function balanceOf(address account) external view returns (uint256)',
        'function totalSupply() public view returns (uint256)'],
        acc
    );
    return Contract;
  },
//Rewarder contract
  Rewards: function(address, acc) {
    const Contract = new ethers.Contract(
        address,
        ['function getRewardPerHour() public view returns (uint256)',
				'function totalSupply() public view returns (uint256)'],
        acc
    );
    return Contract;
  },
  Earn: function(address, acc) {
    const Contract = new ethers.Contract(
        address,
        ['function earned(address account) public view returns (uint256 acc)',
			   'function balanceOf(address) public view returns (uint256)'],
        acc
    );
    return Contract;
  }

};
