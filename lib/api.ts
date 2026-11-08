import { API_BASE_URL } from './config';
import { Product, Category, User, Wallet } from './types';
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
