'use client';

import { useEffect, useState } from 'react';
import {
  FaList,
  FaSync,
  FaSpinner,
  FaCopy,
  FaExternalLinkAlt,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { formatDate, copyToClipboard } from '@/utils/helpers';
import { useUrls } from '@/hooks/useUrls';

export default function UrlsList() {
  const { urls, loading, error, loadUrls } = useUrls();
  const [copyStates, setCopyStates] = useState<Record<number, boolean>>({});

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  const handleCopy = async (url: string, id: number) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopyStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    }
  };

  const handleTest = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading && urls.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-2xl text-indigo-600 mr-3" />
          <span className="text-lg">Carregando URLs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FaList className="mr-3 text-indigo-600" />
          URLs Cadastradas
        </h2>
        <button
          onClick={loadUrls}
          disabled={loading}
          className="btn-primary flex items-center"
        >
          <FaSync className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar Lista
        </button>
      </div>

      {error && (
        <div className="alert-error mb-4 flex items-center">
          <FaExclamationTriangle className="mr-2" />
          {error}
        </div>
      )}

      {urls.length === 0 && !loading ? (
        <div className="text-center py-12 text-gray-500">
          <FaList className="text-4xl mx-auto mb-4 opacity-50" />
          <p className="text-lg">Nenhuma URL encontrada</p>
          <p className="text-sm">
            Crie sua primeira URL encurtada na aba &ldquo;Encurtar URL&rdquo;
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-semibold text-gray-700 border-b">
                  URL Original
                </th>
                <th className="p-3 text-left font-semibold text-gray-700 border-b">
                  URL Encurtada
                </th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">
                  Acessos
                </th>
                <th className="p-3 text-left font-semibold text-gray-700 border-b">
                  Expira em
                </th>
                <th className="p-3 text-left font-semibold text-gray-700 border-b">
                  Criada em
                </th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-b max-w-xs">
                    <div className="truncate" title={url.originalUrl}>
                      {url.originalUrl}
                    </div>
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-indigo-600 font-medium truncate max-w-xs"
                        title={url.shortUrl}
                      >
                        {url.shortUrl}
                      </span>
                      <button
                        onClick={() => handleCopy(url.shortUrl, url.id)}
                        className={`btn-secondary flex items-center text-xs ${
                          copyStates[url.id] ? 'bg-green-600' : ''
                        }`}
                      >
                        <FaCopy className="mr-1" />
                        {copyStates[url.id] ? 'OK' : ''}
                      </button>
                    </div>
                  </td>
                  <td className="p-3 border-b text-center">
                    <span className="font-bold text-lg">{url.accessCount}</span>
                  </td>
                  <td className="p-3 border-b text-sm text-gray-600">
                    {formatDate(url.expiresAt)}
                  </td>
                  <td className="p-3 border-b text-sm text-gray-600">
                    {formatDate(url.createdAt)}
                  </td>
                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleTest(url.shortUrl)}
                      className="btn-secondary flex items-center mx-auto"
                    >
                      <FaExternalLinkAlt className="mr-1" />
                      Testar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
