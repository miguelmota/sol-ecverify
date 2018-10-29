# sol-ecverify

>  A [solidity](https://github.com/ethereum/solidity) library for verifying elliptic curve signatures in Ethereum (wrapper around `ecrecover`).

## API

- **ecrecovery**(hash, sig) -> `address`

  - {bytes32} hash - 32 byte sha3 (keccak256) hash of original message data

  - {bytes} sig - 65 byte signature string

- **ecverify**(hash, sig, account) -> `bool`

  - {bytes32} hash - 32 byte sha3 (keccak256) hash of original message data

  - {bytes} sig - 65 byte signature string

  - {address} signer - 20 byte address of proposed signer


## Getting started

```javascript
const {sha3} = require('ethereumjs-util')
const account = '0xa462d983B4b8C855e1876e8c24889CBa466A67EB'

const msg = Buffer.from('some data')
const sig = web3.eth.sign(account, `0x${msg.toString('hex')}`)

// https://github.com/ethereum/go-ethereum/issues/3731
const prefix = Buffer.from('\x19Ethereum Signed Message:\n');
const pmsg = `0x${sha3(Buffer.concat([prefix, Buffer.from(String(msg.length)), msg])).toString('hex')}`

var signer = await ECVerify.ecrecovery(pmsg, sig)
console.log(signer) // "0xa462d983B4b8C855e1876e8c24889CBa466A67EB"

var verified = await ECVerify.ecverify(pmsg, sig, account)
console.log(verified) // true
```

## Test

```bash
truffle test
```

## Credit

Thanks to [@axic](https://github.com/axic) for providing this [gist](https://gist.github.com/axic/5b33912c6f61ae6fd96d6c4a47afde6d) ([#79](https://github.com/ethereum/EIPs/issues/79#issuecomment-205051630))

## License

[MIT](LICENSE)