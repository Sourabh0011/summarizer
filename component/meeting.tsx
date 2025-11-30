// components/MeetingSummary.tsx
"use client";

import React, { useState } from 'react';
import { UploadCloud, Mic, FileText, Pause } from 'lucide-react';
import SummaryDisplay from './SummaryDisplay';

// --- Interface for Props ---
interface MeetingSummaryProps {
  // Add props here if needed
}

// --- Component: MeetingSummary Input ---
const MeetingSummary: React.FC<MeetingSummaryProps> = () => {
  const [inputMode, setInputMode] = useState<'upload' | 'live'>('upload');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0); // Placeholder
  const [isDisplayed, setIsDisplayed] = useState(false);
  
  // 1. New State to control button enablement
  const [isReadyToSummarize, setIsReadyToSummarize] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Function to switch tabs and reset the readiness state
  const handleInputModeChange = (mode: 'upload' | 'live') => {
    setInputMode(mode);
    setIsReadyToSummarize(false);
    // Reset file/recording states when switching modes
    setIsRecording(false);
    setUploadedFileName(null);
  };


  // 2. Updated handler for file selection/drop
  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log('File selected:', files[0].name);
      setUploadedFileName(files[0].name);
      // **ENABLE BUTTON:** A file is selected
      setIsReadyToSummarize(true); 
    } else {
      setUploadedFileName(null);
      // **DISABLE BUTTON:** File selection cleared
      setIsReadyToSummarize(false);
    }
  };

  // 3. Updated placeholder functions for live recording
  const toggleRecording = () => {
    if (isRecording) {
      // Logic for STOPPING recording
      console.log('Recording stopped. Duration:', recordingDuration);
      setIsRecording(false);
      // **ENABLE BUTTON:** Recording is stopped and file is ready
      setIsReadyToSummarize(true); 
    } else {
      // Logic for STARTING recording
      setIsRecording(true);
      setRecordingDuration(0); 
      // **DISABLE BUTTON:** We are actively recording (not ready for summary)
      setIsReadyToSummarize(false); 
    }
  };
  
  const handleClickSummarize = () => {
    // In a real app, you would submit the file/recording data here
    console.log("Submitting for summarization...");
    setIsDisplayed(true);
    // Optional: After submission, disable the button again
    // setIsReadyToSummarize(false); 
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <FileText className="mr-3 text-blue-600" size={28} />
        Meeting Summarizer
      </h1>
      
      {/* Input Mode Tabs */}
      <div className="flex space-x-2 mb-8 border-b border-gray-200">
        <button
          onClick={() => handleInputModeChange('upload')}
          className={`px-4 py-2 text-lg font-semibold rounded-t-lg transition-colors ${
            inputMode === 'upload'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Upload Audio File
        </button>
        <button
          onClick={() => handleInputModeChange('live')}
          className={`px-4 py-2 text-lg font-semibold rounded-t-lg transition-colors ${
            inputMode === 'live'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Start Live Recording
        </button>
      </div>

      {/* --- File Upload Area --- */}
      {inputMode === 'upload' && (
        <div 
          className="p-12 border-4 border-dashed border-gray-200 rounded-lg text-center transition-colors hover:border-blue-300"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileSelect(e.dataTransfer.files);
          }}
        >
          {uploadedFileName ? (
            <div className="text-green-500">
              <FileText className="mx-auto h-16 w-16 mb-4" />
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                File Ready: <span className="text-green-600">{uploadedFileName}</span>
              </p>
              <button 
                onClick={() => handleFileSelect(null)}
                className="text-sm text-red-500 hover:text-red-700 mt-2"
              >
                (Change File)
              </button>
            </div>
          ) : (
            <>
              <UploadCloud className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                DRAG & DROP YOUR AUDIO FILE HERE
              </p>
              <p className="text-gray-500 mb-6">
                OR CLICK TO BROWSE
              </p>
              <label className="inline-block py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Browse Files
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".mp3,.wav,.m4a,.webm"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </label>
              <p className="text-sm text-gray-400 mt-6">
                Supported formats: .mp3, .wav, .m4a, .webm
              </p>
            </>
          )}
        </div>
      )}

      {/* --- Live Recording Area --- */}
      {inputMode === 'live' && (
        <div className="p-12 border-4 border-dashed border-gray-200 rounded-lg text-center">
          {isRecording ? (
            // ... Recording in progress UI ...
            <div className="flex flex-col items-center">
              <div className="relative">
                <Mic 
                  className="h-20 w-20 text-red-500 animate-pulse" 
                  style={{ animationDuration: '1s' }}
                />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <p className="text-3xl font-mono mt-4 mb-4 text-red-600">
                Recording... 00:{recordingDuration.toString().padStart(2, '0')}:00
              </p>
              <button
                onClick={toggleRecording}
                className="flex items-center py-3 px-8 bg-red-600 text-white font-bold rounded-full text-xl hover:bg-red-700 transition-colors shadow-lg"
              >
                <Pause className="mr-2" /> Stop Recording
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Click Stop Recording when your meeting is complete.
              </p>
            </div>
          ) : (
            // ... Not recording UI ...
            <div className="flex flex-col items-center">
              <Mic className="h-16 w-16 text-blue-400 mb-4" />
              {isReadyToSummarize ? (
                <p className="text-xl font-semibold text-gray-900 mb-6 text-green-600">
                  Recording Stopped. Ready to Summarize.
                </p>
              ) : (
                <p className="text-xl font-semibold text-gray-900 mb-6">
                  Ready to summarize your live meeting.
                </p>
              )}
              <button
                onClick={toggleRecording}
                className="flex items-center py-3 px-8 bg-blue-600 text-white font-bold rounded-full text-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Mic className="mr-2" /> Start Recording
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Ensure your microphone is enabled and clearly captures all speakers.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Summarize Button - Key Update Here */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <button 
          onClick={handleClickSummarize}
          // 4. Button is disabled unless isReadyToSummarize is TRUE
          disabled={!isReadyToSummarize} 
          className={`w-full max-w-sm py-3 font-semibold rounded-lg transition-all text-xl
            ${isReadyToSummarize 
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-md' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Summarize Meeting
        </button>
      </div>
      {isDisplayed && <SummaryDisplay/>}

    </div>
  );
};

export default MeetingSummary;