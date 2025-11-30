// page.tsx
import { Mic, Headphones, Youtube, FileText, Settings, LayoutDashboard } from 'lucide-react';
import MeetingSummary from '@/component/meeting';
import YouTubeSummary from '@/component/YouTubeSummary';
import AudioSummary from '@/component/AudioSummary';
import DocumentSummary from '@/component/DocumentSummary';
import SummaryDisplay from '@/component/SummaryDisplay';
import TeamMember from '@/component/Teammember';
import Link from 'next/link';
// --- Interface for Card Data ---
interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  // In a real app, this would be a link path, e.g., '/meeting-summary'
  actionLink: string;
}

// --- Component: Individual Summary Card ---
const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, description, buttonText, actionLink }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col items-start min-h-[250px]">
    <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-lg">
      {icon}
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600 mb-6 flex-grow">{description}</p>
    <Link
      href={actionLink}
      className="mt-auto w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition-colors"
    >
      {buttonText}
    </Link>
  </div>
);

// --- Component: Main Page ---
export default function DashboardPage() {
  const summaryCards: SummaryCardProps[] = [
    {
      icon: <Mic size={32} />,
      title: 'Meeting Summary',
      description: 'Summarize your team meetings with transcripts, speaker diarization, and action items.',
      buttonText: 'Summarize Meeting',
      actionLink: '/meeting',
    },
    {
      icon: <Headphones size={32} />,
      title: 'Audio Summary',
      description: 'Get the gist of any podcast, lecture, or long voice note. Supports all major audio formats.',
      buttonText: 'Summarize Audio',
      actionLink: '/audio',
    },
    {
      icon: <Youtube size={32} />,
      title: 'YouTube Video',
      description: 'Get a quick overview of any YouTube video\'s content, time codes, and key points using a URL.',
      buttonText: 'Summarize YouTube',
      actionLink: '/youtube',
    },
    {
      icon: <FileText size={32} />,
      title: 'Document Summary',
      description: 'Condense lengthy articles, reports, or research papers by uploading a file.',
      buttonText: 'Summarize Document',
      actionLink: '/document',
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <LayoutDashboard className="text-blue-600" size={30} />
            <h1>Summarizer AI</h1>
          </div>
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Introductory Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-xl text-gray-500">
            What would you like to summarize today? Select a content type to get started.
          </p>
        </section>

        {/* Summarizer Card Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </section>
      </main>
      {/* Team Section */}
      <TeamMember />
    </div>
    
  );
  
}

// NOTE: You must ensure that Tailwind CSS is correctly set up in your Next.js project
// (tailwind.config.js, global.css imports) for this code to render the design correctly.
// You also need to install the Lucide React icon library: `npm install lucide-react`