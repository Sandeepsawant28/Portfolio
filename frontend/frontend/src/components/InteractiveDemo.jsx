import React, { useState } from 'react';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('spatial');
  const [depthElevation, setDepthElevation] = useState(16);
  const [surfaceRoughness, setSurfaceRoughness] = useState(45);
  const [colorMode, setColorMode] = useState('dark');
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState('preview'); // 'preview' | 'code'

  const triggerSkeletonTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1400);
  };

  const sampleComponentCode = `// SpatialInteractiveCard.tsx - Engineered by Sandeep Sawant
import React, { useState } from 'react';

export const SpatialInteractiveCard = ({ elevation = ${depthElevation}, roughness = ${surfaceRoughness} }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div 
      className="spatial-node"
      style={{
        transform: \`perspective(1000px) rotateX(\${tilt.y}deg) rotateY(\${tilt.x}deg)\`,
        boxShadow: \`0 \${elevation}px \${elevation * 2}px -4px rgba(0,0,0,0.5)\`,
        filter: \`contrast(\${100 + roughness * 0.2}%)\`
      }}
    >
      <header className="border-hairline-b p-4">
        <span className="font-mono text-xs">Astra Spatial Component</span>
      </header>
    </div>
  );
};`;

  return (
    <section id="sandbox" className="py-28 px-6 border-hairline-b bg-[#0C0C0E]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-hairline-b flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[#5F5F68] uppercase tracking-wider block mb-2">
              SECTION 02 / PRODUCTION DEMO
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#EDEDED]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Interactive component sandbox.
            </h2>
            <p className="mt-3 text-sm text-[#9E9EA8] max-w-xl font-light">
              Test real production primitives in real time. Adjust physics variables, trigger state transitions, and inspect the underlying engineering.
            </p>
          </div>

          {/* View Toggler */}
          <div className="flex items-center space-x-2 bg-[#141417] p-1 rounded border-hairline text-xs font-mono">
            <button
              onClick={() => setActiveView('preview')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                activeView === 'preview' ? 'bg-[#EDEDED] text-[#0C0C0E] font-medium' : 'text-[#9E9EA8]'
              }`}
            >
              LIVE PREVIEW
            </button>
            <button
              onClick={() => setActiveView('code')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                activeView === 'code' ? 'bg-[#EDEDED] text-[#0C0C0E] font-medium' : 'text-[#9E9EA8]'
              }`}
            >
              VIEW REACT SOURCE
            </button>
          </div>
        </div>

        {/* Sandbox Studio Workstation */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (4 columns) */}
          <div className="lg:col-span-4 bg-[#141417] border-hairline rounded p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-hairline-b">
              <span className="text-xs font-mono text-[#EDEDED] uppercase font-semibold">
                PARAMETER CONTROLS
              </span>
              <span className="text-[10px] font-mono text-emerald-400">ACTIVE RUNTIME</span>
            </div>

            {/* Depth elevation slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#9E9EA8]">Elevation Depth</span>
                <span className="text-[#EDEDED]">{depthElevation}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={depthElevation}
                onChange={(e) => setDepthElevation(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1B1B1F] rounded accent-[#0052FF] cursor-pointer"
              />
            </div>

            {/* Roughness slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#9E9EA8]">Surface Friction</span>
                <span className="text-[#EDEDED]">{surfaceRoughness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={surfaceRoughness}
                onChange={(e) => setSurfaceRoughness(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1B1B1F] rounded accent-[#0052FF] cursor-pointer"
              />
            </div>

            {/* Color mode switcher */}
            <div>
              <span className="text-xs font-mono text-[#9E9EA8] block mb-2">Atmosphere Mode</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => setColorMode('dark')}
                  className={`py-2 px-3 rounded border-hairline text-center transition-colors cursor-pointer ${
                    colorMode === 'dark' ? 'bg-[#0052FF] text-white border-transparent' : 'bg-[#1B1B1F] text-[#9E9EA8]'
                  }`}
                >
                  DEEP OBSIDIAN
                </button>
                <button
                  onClick={() => setColorMode('titanium')}
                  className={`py-2 px-3 rounded border-hairline text-center transition-colors cursor-pointer ${
                    colorMode === 'titanium' ? 'bg-[#0052FF] text-white border-transparent' : 'bg-[#1B1B1F] text-[#9E9EA8]'
                  }`}
                >
                  WARM TITANIUM
                </button>
              </div>
            </div>

            {/* Skeleton loader trigger (Item #21) */}
            <div className="pt-2">
              <button
                onClick={triggerSkeletonTest}
                className="w-full py-2.5 rounded bg-[#1B1B1F] border-hairline hover:bg-[#25252A] text-xs font-mono text-[#EDEDED] transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>SIMULATE SKELETON REHYDRATION</span>
              </button>
            </div>
          </div>

          {/* Live Viewport Area (8 columns) */}
          <div className="lg:col-span-8 bg-[#141417] border-hairline rounded p-8 min-h-[480px] flex flex-col justify-between">
            {activeView === 'preview' ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                {isLoading ? (
                  /* Real Skeleton Loading State (Item #21) */
                  <div className="w-full max-w-md bg-[#1B1B1F] border-hairline rounded p-6 space-y-4">
                    <div className="h-4 w-1/3 skeleton-loading rounded" />
                    <div className="h-8 w-3/4 skeleton-loading rounded" />
                    <div className="h-32 w-full skeleton-loading rounded" />
                    <div className="flex justify-between pt-2">
                      <div className="h-4 w-1/4 skeleton-loading rounded" />
                      <div className="h-4 w-1/4 skeleton-loading rounded" />
                    </div>
                  </div>
                ) : (
                  /* The Live Interactive Component */
                  <div
                    className="w-full max-w-md p-6 rounded transition-all duration-300"
                    style={{
                      backgroundColor: colorMode === 'dark' ? '#0E0E11' : '#1C1C22',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: `0 ${depthElevation}px ${depthElevation * 2.2}px -4px rgba(0, 0, 0, 0.65)`,
                      transform: `perspective(800px) rotateX(${((surfaceRoughness - 50) * 0.15).toFixed(1)}deg)`,
                    }}
                  >
                    <div className="flex items-center justify-between pb-4 border-hairline-b text-xs font-mono text-[#5F5F68]">
                      <span>SPATIAL COMPONENT // 01</span>
                      <span className="text-emerald-400">STATUS: MOUNTED</span>
                    </div>

                    <div className="py-6">
                      <h4 className="text-xl font-bold text-[#EDEDED]" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Precision Layout Node
                      </h4>
                      <p className="mt-2 text-xs text-[#9E9EA8] font-light leading-relaxed">
                        Hardware-accelerated viewport element with sub-pixel rounding and automated spring physics damping.
                      </p>
                    </div>

                    <div className="p-4 rounded bg-[#141417] border-hairline space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-[#9E9EA8]">
                        <span>Render Engine</span>
                        <span className="text-[#EDEDED]">React 19 Fiber</span>
                      </div>
                      <div className="flex justify-between text-[#9E9EA8]">
                        <span>Draw Calls</span>
                        <span className="text-[#EDEDED]">1 Call / Frame</span>
                      </div>
                      <div className="flex justify-between text-[#9E9EA8]">
                        <span>Target Frame Time</span>
                        <span className="text-emerald-400">16.6ms (60 FPS)</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-hairline-t flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#5F5F68]">UUID: astra-9021</span>
                      <button
                        onClick={triggerSkeletonTest}
                        className="px-3 py-1.5 rounded bg-[#0052FF] text-white text-[11px] font-mono cursor-pointer hover:bg-[#0047E0] transition-colors"
                      >
                        REVALIDATE NODE
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Code Inspector */
              <div className="flex-1 font-mono text-xs text-[#9E9EA8] bg-[#0E0E11] p-6 rounded border-hairline overflow-x-auto">
                <pre>{sampleComponentCode}</pre>
              </div>
            )}

            {/* Bottom Workstation Status */}
            <div className="pt-6 mt-6 border-hairline-t flex flex-wrap items-center justify-between text-xs font-mono text-[#5F5F68] gap-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>LOCAL STATE MACHINE ONLINE</span>
              </div>
              <div>
                <span>REACT 19.2 • TAILWIND 4 • THREE.JS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
