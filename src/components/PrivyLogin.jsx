import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { LogIn, LogOut, Wallet, Mail, User, Shield, Check } from 'lucide-react';

const PrivyLogin = () => {
  const { 
    ready,
    authenticated, 
    user, 
    login, 
    logout,
    linkEmail,
    linkWallet,
  } = usePrivy();

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-semibold text-gray-800">Loading Privy...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in with Web3 wallet or email
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={login}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <LogIn className="w-5 h-5" />
              Login with Privy
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-4">
                Supported login methods:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Wallet className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Wallet</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Email</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Secured by Privy.io
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! 👋
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Login Successful!</h3>
              <p className="text-sm text-gray-600">Account verified</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">User ID</label>
              <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded mt-1 break-all">
                {user?.id || 'N/A'}
              </p>
            </div>

            {user?.email && (
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</label>
                <div className="flex items-center justify-between bg-white p-3 rounded mt-1">
                  <p className="text-sm text-gray-800">{user.email.address}</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 block">
                Linked Accounts
              </label>
              <div className="space-y-2">
                {user?.linkedAccounts?.map((account, index) => (
                  <div key={index} className="bg-white p-3 rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {account.type === 'wallet' && <Wallet className="w-4 h-4 text-purple-600" />}
                      {account.type === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                      <div>
                        <p className="text-xs text-gray-500 capitalize">{account.type}</p>
                        <p className="text-sm text-gray-800 font-mono">
                          {account.address?.substring(0, 20)}...
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {account.chainType || 'Connected'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {user?.wallet && (
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">Wallet Address</label>
                <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded mt-1 break-all">
                  {user.wallet.address}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={linkEmail}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Link Email
            </button>
            <button
              onClick={linkWallet}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Link Wallet
            </button>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Powered by Privy.io
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivyLogin;