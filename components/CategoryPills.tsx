'use client';

import React from 'react';
import {
  Boxes,
  Palette,
  Layout,
  Gamepad2,
  Sparkles,
  Image,
  Layers,
} from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
  isNftFilter: boolean | null;
  onToggleNft: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  '3d-digital-art': <Boxes className="h-3.5 w-3.5" />,
  'fine-art': <Palette className="h-3.5 w-3.5" />,
  'ui-ux-templates': <Layout className="h-3.5 w-3.5" />,
  'game-assets': <Gamepad2 className="h-3.5 w-3.5" />,
  illustrations: <Sparkles className="h-3.5 w-3.5" />,
  'textures-graphics': <Image className="h-3.5 w-3.5" />,
};

export function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedType,
  onSelectType,
  isNftFilter,
  onToggleNft,
}: CategoryPillsProps) {
  return (
    <div className="flex flex-col gap-4 py-2 border-b border-white/5">
      {/* Top Filter Bar: Type & NFT toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            All Categories
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {CATEGORY_ICONS[cat.slug] || <Sparkles className="h-3.5 w-3.5" />}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* NFT Toggle Badge */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleNft}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
              isNftFilter === true
                ? 'border-purple-400 bg-purple-500/20 text-purple-200 shadow-md shadow-purple-500/20'
                : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            NFTs Only
          </button>
        </div>
      </div>
    </div>
  );
}
