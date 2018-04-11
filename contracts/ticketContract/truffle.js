module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 4712388,
      network_id: "*", // Match any network id,
      from: '0x3624b38030ba311b70113cca46c4d37994b21cfc'
    }
  }
};
