// components/SummaryDisplay.tsx
"use client";

import React from 'react';
import { Download, CheckCircle, Clock, Users, Link } from 'lucide-react';
import { useState } from 'react';

// --- Interface for Dummy Data Structure ---
interface SummaryResult {
  sourceTitle: string;
  sourceType: 'Meeting' | 'YouTube' | 'Audio' | 'Document';
  keySummary: string;
  actionItems: string[]; // For Meetings
  keyTopics: string[]; // For Audio/YouTube/Document
  fullTranscript: { time: string; text: string; speaker?: string }[];
}

// --- Dummy Result Data (Example for a Meeting) ---
const dummyMeetingResult: SummaryResult = {
  sourceTitle: 'Q4 Product Strategy Review',
  sourceType: 'Meeting',
  keySummary: "The team agreed on prioritizing the 'Mobile First' redesign for Q4, allocating 60% of development resources to it. The initial marketing campaign will focus on the new features, scheduled for a soft launch in mid-November. Legal review of the new Terms of Service is mandatory before release.",
  actionItems: [
    'Sarah: Finalize the detailed UI/UX wireframes for the mobile dashboard by next Tuesday.',
    'John: Draft a risk assessment report on third-party API dependencies by EOD Friday.',
    'Rajiv: Schedule a follow-up meeting with the Legal team for ToS review.',
  ],
  keyTopics: ['Mobile Redesign', 'Marketing Strategy', 'Resource Allocation', 'Legal Compliance'],
  fullTranscript: [
    { time: '00:01:15', speaker: 'Speaker 1 (Sarah)', text: 'Okay, let’s start with the mobile redesign priorities for Q4.' },
    { time: '00:03:40', speaker: 'Speaker 2 (John)', text: 'I think allocating around 60% of our dev time to this is realistic.' },
    { time: '00:05:01', speaker: 'Speaker 3 (Rajiv)', text: 'Agreed, but we need the new Terms of Service approved first.' },
    { time: '00:07:30', speaker: 'Speaker 1 (Sarah)', text: 'I will finalize the detailed UI/UX wireframes by next Tuesday.' },
  ],
};

// --- Component: Transcript Line ---
const TranscriptLine: React.FC<{ line: SummaryResult['fullTranscript'][0] }> = ({ line }) => (
  <p className="mb-1 text-sm">
    <span className="font-mono text-gray-500 mr-2">[{line.time}]</span>
    {line.speaker && <span className="font-semibold text-blue-800 mr-2">{line.speaker}:</span>}
    <span className="text-gray-800">{line.text}</span>
  </p>
);

// --- Component: SummaryDisplay ---
const SummaryDisplay: React.FC = () => {
  const result = dummyMeetingResult; // Use the dummy result for demonstration
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-xl shadow-2xl">
      
      {/* Header and Metadata */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <CheckCircle className="text-green-500 mr-4" size={36} />
          Summary Complete
        </h1>
        <h2 className="text-2xl font-semibold text-blue-700 mt-2">{result.sourceTitle}</h2>
        <div className="mt-2 text-gray-500 flex space-x-6">
          <span className="flex items-center"><Link size={18} className="mr-1" /> Source Type: {result.sourceType}</span>
          <span className="flex items-center"><Clock size={18} className="mr-1" /> Duration: ~15 min</span>
          {result.sourceType === 'Meeting' && <span className="flex items-center"><Users size={18} className="mr-1" /> Speakers: 3</span>}
        </div>
      </header>

      {/* Main Summary Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">Key Summary</h3>
        <p className="text-lg text-gray-700 leading-relaxed">{result.keySummary}</p>
      </section>

      {/* Action Items / Key Topics Section (Conditional Rendering) */}
      {result.sourceType === 'Meeting' && (
        <section className="bg-blue-50 p-6 rounded-lg shadow-inner mb-8 border-l-4 border-blue-400">
          <h3 className="text-2xl font-bold text-blue-800 border-b pb-2 mb-4">🎯 Action Items</h3>
          <ul className="space-y-3">
            {result.actionItems.map((item, index) => (
              <li key={index} className="flex items-start text-lg text-blue-700">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* General Key Topics Display */}
      {result.keyTopics.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-700 mb-3">Key Topics Discussed</h3>
            <div className="flex flex-wrap gap-2">
              {result.keyTopics.map((topic, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                  # {topic}
                </span>
              ))}
            </div>
          </section>
      )}


      {/* Full Transcript Section (Collapsible) */}
      <section className="mb-8">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg cursor-pointer hover:bg-gray-200" onClick={() => setShowTranscript(!showTranscript)}>
          <h3 className="text-xl font-bold text-gray-800">Full Transcript ({showTranscript ? 'Hide' : 'Show'})</h3>
          <span className="text-gray-600 font-semibold">{result.fullTranscript.length} lines</span>
        </div>
        
        {showTranscript && (
          <div className="bg-white p-4 max-h-96 overflow-y-auto border border-gray-300 rounded-b-lg">
            {result.fullTranscript.map((line, index) => (
              <TranscriptLine key={index} line={line} />
            ))}
          </div>
        )}
      </section>

      {/* Download and New Summary Actions */}
      <div className="flex justify-center space-x-4 pt-4">
        <button className="flex items-center py-3 px-8 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg">
          <Download className="mr-2" size={20} /> Download Summary
        </button>
        <button className="py-3 px-8 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors shadow-md">
          Start New Summary
        </button>
      </div>

    </div>
  );
};

export default SummaryDisplay;