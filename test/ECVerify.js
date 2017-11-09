var ECVerify = artifacts.require('./ECVerify.sol')

contract('ECVerify', function(accounts) {
  it('should return signer account from signature', async function() {
    var account = accounts[0]

    try {
      var instance = await ECVerify.deployed()

      // sample data here is sha256 of a file
      var msg = '7e5941f066b2070419995072dac7323c02d5ae107b23d8085772f232487fecae'

      var hash = web3.sha3(msg)
      var sig = web3.eth.sign(account, hash)

      var signer = await instance.ecrecovery(hash, sig)
      assert.ok(signer)
    } catch(error) {
      console.error(error)
      assert.equal(error, undefined)
    }
  })
  it('should verify signature is from account', async function() {
    var account = accounts[0]

    try {
      var instance = await ECVerify.deployed()
      var msg = '7e5941f066b2070419995072dac7323c02d5ae107b23d8085772f232487fecae'

      var hash = web3.sha3(msg)
      var sig = web3.eth.sign(account, hash)

      var verified = await instance.ecverify.call(hash, sig, account)
      assert.ok(verified)
    } catch(error) {
      console.error(error)
      assert.equal(error, undefined)
    }
  })
})
