const RetrieveTokenBalances = artifacts.require("RetrieveTokenBalances");

module.exports = function (deployer) {
  deployer.deploy(RetrieveTokenBalances);
};
