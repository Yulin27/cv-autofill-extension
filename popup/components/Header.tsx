import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 p-5 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">Auto-Fill Assistant</h1>
          <p className="text-xs text-slate-500 font-medium">Professional Form Filler</p>
        </div>
      </div>
    </header>
  );
};
