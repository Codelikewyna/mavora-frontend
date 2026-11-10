'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  DollarSign,
  User,
  ExternalLink,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { WalletDrawer } from '@/components/WalletDrawer';
import { DepositModal } from '@/components/DepositModal';
import { TransferModal } from '@/components/TransferModal';
import { NotificationModal } from '@/components/NotificationModal';
import { fetchWallet, fetchTransactions } from '@/lib/api';
import { fetchPublicConfig } from '@/lib/config';
import { User as UserType, Wallet, WalletTransaction, PublicConfig } from '@/lib/types';

export default function TransactionsPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [config, setConfig] = useState<PublicConfig | null>(null);

  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'incoming' | 'outgoing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<WalletTransaction | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  useEffect(() => {
    fetchPublicConfig().then(setConfig);

    const savedToken = localStorage.getItem('mavora_token');
    const savedUser = localStorage.getItem('mavora_user');

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore
        }
      }
      loadData(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const loadData = async (authToken: string) => {
    setLoading(true);
    try {
      const [walletRes, txsRes] = await Promise.all([
        fetchWallet(authToken).catch(() => null),
        fetchTransactions(authToken).catch(() => []),
      ]);
      if (walletRes) setWallet(walletRes);
      if (txsRes) setTransactions(txsRes);
    } catch (err) {
      console.warn('Failed to load transaction data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Metrics
  const totalReceived = useMemo(() => {
    return transactions
      .filter((t) => t.isIncoming)
      .reduce((sum, t) => sum + (t.amountUsdc || 0), 0);
  }, [transactions]);

  const totalSent = useMemo(() => {
    return transactions
      .filter((t) => !t.isIncoming)
      .reduce((sum, t) => sum + (t.amountUsdc || 0), 0);
  }, [transactions]);

  // Filter & Search
  const filteredTxs = useMemo(() => {
    let result = transactions;
    if (filterType === 'incoming') {
      result = result.filter((t) => t.isIncoming);
    } else if (filterType === 'outgoing') {
      result = result.filter((t) => !t.isIncoming);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.senderUsername?.toLowerCase().includes(q) ||
          t.recipientUsername?.toLowerCase().includes(q) ||
          t.reference?.toLowerCase().includes(q) ||
          t.id?.toLowerCase().includes(q) ||
          String(t.amountUsdc).includes(q),
      );
    }

    return result;
  }, [transactions, filterType, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#EDEDED] flex flex-col font-sans">
      <Navbar
        config={config}
        user={user}
        wallet={wallet}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery=""
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/profile" className="hover:text-white transition">Profile</Link>
          <span>/</span>
          <span className="text-white font-medium">Transaction History</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Wallet Transaction History
              </h1>
              <p className="text-xs text-zinc-400">
                Audit log of all internal USDC peer-to-peer transfers and marketplace settlements on Base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (!token) setIsAuthOpen(true);
                else setIsTransferOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow hover:brightness-110 transition"
            >
              <Send className="h-4 w-4" />
              Transfer USDC
            </button>
            <button
              type="button"
              onClick={() => {
                if (!token) setIsAuthOpen(true);
                else setIsDepositOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition"
            >
              <ArrowDownLeft className="h-4 w-4 text-purple-400" />
              Deposit
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Available Balance</span>
            <div className="mt-1 text-2xl font-bold text-white font-mono">
              ${wallet ? wallet.availableUsd : '0.00'}
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">Active Ledger</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Total Received</span>
            <div className="mt-1 text-2xl font-bold text-emerald-400 font-mono">
              +${totalReceived.toFixed(2)}
            </div>
            <span className="text-[11px] text-zinc-500">Incoming USDC</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Total Sent</span>
            <div className="mt-1 text-2xl font-bold text-zinc-300 font-mono">
              -${totalSent.toFixed(2)}
            </div>
            <span className="text-[11px] text-zinc-500">Outgoing transfers</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Total Transactions</span>
            <div className="mt-1 text-2xl font-bold text-purple-400 font-mono">
              {transactions.length}
            </div>
            <span className="text-[11px] text-zinc-500">Audit records</span>
          </div>
        </div>

        {/* Search & Filter Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex rounded-xl bg-[#121622] p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                filterType === 'all'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Transfers
            </button>
            <button
              type="button"
              onClick={() => setFilterType('incoming')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                filterType === 'incoming'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Received (+)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('outgoing')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                filterType === 'outgoing'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sent (-)
            </button>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username, memo, or ID..."
              className="w-full rounded-xl border border-white/10 bg-[#121622] pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-purple-500/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Transaction Records List */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
              <span className="text-xs text-zinc-400">Loading transaction history...</span>
            </div>
          </div>
        ) : filteredTxs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-[#121622]/30 space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-zinc-400">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No transactions found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {searchQuery
                ? `No transactions matched "${searchQuery}".`
                : 'You have no transfer activity yet. Send USDC to any Mavora creator or make your first marketplace purchase.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (!token) setIsAuthOpen(true);
                  else setIsTransferOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-semibold text-white transition"
              >
                <Send className="h-4 w-4" />
                Initiate Transfer
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTxs.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-[#121622] p-4.5 hover:border-purple-500/40 hover:bg-[#151a29] transition-all duration-200 flex items-center justify-between gap-4 shadow-sm"
              >
                {/* Direction Icon & Counterparty */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                      tx.isIncoming
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : 'border-purple-500/30 bg-purple-500/10 text-purple-400'
                    }`}
                  >
                    {tx.isIncoming ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {tx.isIncoming
                          ? `Received from @${tx.senderUsername}`
                          : `Sent to @${tx.recipientUsername}`}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 hidden xs:inline-block">
                        Completed
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 truncate max-w-md">
                      {tx.reference || 'P2P USDC Transfer'}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(tx.timestamp).toLocaleString()}
                      </span>
                      <span>·</span>
                      <span className="font-mono text-zinc-400">ID: {tx.id.substring(0, 10)}...</span>
                    </div>
                  </div>
                </div>

                {/* Amount & Arrow */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div
                      className={`text-base font-extrabold font-mono ${
                        tx.isIncoming ? 'text-emerald-400' : 'text-zinc-200'
                      }`}
                    >
                      {tx.isIncoming ? '+' : '-'}${Number(tx.amountUsdc).toFixed(2)}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold block">
                      USDC · 0 Gas
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Transaction Inspection Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121622] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                    selectedTx.isIncoming
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-purple-500/30 bg-purple-500/10 text-purple-400'
                  }`}
                >
                  {selectedTx.isIncoming ? (
                    <ArrowDownLeft className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Transfer Receipt</h3>
                  <p className="text-xs text-zinc-400">Base Double-Entry Settlement</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
              >
                ✕
              </button>
            </div>

            {/* Amount Banner */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-center">
              <span className="text-xs text-zinc-400 block mb-1">
                {selectedTx.isIncoming ? 'Amount Credited' : 'Amount Transferred'}
              </span>
              <div
                className={`text-3xl font-extrabold font-mono ${
                  selectedTx.isIncoming ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {selectedTx.isIncoming ? '+' : '-'}${Number(selectedTx.amountUsdc).toFixed(2)}
                <span className="text-sm font-semibold text-purple-400 ml-1.5">USDC</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="h-3 w-3" />
                Settled on Base Ledger
              </div>
            </div>

            {/* Breakdown specs */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Sender</span>
                <span className="font-semibold text-white">@{selectedTx.senderUsername}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Recipient</span>
                <span className="font-semibold text-white">@{selectedTx.recipientUsername}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Timestamp</span>
                <span className="text-zinc-300 font-mono">
                  {new Date(selectedTx.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Transfer Type</span>
                <span className="capitalize text-zinc-300">{selectedTx.type}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Network Gas Fee</span>
                <span className="font-semibold text-emerald-400">$0.00 USDC (Zero Gas)</span>
              </div>
              <div>
                <span className="text-zinc-400 block mb-1">Transaction Ledger ID:</span>
                <div className="flex items-center justify-between rounded-lg bg-black/50 px-3 py-1.5 font-mono text-[11px] text-zinc-300 border border-white/5">
                  <span className="truncate max-w-[280px]">{selectedTx.id}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedTx.id)}
                    className="text-purple-400 hover:text-purple-300 ml-2 shrink-0"
                    title="Copy Transaction ID"
                  >
                    {copiedId ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTx(null)}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-semibold text-white shadow"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
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
          if (token) loadData(token);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u, w, t) => {
          setUser(u);
          setWallet(w);
          setToken(t);
          loadData(t);
        }}
      />
    </div>
  );
}
