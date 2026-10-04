import React, { useState, useEffect, useRef } from 'react';
import Clay3DCanvas from './Clay3DCanvas';
import { ambientSound } from './AudioEngine';

// Import local assets
import showcaseLanding from '../assets/showcase-landing.jpg';
import showcaseBranding from '../assets/showcase-branding.jpg';
import showcaseWebflow from '../assets/showcase-webflow.jpg';
import logoImg from '../assets/Logo.png';
import astraImg from '../assets/Astra.png';
import sandeepImg from '../assets/sandeep.png';

const CinematicShowcase = ({ onExitCinema, onOpenWorkModal, onOpenContactModal }) => {
  // Cinema state: time from 0 to 24 seconds
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isLetterbox, setIsLetterbox] = useState(true);
  const [activeTab, setActiveTab] = useState('Work');
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [folderHovered, setFolderHovered] = useState(false);
  const [wipeComplete, setWipeComplete] = useState(false);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimestampRef = useRef(null);

  // Playback loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      return;
    }

    const step = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaSec = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      setTime((prev) => {
        const next = prev + deltaSec * speedMultiplier;
        if (next >= 24) {
          setIsPlaying(false);
          return 24;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, speedMultiplier]);

  // Audio sync
  const toggleSound = () => {
    const next = ambientSound.toggle();
    setSoundEnabled(next);
  };

  // Determine current shot
  // SHOT 1: 0 - 4s
  // SHOT 2: 4 - 8s
  // SHOT 3: 8 - 12s
  // SHOT 4: 12 - 17s
  // SHOT 5: 17 - 22s
  // SHOT 6: 22 - 24s
  const currentShot =
    time < 4 ? 1 :
    time < 8 ? 2 :
    time < 12 ? 3 :
    time < 17 ? 4 :
    time < 22 ? 5 : 6;

  // Shot 2 progress (0 to 1) for 3D clay canvas
  const shot2Progress = Math.max(0, Math.min(1, (time - 4) / 4));

  // Word-by-word fill calculation for Shot 3 (8 - 12s)
  const shot3Progress = Math.max(0, Math.min(1, (time - 8) / 3.5));
  const headlineWords = ["I", "help", "companies", "to", "succeed", "on", "projects", "like:"];
  const filledWordsCount = Math.floor(shot3Progress * headlineWords.length);

  // Shot 5 cursor and folder interaction (17 - 22s)
  const shot5Progress = Math.max(0, Math.min(1, (time - 17) / 5));
  const isCursorOverFolder = time >= 18.8 && time < 22;

  // Jump to specific shot
  const jumpToShot = (shotNum) => {
    const shotTimes = [0, 0, 4.01, 8.01, 12.01, 17.01, 22.01];
    setTime(shotTimes[shotNum]);
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        backgroundColor: '#F9F6EF',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Soft blurred peach glow around screen edges */}
      <div
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-1000"
        style={{
          boxShadow: 'inset 0 0 140px 30px rgba(244, 165, 130, 0.22)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Cinematic 16:9 Letterbox Bars */}
      {isLetterbox && (
        <>
          <div
            className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-700"
            style={{
              height: '3.5vh',
              backgroundColor: '#161513',
            }}
          />
          <div
            className="fixed bottom-0 left-0 w-full z-50 pointer-events-none transition-all duration-700"
            style={{
              height: '3.5vh',
              backgroundColor: '#161513',
            }}
          />
        </>
      )}

      {/* Top Navigation Pill (Visible in Shot 1, 2, 3, 4, 5) */}
      <header
        className="fixed top-5 left-0 w-full z-45 px-8 flex items-center justify-between pointer-events-auto transition-all duration-700"
        style={{
          opacity: time >= 22 ? 0 : 1,
          transform: isLetterbox ? 'translateY(3.5vh)' : 'translateY(0)',
        }}
      >
        {/* Left minimal branding */}
        <div className="flex items-center space-x-3">
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.12em',
              color: '#2C2926',
              textTransform: 'uppercase',
            }}
          >
            SANDEEP SAWANT
          </span>
          <span className="hidden md:inline-block text-[11px] text-[#9A9388] font-mono">/ STUDIO</span>
        </div>

        {/* Small frosted-glass navigation pill: "About / Work" */}
        <nav
          className="flex items-center px-4 py-1.5 rounded-full"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(44, 41, 38, 0.08)',
            boxShadow: '0 8px 24px -6px rgba(44, 41, 38, 0.06)',
          }}
        >
          <button
            onClick={() => setActiveTab('About')}
            className="text-[12px] font-medium px-2 py-0.5 transition-colors"
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
              jumpToShot(3);
            }}
            className="text-[12px] font-medium px-2 py-0.5 transition-colors"
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
            onClick={() => jumpToShot(5)}
            className="hidden sm:inline-block text-[#6D675E] hover:text-[#1B1917] transition-colors"
          >
            Archive
          </button>
          <button
            onClick={onOpenContactModal}
            className="text-[#6D675E] hover:text-[#1B1917] transition-colors"
          >
            Contact
          </button>
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 text-[11px] font-mono uppercase px-2.5 py-1 rounded-full border border-[rgba(44,41,38,0.12)] text-[#58534C] hover:bg-white transition-all"
            title="Toggle Ambient Daylight Sound"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: soundEnabled ? '#0047FF' : '#A8A298' }}
            />
            <span>Sound {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SHOT 1 (0 - 4s): Full-Screen Hero */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 flex flex-col justify-between"
        style={{
          opacity: time < 4.2 ? 1 : Math.max(0, 1 - (time - 4.2) * 1.5),
          transform: `scale(${1 - Math.max(0, time - 3.8) * 0.04}) translateY(-${Math.max(0, time - 4) * 80}px)`,
          pointerEvents: time < 4.5 ? 'auto' : 'none',
          zIndex: 10,
        }}
      >
        {/* Background Looping Scene with Warm Peach Tint */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Natural daylight studio canvas with subtle designer desk silhouette */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${showcaseLanding})`,
              filter: 'brightness(1.02) contrast(0.92) saturate(0.85)',
              transform: `scale(${1 + time * 0.015})`,
              transition: 'transform 0.1s linear',
            }}
          />
          {/* Warm peach daylight tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(249, 218, 203, 0.45)',
              mixBlendMode: 'color-burn',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.5) 0%, rgba(249, 246, 239, 0.85) 80%)',
            }}
          />
        </div>

        {/* Hero Central Micro Headline */}
        <div className="relative z-10 pt-28 px-10 max-w-2xl">
          <p
            className="text-[13px] uppercase tracking-widest text-[#7D766A] font-medium mb-2"
            style={{
              opacity: Math.min(1, time * 1.5),
              transform: `translateY(${Math.max(0, 15 - time * 15)}px)`,
              transition: 'opacity 0.6s, transform 0.6s',
            }}
          >
            Digital Art Director & Spatial Web Architect
          </p>
          <h2
            className="text-2xl md:text-3xl font-light text-[#2C2926] leading-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              opacity: Math.min(1, Math.max(0, (time - 0.5) * 1.5)),
            }}
          >
            Designing tactile digital experiences bathed in natural daylight.
          </h2>
        </div>

        {/* Hero Bottom Giant Peach Name with Mask Reveal & Pill Sketch Window */}
        <div className="relative z-10 px-8 pb-14 w-full">
          <div className="overflow-hidden flex items-end justify-between flex-wrap gap-4 border-b border-[rgba(238,144,104,0.3)] pb-6">
            {/* Giant Name with Pill Window */}
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
              {/* SANDEEP with clean mask reveal */}
              <div className="overflow-hidden">
                <h1
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(3rem, 9.5vw, 9.8rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#EE9068',
                    transform: `translateY(${Math.max(0, 100 - time * 85)}%)`,
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  SANDEEP
                </h1>
              </div>

              {/* Rounded pill-shaped window between the two words showing a hand sketching a logo */}
              <div
                className="relative overflow-hidden rounded-full shadow-clay border-2 border-white"
                style={{
                  width: 'clamp(70px, 9vw, 130px)',
                  height: 'clamp(36px, 4.5vw, 68px)',
                  backgroundColor: '#FFFFFF',
                  transform: `scale(${Math.min(1, Math.max(0, (time - 0.6) * 1.8))})`,
                  transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Looping sketch animation */}
                <svg
                  viewBox="0 0 140 70"
                  className="w-full h-full"
                  style={{ backgroundColor: '#FAF7F2' }}
                >
                  {/* Subtle draft grid */}
                  <line x1="20" y1="35" x2="120" y2="35" stroke="#E6E0D5" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="70" cy="35" r="22" stroke="#E6E0D5" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />

                  {/* Logo monogram being drawn */}
                  <path
                    d="M 52 46 C 52 30, 68 22, 70 22 C 72 22, 88 30, 88 46"
                    fill="none"
                    stroke="#EE9068"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeDasharray="90"
                    strokeDashoffset={Math.max(0, 90 - (time % 3) * 45)}
                  />
                  <path
                    d="M 58 36 L 82 36"
                    fill="none"
                    stroke="#0047FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Stylized pencil / hand cursor indicator */}
                  <g transform={`translate(${65 + Math.sin(time * 3) * 18}, ${35 + Math.cos(time * 3) * 10})`}>
                    <line x1="0" y1="0" x2="14" y2="-14" stroke="#2B2824" strokeWidth="2.2" strokeLinecap="round" />
                    <polygon points="0,0 2,-6 6,-2" fill="#EE9068" />
                  </g>
                </svg>
              </div>

              {/* SAWANT with clean mask reveal */}
              <div className="overflow-hidden">
                <h1
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(3rem, 9.5vw, 9.8rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#EE9068',
                    transform: `translateY(${Math.max(0, 100 - time * 85)}%)`,
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                  }}
                >
                  SAWANT
                </h1>
              </div>
            </div>

            {/* Blue 'Work' Button with Camera Zoom Focus in Shot 1 */}
            <div
              className="relative"
              style={{
                transform:
                  time > 2.8 && time < 4.2
                    ? `scale(${1 + (time - 2.8) * 0.45})`
                    : 'scale(1)',
                transition: 'transform 0.4s ease-out',
              }}
            >
              <button
                id="hero-work-btn"
                onClick={() => jumpToShot(3)}
                className="relative px-8 py-4 rounded-full text-white font-medium text-[15px] tracking-wide shadow-folder transition-transform active:scale-95 flex items-center space-x-2"
                style={{
                  backgroundColor: '#0047FF',
                  boxShadow: '0 12px 32px rgba(0, 71, 255, 0.35)',
                }}
              >
                <span>Work</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>

                {/* Animated click ripple simulated during 3.4s - 3.9s */}
                {time >= 3.4 && time <= 4.0 && (
                  <span
                    className="absolute inset-0 rounded-full border-2 border-white animate-ping pointer-events-none"
                    style={{ animationDuration: '0.6s' }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHOT 2 (4 - 8s): Downward Scroll & 3D Clay Shapes Parallax */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
        style={{
          opacity: time >= 3.8 && time <= 8.5 ? (time < 4.2 ? (time - 3.8) * 2.5 : time > 7.6 ? Math.max(0, 1 - (time - 7.6) * 2) : 1) : 0,
          transform: `translateY(${Math.max(-100, Math.min(100, (6 - time) * 35))}px)`,
          zIndex: 15,
        }}
      >
        {/* Large grey text appearing line by line:
            "16 years making users click and scroll my designs"
            "click" inside a peach pill highlight
            "scroll" is peach with thin vertical peach line running down
        */}
        <div className="max-w-4xl mx-auto z-20">
          <p
            className="text-xs font-mono uppercase tracking-widest text-[#968F84] mb-4"
            style={{
              opacity: time >= 4.2 ? 1 : 0,
              transform: `translateY(${time >= 4.2 ? 0 : 15}px)`,
              transition: 'opacity 0.5s, transform 0.5s',
            }}
          >
            Experience & Creative Direction
          </p>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#3C3833] leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span
              className="inline-block transition-all duration-700"
              style={{
                opacity: time >= 4.3 ? 1 : 0,
                transform: `translateY(${time >= 4.3 ? 0 : 25}px)`,
              }}
            >
              16 years making users
            </span>{' '}
            {/* "click" in peach pill */}
            <span
              className="inline-flex items-center px-4 py-0.5 rounded-full text-[#1C1A17] font-semibold transition-all duration-700 mx-2 shadow-sm"
              style={{
                backgroundColor: '#F8C2A8',
                border: '1px solid rgba(238, 144, 104, 0.4)',
                opacity: time >= 4.7 ? 1 : 0,
                transform: `scale(${time >= 4.7 ? 1 : 0.8})`,
              }}
            >
              click
            </span>{' '}
            <span
              className="inline-block transition-all duration-700"
              style={{
                opacity: time >= 5.0 ? 1 : 0,
                transform: `translateY(${time >= 5.0 ? 0 : 25}px)`,
              }}
            >
              and
            </span>{' '}
            {/* "scroll" is peach with thin vertical peach line running down */}
            <span className="relative inline-block mx-1">
              <span
                style={{
                  color: '#EE9068',
                  fontWeight: 700,
                  opacity: time >= 5.2 ? 1 : 0,
                  transition: 'opacity 0.6s',
                }}
              >
                scroll
              </span>
              {/* Thin vertical peach line running down */}
              <span
                className="absolute left-1/2 -bottom-16 w-[1.5px] -translate-x-1/2 transition-all duration-1000"
                style={{
                  height: time >= 5.3 ? '60px' : '0px',
                  backgroundColor: '#EE9068',
                }}
              />
            </span>{' '}
            <span
              className="inline-block transition-all duration-700"
              style={{
                opacity: time >= 5.5 ? 1 : 0,
                transform: `translateY(${time >= 5.5 ? 0 : 25}px)`,
              }}
            >
              my designs
            </span>
          </h2>
        </div>
      </div>

      {/* 3D Clay Canvas Rendering in Shot 2 (and available globally) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: time >= 3.6 && time <= 8.5 ? 1 : 0,
          transition: 'opacity 0.8s',
          zIndex: 12,
        }}
      >
        <Clay3DCanvas progress={shot2Progress} isCinematic={true} interactive={false} />
      </div>

      {/* ========================================================================= */}
      {/* SHOT 3 (8 - 12s): Headline Word Fill & "Websites & Landing pages" */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center px-6 overflow-hidden"
        style={{
          opacity: time >= 7.8 && time <= 12.4 ? (time < 8.2 ? (time - 7.8) * 2.5 : time > 11.8 ? Math.max(0, 1 - (time - 11.8) * 2) : 1) : 0,
          transform: `translateY(${Math.max(-80, Math.min(80, (10 - time) * 30))}px)`,
          pointerEvents: time >= 8 && time <= 12 ? 'auto' : 'none',
          zIndex: 16,
        }}
      >
        {/* Giant headline: "I help companies to succeed on projects like:" fills word by word */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-light leading-tight tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {headlineWords.map((word, idx) => {
              const isFilled = idx <= filledWordsCount;
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

          {/* Centered Sub-headline: "Websites & Landing pages" */}
          <div
            className="mt-4 transition-all duration-700"
            style={{
              opacity: time >= 9.2 ? 1 : 0,
              transform: `translateY(${time >= 9.2 ? 0 : 20}px)`,
            }}
          >
            <span
              className="text-lg md:text-xl font-medium tracking-wide px-5 py-1.5 rounded-full inline-block"
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

        {/* Row of five rounded thumbnails of colorful website designs sliding up with staggered rhythm */}
        <div
          className="w-full max-w-6xl mx-auto flex items-center justify-center gap-4 sm:gap-6 px-4"
          style={{
            transform: `translateY(${time >= 11.2 ? -30 : 0}px)`,
            transition: 'transform 0.8s ease-in-out',
          }}
        >
          {[
            { title: 'Aura Architecture', img: showcaseLanding, tag: 'Studio & Living', color: '#E89065' },
            { title: 'Lumina Spatial OS', img: astraImg, tag: 'Digital Flagship', color: '#0047FF' },
            { title: 'Komorebi Tea House', img: showcaseBranding, tag: 'Editorial Commerce', color: '#2B2824' },
            { title: 'Forma Type Laboratory', img: showcaseWebflow, tag: 'Interactive Tool', color: '#D47E5B' },
            { title: 'Sandeep Design Systems', img: sandeepImg, tag: 'Identity & Tokens', color: '#0047FF' },
          ].map((item, index) => {
            // Staggered slide up threshold: 9.4s, 9.6s, 9.8s, 10.0s, 10.2s
            const delay = 9.4 + index * 0.18;
            const isVisible = time >= delay;
            const isFadeOut = time >= 11.5;

            return (
              <div
                key={index}
                onClick={() => onOpenWorkModal(item)}
                className="group relative flex-1 cursor-pointer transition-all duration-700"
                style={{
                  opacity: isFadeOut ? Math.max(0, 1 - (time - 11.5) * 2) : isVisible ? 1 : 0,
                  transform: isFadeOut
                    ? 'translateY(-40px) scale(0.96)'
                    : isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(80px) scale(0.92)',
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden shadow-daylight bg-white border border-[rgba(44,41,38,0.08)] transition-transform duration-500 group-hover:scale-105"
                  style={{ aspectRatio: '16/10' }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                    <p className="text-[11px] font-mono uppercase tracking-wider">{item.tag}</p>
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-[#4A453D] truncate">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHOT 4 (12 - 17s): "Visual Branding", "Product Design Enhancement", "Webflow & Framer" with Selection Frames */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center px-6 overflow-hidden"
        style={{
          opacity: time >= 11.8 && time <= 17.3 ? (time < 12.3 ? (time - 11.8) * 2 : time > 16.7 ? Math.max(0, 1 - (time - 16.7) * 2) : 1) : 0,
          transform: `translateY(${Math.max(-60, Math.min(60, (14.5 - time) * 20))}px)`,
          pointerEvents: time >= 12 && time <= 17 ? 'auto' : 'none',
          zIndex: 17,
        }}
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* Sub-phase A: Visual Branding (12 - 14s) */}
          <div
            className="w-full text-center transition-all duration-700"
            style={{
              display: time < 14.5 ? 'block' : 'none',
              opacity: time < 14.2 ? 1 : Math.max(0, 1 - (time - 14.2) * 3),
            }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-[#FAF3EC] text-[#EE9068] text-xs font-mono uppercase tracking-widest mb-3 border border-[rgba(238,144,104,0.3)]">
              Discipline 01
            </div>
            <h3
              className="text-3xl md:text-5xl font-light text-[#2C2926] mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Visual Branding
            </h3>

            {/* Visual Branding Cards: Posters, packaging, typography */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div
                className="rounded-2xl overflow-hidden shadow-daylight bg-white border border-[rgba(44,41,38,0.08)] transition-all duration-700"
                style={{
                  transform: `translateY(${time >= 12.3 ? 0 : 50}px)`,
                  opacity: time >= 12.3 ? 1 : 0,
                }}
              >
                <img src={showcaseBranding} alt="Tactile Packaging" className="w-full h-44 object-cover" />
                <div className="p-4 text-left">
                  <span className="text-[10px] font-mono text-[#EE9068] uppercase">Packaging & Identity</span>
                  <h4 className="text-sm font-semibold text-[#2C2926]">Aura Studio Guidelines</h4>
                </div>
              </div>

              <div
                className="rounded-2xl overflow-hidden shadow-daylight bg-white border border-[rgba(44,41,38,0.08)] transition-all duration-700"
                style={{
                  transform: `translateY(${time >= 12.6 ? 0 : 50}px)`,
                  opacity: time >= 12.6 ? 1 : 0,
                }}
              >
                <div className="w-full h-44 bg-[#F2EDE2] flex items-center justify-center p-6">
                  <img src={logoImg} alt="Monogram Mark" className="max-h-24 object-contain filter drop-shadow-sm" />
                </div>
                <div className="p-4 text-left">
                  <span className="text-[10px] font-mono text-[#0047FF] uppercase">Bespoke Logomark</span>
                  <h4 className="text-sm font-semibold text-[#2C2926]">Precision Geometric Monogram</h4>
                </div>
              </div>

              <div
                className="rounded-2xl overflow-hidden shadow-daylight bg-white border border-[rgba(44,41,38,0.08)] transition-all duration-700"
                style={{
                  transform: `translateY(${time >= 12.9 ? 0 : 50}px)`,
                  opacity: time >= 12.9 ? 1 : 0,
                }}
              >
                <img src={showcaseLanding} alt="Editorial Posters" className="w-full h-44 object-cover" />
                <div className="p-4 text-left">
                  <span className="text-[10px] font-mono text-[#2C2926] uppercase">Editorial Layout</span>
                  <h4 className="text-sm font-semibold text-[#2C2926]">Architectural Publication</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-phase B: "Webflow & Framer" with thin blue selection frames like a design tool (14.5 - 17s) */}
          <div
            className="w-full text-center transition-all duration-700"
            style={{
              display: time >= 14.2 ? 'block' : 'none',
              opacity: time >= 14.5 ? 1 : 0,
            }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#0047FF] text-xs font-mono uppercase tracking-widest mb-3 border border-blue-200">
              Engineering & Micro-Interactions
            </div>

            {/* "Webflow & Framer" wrapped in a realistic design tool selection frame */}
            <div className="relative inline-block my-4 p-8">
              {/* Thin blue bounding box */}
              <div
                className="absolute inset-2 border border-[#0047FF] pointer-events-none transition-all duration-500"
                style={{
                  boxShadow: '0 0 0 1px rgba(0, 71, 255, 0.1), 0 8px 24px -4px rgba(0, 71, 255, 0.15)',
                }}
              >
                {/* 4 Corner Anchor Handles */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#0047FF]" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#0047FF]" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#0047FF]" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#0047FF]" />

                {/* Floating Tag: "Webflow & Framer [Auto-Layout]" */}
                <div className="absolute -top-6 left-0 bg-[#0047FF] text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                  <span>Interactive Component • 120fps</span>
                </div>

                {/* Dimensions badge */}
                <div className="absolute -bottom-6 right-0 text-[#0047FF] text-[10px] font-mono">
                  W: 840px H: 220px
                </div>
              </div>

              <h3
                className="text-4xl md:text-6xl font-semibold text-[#1C1A17] tracking-tight relative z-10 px-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Webflow & Framer
              </h3>
            </div>

            {/* Product Design Enhancement Screens */}
            <div className="max-w-2xl mx-auto mt-6">
              <p className="text-sm md:text-base text-[#6E685F] max-w-xl mx-auto leading-relaxed">
                Zero-compromise visual engineering. Custom GSAP timelines, WebGL physics, and frictionless publishing with pristine Lighthouse 100 performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHOT 5 (17 - 22s): Gigantic Faded-Peach "Work" & Glossy Blue 3D Folder */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden"
        style={{
          opacity: time >= 16.8 && time <= 22.3 ? (time < 17.4 ? (time - 16.8) * 1.6 : time > 21.8 ? Math.max(0, 1 - (time - 21.8) * 5) : 1) : 0,
          pointerEvents: time >= 17 && time <= 22 ? 'auto' : 'none',
          zIndex: 18,
        }}
      >
        {/* Gigantic Faded-Peach "Work" cropped by screen edges */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{
            transform: `scale(${1 + (time - 17) * 0.03})`,
            transition: 'transform 0.1s linear',
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '44vw',
              lineHeight: 0.8,
              letterSpacing: '-0.06em',
              color: '#F4A582',
              opacity: 0.16,
              transform: 'translateY(-2%)',
            }}
          >
            WORK
          </span>
        </div>

        {/* Center Content: "Curious?... Check out my" above glossy electric-blue 3D folder */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <p
            className="text-sm md:text-base font-mono uppercase tracking-widest text-[#7C756B] mb-6"
            style={{
              opacity: time >= 17.3 ? 1 : 0,
              transform: `translateY(${time >= 17.3 ? 0 : 15}px)`,
              transition: 'opacity 0.6s, transform 0.6s',
            }}
          >
            Curious?... Check out my
          </p>

          {/* Glossy Electric-Blue 3D Folder labeled "Portfolio" */}
          <div
            id="portfolio-folder"
            onClick={() => jumpToShot(6)}
            onMouseEnter={() => setFolderHovered(true)}
            onMouseLeave={() => setFolderHovered(false)}
            className="relative cursor-pointer transition-transform duration-500"
            style={{
              perspective: '1000px',
              transform:
                isCursorOverFolder || folderHovered
                  ? 'scale(1.08) translateY(-8px)'
                  : 'scale(1) translateY(0)',
            }}
          >
            {/* Paper cards peeking out of the top */}
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 pointer-events-none transition-transform duration-500"
              style={{
                transform:
                  isCursorOverFolder || folderHovered
                    ? 'translateX(-50%) translateY(-14px)'
                    : 'translateX(-50%) translateY(0)',
              }}
            >
              {/* Paper card 1 */}
              <div
                className="w-16 h-20 rounded-md bg-white shadow-md border border-[rgba(44,41,38,0.1)] p-1.5 -rotate-6 transform origin-bottom"
              >
                <div className="w-full h-2 bg-[#F8C2A8] rounded-sm mb-1" />
                <div className="w-3/4 h-1 bg-gray-200 rounded-sm mb-1" />
                <div className="w-1/2 h-1 bg-gray-200 rounded-sm" />
              </div>
              {/* Paper card 2 (center) */}
              <div
                className="w-20 h-24 rounded-md bg-[#FAF8F5] shadow-lg border border-[rgba(44,41,38,0.15)] p-2 z-10"
              >
                <div className="w-full h-3 bg-[#0047FF] rounded-sm mb-1.5" />
                <div className="w-full h-1 bg-gray-300 rounded-sm mb-1" />
                <div className="w-4/5 h-1 bg-gray-200 rounded-sm mb-1" />
                <div className="w-2/3 h-1 bg-gray-200 rounded-sm" />
              </div>
              {/* Paper card 3 */}
              <div
                className="w-16 h-20 rounded-md bg-white shadow-md border border-[rgba(44,41,38,0.1)] p-1.5 rotate-6 transform origin-bottom"
              >
                <div className="w-full h-2 bg-[#EE9068] rounded-sm mb-1" />
                <div className="w-2/3 h-1 bg-gray-200 rounded-sm mb-1" />
                <div className="w-1/2 h-1 bg-gray-200 rounded-sm" />
              </div>
            </div>

            {/* Folder Body: Glossy Electric-Blue */}
            <div
              className="relative w-72 sm:w-80 h-48 sm:h-52 rounded-2xl flex flex-col justify-between p-6 overflow-hidden shadow-folder border border-blue-400"
              style={{
                backgroundColor: '#0047FF',
                background: 'linear-gradient(145deg, #0A53FF 0%, #0036C8 100%)',
              }}
            >
              {/* Glossy specular highlight */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                style={{ transform: 'skewX(-20deg) translateX(-10%)' }}
              />

              {/* Folder tab notch */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest text-blue-200 uppercase">
                  CONFIDENTIAL • 2026
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-300" />
              </div>

              {/* Folder Label */}
              <div>
                <h3
                  className="text-white text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Portfolio
                </h3>
                <p className="text-blue-100 text-xs mt-1">
                  12 Curated Case Studies & Prototypes
                </p>
              </div>

              {/* Folder bottom badge */}
              <div className="flex items-center justify-between text-[11px] text-blue-200 pt-2 border-t border-blue-500/50">
                <span>Click to Open Dossier</span>
                <span>4K Specimen</span>
              </div>

              {/* Folder Flap that tilts slightly as cursor hovers */}
              <div
                className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl pointer-events-none transition-transform duration-500 origin-top"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
                  transform:
                    isCursorOverFolder || folderHovered
                      ? 'rotateX(-25deg)'
                      : 'rotateX(0deg)',
                }}
              />
            </div>

            {/* Virtual cursor drifting over folder and becoming a peach circle with white arrow */}
            <div
              className="absolute pointer-events-none z-30 transition-all duration-700"
              style={{
                left: isCursorOverFolder ? '52%' : '80%',
                top: isCursorOverFolder ? '60%' : '110%',
                transform: 'translate(-50%, -50%)',
                opacity: time >= 18.2 && time <= 22 ? 1 : 0,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300"
                style={{
                  backgroundColor: '#EE9068',
                  boxShadow: '0 8px 24px rgba(238, 144, 104, 0.45)',
                  transform: isCursorOverFolder ? 'scale(1.15)' : 'scale(1)',
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
      </div>

      {/* ========================================================================= */}
      {/* SHOT 6 (22 - 24s): Full-Screen Warm-Grey Wipe & Thin Peach Loading Bar */}
      {/* ========================================================================= */}
      <div
        className="fixed inset-0 flex flex-col justify-center items-center pointer-events-auto"
        style={{
          backgroundColor: '#2A2724',
          zIndex: 35,
          opacity: time >= 21.9 ? 1 : 0,
          transform: `translateY(${time >= 21.9 ? 0 : 100}%)`,
          transition: 'transform 0.65s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.3s',
        }}
      >
        {/* Thin peach loading bar growing from top-left corner */}
        <div
          className="absolute top-0 left-0 h-[2.5px] transition-all duration-300"
          style={{
            backgroundColor: '#F4A582',
            width: `${Math.min(100, Math.max(0, (time - 22) / 1.8) * 100)}%`,
            boxShadow: '0 0 12px rgba(244, 165, 130, 0.8)',
          }}
        />

        {/* Small peach text: "[First] • [Last]" -> "SANDEEP • SAWANT" */}
        <div className="text-center px-6">
          <p
            className="text-sm md:text-base tracking-[0.25em] font-medium uppercase mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: '#F4A582',
              letterSpacing: '0.35em',
            }}
          >
            SANDEEP • SAWANT
          </p>
          <h2 className="text-2xl md:text-4xl text-white font-light mb-8 max-w-lg mx-auto">
            Ready to craft your brand's next digital milestone?
          </h2>

          {/* Interactive options upon completion */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setTime(0);
                setIsPlaying(true);
              }}
              className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-[#2A2724] bg-[#F4A582] hover:bg-[#ffbfa3] transition-colors font-semibold"
            >
              ↺ Replay 4K Showcase
            </button>
            <button
              onClick={onExitCinema}
              className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-white border border-[rgba(255,255,255,0.2)] hover:bg-white/10 transition-colors"
            >
              Explore Full Site Manually →
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Floating Director's HUD Controller */}
      {/* ========================================================================= */}
      <footer
        className="fixed bottom-4 left-0 w-full z-45 px-6 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto"
        style={{
          transform: isLetterbox ? 'translateY(-3.5vh)' : 'translateY(0)',
          transition: 'transform 0.5s',
        }}
      >
        {/* Left: Camera metadata HUD */}
        <div className="flex items-center space-x-3 text-[11px] font-mono text-[#7D766A]">
          <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[rgba(44,41,38,0.08)]">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                backgroundColor: isPlaying ? '#EF4444' : '#9CA3AF',
                animation: isPlaying ? 'pulse 1.5s infinite' : 'none',
              }}
            />
            <span className="font-semibold text-[#1C1A17]">4K REC</span>
            <span>60FPS</span>
          </span>

          <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[rgba(44,41,38,0.08)]">
            {currentShot === 1 && 'SHOT 1 • FULL-SCREEN HERO'}
            {currentShot === 2 && 'SHOT 2 • 3D CLAY PARALLAX'}
            {currentShot === 3 && 'SHOT 3 • LANDING PAGES'}
            {currentShot === 4 && 'SHOT 4 • BRANDING & TOOLS'}
            {currentShot === 5 && 'SHOT 5 • GLOSSY 3D FOLDER'}
            {currentShot === 6 && 'SHOT 6 • WARM GREY WIPE'}
          </span>
        </div>

        {/* Center: Playback & Timeline Controls */}
        <div
          className="flex items-center space-x-3 px-4 py-2 rounded-full shadow-sm"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(44, 41, 38, 0.08)',
          }}
        >
          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-[#2C2926] text-white hover:bg-black transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>

          {/* Time Scrubber */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono text-[#5C564C] w-9">
              {time < 10 ? `0${time.toFixed(1)}s` : `${time.toFixed(1)}s`}
            </span>
            <input
              type="range"
              min="0"
              max="24"
              step="0.1"
              value={time}
              onChange={(e) => {
                setTime(parseFloat(e.target.value));
              }}
              className="w-24 sm:w-44 accent-[#EE9068] cursor-pointer h-1.5 rounded-full"
            />
            <span className="text-[11px] font-mono text-[#A19A8E]">24.0s</span>
          </div>

          {/* Shot Jump Selector */}
          <div className="hidden lg:flex items-center space-x-1 pl-2 border-l border-[rgba(44,41,38,0.1)]">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <button
                key={s}
                onClick={() => jumpToShot(s)}
                className="w-5 h-5 rounded-full text-[10px] font-mono transition-colors"
                style={{
                  backgroundColor: currentShot === s ? '#EE9068' : 'transparent',
                  color: currentShot === s ? '#FFFFFF' : '#8A847A',
                  fontWeight: currentShot === s ? 700 : 400,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Letterbox toggle and manual website mode */}
        <div className="flex items-center space-x-2 text-[11px]">
          <button
            onClick={() => setIsLetterbox(!isLetterbox)}
            className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[rgba(44,41,38,0.08)] text-[#5C564C] hover:text-black transition-colors hidden sm:inline-block"
          >
            {isLetterbox ? '16:9 Scope' : 'Full Window'}
          </button>
          <button
            onClick={onExitCinema}
            className="px-3.5 py-1.5 rounded-full bg-[#2C2926] text-white hover:bg-black transition-colors font-medium"
          >
            Manual Mode →
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CinematicShowcase;
