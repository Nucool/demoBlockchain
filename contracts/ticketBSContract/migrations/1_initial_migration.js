const Web3 = require('web3');
const TruffleConfig = require('../truffle');
var Migrations = artifacts.require("./Migrations.sol");

module.exports = async function(deployer, network) {
  console.log('network xxx', network);
  if(network === 'development') {
    const config = TruffleConfig.networks[network];
    const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));
    await web3.eth.personal.unlockAccount(config.from, '11111111', 0);
  }
  deployer.deploy(Migrations);
};
