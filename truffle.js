module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "172.27.64.176",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
