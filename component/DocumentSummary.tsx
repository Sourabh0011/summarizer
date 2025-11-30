// components/DocumentSummary.tsx
"use client";

import React, { useState } from 'react';
import { UploadCloud, FileText, File, Loader2 } from 'lucide-react';

// --- Interface for Props ---
interface DocumentSummaryProps {
  // onSummarize: (file: File) => void;
}

// --- Component: DocumentSummary Input ---
const DocumentSummary: React.FC<DocumentSummaryProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      console.log('Document selected:', files[0].name);
    }
  };

  const handleSummarize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a document file to summarize.');
      return;
    }
    
    setIsLoading(true);
    console.log('Starting document summarization for:', selectedFile.name);
    
    // Simulating API call delay for processing
    setTimeout(() => {
        setIsLoading(false);
        // In a real app, send the selectedFile contents to the summarization model
        alert(`Summarization process started for: ${selectedFile.name}`);
        setSelectedFile(null); // Clear file after submission (optional)
    }, 3000); // Documents usually take a bit longer to process
  };

  const buttonText = isLoading 
    ? 'Analyzing Document...' 
    : (selectedFile ? `Summarize ${selectedFile.name}` : 'Summarize Document');

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <FileText className="mr-3 text-teal-600" size={28} />
        Document Summarizer
      </h1>
      
      <form onSubmit={handleSummarize}>
        <div 
          className={`p-12 border-4 border-dashed rounded-lg text-center transition-colors 
            ${selectedFile ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`
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
              <File className="mx-auto h-12 w-12 text-teal-600 mb-2" />
              <p className="text-xl font-semibold text-gray-900 mb-2">
                File Ready: <span className="text-teal-600">{selectedFile.name}</span>
              </p>
              <p className="text-gray-500 mb-6">
                Type: {selectedFile.type || selectedFile.name.split('.').pop()?.toUpperCase() || 'Unknown'} | Size: {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                DRAG & DROP YOUR DOCUMENT HERE
              </p>
              <p className="text-gray-500 mb-6">
                OR CLICK TO BROWSE
              </p>
            </div>
          )}

          <label className="inline-block py-2 px-6 bg-teal-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-teal-700 transition-colors">
            {selectedFile ? 'Change Document' : 'Browse Documents'}
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.docx,.txt" // Common document formats
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </label>
          <p className="text-sm text-gray-400 mt-6">
            Supported formats: .pdf, .docx, .txt
          </p>
        </div>

        {/* Summarize Button */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            type="submit"
            disabled={isLoading || !selectedFile}
            className={`w-full max-w-sm py-3 font-semibold rounded-lg transition-all text-xl shadow-md
              ${selectedFile && !isLoading
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-3 text-white inline-block" />
            ) : null}
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentSummary;