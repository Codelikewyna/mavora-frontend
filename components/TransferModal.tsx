'use client';

import React, { useState } from 'react';
import { X, Send, Lock, AlertCircle, CheckCircle2, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Wallet } from '@/lib/types';
import { transferFundsApi } from '@/lib/api';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: Wallet | null;
  token: string | null;
  onSuccess: (updatedWallet: Wallet) => void;
}

export function TransferModal({
  isOpen,
  onClose,
  wallet,
  token,
  onSuccess,
}: TransferModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<{
    recipient: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  if (!isOpen) return null;

  const availableUsdc = wallet ? Number(wallet.availableUsd) : 0;

  const handleMax = () => {
    if (availableUsdc > 0) {
      setAmount(availableUsdc.toString());
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('Please sign in to transfer funds.');
      return;
    }

    const cleanUsername = recipient.replace(/^@/, '').trim();
    if (!cleanUsername) {
      setError('Please enter a recipient username.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0 USDC.');
      return;
    }

    if (numAmount > availableUsdc) {
      setError(`Insufficient balance. You have ${availableUsdc.toFixed(2)} USDC available.`);
      return;
    }

    if (!password) {
      setError('Please enter your account password to authorize the transfer.');
      return;
    }

    setLoading(true);
    try {
      const res = await transferFundsApi(token, {
        recipientUsername: cleanUsername,
        amountUsdc: numAmount,
        password,
      });

      setSuccessReceipt({
        recipient: cleanUsername,
        amount: numAmount,
        timestamp: new Date().toLocaleTimeString(),
      });

      if (res.wallet) {
        onSuccess(res.wallet);
      }
    } catch (err: any) {
      setError(err?.message || 'Transfer failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRecipient('');
    setAmount('');
    setPassword('');
    setError(null);
    setSuccessReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121622] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Send className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Transfer USDC</h3>
              <p className="text-xs text-zinc-400">Instant peer-to-peer transfer via username</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {successReceipt ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Transfer Completed</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Successfully sent <span className="text-emerald-400 font-semibold">{successReceipt.amount} USDC</span> to{' '}
                <span className="text-white font-semibold">@{successReceipt.recipient}</span>
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-3 text-xs text-zinc-400 space-y-1.5">
              <div className="flex justify-between">
                <span>Network</span>
                <span className="text-white font-medium">Internal Ledger (Base L2)</span>
              </div>
              <div className="flex justify-between">
                <span>Fee</span>
                <span className="text-emerald-400 font-medium">0.00 USDC (Free)</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-emerald-400 font-medium">Settled & Confirmed</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-3 text-sm font-semibold text-white transition shadow-lg shadow-purple-600/25"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleTransfer} className="mt-5 space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Recipient Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Recipient Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500 text-sm">
                  @
                </div>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="username (e.g. winner)"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-8 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                />
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">Amount (USDC)</label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400">
                    Avail: <span className="text-white font-semibold">${availableUsdc.toFixed(2)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleMax}
                    className="text-[10px] font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 px-1.5 py-0.5 rounded transition"
                  >
                    Max
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={availableUsdc}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-4 pr-16 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-zinc-400">
                  USDC
                </div>
              </div>
            </div>

            {/* Password Verification Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-purple-400" />
                  Your Account Password
                </label>
                <span className="text-[10px] text-zinc-400">Required for security</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password to authorize"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-4 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                Verified securely via Argon2 cryptographic authentication.
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || availableUsdc <= 0}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-sm font-semibold text-white transition shadow-lg shadow-purple-600/25"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Verifying & Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize & Send USDC</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
