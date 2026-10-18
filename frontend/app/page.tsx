'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const injectedConnector = connectors[0];
  
  const { data: balance } = useBalance({
    address: address,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-800 lg:p-4">
          GGToken Dashboard &nbsp;
          <code className="font-bold">v1.0</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-45 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:size-auto lg:bg-none">
          {isConnected ? (
            <button
              onClick={() => disconnect()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect ({address?.substring(0, 6)}...)
            </button>
          ) : (
            <button
              onClick={() => {
                if (injectedConnector) {
                  connect({ connector: injectedConnector });
                }
              }}
              disabled={isConnecting || !injectedConnector}
              className="bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold py-2 px-4 rounded"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>

      {!isConnected && connectError && (
        <p role="alert" className="mt-4 text-center text-sm text-red-400">
          Wallet connection failed: {connectError.message}. Make sure your wallet extension is installed and unlocked, then try again.
        </p>
      )}

      <div className="my-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Welcome to the <span className="text-blue-500">GGToken</span> Portal
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Manage your custom ERC-20 portfolio token, review balances, and interact with your smart contract directly on-chain.
        </p>

        {isConnected && (
          <div className="mt-8 p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-gray-300">Your Wallet Balance</h3>
            <p className="text-2xl font-bold text-green-400 mt-2">
              {balance ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}` : 'Loading...'}
            </p>
          </div>
        )}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left gap-4">
        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
          <h2 className="text-lg font-semibold mb-2">1. Smart Contract</h2>
          <p className="text-sm text-gray-400">Secure OpenZeppelin ERC-20 implementation with custom minting access control.</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
          <h2 className="text-lg font-semibold mb-2">2. Hardhat Tests</h2>
          <p className="text-sm text-gray-400">Fully tested execution logic ensuring complete reliability prior to mainnet deployment.</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
          <h2 className="text-lg font-semibold mb-2">3. Vercel Ready</h2>
          <p className="text-sm text-gray-400">Push this frontend app straight to Vercel to showcase your full-stack Web3 capabilities.</p>
        </div>
      </div>
    </main>
  );
}
