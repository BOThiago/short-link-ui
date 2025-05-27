import { useState, useCallback } from 'react';
import { api, ApiError } from '@/utils/api';
import type { Stats, PeakAccess } from '@/types';

interface UseReportsReturn {
  stats: Stats | null;
  peakAccess: PeakAccess | null;
  loading: boolean;
  error: string | null;
  loadReports: () => Promise<void>;
  clearError: () => void;
}

export function useReports(): UseReportsReturn {
  const [stats, setStats] = useState<Stats | null>(null);
  const [peakAccess, setPeakAccess] = useState<PeakAccess | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsResponse, peakResponse] = await Promise.allSettled([
        api.getStats(),
        api.getPeakAccess(),
      ]);

      if (statsResponse.status === 'fulfilled') {
        setStats(statsResponse.value);
      } else {
        console.error('Erro ao carregar estatísticas:', statsResponse.reason);
      }

      if (peakResponse.status === 'fulfilled') {
        setPeakAccess(peakResponse.value);
      } else {
        console.error('Erro ao carregar pico de acesso:', peakResponse.reason);
      }

      if (
        statsResponse.status === 'rejected' &&
        peakResponse.status === 'rejected'
      ) {
        setError('Erro ao carregar relatórios');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Erro ao carregar relatórios');
      }
      console.error('Erro ao carregar relatórios:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    peakAccess,
    loading,
    error,
    loadReports,
    clearError,
  };
}
