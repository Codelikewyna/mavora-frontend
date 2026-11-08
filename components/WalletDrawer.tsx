'use client';

import React, { useState } from 'react';
import {
  X,
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  Send,
  AlertCircle,
  Info,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Wallet, PublicConfig } from '@/lib/types';

interface WalletDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: Wallet | null;
  config: PublicConfig | null;
  onOpenDeposit: () => void;
  isLoggedIn: boolean;
  onRequireAuth: () => void;
}

export function WalletDrawer({
  isOpen,
  onClose,
  wallet,
  config,
  onOpenDeposit,
  isLoggedIn,
  onRequireAuth,
}: WalletDrawerProps) {
  const [showWithdrawNotice, setShowWithdrawNotice] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-md h-full bg-[#10141E] border-l border-white/10 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 p-1 border border-purple-500/20 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mavora-logo.png"
                alt="Mavora Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-sans">Internal Mavora Wallet</h2>
              <p className="text-xs text-zinc-400">Primary accounting ledger on Base</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-500/15 to-transparent p-6 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span>Available USDC Balance</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5" /> Double-Entry Ledger
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
                ${wallet ? wallet.availableUsd : '0.00'}
              </span>
              <span className="text-sm font-semibold text-purple-400">USDC</span>
            </div>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              Denominated in Base USDC (1 USDC = 1,000,000 base units). Used for all instant marketplace purchases without gas fees.
            </p>

            {wallet && Number(wallet.pendingUnits) > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs">
                <span className="text-zinc-400">Pending Confirmations:</span>
                <span className="text-amber-400 font-mono">${wallet.pendingUsd} USDC</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  onRequireAuth();
                } else {
                  onOpenDeposit();
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-lg shadow-purple-600/20 hover:brightness-110 transition"
            >
              <ArrowDownLeft className="h-4 w-4" />
              Deposit USDC
            </button>

            <button
              onClick={() => {
                if (!isLoggedIn) {
                  onRequireAuth();
                } else {
                  alert('Internal user-to-user transfers require a registered recipient username.');
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm font-medium text-zinc-200 hover:bg-white/10 transition"
            >
              <Send className="h-4 w-4 text-zinc-400" />
              Send USDC
            </button>
          </div>

          {/* Disabled Withdrawal Section per Blueprint Section 12 */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-zinc-200">Withdraw</span>
              </div>
              <button
                type="button"
                onClick={() => setShowWithdrawNotice(!showWithdrawNotice)}
                className="text-zinc-400 hover:text-amber-400 transition"
                title="View withdrawal status"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>

            <button
              disabled
              onClick={() => setShowWithdrawNotice(true)}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-xs font-medium text-zinc-500 cursor-not-allowed opacity-75"
            >
              Withdrawals Disabled
            </button>

            {/* Exact Compliance Message from Technical Blueprint Section 12 & 22 */}
            <div className="rounded-lg bg-black/40 border border-amber-500/30 p-3 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                We are still verifying your profile. Withdrawals will become available once this process is complete.
              </p>
            </div>
          </div>

          {/* Network Details */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Settlement Blockchain:</span>
              <span className="text-zinc-200 font-medium">Base {config?.network ? `(${config.network})` : 'Sepolia'}</span>
            </div>
            <div className="flex justify-between">
              <span>Base Chain ID:</span>
              <span className="text-zinc-200 font-mono">{config?.chainId || 84532}</span>
            </div>
            <div className="flex justify-between">
              <span>Token Contract:</span>
              <span className="text-purple-300 font-mono truncate max-w-[180px]">
                {config?.usdcContractAddress || '0x036C...CF7e'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 text-center">
          <p className="text-[11px] text-zinc-500">
            Protected by Mavora Accounting Engine. All transfers are committed atomically.
          </p>
        </div>
      </div>
    </div>
  );
}
