'use client';

import { useState } from 'react';
import { Language } from '@/lib/i18n';

export default function FileFormatTabs({
  id,
  sampleTab,
  promptTab,
  sampleContent,
  promptContent,
  lang,
}: {
  id: string;
  sampleTab: string;
  promptTab: string;
  sampleContent: React.ReactNode;
  promptContent: React.ReactNode;
  lang: Language;
}) {
  const [activeTab, setActiveTab] = useState<'sample' | 'prompt'>('sample');

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('sample')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'sample'
              ? 'border-violet-500 text-violet-600 dark:text-violet-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {sampleTab}
        </button>
        <button
          onClick={() => setActiveTab('prompt')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'prompt'
              ? 'border-violet-500 text-violet-600 dark:text-violet-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {promptTab}
        </button>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'sample' ? sampleContent : promptContent}
      </div>
    </div>
  );
}
