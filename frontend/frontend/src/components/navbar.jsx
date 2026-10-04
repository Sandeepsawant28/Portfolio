import React, { useState, useEffect } from 'react';

const Navbar = ({ onOpenLegal }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 border-hairline-b ${
        scrolled ? 'bg-[#0C0C0E]/90 backdrop-blur-md' : 'bg-[#0C0C0E]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Identity */}
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="text-sm font-semibold tracking-wider text-[#EDEDED] uppercase hover:text-white transition-colors"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            SANDEEP SAWANT
          </a>
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#5F5F68]">
            / FULL-STACK CREATIVE DEVELOPER
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider text-[#9E9EA8]">
          <button
            onClick={() => scrollToSection('works')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            01. WORKS
          </button>
          <button
            onClick={() => scrollToSection('sandbox')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            02. LIVE DEMO
          </button>
          <button
            onClick={() => scrollToSection('capabilities')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            03. CAPABILITIES
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            04. CONTACT
          </button>
        </nav>

        {/* Status indicator */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded bg-[#141417] border-hairline text-[11px] font-mono text-[#9E9EA8]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>AVAILABLE Q2/Q3 2026</span>
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 rounded bg-[#EDEDED] text-[#0C0C0E] text-xs font-mono font-medium hover:bg-white transition-colors cursor-pointer"
          >
            INITIATE BRIEF
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;