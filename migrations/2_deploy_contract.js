const MobilityWallet = artifacts.require("MobilityWallet");

module.exports = function(deployer) {
  deployer.deploy(MobilityWallet);
};
