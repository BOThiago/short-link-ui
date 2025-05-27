'use client';

import { useState } from 'react';
import {
  FaMagic,
  FaSpinner,
  FaCheckCircle,
  FaCopy,
  FaExclamationTriangle,
  FaCut,
} from 'react-icons/fa';
import { formatDate, copyToClipboard } from '@/utils/helpers';
import { useUrls } from '@/hooks/useUrls';
import type { ShortenUrlResponse } from '@/types';

export default function ShortenForm() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<ShortenUrlResponse | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const { shortenUrl, loading, error, clearError } = useUrls();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setResult(null);

    if (!url.trim()) return;

    const response = await shortenUrl({ originalUrl: url.trim() });
    if (response) {
      setResult(response);
      setUrl('');
    }
  };

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaCut className="mr-3 text-indigo-600" />
        Encurtar Nova URL
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="originalUrl"
            className="block mb-2 font-medium text-gray-700"
          >
            URL Original:
          </label>
          <input
            type="url"
            id="originalUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemplo.com"
            className="input-field"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="btn-primary flex items-center justify-center w-full md:w-auto"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Encurtando...
            </>
          ) : (
            <>
              <FaMagic className="mr-2" />
              Encurtar URL
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="alert-error mt-4 flex items-center">
          <FaExclamationTriangle className="mr-2" />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="alert-success mb-4 flex items-center">
            <FaCheckCircle className="mr-2" />
            URL encurtada com sucesso!
          </div>

          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700 mb-2">
                  URL Original:
                </p>
                <p className="text-sm text-gray-600 break-all">
                  {result.originalUrl}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700 mb-2">
                  URL Encurtada:
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-lg font-semibold text-indigo-600 break-all">
                    {result.shortUrl}
                  </span>
                  <button
                    onClick={() => handleCopy(result.shortUrl)}
                    className={`btn-secondary flex items-center ${
                      copySuccess ? 'bg-green-600' : ''
                    }`}
                  >
                    <FaCopy className="mr-1" />
                    {copySuccess ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Expira em: {formatDate(result.expiresAt)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
