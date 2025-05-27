import { useState, useCallback } from 'react';
import { api, ApiError } from '@/utils/api';
import type { Url, ShortenUrlRequest, ShortenUrlResponse } from '@/types';

interface UseUrlsReturn {
  urls: Url[];
  loading: boolean;
  error: string | null;
  loadUrls: () => Promise<void>;
  shortenUrl: (data: ShortenUrlRequest) => Promise<ShortenUrlResponse | null>;
  clearError: () => void;
}

export function useUrls(): UseUrlsReturn {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadUrls = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getUrls();
      setUrls(response.data || []);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Erro ao carregar URLs');
      }
      console.error('Erro ao carregar URLs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const shortenUrl = useCallback(
    async (data: ShortenUrlRequest): Promise<ShortenUrlResponse | null> => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.shortenUrl(data);
        await loadUrls();
        return response;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Erro ao encurtar URL');
        }
        console.error('Erro ao encurtar URL:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [loadUrls],
  );

  return {
    urls,
    loading,
    error,
    loadUrls,
    shortenUrl,
    clearError,
  };
}
