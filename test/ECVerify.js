var ECVerify = artifacts.require('./ECVerify.sol')

contract('ECVerify', (accounts) => {
  it('should return signing address from signature', async () => {
    var account = accounts[0]

    try {
      var instance = await ECVerify.deployed()

      var msg = 'some data'

      var hash = web3.sha3(msg)
      var sig = web3.eth.sign(account, hash)

      // https://github.com/ethereum/go-ethereum/issues/3731
      var prefix = '\x19Ethereum Signed Message:\n32'
      var phash = web3.sha3(prefix + hash)

      var signer = await instance.ecrecovery(phash, sig)
      assert.ok(signer)
    } catch(error) {
      console.error(error)
      assert.equal(error, undefined)
    }
  })

  it('should verify signature is from address', async () => {
    var account = accounts[0]

    try {
      var instance = await ECVerify.deployed()
      var msg = 'some data'

      var hash = web3.sha3(msg)
      var sig = web3.eth.sign(account, hash)

      // https://github.com/ethereum/go-ethereum/issues/3731
      var prefix = '\x19Ethereum Signed Message:\n32'
      var phash = web3.sha3(prefix + hash)

      var verified = await instance.ecverify(phash, sig, account)
      assert.ok(verified)
    } catch(error) {
      console.error(error)
      assert.equal(error, undefined)
    }
  })
})
