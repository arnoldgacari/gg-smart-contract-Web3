# GG Smart Contract Project
A professional ERC-20 token project built with Solidity, Hardhat, and OpenZeppelin for portfolio demonstration.

## Development

```sh
npm install
npm run compile
npm test
```

To deploy to Sepolia, set `SEPOLIA_RPC_URL` and `PRIVATE_KEY` in `.env`, then run:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Keep real private keys out of source control.
