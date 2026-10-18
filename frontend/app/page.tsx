'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const injectedConnector = connectors[0];

  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 lg:p-24 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Navbar / Top Header */}
      <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex items-center space-x-3 border border-gray-800 bg-gray-900/60 backdrop-blur-xl px-4 py-2.5 rounded-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="font-semibold text-gray-200">GGToken Portal</span>
          <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-md font-mono border border-blue-500/30">v1.0</span>
        </div>

        <div className="mt-4 lg:mt-0 flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs text-gray-400 bg-gray-900 border border-gray-800 px-3 py-2 rounded-xl font-mono">
                {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="bg-rose-600/90 hover:bg-rose-600 text-white font-medium text-sm py-2 px-4 rounded-xl shadow-lg shadow-rose-900/20 transition-all duration-200 active:scale-95"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                if (injectedConnector) {
                  connect({ connector: injectedConnector });
                }
              }}
              disabled={isConnecting || !injectedConnector}
              className="bg-blue-600 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 text-white font-medium text-sm py-2 px-5 rounded-xl shadow-lg shadow-blue-900/30 transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              {isConnecting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span>Connecting...</span>
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>
          )}
        </div>
      </header>

      {/* Connection Error Banner */}
      {!isConnected && connectError && (
        <div className="w-full max-w-md mt-6 p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl text-center backdrop-blur-md">
          <p role="alert" className="text-xs text-rose-300">
            <strong>Connection Failed:</strong> Wallet provider not detected. Please ensure your browser wallet extension (like MetaMask) is unlocked and try again.
          </p>
        </div>
      )}

      {/* Main Hero Section */}
      <div className="my-16 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-blue-400">
          Decentralized Portfolio Portal
        </h1>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          Seamlessly review your token balances, interact with smart contracts on-chain, and verify execution test logs.
        </p>

        {/* Balance Display Card */}
        {isConnected ? (
          <div className="mt-8 p-6 bg-gradient-to-b from-gray-900 to-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-xl max-w-sm mx-auto hover:border-gray-700 transition duration-300">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Your Wallet Balance</p>
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight mt-2 flex items-center justify-center gap-2">
              {isBalanceLoading ? (
                <span className="text-gray-500 text-lg animate-pulse">Fetching balance...</span>
              ) : balance ? (
                <>
                  <span>{parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)}</span>
                  <span className="text-sm font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {balance.symbol}
                  </span>
                </>
              ) : (
                <span className="text-gray-500 text-lg">0.0000</span>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 bg-gray-900/40 border border-dashed border-gray-800 rounded-2xl max-w-sm mx-auto">
            <p className="text-xs text-gray-500">Connect your Web3 wallet above to unlock your real-time token metrics.</p>
          </div>
        )}
      </div>

      {/* Feature Grid Section */}
      <div className="mb-12 grid text-left lg:max-w-5xl lg:w-full lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-gray-800/80 bg-gray-900/30 hover:border-blue-500/40 hover:bg-gray-900/50 transition duration-300 backdrop-blur-sm group">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition">
            <span className="text-blue-400 font-bold">01</span>
          </div>
          <h2 className="text-lg font-semibold mb-2 text-gray-100">Smart Contract</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Built using OpenZeppelin ERC-20 standards with restricted minting access controls.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-800/80 bg-gray-900/30 hover:border-purple-500/40 hover:bg-gray-900/50 transition duration-300 backdrop-blur-sm group">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition">
            <span className="text-purple-400 font-bold">02</span>
          </div>
          <h2 className="text-lg font-semibold mb-2 text-gray-100">Hardhat Suite</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Thoroughly unit-tested execution logic verifying ownership rules and mint allocations.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-800/80 bg-gray-900/30 hover:border-emerald-500/40 hover:bg-gray-900/50 transition duration-300 backdrop-blur-sm group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition">
            <span className="text-emerald-400 font-bold">03</span>
          </div>
          <h2 className="text-lg font-semibold mb-2 text-gray-100">Web3 Integration</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Powered by Viem and Wagmi hooks for ultra-fast, reactive on-chain data streaming.
          </p>
        </div>
      </div>
    </main>
  );
}
