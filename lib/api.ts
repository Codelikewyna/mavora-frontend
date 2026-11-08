import { API_BASE_URL } from './config';
import { Product, Category, User, Wallet, WalletTransaction } from './types';
import { FALLBACK_CATEGORIES, getFilteredFallbackProducts } from './fallback-data';

export async function fetchProducts(params: {
  category?: string;
  search?: string;
  productType?: string;
  isNft?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{ items: Product[]; pagination: { total: number; totalPages: number } }> {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.productType && params.productType !== 'all') query.set('productType', params.productType);
    if (params.isNft !== undefined) query.set('isNft', String(params.isNft));
    if (params.sort) query.set('sort', params.sort);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch products`);
    const data = await res.json();
    if (data && Array.isArray(data.items) && data.items.length > 0) {
      return data;
    }
    // If backend returned empty database, provide the catalog
    return getFilteredFallbackProducts(params);
  } catch (err) {
    console.warn('API fetchProducts failed, falling back to local catalog:', err);
    return getFilteredFallbackProducts(params);
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch categories`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_CATEGORIES;
  } catch (err) {
    console.warn('API fetchCategories failed, falling back to local categories:', err);
    return FALLBACK_CATEGORIES;
  }
}

export async function registerApi(data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Registration failed');
  }
  return json;
}

export async function loginApi(data: {
  identifier: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Login failed');
  }
  return json;
}

export async function fetchWallet(token: string): Promise<Wallet> {
  const res = await fetch(`${API_BASE_URL}/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch wallet');
  return res.json();
}

export async function transferFundsApi(
  token: string,
  data: {
    recipientUsername: string;
    amountUsdc: number;
    password: string;
  },
) {
  const res = await fetch(`${API_BASE_URL}/wallet/transfer`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Transfer authorization failed');
  }
  return json;
}

export async function fetchTransactions(token: string): Promise<WalletTransaction[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/wallet/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch transactions:', err);
    return [];
  }
}

export async function createProductApi(
  token: string,
  data: {
    title: string;
    description: string;
    category: string;
    subcategory?: string;
    coverImageUrl: string;
    priceUsdc: number;
    productType?: 'regular' | 'nft';
    isNft?: boolean;
    licenseType?: 'personal' | 'commercial' | 'extended' | 'exclusive';
    tags?: string[];
  },
) {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to publish asset');
  }
  return json;
}

export async function fetchCreatorProducts(username: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products/creator/${encodeURIComponent(username)}`,
      { cache: 'no-store' },
    );
    if (!res.ok) throw new Error('Failed to fetch creator products');
    return await res.json();
  } catch {
    return [];
  }
}

export async function uploadImageDirect(token: string, dataUri: string) {
  const res = await fetch(`${API_BASE_URL}/uploads/direct`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dataUri }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Image upload failed');
  }
  return json;
}

export async function fetchUserProfile(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch user profile');
  }
  return json;
}
