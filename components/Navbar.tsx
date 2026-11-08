'use client';

import React from 'react';
import {
  Wallet as WalletIcon,
  Search,
  User as UserIcon,
  LogOut,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { PublicConfig, User, Wallet } from '@/lib/types';

interface NavbarProps {
  config: PublicConfig | null;
  user: User | null;
  wallet: Wallet | null;
  onOpenWallet: () => void;
  onOpenAuth: (initialMode?: 'login' | 'register') => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({
  config,
  user,
  wallet,
  onOpenWallet,
  onOpenAuth,
  onLogout,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0D14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 p-1 border border-purple-500/20 shadow-lg shadow-purple-500/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mavora-logo.png"
              alt="Mavora Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
              MAVORA
              <span className="rounded bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-purple-400 border border-purple-500/30">
                MARKETPLACE
              </span>
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{config?.network ? `Base ${config.network.includes('sepolia') ? 'Sepolia' : 'Mainnet'}` : 'Base Network'}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md items-center">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search digital assets, NFTs, creators, tags..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 transition-colors focus:border-purple-500/60 focus:bg-white/10 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Internal Wallet Button */}
          <button
            onClick={onOpenWallet}
            className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-purple-500/20 hover:border-purple-500/50"
          >
            <WalletIcon className="h-4 w-4 text-purple-400" />
            <span className="hidden sm:inline text-zinc-300">Wallet:</span>
            <span className="font-semibold text-purple-300">
              ${wallet ? wallet.availableUsd : '0.00'}
            </span>
            <span className="text-[11px] text-purple-400/80 font-mono">USDC</span>
          </button>

          {/* User / Auth State */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium hidden sm:inline">@{user.username}</span>
                {user.role === 'creator' && (
                  <span className="text-[10px] text-amber-300 bg-amber-500/20 px-1 rounded">Creator</span>
                )}
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="rounded-xl border border-white/10 px-3.5 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-600/25 transition hover:brightness-110"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
