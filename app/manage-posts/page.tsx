'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Layers,
  Search,
  Trash2,
  ExternalLink,
  Plus,
  Heart,
  Sparkles,
  ShieldCheck,
  Tag,
  DollarSign,
  Calendar,
  AlertCircle,
  Clock,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { WalletDrawer } from '@/components/WalletDrawer';
import { DepositModal } from '@/components/DepositModal';
import { TransferModal } from '@/components/TransferModal';
import { NotificationModal, NotificationType } from '@/components/NotificationModal';
import { fetchWallet, fetchMyCreations, deleteProductApi, fetchCreatorProducts } from '@/lib/api';
import { fetchPublicConfig } from '@/lib/config';
import { User, Wallet, Product, PublicConfig } from '@/lib/types';
import { FALLBACK_PRODUCTS } from '@/lib/fallback-data';

export default function ManagePostsPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [config, setConfig] = useState<PublicConfig | null>(null);

  const [posts, setPosts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // Notification Modal
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: NotificationType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    fetchPublicConfig().then(setConfig);

    const savedToken = localStorage.getItem('mavora_token');
    const savedUser = localStorage.getItem('mavora_user');

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          loadPosts(savedToken, parsed.username);
        } catch {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
      fetchWallet(savedToken).then(setWallet).catch(() => {});
    } else {
      setLoading(false);
    }
  }, []);

  const loadPosts = async (authToken: string, username: string) => {
    setLoading(true);
    try {
      // 1. Fetch personal creations from backend
      const res = await fetchMyCreations(authToken).catch(() => []);
      if (res && res.length > 0) {
        setPosts(res);
      } else {
        // 2. Fetch by creator username or filter fallback
        const creatorPosts = await fetchCreatorProducts(username).catch(() => []);
        if (creatorPosts && creatorPosts.length > 0) {
          setPosts(creatorPosts);
        } else {
          const matched = FALLBACK_PRODUCTS.filter(
            (p) => p.creatorUsername?.toLowerCase() === username.toLowerCase(),
          );
          setPosts(matched.length > 0 ? matched : FALLBACK_PRODUCTS.slice(0, 4));
        }
      }
    } catch (err) {
      console.warn('Load posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase().trim();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  }, [posts, searchQuery]);

  const confirmDelete = (post: Product) => {
    setNotification({
      isOpen: true,
      title: 'Delete Creative Post?',
      message: `Are you sure you want to permanently delete "${post.title}"?\n\nThis will remove the listing and license availability from the marketplace. This action cannot be undone.`,
      type: 'confirm',
      confirmText: 'Delete Asset',
      cancelText: 'Keep Asset',
      onConfirm: async () => {
        if (!token) return;
        setDeletingId(post._id);
        try {
          await deleteProductApi(token, post._id);
          setPosts((prev) => prev.filter((p) => p._id !== post._id));
          setNotification({
            isOpen: true,
            title: 'Asset Deleted',
            message: `"${post.title}" has been permanently removed from your catalog.`,
            type: 'success',
          });
        } catch (err: any) {
          setNotification({
            isOpen: true,
            title: 'Deletion Notice',
            message: err?.message || 'Failed to remove asset from database.',
            type: 'error',
          });
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  // Metrics
  const totalValueUsdc = posts.reduce((sum, p) => sum + (p.priceUsdc || 0), 0);
  const totalLikes = posts.reduce((sum, p) => sum + (p.likesCount || 0), 0);

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
          <span className="text-white font-medium">Manage Posts</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Manage Creative Posts
                </h1>
                <p className="text-xs text-zinc-400">
                  Inspect full asset specifications, edit pricing, and delete listings
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow hover:brightness-110 transition"
            >
              <Plus className="h-4 w-4" />
              Upload New Asset
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Total Posts</span>
            <div className="mt-1 text-2xl font-bold text-white font-mono">{posts.length}</div>
            <span className="text-[11px] text-zinc-500">In creator portfolio</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Catalog Value</span>
            <div className="mt-1 text-2xl font-bold text-white font-mono">${totalValueUsdc.toFixed(2)}</div>
            <span className="text-[11px] text-purple-400 font-medium">USDC Liquidity</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Community Likes</span>
            <div className="mt-1 text-2xl font-bold text-white font-mono">{totalLikes}</div>
            <span className="text-[11px] text-zinc-500">Creator reputation</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#121622]/80 p-5">
            <span className="text-xs text-zinc-400">Platform Royalties</span>
            <div className="mt-1 text-2xl font-bold text-emerald-400 font-mono">95%</div>
            <span className="text-[11px] text-zinc-500">Paid instantly in USDC</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your posts by title, tag, or category..."
              className="w-full rounded-xl border border-white/10 bg-[#121622] pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-purple-500/60 focus:outline-none shadow-sm"
            />
          </div>

          <span className="text-xs text-zinc-400 self-start sm:self-center">
            Showing <strong className="text-white">{filteredPosts.length}</strong> of {posts.length} creations
          </span>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
              <span className="text-xs text-zinc-400">Loading your creative catalog...</span>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-[#121622]/30 space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-zinc-400">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No creations found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {searchQuery
                ? `No posts matched "${searchQuery}". Try a different keyword.`
                : 'You have not uploaded any creative assets yet. Publish your first asset to start earning USDC.'}
            </p>
            <div className="pt-2">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-semibold text-white transition"
              >
                <Plus className="h-4 w-4" />
                Upload Artwork Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="rounded-2xl border border-white/10 bg-[#121622] p-5 shadow-lg hover:border-purple-500/30 transition flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
              >
                {/* Artwork & Metadata */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <Image
                      src={encodeURI(post.coverImageUrl)}
                      alt={post.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/20">
                        {post.category?.toUpperCase()}
                      </span>
                      {post.isNft && (
                        <span className="flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-500/20">
                          <Sparkles className="h-2.5 w-2.5" />
                          Base NFT
                        </span>
                      )}
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400 border border-white/10">
                        {post.licenseType?.toUpperCase()} LICENSE
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white truncate">{post.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                      {post.description}
                    </p>

                    {/* Meta info tags */}
                    <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        slug: <code className="text-zinc-300 font-mono">{post.slug}</code>
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-rose-400" />
                        {post.likesCount || 0} favorites
                      </span>
                      {post.createdAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block text-right font-semibold">
                      Listing Price
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-white font-mono">
                        ${post.priceUsdc.toFixed(2)}
                      </span>
                      <span className="text-xs font-semibold text-purple-400">USDC</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/?search=${encodeURIComponent(post.title)}`}
                      className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                      View
                    </Link>

                    <button
                      type="button"
                      disabled={deletingId === post._id}
                      onClick={() => confirmDelete(post)}
                      className="flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500 hover:text-white px-3 py-1.5 text-xs font-semibold text-rose-300 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {deletingId === post._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

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
        onSuccess={(updated) => setWallet(updated)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u, w, t) => {
          setUser(u);
          setWallet(w);
          setToken(t);
          loadPosts(t, u.username);
        }}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        confirmText={notification.confirmText}
        cancelText={notification.cancelText}
        onConfirm={notification.onConfirm}
      />
    </div>
  );
}
