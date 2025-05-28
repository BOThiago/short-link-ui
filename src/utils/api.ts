import type {
  UrlResponse,
  ShortenUrlRequest,
  ShortenUrlResponse,
  Stats,
  PeakAccess,
} from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: 'Erro desconhecido' }));
    throw new ApiError(
      response.status,
      errorData.message || 'Erro na requisição',
    );
  }

  return response.json();
}

export const api = {
  getUrls: (): Promise<UrlResponse> => fetchApi('/url'),

  shortenUrl: (data: ShortenUrlRequest): Promise<ShortenUrlResponse> =>
    fetchApi('/url', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getStats: (): Promise<Stats> => fetchApi('/reports/stats'),

  getPeakAccess: (): Promise<PeakAccess> => fetchApi('/reports/peak-access'),
};

export { ApiError };
