'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Wallet as WalletIcon,
  Search,
  User as UserIcon,
  LogOut,
  Sparkles,
  Plus,
  Menu,
  X,
  Compass,
  Layers,
  Clock,
} from 'lucide-react';
import { PublicConfig, User, Wallet } from '@/lib/types';

interface NavbarProps {
  config: PublicConfig | null;
  user: User | null;
  wallet: Wallet | null;
  onOpenWallet: () => void;
  onOpenAuth: (initialMode?: 'login' | 'register') => void;
  onLogout?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export function Navbar({
  config,
  user,
  wallet,
  onOpenWallet,
  onOpenAuth,
  onLogout,
  searchQuery = '',
  onSearchChange,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultLogout = () => {
    localStorage.removeItem('mavora_token');
    localStorage.removeItem('mavora_user');
    window.location.reload();
  };

  const handleLogout = onLogout || defaultLogout;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0D14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3 sm:gap-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 p-1 border border-purple-500/20 shadow-lg shadow-purple-500/10 group-hover:border-purple-500/40 transition">
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
              <span className="rounded bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-purple-400 border border-purple-500/30 hidden xs:inline-block">
                MARKETPLACE
              </span>
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{config?.network ? `Base ${config.network.includes('sepolia') ? 'Sepolia' : 'Mainnet'}` : 'Base Network'}</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              pathname === '/'
                ? 'text-white bg-white/10'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Explore
          </Link>

          <Link
            href="/upload"
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              pathname === '/upload'
                ? 'text-purple-300 bg-purple-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Plus className="h-3.5 w-3.5 text-purple-400" />
            Upload Asset
          </Link>

          {user && (
            <>
              <Link
                href="/manage-posts"
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  pathname === '/manage-posts'
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Manage Posts
              </Link>

              <Link
                href="/transactions"
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  pathname === '/transactions'
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                Transactions
              </Link>

              <Link
                href="/profile"
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  pathname === '/profile'
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserIcon className="h-3.5 w-3.5" />
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Search Bar (Desktop) */}
        {onSearchChange && (
          <div className="hidden md:flex flex-1 max-w-xs xl:max-w-md items-center">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search assets, creators, tags..."
                className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pl-9 pr-4 text-xs text-white placeholder-zinc-500 transition-colors focus:border-purple-500/60 focus:bg-white/10 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Create Shortcut for Mobile / Tablet */}
          <Link
            href="/upload"
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30"
            title="Upload Asset"
          >
            <Plus className="h-4 w-4" />
          </Link>

          {/* Internal Wallet Button */}
          <button
            onClick={onOpenWallet}
            className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-purple-500/20 hover:border-purple-500/50"
          >
            <WalletIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
            <span className="hidden md:inline text-zinc-300">Wallet:</span>
            <span className="font-semibold text-purple-300">
              ${wallet ? wallet.availableUsd : '0.00'}
            </span>
            <span className="text-[10px] sm:text-[11px] text-purple-400/80 font-mono">USDC</span>
          </button>

          {/* User / Auth State */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs text-zinc-200 transition"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium hidden md:inline">@{user.username}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-purple-600/25 transition hover:bg-purple-500"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d111a] px-4 py-4 space-y-3">
          {onSearchChange && (
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search catalog..."
                className="w-full rounded-xl border border-white/10 bg-black/40 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-zinc-200"
            >
              <Compass className="h-3.5 w-3.5" />
              Explore
            </Link>

            <Link
              href="/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 py-2.5 text-purple-300"
            >
              <Plus className="h-3.5 w-3.5" />
              Upload Asset
            </Link>

            {user && (
              <>
                <Link
                  href="/manage-posts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-zinc-200"
                >
                  <Layers className="h-3.5 w-3.5" />
                  Manage Posts
                </Link>

                <Link
                  href="/transactions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-zinc-200"
                >
                  <Clock className="h-3.5 w-3.5" />
                  Transactions
                </Link>
              </>
            )}
          </div>

          {user ? (
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold text-white"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span>@{user.username} (View Profile)</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-xs text-rose-400 font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="rounded-xl border border-white/10 py-2 text-xs font-semibold text-zinc-300"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="rounded-xl bg-purple-600 py-2 text-xs font-semibold text-white"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
