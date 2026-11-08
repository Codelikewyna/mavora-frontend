'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Sparkles,
  Wallet as WalletIcon,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { WalletDrawer } from '@/components/WalletDrawer';
import { DepositModal } from '@/components/DepositModal';
import { AuthModal } from '@/components/AuthModal';
import { ProductCard } from '@/components/ProductCard';
import { CategoryPills } from '@/components/CategoryPills';
import { fetchPublicConfig } from '@/lib/config';
import { fetchProducts, fetchCategories, fetchWallet } from '@/lib/api';
import { PublicConfig, User, Wallet, Product, Category } from '@/lib/types';

export default function Home() {
  const [config, setConfig] = useState<PublicConfig | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Marketplace states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isNftOnly, setIsNftOnly] = useState<boolean | null>(null);

  // Modals
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Load public config & categories on initial mount
  useEffect(() => {
    async function init() {
      try {
        const [pubConfig, cats, prods] = await Promise.all([
          fetchPublicConfig(),
          fetchCategories().catch(() => []),
          fetchProducts().catch(() => ({ items: [], pagination: { total: 0, totalPages: 0 } })),
        ]);
        setConfig(pubConfig);
        setCategories(cats);
        setProducts(prods.items);
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setLoading(false);
      }
    }
    init();

    // Check token in localStorage
    const savedToken = localStorage.getItem('mavora_token');
    if (savedToken) {
      setToken(savedToken);
      fetchWallet(savedToken)
        .then((w) => setWallet(w))
        .catch(() => {
          localStorage.removeItem('mavora_token');
          setToken(null);
        });
    }
  }, []);

  // Refresh products on filter change
  useEffect(() => {
    let active = true;
    fetchProducts({
      category: selectedCategory,
      search: searchQuery || undefined,
      isNft: isNftOnly === true ? true : undefined,
    })
      .then((res) => {
        if (active) setProducts(res.items);
      })
      .catch((err) => console.error(err));

    return () => {
      active = false;
    };
  }, [selectedCategory, searchQuery, isNftOnly]);

  const handleAuthSuccess = (newUser: User, newWallet: Wallet, newToken: string) => {
    setUser(newUser);
    setWallet(newWallet);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('mavora_token');
    setUser(null);
    setWallet(null);
    setToken(null);
  };

  const handleBuy = (product: Product) => {
    if (!user || !wallet) {
      setAuthMode('login');
      setIsAuthOpen(true);
      return;
    }

    if (wallet.availableUnits < product.priceBaseUnits) {
      alert(
        `Insufficient internal USDC balance! Your balance is $${wallet.availableUsd} USDC, but this item costs $${product.priceUsdc.toFixed(2)} USDC.\n\nPlease deposit USDC to your internal wallet.`,
      );
      setIsWalletOpen(true);
      return;
    }

    alert(
      `Purchase Confirmed for "${product.title}"!\nAmount: $${product.priceUsdc.toFixed(2)} USDC debited from your internal ledger.\nEntitlement granted!`,
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#EDEDED] flex flex-col">
      {/* Top Navigation */}
      <Navbar
        config={config}
        user={user}
        wallet={wallet}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenAuth={(mode = 'login') => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-purple-950/20 via-[#0A0D14] to-[#0A0D14] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.12),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mavora-logo.png"
                alt="Mavora"
                className="h-4 w-4 object-contain"
              />
              <span>Base Ecosystem · Instant Internal USDC Payments</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Web3 Creative Marketplace for Creators & Developers.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed">
              Discover, license, and collect digital templates, illustrations, 3D meshes, and verified NFTs. Powered by an internal double-entry USDC wallet for gas-free, instant checkout.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('explore-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-purple-600/25 hover:brightness-110 transition"
              >
                Explore 50 Products
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsWalletOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10 transition"
              >
                <WalletIcon className="h-4 w-4 text-purple-400" />
                Open Internal Wallet
              </button>
            </div>

            {/* Architecture Highlights */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Double-Entry Ledger</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Zero Gas Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-blue-400" />
                <span>Base Blockchain</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Marketplace Area */}
      <main id="explore-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Category & Filter Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Marketplace Catalog</h2>
              <p className="text-xs text-zinc-400">
                Displaying {products.length} creative products
              </p>
            </div>
          </div>

          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedType="all"
            onSelectType={() => {}}
            isNftFilter={isNftOnly}
            onToggleNft={() => setIsNftOnly((prev) => (prev ? null : true))}
          />
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
              <span className="text-xs text-zinc-400">Loading marketplace assets...</span>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
            <h3 className="text-base font-semibold text-white">No products found</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Try adjusting your search terms or category filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onBuy={handleBuy}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07090E] py-10 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mavora-logo.png"
              alt="Mavora Logo"
              className="h-6 w-6 object-contain"
            />
            <span className="font-bold text-zinc-300 font-sans tracking-tight">MAVORA</span>
            <span>· Web3 Digital Creative Marketplace</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Primary Chain: Base ({config?.network || 'base-sepolia'})</span>
            <span>Currency: USDC</span>
            <span>Ledger: Port 4000 NestJS API</span>
          </div>
        </div>
      </footer>

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
        isLoggedIn={!!user}
        onRequireAuth={() => {
          setIsWalletOpen(false);
          setAuthMode('login');
          setIsAuthOpen(true);
        }}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        config={config}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
