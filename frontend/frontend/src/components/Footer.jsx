import React from 'react';

const Footer = ({ onOpenLegal }) => {
  return (
    <footer className="py-16 px-6 bg-[#08080A] border-hairline-t text-xs font-mono text-[#5F5F68]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#EDEDED] font-semibold text-sm">
            <span style={{ fontFamily: "'Syne', sans-serif" }}>SANDEEP SAWANT</span>
            <span>•</span>
            <span className="text-xs font-normal text-[#9E9EA8]">STUDIO ARCHIVES</span>
          </div>
          <p className="text-[11px] text-[#5F5F68] max-w-sm">
            High-performance full-stack web engineering & spatial interfaces. Engineered with zero commercial trackers or bloated third-party analytics.
          </p>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-wrap items-center gap-6 text-[#9E9EA8]">
          <button
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
          >
            PRIVACY POLICY
          </button>
          <button
            onClick={() => onOpenLegal('terms')}
            className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
          >
            TERMS OF SERVICE
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
        </div>

        {/* Right Timestamp */}
        <div className="text-[11px]">
          <span>© 2026 SANDEEP SAWANT. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
