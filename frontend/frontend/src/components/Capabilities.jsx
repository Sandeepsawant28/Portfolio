import React from 'react';

const Capabilities = () => {
  const capabilities = [
    {
      index: '01',
      title: 'Frontend Architecture & Spatial Canvas',
      description: 'Engineering responsive interfaces with React 19, TypeScript, Next.js, and WebGL. Focused on sub-second paint times, progressive hydration, and silky 60fps animations.',
      stack: ['React 19', 'TypeScript', 'Next.js App Router', 'Three.js / WebGL', 'Tailwind CSS', 'Vite'],
    },
    {
      index: '02',
      title: 'Design Systems & Token Pipelines',
      description: 'Building multi-brand token engines from Figma variables down to production CSS/JSON tokens. Complete WCAG AAA color contrast validation and component testing suites.',
      stack: ['Design Tokens', 'Storybook', 'Figma REST API', 'Radix Primitives', 'Automated A11y'],
    },
    {
      index: '03',
      title: 'Creative Direction & Typography',
      description: 'Sculpting high-impact editorial typography, custom logomarks, vector iconography, and physical packaging systems that outlast ephemeral design fads.',
      stack: ['Art Direction', 'Custom Typography', 'Brand Guidelines', 'Editorial Layouts', 'Print Systems'],
    },
    {
      index: '04',
      title: 'Full-Stack & Production Infrastructure',
      description: 'Structuring resilient server architectures, edge caching layers, RESTful endpoints, and continuous deployment pipelines benchmarked for high-traffic environments.',
      stack: ['Node.js', 'Express', 'PostgreSQL', 'Redis Caching', 'Edge Functions', 'Docker'],
    },
  ];

  return (
    <section id="capabilities" className="py-28 px-6 border-hairline-b bg-[#0C0C0E]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-hairline-b">
          <span className="text-xs font-mono text-[#5F5F68] uppercase tracking-wider block mb-2">
            SECTION 03 / CAPABILITIES & CRAFT
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#EDEDED]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Engineering disciplines & technical standards.
          </h2>
        </div>

        {/* Asymmetrical 2x2 Clean Grid (No 3 cards in a row!) */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.index}
              className="bg-[#141417] border-hairline rounded p-8 flex flex-col justify-between hover:border-[#EDEDED]/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-hairline-b mb-6">
                  <span className="text-xs font-mono text-[#0052FF] font-semibold">
                    DISCIPLINE // {cap.index}
                  </span>
                  <span className="text-[10px] font-mono text-[#5F5F68]">PRODUCTION READY</span>
                </div>

                <h3
                  className="text-2xl font-bold text-[#EDEDED]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {cap.title}
                </h3>

                <p className="mt-4 text-sm text-[#9E9EA8] leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="pt-6 mt-8 border-hairline-t">
                <span className="text-[10px] font-mono text-[#5F5F68] uppercase block mb-3">
                  Core Technologies & Standards
                </span>
                <div className="flex flex-wrap gap-2">
                  {cap.stack.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-[#1B1B1F] text-xs font-mono text-[#EDEDED] border-hairline"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
