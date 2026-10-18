import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { sepolia, hardhat } from 'wagmi/chains'

export const config = createConfig({
  chains: [hardhat, sepolia],
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(),
    [sepolia.id]: http(),
  },
})
