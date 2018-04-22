module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 4712388,
      network_id: "*", // Match any network id,
      from: '0x4cc602bedd409f2820b2a7f46d851275bfd51b88'
    }
  }
};
