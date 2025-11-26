import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Cpu } from 'lucide-react';
import { PROVIDERS } from '../constants';
import { AppConfig, LLMProvider } from '../types';

interface Props {
  config: AppConfig;
  onSave: (newConfig: AppConfig) => void;
}

export const ProviderConfig: React.FC<Props> = ({ config, onSave }) => {
  const [localConfig, setLocalConfig] = useState<AppConfig>(config);
  const [showKey, setShowKey] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalConfig(prev => ({ ...prev, selectedProvider: e.target.value as LLMProvider }));
    setIsDirty(true);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalConfig(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(localConfig);
    setIsDirty(false);
  };

  // Determine which key field to show based on selection
  const getCurrentKeyField = () => {
    switch (localConfig.selectedProvider) {
      case 'anthropic': return { name: 'apiKeyAnthropic', placeholder: 'sk-ant-...' };
      case 'groq': return { name: 'apiKeyGroq', placeholder: 'gsk_...' };
      default: return { name: 'apiKeyOpenAI', placeholder: 'sk-...' };
    }
  };

  const currentKeyField = getCurrentKeyField();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <Cpu className="w-4 h-4 text-indigo-600" />
        <h2 className="text-sm font-semibold text-slate-700">Intelligence Provider</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Provider Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Select AI Model</label>
          <div className="relative">
            <select
              value={localConfig.selectedProvider}
              onChange={handleProviderChange}
              className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow appearance-none"
            >
              {PROVIDERS.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
            {PROVIDERS.find(p => p.value === localConfig.selectedProvider)?.label.split(' ')[0]} API Key
          </label>
          <div className="relative group">
            <input
              type={showKey ? 'text' : 'password'}
              name={currentKeyField.name}
              value={localConfig[currentKeyField.name as keyof AppConfig] || ''}
              onChange={handleKeyChange}
              placeholder={currentKeyField.placeholder}
              className="w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            Keys are stored locally on your device.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!isDirty}
          className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            isDirty
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
};
