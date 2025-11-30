// components/YouTubeSummary.tsx

"use client";

import React, { useState } from 'react';
import { Youtube, Search, Link } from 'lucide-react';

// --- Interface for Props ---
interface YouTubeSummaryProps {
  // In a real application, you would pass a handler function here:
  // onSummarize: (url: string) => void;
}

// --- Component: YouTubeSummary Input ---
const YouTubeSummary: React.FC<YouTubeSummaryProps> = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple validation to check if the URL looks like a YouTube link
  const isValidUrl = url.trim().length > 10 && url.includes('youtube.com') || url.includes('youtu.be');

  const handleSummarize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl) {
      alert('Please enter a valid YouTube URL.');
      return;
    }
    
    setIsLoading(true);
    console.log('Sending URL for summarization:', url);
    
    // Simulating an API call delay
    setTimeout(() => {
        setIsLoading(false);
        // In a real app, this is where you would call your backend API
        // to download the audio, transcribe, and summarize.
        alert(`Summarization process started for: ${url}`);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Youtube className="mr-3 text-red-600" size={28} />
        YouTube Video Summarizer
      </h1>
      
      <form onSubmit={handleSummarize}>
        <div className="flex flex-col space-y-4">
          
          {/* URL Input Field */}
          <label htmlFor="youtube-url" className="text-lg font-medium text-gray-700 flex items-center mb-2">
            <Link className="w-5 h-5 mr-2" />
            Paste YouTube Video Link
          </label>
          
          <div className="flex w-full">
            <input
              id="youtube-url"
              type="url"
              placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow p-4 border border-gray-300 rounded-l-lg text-lg focus:ring-red-500 focus:border-red-500 transition-colors disabled:bg-gray-100"
              required
              disabled={isLoading}
            />
            
            {/* Summarize Button */}
            <button
              type="submit"
              disabled={isLoading || !isValidUrl}
              className={`flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-r-lg transition-colors shadow-md
                ${isValidUrl && !isLoading
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isLoading ? (
                // Simple loading spinner (requires custom CSS or a library like 'react-spinners')
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Processing...' : 'Summarize Video'}
            </button>
          </div>
          
          {/* Instructions/Tips */}
          <p className="text-sm text-gray-500 mt-2">
            Paste the full link to the YouTube video. The system will extract the audio and generate a summary.
          </p>
        </div>
      </form>

      <div className="mt-10 p-6 bg-red-50 border-l-4 border-red-300 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800">Note on Technical Implementation:</h3>
        <p className="text-sm text-red-700 mt-2">
          The backend for this feature will need to use a library like **yt-dlp** or a cloud service to download the video's audio stream before it can be sent to the Speech-to-Text model.
        </p>
      </div>

    </div>
  );
};

export default YouTubeSummary;