import React from 'react';
import { Share2, Twitter, Facebook, Linkedin as LinkedIn, Link as LinkIcon } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

export function SocialShare({ 
  url = window.location.href,
  title = "Cryptocurrency Crime Investigation Training | Law Enforcement SOP",
  description = "Master cryptocurrency crime investigation with our comprehensive training program. Learn blockchain forensics, evidence collection, and digital asset recovery."
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <Share2 className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-900">Share:</span>
      </div>
      
      <div className="flex items-center gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Share on LinkedIn"
        >
          <LinkedIn className="w-5 h-5" />
        </a>
        
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-600 hover:text-green-500 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Copy link to clipboard"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}