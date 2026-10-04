import React, { useState, useEffect, useRef } from 'react';
import Clay3DCanvas from './Clay3DCanvas';
import { ambientSound } from './AudioEngine';

import showcaseLanding from '../assets/showcase-landing.jpg';
import showcaseBranding from '../assets/showcase-branding.jpg';
import showcaseWebflow from '../assets/showcase-webflow.jpg';
import logoImg from '../assets/Logo.png';
import astraImg from '../assets/Astra.png';
import sandeepImg from '../assets/sandeep.png';

const InteractivePortfolio = ({ onOpenWorkModal, onOpenLegalModal }) => {
  const [soundActive, setSoundActive] = useState(false);
  const [folderHovered, setFolderHovered] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Work');
  const [showWipe, setShowWipe] = useState(false);
  const [wipeProgress, setWipeProgress] = useState(0);
  const [showDossier, setShowDossier] = useState(false);

  // Trigger hero mask reveal animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setHeroMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position for word-by-word fill and 3D parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = ambientSound.toggle();
    setSoundActive(next);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger Shot 6 full-screen warm-grey wipe when the blue folder is clicked
  const handleFolderClick = () => {
    setShowWipe(true);
    setWipeProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setWipeProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowDossier(true);
        }, 400);
      }
    }, 40);
  };

  const closeWipe = () => {
    setShowWipe(false);
    setShowDossier(false);
    setWipeProgress(0);
  };

  const projects = [
    {
      id: 1,
      title: 'Aura Architecture & Living',
      tag: 'Studio Flagship & Editorial',
      desc: 'Minimalist spatial web portfolio designed for an avant-garde architectural atelier. Features daylight responsive layouts, tactile typography, and 3D space viewer.',
      img: showcaseLanding,
      color: '#EE9068',
      metrics: '3.4x Inquiries • Awwwards Site of the Day',
    },
    {
      id: 2,
      title: 'Lumina Spatial OS',
      tag: 'Next-Gen Interface',
      desc: 'Spatial computing operating system dashboard. Zero latency micro-interactions, hardware-accelerated canvas components, and fluid responsive design.',
      img: astraImg,
      color: '#0047FF',
      metrics: 'Lighthouse 100 • 60 FPS WebGL',
    },
    {
      id: 3,
      title: 'Komorebi Tea Culture',
      tag: 'Tactile Commerce',
      desc: 'High-end e-commerce experience for Japanese artisanal tea masters. Bespoke ceramic packaging showcases, smooth drawer transitions, and zero bloat.',
      img: showcaseBranding,
      color: '#2B2824',
      metrics: '+48% Conversion • FWA of the Day',
    },
    {
      id: 4,
      title: 'Forma Type Foundry & Studio',
      tag: 'Interactive Tool & Store',
      desc: 'Interactive variable typography testing playground and specimen laboratory with live font slider controls and automated web licensing checkout.',
      img: showcaseWebflow,
      color: '#D47E5B',
      metrics: '200k+ Monthly Designers',
    },
    {
      id: 5,
      title: 'Sandeep Design Systems',
      tag: 'Tokens & Identity',
      desc: 'Comprehensive multi-platform design token architecture and tactile component library utilized across enterprise spatial applications.',
      img: sandeepImg,
      color: '#0047FF',
      metrics: 'Production Deployed',
    },
  ];

  // Word-by-word headline fill calculation based on scroll
  const headlineWords = ["I", "help", "companies", "to", "succeed", "on", "projects", "like:"];
  // Map scrollY range (e.g. 700 to 1200px) to word fill index
  const fillProgress = Math.max(0, Math.min(1, (scrollY - 550) / 450));
  const activeWordCount = Math.floor(fillProgress * headlineWords.length);

  return (
    <div
      className="relative min-h-screen selection:bg-[#EE9068] selection:text-white"
      style={{
        backgroundColor: '#F9F6EF',
        color: '#1C1A17',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Soft blurred peach glow around screen edges */}
      <div className="screen-peach-glow" />

      {/* Subtle fine film grain */}
      <div className="film-grain" />

      {/* Top Navigation Bar with Frosted Pill */}
      <header className="sticky top-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-[#F9F6EF]/85 border-b border-[rgba(44,41,38,0.06)] transition-all">
        {/* Left minimal branding */}
        <div className="flex items-center space-x-3">
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              letterSpacing: '0.12em',
              color: '#2C2926',
            }}
          >
            SANDEEP SAWANT
          </span>
          <span className="hidden sm:inline-block text-[11px] text-[#8C8578] font-mono">
            / ART DIRECTION & WEB
          </span>
        </div>

        {/* Small frosted-glass navigation pill: "About / Work" */}
        <nav
          className="flex items-center px-4 py-1.5 rounded-full"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(44, 41, 38, 0.08)',
            boxShadow: '0 8px 24px -6px rgba(44, 41, 38, 0.05)',
          }}
        >
          <button
            onClick={() => {
              setActiveTab('About');
              scrollToSection('experience-statement');
            }}
            className="text-[12px] font-medium px-2 py-0.5 transition-colors cursor-pointer"
            style={{
              color: activeTab === 'About' ? '#1B1917' : '#8A847B',
              fontWeight: activeTab === 'About' ? 600 : 400,
            }}
          >
            About
          </button>
          <span className="text-[#C4BDB2] text-[11px] px-1 font-light">/</span>
          <button
            onClick={() => {
              setActiveTab('Work');
              scrollToSection('selected-work');
            }}
            className="text-[12px] font-medium px-2 py-0.5 transition-colors cursor-pointer"
            style={{
              color: activeTab === 'Work' ? '#0047FF' : '#8A847B',
              fontWeight: activeTab === 'Work' ? 600 : 400,
            }}
          >
            Work
          </button>
        </nav>

        {/* Tiny links on the right */}
        <div className="flex items-center space-x-5 text-[12px]">
          <button
            onClick={() => scrollToSection('portfolio-climax')}
            className="hidden sm:inline-block text-[#6D675E] hover:text-[#1B1917] transition-colors cursor-pointer"
          >
            Archive
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="text-[#6D675E] hover:text-[#1B1917] transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 text-[11px] font-mono px-3 py-1 rounded-full border border-[rgba(44,41,38,0.12)] text-[#58534C] hover:bg-white transition-all cursor-pointer"
            title="Toggle Ambient Daylight Sound"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: soundActive ? '#0047FF' : '#A8A298' }}
            />
            <span>Sound {soundActive ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SHOT 1: FULL-SCREEN HERO */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between px-6 sm:px-12 pt-10 pb-14 overflow-hidden">
        {/* Background scene with warm peach tint that retracts smoothly on scroll */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-700"
          style={{
            transform: `scale(${1 - Math.min(0.15, scrollY * 0.0003)}) translateY(${scrollY * 0.25}px)`,
            opacity: Math.max(0.15, 1 - scrollY * 0.0015),
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${showcaseLanding})`,
              filter: 'brightness(1.04) contrast(0.92) saturate(0.85)',
            }}
          />
          {/* Warm peach tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(249, 218, 203, 0.42)',
              mixBlendMode: 'color-burn',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.75) 0%, rgba(249, 246, 239, 0.92) 80%)',
            }}
          />
        </div>

        {/* Hero Top Copy */}
        <div className="relative z-10 max-w-2xl mt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF3EC] text-[#EE9068] text-xs font-mono uppercase tracking-widest mb-4 border border-[rgba(238,144,104,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EE9068]" />
            <span>Available for Select Q2/Q3 Commissions</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2926] leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Designing tactile digital experiences bathed in natural daylight.
          </h2>
        </div>

        {/* Hero Bottom Giant Peach Name with Mask Reveal & Pill Sketch Window */}
        <div className="relative z-10 w-full mt-12 border-b border-[rgba(238,144,104,0.25)] pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Giant Name with Pill Window */}
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
              {/* SANDEEP with clean mask reveal */}
              <div className="overflow-hidden">
                <h1
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(3.2rem, 9.5vw, 9.8rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#EE9068',
                    transform: heroMounted ? 'translateY(0%)' : 'translateY(100%)',
                    transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  SANDEEP
                </h1>
              </div>

              {/* Rounded pill-shaped window between the two words showing a hand sketching a logo */}
              <div
                className="relative overflow-hidden rounded-full shadow-clay border-2 border-white inline-flex items-center justify-center transition-all duration-700"
                style={{
                  width: 'clamp(72px, 8.8vw, 130px)',
                  height: 'clamp(38px, 4.4vw, 68px)',
                  backgroundColor: '#FFFFFF',
                  transform: heroMounted ? 'scale(1)' : 'scale(0)',
                  transitionDelay: '0.2s',
                }}
              >
                {/* Looping sketch animation */}
                <svg viewBox="0 0 140 70" className="w-full h-full" style={{ backgroundColor: '#FAF7F2' }}>
                  <line x1="20" y1="35" x2="120" y2="35" stroke="#E6E0D5" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="70" cy="35" r="22" stroke="#E6E0D5" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />

                  {/* Monogram drawing path */}
                  <path
                    d="M 52 46 C 52 30, 68 22, 70 22 C 72 22, 88 30, 88 46"
                    fill="none"
                    stroke="#EE9068"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeDasharray="90"
                    className="animate-pulse"
                  />
                  <path
                    d="M 58 36 L 82 36"
                    fill="none"
                    stroke="#0047FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Stylized pencil sketching indicator */}
                  <g className="animate-drift">
                    <line x1="68" y1="32" x2="82" y2="18" stroke="#2B2824" strokeWidth="2.2" strokeLinecap="round" />
                    <polygon points="68,32 70,26 74,30" fill="#EE9068" />
                  </g>
                </svg>
              </div>

              {/* SAWANT with clean mask reveal */}
              <div className="overflow-hidden">
                <h1
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(3.2rem, 9.5vw, 9.8rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#EE9068',
                    transform: heroMounted ? 'translateY(0%)' : 'translateY(100%)',
                    transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                  }}
                >
                  SAWANT
                </h1>
              </div>
            </div>

            {/* Blue 'Work' Button */}
            <div>
              <button
                onClick={() => scrollToSection('selected-work')}
                className="px-9 py-4 rounded-full text-white font-medium text-base tracking-wide flex items-center space-x-2 shadow-folder transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: '#0047FF',
                }}
              >
                <span>Work</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHOT 2: EXPERIENCE & 3D CLAY SHAPES PARALLAX */}
      {/* ========================================================================= */}
      <section
        id="experience-statement"
        className="relative py-32 px-6 sm:px-12 overflow-hidden flex flex-col items-center justify-center text-center"
      >
        {/* Soft clay-like 3D shapes in peach-to-grey gradients rising and rotating */}
        <div className="absolute inset-0 pointer-events-none opacity-85">
          <Clay3DCanvas isCinematic={false} interactive={true} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-[#968F84] mb-5">
            Experience & Proven Direction
          </p>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#3C3833] leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            16 years making users{' '}
            {/* "click" in peach pill */}
            <span
              className="inline-flex items-center px-4 py-0.5 rounded-full text-[#1C1A17] font-semibold mx-1 shadow-sm transition-transform hover:scale-105"
              style={{
                backgroundColor: '#F8C2A8',
                border: '1px solid rgba(238, 144, 104, 0.4)',
              }}
            >
              click
            </span>{' '}
            and{' '}
            {/* "scroll" is peach with thin vertical line running down */}
            <span className="relative inline-block mx-1">
              <span style={{ color: '#EE9068', fontWeight: 700 }}>scroll</span>
              <span
                className="absolute left-1/2 -bottom-16 w-[1.5px] -translate-x-1/2 h-14"
                style={{ backgroundColor: '#EE9068' }}
              />
            </span>{' '}
            my designs
          </h2>

          <p className="mt-16 max-w-xl mx-auto text-[#6F695F] text-sm md:text-base leading-relaxed">
            From bespoke visual branding systems to spatial WebGL architectures, bridging high-end art direction with frictionless commercial performance.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHOT 3: WORD-BY-WORD FILL & WEBSITES & LANDING PAGES */}
      {/* ========================================================================= */}
      <section id="selected-work" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          {/* Headline fills with grey word by word as the user scrolls */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {headlineWords.map((word, idx) => {
              const isFilled = idx <= activeWordCount;
              return (
                <span
                  key={idx}
                  className="inline-block mr-2.5 transition-colors duration-300"
                  style={{
                    color: isFilled ? '#2C2926' : '#C7BFB3',
                    fontWeight: isFilled ? 600 : 400,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </h2>

          {/* Centered "Websites & Landing pages" */}
          <div className="mt-5">
            <span
              className="text-base sm:text-lg font-medium px-5 py-1.5 rounded-full inline-block"
              style={{
                backgroundColor: 'rgba(238, 144, 104, 0.12)',
                color: '#EE9068',
                border: '1px solid rgba(238, 144, 104, 0.25)',
              }}
            >
              Websites & Landing pages
            </span>
          </div>
        </div>

        {/* Row of five rounded thumbnails of colorful website designs with staggered rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onOpenWorkModal(project)}
              className="group bg-white rounded-3xl p-5 shadow-daylight border border-[rgba(44,41,38,0.08)] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div
                  className="rounded-2xl overflow-hidden bg-[#F2EDE2] relative mb-5"
                  style={{ aspectRatio: '16/10' }}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-[#2B2824]">
                    {project.metrics}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#EE9068]">
                    {project.tag}
                  </span>
                  <h3
                    className="text-xl font-bold text-[#1C1A17]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#6C665D] line-clamp-2 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(44,41,38,0.06)] flex items-center justify-between text-xs">
                <span className="text-[#0047FF] font-medium group-hover:translate-x-1 transition-transform">
                  View Live Prototype →
                </span>
                <span className="text-[10px] font-mono text-gray-400">Specimen #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHOT 4: VISUAL BRANDING & WEBFLOW/FRAMER WITH SELECTION FRAMES */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[rgba(44,41,38,0.08)]">
        {/* Visual Branding Subsection */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FAF3EC] text-[#EE9068] text-xs font-mono uppercase tracking-widest mb-2 border border-[rgba(238,144,104,0.3)]">
                Discipline 01
              </div>
              <h2
                className="text-3xl sm:text-4xl font-light text-[#2C2926]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Visual Branding
              </h2>
            </div>
            <p className="text-sm text-[#7D766C] max-w-md">
              Tactile brand guidelines, bespoke logomarks, physical packaging systems, and editorial art direction crafted to stand the test of time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-daylight bg-white border border-[rgba(44,41,38,0.08)] p-4 group">
              <img src={showcaseBranding} alt="Packaging" className="w-full h-52 object-cover rounded-xl transition-transform duration-500 group-hover:scale-102" />
              <div className="pt-4">
                <span className="text-[10px] font-mono text-[#EE9068] uppercase">Packaging & Stationery</span>
                <h4 className="text-base font-semibold text-[#2C2926]">Aura Studio Minimal Identity</h4>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-daylight bg-white border border-[rgba(44,41,38,0.08)] p-4 group">
              <div className="w-full h-52 bg-[#F2EDE2] rounded-xl flex items-center justify-center p-6">
                <img src={logoImg} alt="Monogram" className="max-h-28 object-contain filter drop-shadow-sm" />
              </div>
              <div className="pt-4">
                <span className="text-[10px] font-mono text-[#0047FF] uppercase">Bespoke Monogram</span>
                <h4 className="text-base font-semibold text-[#2C2926]">Precision Architectural Glyph</h4>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-daylight bg-white border border-[rgba(44,41,38,0.08)] p-4 group">
              <img src={showcaseLanding} alt="Editorial Posters" className="w-full h-52 object-cover rounded-xl transition-transform duration-500 group-hover:scale-102" />
              <div className="pt-4">
                <span className="text-[10px] font-mono text-[#2C2926] uppercase">Editorial Layout</span>
                <h4 className="text-base font-semibold text-[#2C2926]">Museum-Grade Exhibition Print</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Webflow & Framer with Design Tool Selection Frames */}
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-14 border border-[rgba(44,41,38,0.08)] shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0047FF] text-xs font-mono uppercase tracking-widest mb-4 border border-blue-200">
              Discipline 02 • Production Craft
            </div>

            {/* Design Tool Frame Wrapper */}
            <div className="relative inline-block my-4 p-8">
              {/* Thin blue bounding box */}
              <div
                className="absolute inset-2 border border-[#0047FF] pointer-events-none"
                style={{
                  boxShadow: '0 0 0 1px rgba(0, 71, 255, 0.1), 0 8px 24px -4px rgba(0, 71, 255, 0.15)',
                }}
              >
                {/* 4 Corner Anchor Handles */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#0047FF]" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#0047FF]" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#0047FF]" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#0047FF]" />

                {/* Floating Tag */}
                <div className="absolute -top-6 left-0 bg-[#0047FF] text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                  <span>Production Component • 120 FPS</span>
                </div>
              </div>

              <h3
                className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1C1A17] tracking-tight relative z-10 px-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Webflow & Framer
              </h3>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#6E685F] leading-relaxed max-w-xl mx-auto">
              Fluid responsive layouts, semantic CMS architectures, custom WebGL shaders, and high-performance physics-based micro-interactions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['100/100 Lighthouse Performance', 'Zero Layout Shift (CLS 0.00)', 'Fluid Responsive Rem Units', 'WCAG AAA Accessible'].map((stat, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-white text-xs font-mono text-[#3C3832] border border-[rgba(44,41,38,0.1)]"
                >
                  ✓ {stat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHOT 5: GIGANTIC PEACH "WORK" & GLOSSY 3D BLUE FOLDER */}
      {/* ========================================================================= */}
      <section
        id="portfolio-climax"
        className="relative py-36 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]"
      >
        {/* Gigantic Faded-Peach "Work" cropped by screen edges */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '42vw',
              lineHeight: 0.8,
              letterSpacing: '-0.06em',
              color: '#F4A582',
              opacity: 0.15,
              transform: 'translateY(-2%)',
            }}
          >
            WORK
          </span>
        </div>

        {/* Center: "Curious?... Check out my" above glossy electric-blue folder */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-[#7C756B] mb-6">
            Curious?... Check out my
          </p>

          {/* Glossy Electric-Blue 3D Folder */}
          <div
            id="portfolio-folder"
            onClick={handleFolderClick}
            onMouseEnter={() => setFolderHovered(true)}
            onMouseLeave={() => setFolderHovered(false)}
            className="relative cursor-pointer transition-transform duration-500 group"
            style={{
              perspective: '1000px',
              transform: folderHovered ? 'scale(1.08) translateY(-8px)' : 'scale(1) translateY(0)',
            }}
          >
            {/* Paper cards peeking out of the top */}
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 pointer-events-none transition-transform duration-500"
              style={{
                transform: folderHovered ? 'translateX(-50%) translateY(-14px)' : 'translateX(-50%) translateY(0)',
              }}
            >
              <div className="w-16 h-20 rounded-md bg-white shadow-md border border-[rgba(44,41,38,0.1)] p-1.5 -rotate-6 transform origin-bottom">
                <div className="w-full h-2 bg-[#F8C2A8] rounded-sm mb-1" />
                <div className="w-3/4 h-1 bg-gray-200 rounded-sm mb-1" />
              </div>
              <div className="w-20 h-24 rounded-md bg-[#FAF8F5] shadow-lg border border-[rgba(44,41,38,0.15)] p-2 z-10">
                <div className="w-full h-3 bg-[#0047FF] rounded-sm mb-1.5" />
                <div className="w-full h-1 bg-gray-300 rounded-sm mb-1" />
                <div className="w-4/5 h-1 bg-gray-200 rounded-sm" />
              </div>
              <div className="w-16 h-20 rounded-md bg-white shadow-md border border-[rgba(44,41,38,0.1)] p-1.5 rotate-6 transform origin-bottom">
                <div className="w-full h-2 bg-[#EE9068] rounded-sm mb-1" />
                <div className="w-2/3 h-1 bg-gray-200 rounded-sm" />
              </div>
            </div>

            {/* Folder Body: Glossy Electric-Blue */}
            <div
              className="relative w-72 sm:w-80 h-48 sm:h-52 rounded-2xl flex flex-col justify-between p-6 overflow-hidden shadow-folder border border-blue-400"
              style={{
                background: 'linear-gradient(145deg, #0A53FF 0%, #0036C8 100%)',
              }}
            >
              {/* Glossy specular reflection */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                style={{ transform: 'skewX(-20deg) translateX(-10%)' }}
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest text-blue-200 uppercase">
                  CONFIDENTIAL • 2026
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-300" />
              </div>

              <div>
                <h3
                  className="text-white text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Portfolio
                </h3>
                <p className="text-blue-100 text-xs mt-1">
                  Click to open complete dossier
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-blue-200 pt-2 border-t border-blue-500/50">
                <span>Direct Access</span>
                <span>4K Specimen</span>
              </div>

              {/* Folder Flap tilting in 3D perspective as cursor hovers */}
              <div
                className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl pointer-events-none transition-transform duration-500 origin-top"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
                  transform: folderHovered ? 'rotateX(-25deg)' : 'rotateX(0deg)',
                }}
              />
            </div>

            {/* Custom Peach Circle Cursor with White Arrow on Hover */}
            <div
              className="absolute pointer-events-none z-30 transition-all duration-300"
              style={{
                right: '-12px',
                bottom: '-12px',
                opacity: folderHovered ? 1 : 0,
                transform: folderHovered ? 'scale(1.1)' : 'scale(0.8)',
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: '#EE9068',
                  boxShadow: '0 8px 24px rgba(238, 144, 104, 0.45)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHOT 6: FULL-SCREEN WARM-GREY WIPE MODAL */}
      {/* ========================================================================= */}
      {showWipe && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center p-6 text-center"
          style={{
            backgroundColor: '#2A2724',
            animation: 'fadeIn 0.4s ease-out forwards',
          }}
        >
          {/* Thin peach loading bar growing from top-left corner */}
          <div
            className="absolute top-0 left-0 h-[3px] transition-all duration-100"
            style={{
              backgroundColor: '#F4A582',
              width: `${wipeProgress}%`,
              boxShadow: '0 0 14px rgba(244, 165, 130, 0.9)',
            }}
          />

          {/* Close button */}
          <button
            onClick={closeWipe}
            className="absolute top-8 right-8 text-white/70 hover:text-white text-sm font-mono uppercase tracking-widest cursor-pointer px-4 py-2 rounded-full border border-white/20"
          >
            ✕ Close Dossier
          </button>

          {/* Centered Small Peach Text: "[First] • [Last]" -> "SANDEEP • SAWANT" */}
          <div className="max-w-xl mx-auto">
            <p
              className="text-sm md:text-base tracking-[0.35em] font-medium uppercase mb-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: '#F4A582',
              }}
            >
              SANDEEP • SAWANT
            </p>

            <h2 className="text-3xl md:text-5xl text-white font-light mb-6">
              Complete Portfolio Dossier
            </h2>

            <p className="text-sm text-gray-300 mb-8 leading-relaxed">
              Curated collection of 12 production design systems, spatial WebGL prototypes, and brand architectures.
            </p>

            {/* Quick access cards in dossier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    closeWipe();
                    onOpenWorkModal(p);
                  }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] font-mono text-[#F4A582] uppercase">{p.tag}</span>
                  <h4 className="text-base font-semibold text-white mt-1">{p.title}</h4>
                  <span className="text-xs text-blue-300 mt-2 block">Open Live Prototype →</span>
                </div>
              ))}
            </div>

            <button
              onClick={closeWipe}
              className="px-8 py-3 rounded-full bg-[#F4A582] text-[#2A2724] font-semibold text-xs font-mono uppercase tracking-widest hover:bg-[#ffbda1] transition-colors cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTACT SECTION */}
      {/* ========================================================================= */}
      <section id="contact-section" className="py-28 px-6 sm:px-12 max-w-4xl mx-auto border-t border-[rgba(44,41,38,0.08)]">
        <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-daylight border border-[rgba(44,41,38,0.08)]">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono tracking-widest text-[#EE9068] uppercase">Initiate Dialogue</span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1C1A17] mt-1" style={{ fontFamily: "'Syne', sans-serif" }}>
              Let's craft your next digital milestone.
            </h2>
            <p className="text-sm text-[#7D766C] mt-2">
              Accepting select web design, branding, and Webflow/Framer engagements for Q2/Q3 2026.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-emerald-200">
              <span className="text-3xl text-emerald-600 font-bold">✓</span>
              <h4 className="text-lg font-bold text-[#1C1A17] mt-2">Inquiry Received</h4>
              <p className="text-sm text-[#6C665D] mt-1">
                Thank you. Sandeep will review your brief and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#7D766C] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[rgba(44,41,38,0.1)] text-sm focus:outline-none focus:border-[#EE9068]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#7D766C] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[rgba(44,41,38,0.1)] text-sm focus:outline-none focus:border-[#EE9068]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#7D766C] mb-1">Project Scope</label>
                <select className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[rgba(44,41,38,0.1)] text-sm focus:outline-none focus:border-[#EE9068]">
                  <option>Full Website Redesign & Webflow / Framer</option>
                  <option>Visual Brand Identity & Design System</option>
                  <option>Spatial Web & 3D Interactive Experience</option>
                  <option>Strategic Art Direction & Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#7D766C] mb-1">Project Details</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Share a brief overview of your goals, timeline, and aesthetic ambition..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[rgba(44,41,38,0.1)] text-sm focus:outline-none focus:border-[#EE9068]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white font-medium text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer"
                style={{ backgroundColor: '#0047FF' }}
              >
                Send Direct Brief →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER WITH COMPLIANCE & LEGAL (Items #26 & #27 in Meme) */}
      {/* ========================================================================= */}
      <footer className="py-12 px-6 sm:px-12 border-t border-[rgba(44,41,38,0.08)] bg-[#FAF8F5] text-xs text-[#8A847A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-[#1C1A17]" style={{ fontFamily: "'Syne', sans-serif" }}>
              SANDEEP SAWANT
            </span>
            <span>•</span>
            <span>Independent Art Director & Web Architect</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-[#1C1A17] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-[#1C1A17] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          <div className="font-mono text-[11px]">
            © {new Date().getFullYear()} SANDEEP SAWANT. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InteractivePortfolio;
