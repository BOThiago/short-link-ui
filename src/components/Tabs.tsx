'use client';

import { FaCut, FaList, FaChartBar } from 'react-icons/fa';
import type { TabType } from '@/types';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'shorten' as TabType, label: 'Encurtar URL', icon: FaCut },
  { id: 'list' as TabType, label: 'Listagem', icon: FaList },
  { id: 'reports' as TabType, label: 'Relatórios', icon: FaChartBar },
];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            <Icon className="inline mr-2" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
