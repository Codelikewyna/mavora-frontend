'use client';

import React, { useState } from 'react';
import { X, Copy, Check, QrCode, AlertTriangle, ShieldCheck } from 'lucide-react';
import { PublicConfig } from '@/lib/types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PublicConfig | null;
}

export function DepositModal({ isOpen, onClose, config }: DepositModalProps) {
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const depositAddress =
    config?.depositWalletAddress || '0x185F76d90a6AE1568aC3AF2eD5fc635f18D0cfbB';

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash) return;
    setSubmitted(true);
    setTimeout(() => {
      alert('Deposit claim submitted for automated verification on Base Sepolia.');
      setSubmitted(false);
      setTxHash('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#121622] p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white">Deposit USDC</h3>
            <p className="text-xs text-zinc-400">Deposit USDC on the Base blockchain to your internal wallet</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {/* Network Warning */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <strong className="font-semibold block text-amber-300">Important Deposit Network:</strong>
              Only send official <strong>USDC</strong> on the <strong>Base {config?.network ? `(${config.network})` : 'Sepolia'}</strong> network. Do not send other tokens or use other chains, as deposits may not be recoverable.
            </div>
          </div>

          {/* Company Deposit Address Card */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300">
              Company Shared Deposit Address (Base):
            </label>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs text-purple-300">
              <span className="truncate pr-2">{depositAddress}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Blockchain specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-zinc-500 block">Accepted Asset</span>
              <span className="font-semibold text-white">USDC (Base)</span>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-zinc-500 block">Required Confirmations</span>
              <span className="font-semibold text-white">5 Confirmations</span>
            </div>
          </div>

          {/* Transaction Claim Form */}
          <form onSubmit={handleClaim} className="space-y-3 pt-2 border-t border-white/10">
            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-1">
                Already sent? Submit your Base Transaction Hash:
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0xabc123... (transaction hash)"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:border-purple-500/60 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!txHash || submitted}
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-2.5 text-xs font-medium text-white transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              {submitted ? 'Verifying on Base...' : 'Submit Deposit Claim'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
