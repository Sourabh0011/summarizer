// components/AudioSummary.tsx
"use client";

import React, { useState } from 'react';
import { UploadCloud, Headphones, FileText } from 'lucide-react';

// --- Interface for Props ---
interface AudioSummaryProps {
  // onSummarize: (file: File) => void;
}

// --- Component: AudioSummary Input ---
const AudioSummary: React.FC<AudioSummaryProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      console.log('File selected:', files[0].name);
    }
  };

  const handleSummarize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an audio file to summarize.');
      return;
    }
    
    setIsLoading(true);
    console.log('Starting summarization for:', selectedFile.name);
    
    // Simulating API call delay for processing
    setTimeout(() => {
        setIsLoading(false);
        // In a real app, send the selectedFile to the backend API
        alert(`Summarization process started for: ${selectedFile.name}`);
        setSelectedFile(null); // Clear file after submission (optional)
    }, 2500);
  };

  const buttonText = isLoading 
    ? 'Processing Audio...' 
    : (selectedFile ? `Summarize ${selectedFile.name}` : 'Summarize Audio');

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Headphones className="mr-3 text-purple-600" size={28} />
        General Audio Summarizer
      </h1>
      
      <form onSubmit={handleSummarize}>
        <div 
          className={`p-12 border-4 border-dashed rounded-lg text-center transition-colors 
            ${selectedFile ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`
          }
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileSelect(e.dataTransfer.files);
          }}
        >
          <UploadCloud className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          
          {selectedFile ? (
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900 mb-2">
                File Ready: <span className="text-purple-600">{selectedFile.name}</span>
              </p>
              <p className="text-gray-500 mb-6">
                Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                DRAG & DROP YOUR AUDIO FILE HERE
              </p>
              <p className="text-gray-500 mb-6">
                OR CLICK TO BROWSE
              </p>
            </div>
          )}

          <label className="inline-block py-2 px-6 bg-purple-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
            {selectedFile ? 'Change File' : 'Browse Files'}
            <input 
              type="file" 
              className="hidden" 
              accept=".mp3,.wav,.m4a,.webm,.ogg" // Added .ogg for general audio
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </label>
          <p className="text-sm text-gray-400 mt-6">
            Supported formats: .mp3, .wav, .m4a, .webm, .ogg
          </p>
        </div>

        {/* Summarize Button */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            type="submit"
            disabled={isLoading || !selectedFile}
            className={`w-full max-w-sm py-3 font-semibold rounded-lg transition-all text-xl shadow-md
              ${selectedFile && !isLoading
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AudioSummary;