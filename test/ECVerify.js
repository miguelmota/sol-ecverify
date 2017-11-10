const ECVerify = artifacts.require('./ECVerify.sol')
const {sha3} = require('ethereumjs-util')

contract('ECVerify', (accounts) => {
  it('should return signing address from signature', async () => {
    const account = accounts[0]

    try {
      const instance = await ECVerify.deployed()

      const msg = Buffer.from('some data')
      const sig = web3.eth.sign(account, `0x${msg.toString('hex')}`)

      // https://github.com/ethereum/go-ethereum/issues/3731
      const prefix = Buffer.from('\x19Ethereum Signed Message:\n');
      const pmsg = `0x${sha3(Buffer.concat([prefix, Buffer.from(String(msg.length)), msg])).toString('hex')}`

      const signer = await instance.ecrecovery(pmsg, sig)
      assert.equal(signer, account)
    } catch(error) {
      console.error(error)
      assert.equal(error, undefined)
    }
  })

  it('should verify signature is from address', async () => {
    const account = accounts[0]

    try {
      const instance = await ECVerify.deployed()

      const msg = Buffer.from('some data')
      const sig = web3.eth.sign(account, `0x${msg.toString('hex')}`)
      const prefix = Buffer.from('\x19Ethereum Signed Message:\n');
      const pmsg = `0x${sha3(Buffer.concat([prefix, Buffer.from(String(msg.length)), msg])).toString('hex')}`

      const verified = await instance.ecverify(pmsg, sig, account)
      assert.equal(verified, true)
    } catch(error) {
      console.error(error)
      assert.equal(error, undefined)
    }
  })
})
