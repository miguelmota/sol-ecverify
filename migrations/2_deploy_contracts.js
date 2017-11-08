var ECVerify = artifacts.require('./ECVerify.sol')

module.exports = function(deployer) {
  deployer.deploy(ECVerify)
}
