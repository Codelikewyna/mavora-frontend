export interface PublicConfig {
  appName: string;
  network: string;
  chainId: number;
  rpcUrl: string;
  usdcContractAddress: string;
  depositWalletAddress: string;
  paymentAsset: string;
  currencyDecimals: number;
  marketplaceFeePercent: number;
  apiUrl: string;
  contracts: {
    digitalAsset?: string;
    nftMarketplace?: string;
  };
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Wallet {
  id: string;
  userId: string;
  currency: string;
  availableUnits: number;
  pendingUnits: number;
  availableUsd: string;
  pendingUsd: string;
  status: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  subcategory: string;
  coverImageUrl: string;
  previewImages: string[];
  priceUsdc: number;
  priceBaseUnits: number;
  productType: 'regular' | 'nft';
  isNft: boolean;
  isDemo: boolean;
  status: string;
  licenseType: string;
  creatorName: string;
  creatorUsername: string;
  creatorAvatar?: string;
  likesCount: number;
  salesCount: number;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}
