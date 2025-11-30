// Use client directive if you intend to use hooks or need interactive JS
"use client";

import React from 'react';
import Image from 'next/image';
import { Twitter, Linkedin } from 'lucide-react'; // Assuming you use lucide-react or similar

// Define a simple structure for your team member data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string; // Path to the image
  social: {
    twitter: string;
    linkedin: string;
  };
}

// Your 4 team members
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Sourabh Sharma",
    role: "Full Stack Dev",
    image: "/sourabh.jpeg", // Replace with your image paths
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Shivam Lodhi",
    role: "UX/UI Designer",
    image: "/shivam.jpeg",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Pranav Gupta",
    role: "AI/ML Modal Training",
    image: "/pranav.jpeg",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Shanu Patel",
    role: "WorkFlow Design",
    image: "/shanu.jpeg",
    social: { twitter: "#", linkedin: "#" },
  },
];

// Component for a single team card with the glowing effect
const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    // Card Wrapper: relative for positioning the glow, group for hover effects,
    // and rounded-xl for the overall shape.
    <div className="group relative overflow-hidden p-0.5 rounded-xl transition duration-500 hover:scale-[1.03] shadow-lg">
      
      {/* The Glowing Effect (Pseudo-element replacement):
        This div is the absolute background that animates its opacity and blur
        on hover to create a vibrant "glow" effect around the card. 
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-60 transition duration-500 blur-xl rounded-xl z-0"></div>

      {/* Actual Card Content Container */}
      <div className="relative bg-gray-900 border border-gray-700/50 p-6 flex flex-col items-center text-center space-y-4 h-full rounded-[11px] z-10">
        
        {/* Image Container: Circle crop and subtle ring */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-700/80">
          <Image 
            src={member.image}
            alt={member.name}
            width={128}
            height={128}
            className="object-cover w-full h-full"
            priority // Load essential team images quickly
          />
        </div>
        
        {/* Text Content */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition duration-300">
            {member.name}
          </h3>
          <p className="text-sm text-gray-400 font-medium mt-1">{member.role}</p>
        </div>
        
        {/* Social Links */}
        <div className="flex space-x-3 pt-2 text-gray-500">
          <a 
            href={member.social.twitter} 
            aria-label={`Twitter of ${member.name}`}
            className="hover:text-blue-400 transition duration-200"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href={member.social.linkedin} 
            aria-label={`LinkedIn of ${member.name}`}
            className="hover:text-blue-400 transition duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};


// Main Team Grid Component
export const TeamGrid = () => {
  return (
    <section className="py-20 bg-white/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-purple sm:text-5xl">
            Meet Our <span className="text-purple-400">Visionaries</span>
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Dedicated to building the future, one commit at a time.
          </p>
        </div>

        {/* The Grid: Responsive layout for 2, 3, or 4 columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;