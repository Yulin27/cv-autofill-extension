import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, Check, Loader2 } from 'lucide-react';
import { MAX_PDF_SIZE_MB } from '../constants';

interface Props {
  onUpload: (file: File) => Promise<void>;
  isLoading: boolean;
  hasExistingData: boolean;
  onClearData: () => void;
}

export const CVUpload: React.FC<Props> = ({ onUpload, isLoading, hasExistingData, onClearData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    if (file.size > MAX_PDF_SIZE_MB * 1024 * 1024) {
      alert(`File size exceeds ${MAX_PDF_SIZE_MB}MB.`);
      return;
    }
    onUpload(file);
  };

  if (hasExistingData) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-full">
            <Check className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-emerald-800">CV Loaded</h3>
            <p className="text-xs text-emerald-600">Ready to auto-fill forms</p>
          </div>
        </div>
        <button 
          onClick={onClearData}
          className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
          title="Clear Data"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !isLoading && fileInputRef.current?.click()}
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
        ${isLoading ? 'bg-slate-50 border-slate-300 cursor-wait' : ''}
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50 scale-[1.02] shadow-md' 
          : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf"
        className="hidden"
        disabled={isLoading}
      />
      
      <div className="flex flex-col items-center space-y-3">
        {isLoading ? (
          <div className="animate-spin text-indigo-600">
            <Loader2 className="w-10 h-10" />
          </div>
        ) : (
          <div className={`p-3 rounded-full ${isDragging ? 'bg-indigo-200' : 'bg-slate-100'}`}>
            <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-indigo-600' : 'text-slate-500'}`} />
          </div>
        )}
        
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-700">
            {isLoading ? 'Analyzing Resume...' : 'Upload your CV'}
          </h3>
          <p className="text-xs text-slate-500 max-w-[200px] mx-auto">
            {isLoading ? 'Extracting experience and skills' : 'Drag & drop or click to browse (PDF only)'}
          </p>
        </div>
      </div>
    </div>
  );
};
