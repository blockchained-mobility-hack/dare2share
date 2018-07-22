const MobilityWallet = artifacts.require("MobilityWallet");
const RideSharing = artifacts.require("RideSharing");

module.exports = function(deployer) {
  deployer.deploy(MobilityWallet);
};

module.exports = function(deployer) {
  deployer.deploy(RideSharing);
};
