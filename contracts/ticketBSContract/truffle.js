module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 4712388,
      network_id: "*", // Match any network id,
      from: '0x9e5a88aad31773af2ca39136135ee155a2394461'
    }
  }
};
