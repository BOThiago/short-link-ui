'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { formatDate, truncateUrl } from '@/utils/helpers';
import type { DailyStat, TopUrl } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface DailyChartProps {
  dailyStats: DailyStat[];
}

interface TopUrlsChartProps {
  topUrls: TopUrl[];
}

export function DailyChart({ dailyStats }: DailyChartProps) {
  const data = {
    labels: dailyStats.map((stat) => formatDate(stat.date)),
    datasets: [
      {
        label: 'Acessos por Dia',
        data: dailyStats.map((stat) => stat.accessCount),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
  );
}

export function TopUrlsChart({ topUrls }: TopUrlsChartProps) {
  if (topUrls.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-500">
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  const data = {
    labels: topUrls.map((item) => truncateUrl(item.url.originalUrl, 30)),
    datasets: [
      {
        label: 'Número de Acessos',
        data: topUrls.map((item) => item.totalAccesses),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#f5576c',
          '#4facfe',
          '#00f2fe',
          '#43e97b',
          '#38f9d7',
          '#ffecd2',
          '#fcb69f',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="h-96">
      <Bar data={data} options={options} />
    </div>
  );
}
