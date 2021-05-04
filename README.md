# ExTHplorer

#### More usefull api requests for explore smart-contracts on ETH/BSC/MATIC and same EVMs.
------
## Ready to use:

### Main chains:
#### ETH - https://explore-eth.onerood.dev/
#### BSC - https://explore-bsc.onerood.dev/
#### MATIC - https://explore-matic.onerood.dev/

### Test chains: - *Maintenance 🔧*
#### KOVAN - https://explore-kovan.onerood.dev/
#### BSC Testnet - https://explore-bsc-test.onerood.dev/
#### MATIC Testnet - https://explore-matic-test.onerood.dev/

## Install
  Yarn

  node exth.js

----
## API Scheme
#### Standart URL address - http://localhost:3001/api3/{PATH}
----
#### All available **GET** requests:
----
Use this **{PATH}** to prepare your request:

User data description:
**$contr_address** - smart-contract address
**$user_address** - user address

### 1. {PATH} = UNI/{METH}
Methods for explore 🦄Uniswap🦄 smart-contracts:

Uniswap V2:
**- {METH} = V2/{FUNC}**

Get pool reserves from LP contract
**{FUNC} = reserves/$contr_address**

Get pool tokens addresses from LP contract
**{FUNC} = tokens/$contr_address**

Get pool prices from LP contract
**{FUNC} = prices/$contr_address**

Get ALL ⬆️ **{FUNC}** from LP contract
**{FUNC} = info/$contr_address**

Uniswap V3:
**- {METH} = V3/{FUNC}**
*Maintenance 🔧*
### 2. {PATH} = TOKEN/{METH}
Methods for ⛓Token⛓ smart-contract

Get token($contr_address) name and symbol
**- {METH} = name/$contr_address**

Get token($contr_address) total Supply
**- {METH} = supply/$contr_address**

Get token($contr_address) decimals
**- {METH} = decimals/$contr_address**

Get token($contr_address) balance on wallet($user_address)
**- {METH} = balanceof/$contr_address/$user_address**


### 3. {PATH} = CURVE/{METH}
Methods for explore 🌈Curve🌈 smart-contracts

*Maintenance 🔧*
