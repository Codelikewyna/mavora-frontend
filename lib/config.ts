import { PublicConfig } from './types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://mavora-backend.onrender.com/api/v1';

export const DEFAULT_PUBLIC_CONFIG: PublicConfig = {
  appName: 'Mavora',
  network: 'base-sepolia',
  chainId: 84532,
  rpcUrl:
    process.env.NEXT_PUBLIC_BASE_RPC_URL ||
    'https://base-sepolia.g.alchemy.com/v2/alch_rwlIrTb7jECwDT8lEqRK5',
  usdcContractAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  depositWalletAddress: '0x185F76d90a6AE1568aC3AF2eD5fc635f18D0cfbB',
  paymentAsset: 'USDC',
  currencyDecimals: 6,
  marketplaceFeePercent: 5,
  apiUrl: API_BASE_URL,
  contracts: {},
};

export async function fetchPublicConfig(): Promise<PublicConfig> {
  try {
    const res = await fetch(`${API_BASE_URL}/config/public`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch public config: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Using fallback public configuration:', err);
    return DEFAULT_PUBLIC_CONFIG;
  }
}
