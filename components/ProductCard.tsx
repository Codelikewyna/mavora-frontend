'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onBuy?: (product: Product) => void;
}

export function ProductCard({ product, onBuy }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(product.likesCount || 0);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikes((prev) => Math.max(0, prev - 1));
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  // Ensure safe URL encoding for paths with spaces like "/market-place images/..."
  const safeImageUrl = encodeURI(product.coverImageUrl);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121622]/60 hover:bg-[#121622] transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/40">
        <Image
          src={safeImageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isNft && (
            <span className="flex items-center gap-1 rounded-full border border-purple-400/40 bg-purple-950/80 px-2.5 py-0.5 text-[11px] font-semibold text-purple-300 shadow backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-purple-400" />
              NFT Asset
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          type="button"
          onClick={toggleLike}
          className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur-md transition ${
            liked
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-black/50 text-white/70 hover:bg-black/70 hover:text-white'
          }`}
          title="Favorite"
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3">
          <span className="rounded-lg bg-black/75 px-2 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-md border border-white/10">
            {product.licenseType.toUpperCase()} LICENSE
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Creator Info */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
            <span className="font-medium text-zinc-300 truncate">@{product.creatorUsername}</span>
          </div>
          <span className="text-[11px] text-zinc-500">{likes} likes</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Footer: Price & Purchase */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <div>
            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider font-semibold">
              Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-white font-mono">
                ${product.priceUsdc.toFixed(2)}
              </span>
              <span className="text-[11px] font-semibold text-purple-400">USDC</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBuy?.(product)}
            className="rounded-xl bg-purple-600/20 border border-purple-500/40 px-3.5 py-1.5 text-xs font-medium text-purple-200 transition hover:bg-purple-600 hover:text-white hover:border-transparent shadow-sm"
          >
            Buy Product
          </button>
        </div>
      </div>
    </div>
  );
}
