import React from 'react';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 pb-28 px-6 border-hairline-b bg-[#0C0C0E]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Sub-Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#5F5F68] pb-10 border-hairline-b">
          <div className="flex items-center space-x-2">
            <span>INDEX: SS-2026</span>
            <span>/</span>
            <span>MUMBAI, INDIA</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>FULL-STACK ENGINEERING</span>
            <span>•</span>
            <span>SYSTEMS ARCHITECTURE</span>
          </div>
        </div>

        {/* Main Typographic Statement */}
        <div className="pt-14 pb-16 max-w-5xl">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#EDEDED] leading-[1.05]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Digital products engineered with architectural discipline.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-[#9E9EA8] max-w-2xl font-light leading-relaxed">
            I build responsive web applications, design systems, and spatial interfaces. Every deployment is benchmarked for instant page loads, strict accessibility, and production stability.
          </p>
        </div>

        {/* Actions & Metrics Grid */}
        <div className="pt-8 border-hairline-t flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('works')}
              className="px-6 py-3.5 rounded bg-[#0052FF] text-white text-xs font-mono font-medium hover:bg-[#0047E0] transition-colors cursor-pointer"
            >
              EXPLORE CASE STUDIES [04]
            </button>
            <button
              onClick={() => scrollTo('sandbox')}
              className="px-6 py-3.5 rounded bg-[#141417] border-hairline text-[#EDEDED] text-xs font-mono hover:bg-[#1B1B1F] transition-colors cursor-pointer"
            >
              TEST LIVE SANDBOX
            </button>
          </div>

          {/* Performance Benchmarks */}
          <div className="flex items-center gap-8 font-mono text-xs">
            <div>
              <span className="block text-[#5F5F68] text-[10px] uppercase">Lighthouse Core</span>
              <span className="text-[#EDEDED] font-semibold text-sm">100 / 100</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block text-[#5F5F68] text-[10px] uppercase">First Contentful Paint</span>
              <span className="text-[#EDEDED] font-semibold text-sm">0.38s</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block text-[#5F5F68] text-[10px] uppercase">Layout Shift (CLS)</span>
              <span className="text-[#EDEDED] font-semibold text-sm">0.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
