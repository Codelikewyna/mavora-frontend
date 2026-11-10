'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  X,
  ShieldCheck,
  Tag,
  DollarSign,
  Layers,
  FileCheck,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { WalletDrawer } from '@/components/WalletDrawer';
import { DepositModal } from '@/components/DepositModal';
import { TransferModal } from '@/components/TransferModal';
import { NotificationModal, NotificationType } from '@/components/NotificationModal';
import { createProductApi, uploadImageDirect, fetchWallet } from '@/lib/api';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-data';
import { User, Wallet, PublicConfig } from '@/lib/types';
import { fetchPublicConfig } from '@/lib/config';

export default function UploadPage() {
  const router = useRouter();

  // Auth & Wallet state
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [config, setConfig] = useState<PublicConfig | null>(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(FALLBACK_CATEGORIES[0]?.slug || '3d-digital-art');
  const [subcategory, setSubcategory] = useState('');
  const [priceUsdc, setPriceUsdc] = useState('');
  const [isNft, setIsNft] = useState(false);
  const [licenseType, setLicenseType] = useState<'personal' | 'commercial' | 'extended' | 'exclusive'>('commercial');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Creative', 'DigitalArt']);

  // File & Optimization State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileStats, setFileStats] = useState<{
    originalSize: string;
    optimizedSize?: string;
    dimensions?: string;
  } | null>(null);

  // Status
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  const [notification, setNotification] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: NotificationType;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    fetchPublicConfig().then(setConfig);

    const savedUser = localStorage.getItem('mavora_user');
    const savedToken = localStorage.getItem('mavora_token');
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        fetchWallet(savedToken).then(setWallet).catch(() => {});
      } catch {
        // ignore
      }
    }
  }, []);

  // Client-side image optimization helper
  const optimizeImage = async (file: File): Promise<{ dataUri: string; sizeKb: number; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 1200;
          const maxHeight = 1200;
          let { width, height } = img;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas context unavailable'));

          ctx.drawImage(img, 0, 0, width, height);
          const dataUri = canvas.toDataURL('image/jpeg', 0.82);
          const approxBytes = Math.round((dataUri.length * 3) / 4);
          resolve({
            dataUri,
            sizeKb: Math.round(approxBytes / 1024),
            width,
            height,
          });
        };
        img.onerror = () => reject(new Error('Failed to load image for processing'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('File exceeds 25MB limit. Please choose a smaller asset.');
      return;
    }

    setError(null);
    setImageFile(file);

    try {
      const { dataUri, sizeKb, width, height } = await optimizeImage(file);
      setImagePreview(dataUri);
      setFileStats({
        originalSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        optimizedSize: (sizeKb / 1024).toFixed(2) + ' MB',
        dimensions: `${width} × ${height}px`,
      });
    } catch {
      // Fallback preview
      setImagePreview(URL.createObjectURL(file));
      setFileStats({
        originalSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }
  };

  const handleAddTag = () => {
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !tags.includes(clean) && tags.length < 8) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token || !user) {
      setIsAuthOpen(true);
      return;
    }

    if (!imagePreview) {
      setError('Please upload an artwork image for your asset.');
      return;
    }

    const price = parseFloat(priceUsdc);
    if (isNaN(price) || price < 0.5) {
      setError('Please enter a valid price of at least 0.50 USDC.');
      return;
    }

    setUploading(true);
    setUploadProgress('Optimizing artwork and uploading to CDN...');

    try {
      let finalCoverUrl = imagePreview;

      // Attempt optimized upload to Cloudinary CDN via backend
      if (imagePreview.startsWith('data:image/')) {
        try {
          const uploadRes = await uploadImageDirect(token, imagePreview);
          if (uploadRes?.secureUrl) {
            finalCoverUrl = uploadRes.secureUrl;
          }
        } catch (uploadErr) {
          console.warn('Direct Cloudinary upload notice:', uploadErr);
          // Keep preview URL as resilient fallback
        }
      }

      setUploadProgress('Publishing creative asset to marketplace catalog...');

      const created = await createProductApi(token, {
        title,
        description,
        category,
        subcategory: subcategory || undefined,
        coverImageUrl: finalCoverUrl,
        priceUsdc: price,
        productType: isNft ? 'nft' : 'regular',
        isNft,
        licenseType,
        tags,
      });

      setPublishedSlug(created.slug || 'published');
    } catch (err: any) {
      let rawMsg = err?.message || 'Failed to publish asset. Please verify input.';
      if (rawMsg.includes('413') || rawMsg.toLowerCase().includes('entity too large')) {
        rawMsg = 'The image payload is too large for the network connection. We have auto-compressed your image, but please choose an asset under 10MB to complete upload.';
      }
      setError(rawMsg);
      setNotification({
        isOpen: true,
        title: 'Upload Notice',
        message: rawMsg,
        type: 'error',
      });
    } finally {
      setUploading(false);
    }
  };

  const calculatedPayout = () => {
    const val = parseFloat(priceUsdc);
    if (isNaN(val) || val <= 0) return '0.00';
    return (val * 0.95).toFixed(2);
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
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition">
            <ArrowLeft className="h-3.5 w-3.5" />
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-zinc-200">Creator Studio</span>
          <span>/</span>
          <span className="text-purple-400 font-medium">Upload Asset</span>
        </div>

        {/* Studio Heading */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Creator Studio
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-xs font-semibold text-purple-300">
                Asset Minting
              </span>
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Publish high-resolution digital artwork, 3D assets, and concept designs directly to Mavora.
            </p>
          </div>

          {!user && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>You must be signed in to publish assets.</span>
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="font-bold underline ml-1 hover:text-white"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {publishedSlug ? (
          <div className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-[#121622] p-8 text-center space-y-5 shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Asset Successfully Published!</h2>
              <p className="text-sm text-zinc-400 mt-2">
                Your creative work <strong className="text-white">“{title}”</strong> is now live in the Mavora catalog and ready for settlement.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-400 space-y-2 text-left">
              <div className="flex justify-between">
                <span>Listed Price:</span>
                <span className="text-white font-mono font-bold">${priceUsdc} USDC</span>
              </div>
              <div className="flex justify-between">
                <span>License:</span>
                <span className="text-zinc-200 capitalize">{licenseType}</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="text-purple-400">{isNft ? 'Base ERC-721 NFT' : 'Direct Creative Asset'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Link
                href="/"
                className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-500 py-3 text-sm font-semibold text-white transition shadow-lg shadow-purple-600/25"
              >
                View Marketplace
              </Link>
              <Link
                href="/profile"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-sm font-semibold text-zinc-300 transition"
              >
                Go to Profile
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Image Upload & Live Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#121622] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-purple-400" />
                    Artwork Asset
                  </h3>
                  <span className="text-[11px] text-zinc-400">Max 25MB · WebP/PNG/JPG</span>
                </div>

                {imagePreview ? (
                  <div className="space-y-3">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition text-xs font-semibold text-white"
                      >
                        Click to change image
                      </button>
                    </div>

                    {fileStats && (
                      <div className="rounded-xl border border-white/5 bg-black/30 p-3 text-xs text-zinc-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Original size:</span>
                          <span className="text-zinc-200 font-mono">{fileStats.originalSize}</span>
                        </div>
                        {fileStats.optimizedSize && (
                          <div className="flex justify-between">
                            <span>Optimized web payload:</span>
                            <span className="text-emerald-400 font-mono font-semibold">
                              {fileStats.optimizedSize} (ready)
                            </span>
                          </div>
                        )}
                        {fileStats.dimensions && (
                          <div className="flex justify-between">
                            <span>Canvas resolution:</span>
                            <span className="text-zinc-200 font-mono">{fileStats.dimensions}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/15 hover:border-purple-500/50 rounded-2xl p-8 text-center cursor-pointer bg-white/[0.02] hover:bg-purple-500/[0.03] transition flex flex-col items-center justify-center min-h-[260px] group"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <Upload className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-white">Click or drag image here</span>
                    <span className="text-xs text-zinc-400 mt-1 max-w-[240px]">
                      High-resolution artwork will be compressed and optimized for fast CDN delivery.
                    </span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Card Preview Simulation */}
              <div className="rounded-2xl border border-white/10 bg-[#121622]/60 p-5 space-y-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Marketplace Card Preview
                </span>
                <div className="rounded-2xl border border-white/10 bg-[#121622] overflow-hidden">
                  <div className="aspect-video w-full bg-black/40 overflow-hidden relative">
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePreview} alt="Card preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-zinc-600">
                        Asset preview will display here
                      </div>
                    )}
                    {isNft && (
                      <span className="absolute top-2 left-2 rounded-full border border-purple-500/40 bg-purple-950/80 px-2 py-0.5 text-[10px] font-bold text-purple-300">
                        NFT Asset
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400 capitalize">{category.replace('-', ' ')}</span>
                      <span className="text-emerald-400 font-mono font-bold">
                        ${priceUsdc ? parseFloat(priceUsdc).toFixed(2) : '0.00'} USDC
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white truncate">
                      {title || 'Untitled Creative Asset'}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      by @{user?.username || 'you'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Metadata & Pricing Form (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#121622] p-6 space-y-5">
                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Asset Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Celestial Core V"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the aesthetic, rendering techniques, resolution, and creative inspiration..."
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Category & Subcategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                    >
                      {FALLBACK_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug} className="bg-[#121622] text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Medium / Subcategory
                    </label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="e.g. 3D Render, Vector Art, Gouache"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                    />
                  </div>
                </div>

                {/* Price & Payout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Listing Price (USDC) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={priceUsdc}
                        onChange={(e) => setPriceUsdc(e.target.value)}
                        placeholder="25.00"
                        required
                        className="w-full rounded-xl border border-white/10 bg-black/40 pl-4 pr-16 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition font-mono"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-zinc-400">
                        USDC
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/20 p-3 flex flex-col justify-center">
                    <span className="text-[11px] text-zinc-400">Creator Earnings (after 5% platform fee):</span>
                    <span className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                      ${calculatedPayout()} USDC
                    </span>
                  </div>
                </div>

                {/* NFT Toggle & License */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Mint as Base NFT</span>
                      <span className="text-[11px] text-zinc-400">ERC-721 token on Base</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isNft}
                      onChange={(e) => setIsNft(e.target.checked)}
                      className="h-5 w-5 rounded border-white/20 text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Usage License
                    </label>
                    <select
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value as any)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition capitalize"
                    >
                      <option value="commercial" className="bg-[#121622]">Commercial Use</option>
                      <option value="personal" className="bg-[#121622]">Personal Use</option>
                      <option value="extended" className="bg-[#121622]">Extended License</option>
                      <option value="exclusive" className="bg-[#121622]">Exclusive Ownership</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tags (up to 8)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add a tag and press Enter"
                      className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-zinc-200 transition"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1 rounded-lg bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-xs text-purple-300"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-white transition"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={uploading || !imagePreview}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed py-3.5 text-sm font-bold text-white transition shadow-xl shadow-purple-600/30"
                  >
                    {uploading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>{uploadProgress || 'Processing...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Publish & List Asset</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
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
        }}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
}
