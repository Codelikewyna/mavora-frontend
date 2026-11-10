'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User as UserIcon,
  Wallet as WalletIcon,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Clock,
  Copy,
  Check,
  LogOut,
  Plus,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { WalletDrawer } from '@/components/WalletDrawer';
import { DepositModal } from '@/components/DepositModal';
import { TransferModal } from '@/components/TransferModal';
import { ProductCard } from '@/components/ProductCard';
import { fetchWallet, fetchTransactions, fetchCreatorProducts, fetchUserProfile } from '@/lib/api';
import { fetchPublicConfig } from '@/lib/config';
import { User, Wallet, WalletTransaction, Product, PublicConfig } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [config, setConfig] = useState<PublicConfig | null>(null);

  // Profile data
  const [activeTab, setActiveTab] = useState<'creations' | 'transactions' | 'security'>('creations');
  const [myCreations, setMyCreations] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  useEffect(() => {
    fetchPublicConfig().then(setConfig);

    const savedUser = localStorage.getItem('mavora_user');
    const savedToken = localStorage.getItem('mavora_token');

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          loadUserData(savedToken, parsed.username);
        } catch {
          // ignore
        }
      }

      // Refresh fresh profile from server
      fetchUserProfile(savedToken)
        .then((res) => {
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem('mavora_user', JSON.stringify(res.user));
            loadUserData(savedToken, res.user.username);
          }
          if (res?.wallet) {
            setWallet(res.wallet);
          }
        })
        .catch(() => {
          setLoadingData(false);
        });
    } else {
      setLoadingData(false);
    }
  }, []);

  const loadUserData = async (authToken: string, username: string) => {
    setLoadingData(true);
    try {
      const [walletRes, txsRes, creationsRes] = await Promise.all([
        fetchWallet(authToken).catch(() => null),
        fetchTransactions(authToken).catch(() => []),
        fetchCreatorProducts(username).catch(() => []),
      ]);

      if (walletRes) setWallet(walletRes);
      setTransactions(txsRes || []);
      setMyCreations(creationsRes || []);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mavora_token');
    localStorage.removeItem('mavora_user');
    setUser(null);
    setWallet(null);
    setToken(null);
    router.push('/');
  };

  const copyDeposit = () => {
    if (config?.depositWalletAddress) {
      navigator.clipboard.writeText(config.depositWalletAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <Navbar
        user={user}
        wallet={wallet}
        config={config}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWallet={() => setIsWalletOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {!user ? (
          <div className="max-w-md mx-auto text-center py-16 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <UserIcon className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Sign In to View Profile</h2>
            <p className="text-xs text-zinc-400">
              Access your digital creations, USDC internal balance, and transfer history.
            </p>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-2.5 text-sm font-semibold text-white transition shadow-lg shadow-purple-600/25"
            >
              Sign In / Register
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Profile Banner */}
            <div className="rounded-3xl border border-white/10 bg-[#121622] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-2xl shadow-xl shadow-purple-600/20">
                    {user.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.avatarUrl} alt={user.username} className="h-full w-full object-cover rounded-2xl" />
                    ) : (
                      user.username.slice(0, 2).toUpperCase()
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                        {user.displayName || user.username}
                      </h1>
                      <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                        {user.role || 'Member'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">@{user.username}</p>
                    <p className="text-xs text-zinc-500 mt-1">{user.email}</p>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href="/manage-posts"
                    className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 px-3.5 py-2 text-xs font-semibold text-purple-300 transition"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    Manage Posts
                  </Link>

                  <Link
                    href="/transactions"
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition"
                  >
                    <Clock className="h-3.5 w-3.5 text-purple-400" />
                    Transactions
                  </Link>

                  <Link
                    href="/upload"
                    className="flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 px-3.5 py-2 text-xs font-semibold text-white transition shadow-lg shadow-purple-600/25"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Upload Asset
                  </Link>

                  <button
                    onClick={() => setIsTransferOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition"
                  >
                    <Send className="h-3.5 w-3.5 text-purple-400" />
                    Transfer USDC
                  </button>

                  <button
                    onClick={() => setIsDepositOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition"
                  >
                    <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-400" />
                    Deposit
                  </button>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-zinc-400 hover:text-rose-400 rounded-xl hover:bg-rose-500/10 transition"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="rounded-xl border border-white/5 bg-black/30 p-3.5">
                  <span className="text-[11px] text-zinc-400 block">Available Balance</span>
                  <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                    ${wallet ? wallet.availableUsd : '0.00'} <span className="text-xs text-purple-400 font-sans">USDC</span>
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/30 p-3.5">
                  <span className="text-[11px] text-zinc-400 block">Pending Balance</span>
                  <span className="text-lg font-bold text-amber-400 font-mono mt-0.5 block">
                    ${wallet ? wallet.pendingUsd : '0.00'} <span className="text-xs text-zinc-500 font-sans">USDC</span>
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/30 p-3.5">
                  <span className="text-[11px] text-zinc-400 block">Published Creations</span>
                  <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                    {myCreations.length}
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/30 p-3.5">
                  <span className="text-[11px] text-zinc-400 block">Settled Transfers</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                    {transactions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex border-b border-white/10 gap-6 text-sm font-semibold">
              <button
                onClick={() => setActiveTab('creations')}
                className={`pb-3 transition relative flex items-center gap-2 ${
                  activeTab === 'creations'
                    ? 'text-purple-400 border-b-2 border-purple-500'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                My Creations ({myCreations.length})
              </button>

              <button
                onClick={() => setActiveTab('transactions')}
                className={`pb-3 transition relative flex items-center gap-2 ${
                  activeTab === 'transactions'
                    ? 'text-purple-400 border-b-2 border-purple-500'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Clock className="h-4 w-4" />
                Transfer History ({transactions.length})
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`pb-3 transition relative flex items-center gap-2 ${
                  activeTab === 'security'
                    ? 'text-purple-400 border-b-2 border-purple-500'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                Wallet & Security
              </button>
            </div>

            {/* Tab 1: My Creations */}
            {activeTab === 'creations' && (
              <div>
                {myCreations.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">No creations uploaded yet</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Publish your first digital artwork or 3D asset to start earning USDC through zero-gas sales.
                    </p>
                    <Link
                      href="/upload"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-semibold text-white transition shadow-lg shadow-purple-600/25"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Create New Asset
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {myCreations.map((p) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Transfer History */}
            {activeTab === 'transactions' && (
              <div className="rounded-2xl border border-white/10 bg-[#121622] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white">P2P Transfers & Activity</h3>
                  <button
                    onClick={() => setIsTransferOpen(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    + New Transfer
                  </button>
                </div>

                {transactions.length === 0 ? (
                  <div className="py-12 text-center text-xs text-zinc-500 space-y-1">
                    <p>No transfer activity recorded yet.</p>
                    <p>Send USDC instantly to any username with zero gas fees.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                              tx.isIncoming
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }`}
                          >
                            {tx.isIncoming ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {tx.isIncoming
                                ? `Received from @${tx.senderUsername}`
                                : `Sent to @${tx.recipientUsername}`}
                            </span>
                            <span className="text-[11px] text-zinc-500">
                              {tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'Recent'} ·{' '}
                              <span className="text-emerald-400">Confirmed</span>
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-sm font-bold font-mono ${
                              tx.isIncoming ? 'text-emerald-400' : 'text-zinc-200'
                            }`}
                          >
                            {tx.isIncoming ? '+' : '-'}
                            {tx.amountUsdc.toFixed(2)} USDC
                          </span>
                          <span className="text-[10px] text-zinc-500 block">Base L2 Ledger</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Wallet & Security */}
            {activeTab === 'security' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-[#121622] p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <WalletIcon className="h-4 w-4 text-purple-400" />
                    Internal Wallet Account
                  </h3>
                  <div className="space-y-3 text-xs text-zinc-400">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span>Owner Username</span>
                      <span className="text-white font-mono font-semibold">@{user.username}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span>Registered Email</span>
                      <span className="text-white font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span>Accounting Standard</span>
                      <span className="text-white font-medium">Double-Entry Integer Units</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span>Account Status</span>
                      <span className="text-emerald-400 font-semibold uppercase">{wallet?.status || 'Active'}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#121622] p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Security & Settlement
                  </h3>
                  <div className="space-y-3 text-xs text-zinc-400">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span>Password Hashing</span>
                      <span className="text-emerald-400 font-medium">Argon2 (Anti-GPU)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span>P2P Transfer Authorization</span>
                      <span className="text-white font-medium">Password Challenge</span>
                    </div>
                    <div className="py-2">
                      <span className="block text-[11px] text-zinc-400 mb-1">Company USDC Deposit Address:</span>
                      <div className="flex items-center gap-2 rounded-lg bg-black/40 p-2 border border-white/5 font-mono text-[11px] text-zinc-300">
                        <span className="truncate">{config?.depositWalletAddress || '0x185F...D0cfbB'}</span>
                        <button onClick={copyDeposit} className="text-zinc-400 hover:text-white shrink-0">
                          {copiedAddress ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(newUser: User, newWallet: Wallet, newToken: string) => {
          setUser(newUser);
          setWallet(newWallet);
          setToken(newToken);
          localStorage.setItem('mavora_user', JSON.stringify(newUser));
          localStorage.setItem('mavora_token', newToken);
          loadUserData(newToken, newUser.username);
          setIsAuthOpen(false);
        }}
      />

      <WalletDrawer
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        wallet={wallet}
        config={config}
        onOpenDeposit={() => {
          setIsWalletOpen(false);
          setIsDepositOpen(true);
        }}
        onOpenTransfer={() => {
          setIsWalletOpen(false);
          setIsTransferOpen(true);
        }}
        isLoggedIn={!!user}
        onRequireAuth={() => {
          setIsWalletOpen(false);
          setIsAuthOpen(true);
        }}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        config={config}
      />

      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        wallet={wallet}
        token={token}
        onSuccess={(updated) => {
          setWallet(updated);
          if (token && user) {
            loadUserData(token, user.username);
          }
        }}
      />
    </div>
  );
}
