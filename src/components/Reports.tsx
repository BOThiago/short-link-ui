'use client';

import { useEffect } from 'react';
import {
  FaChartLine,
  FaTrophy,
  FaSpinner,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { formatDate } from '@/utils/helpers';
import { useReports } from '@/hooks/useReports';
import { DailyChart, TopUrlsChart } from './Charts';

export default function Reports() {
  const { stats, peakAccess, loading, error, loadReports } = useReports();

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  if (loading && !stats) {
    return (
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="animate-spin text-2xl text-indigo-600 mr-3" />
            <span className="text-lg">Carregando relatórios...</span>
          </div>
        </div>
      </div>
    );
  }

  const totalUrls = stats?.topUrls.length || 0;
  const totalAccesses =
    stats?.dailyStats.reduce((sum, day) => sum + day.accessCount, 0) || 0;

  return (
    <div className="space-y-6">
      {error && (
        <div className="alert-error flex items-center">
          <FaExclamationTriangle className="mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="text-4xl font-bold mb-2">{totalUrls}</h3>
          <p className="text-lg opacity-90">URLs Criadas</p>
        </div>
        <div className="stat-card">
          <h3 className="text-4xl font-bold mb-2">{totalAccesses}</h3>
          <p className="text-lg opacity-90">Total de Acessos</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-bold mb-2">
            {peakAccess ? formatDate(peakAccess.date) : '-'}
          </h3>
          <p className="text-lg opacity-90">Dia de Pico</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaChartLine className="mr-3 text-indigo-600" />
          Acessos por Dia (Últimos 30 dias)
        </h2>
        {stats?.dailyStats ? (
          <DailyChart dailyStats={stats.dailyStats} />
        ) : (
          <div className="h-96 flex items-center justify-center text-gray-500">
            <p>Nenhum dado disponível</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaTrophy className="mr-3 text-indigo-600" />
          URLs Mais Acessadas
        </h2>
        {stats?.topUrls ? (
          <TopUrlsChart topUrls={stats.topUrls} />
        ) : (
          <div className="h-96 flex items-center justify-center text-gray-500">
            <p>Nenhum dado disponível</p>
          </div>
        )}
      </div>
    </div>
  );
}
