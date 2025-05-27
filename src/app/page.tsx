'use client';

import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import type { TabType } from '@/types';
import Tabs from '@/components/Tabs';
import ShortenForm from '@/components/ShortenForm';
import UrlsList from '@/components/UrlsList';
import Reports from '@/components/Reports';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('shorten');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'shorten':
        return <ShortenForm />;
      case 'list':
        return <UrlsList />;
      case 'reports':
        return <Reports />;
      default:
        return <ShortenForm />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center text-white mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg flex items-center justify-center">
            <FaLink className="mr-4" />
            Short Link
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Encurtador de URLs profissional com análise de dados
          </p>
        </div>

        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
}
