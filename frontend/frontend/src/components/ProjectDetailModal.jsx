import React, { useState } from 'react';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [deviceView, setDeviceView] = useState('desktop');

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-3xl p-6 md:p-8 shadow-2xl border border-[rgba(44,41,38,0.12)] overflow-hidden max-h-[92vh] flex flex-col"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(44,41,38,0.1)]">
          <div className="flex items-center space-x-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color || '#EE9068' }}
            />
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#7C756B] uppercase">
                {project.tag || 'Interactive Case Study'}
              </span>
              <h3 className="text-2xl font-bold text-[#1C1A17]" style={{ fontFamily: "'Syne', sans-serif" }}>
                {project.title}
              </h3>
            </div>
          </div>

          {/* Viewport device switcher */}
          <div className="hidden sm:flex items-center space-x-1 bg-white p-1 rounded-full border border-[rgba(44,41,38,0.1)]">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                deviceView === 'desktop' ? 'bg-[#1C1A17] text-white' : 'text-[#7C756B] hover:text-black'
              }`}
            >
              Desktop 1920
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                deviceView === 'tablet' ? 'bg-[#1C1A17] text-white' : 'text-[#7C756B] hover:text-black'
              }`}
            >
              Tablet 834
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                deviceView === 'mobile' ? 'bg-[#1C1A17] text-white' : 'text-[#7C756B] hover:text-black'
              }`}
            >
              Mobile 390
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-[#1C1A17] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto flex-1 py-6 space-y-6">
          {/* Interactive Device Viewport */}
          <div className="flex justify-center bg-[#EFECE4] rounded-2xl p-4 md:p-8 border border-[rgba(44,41,38,0.06)]">
            <div
              className="transition-all duration-500 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-300"
              style={{
                width: deviceView === 'desktop' ? '100%' : deviceView === 'tablet' ? '540px' : '320px',
                aspectRatio: deviceView === 'mobile' ? '9/16' : '16/10',
                maxHeight: '480px',
              }}
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-[#EE9068]">The Design Challenge & Outcome</h4>
              <p className="text-sm text-[#4E4940] leading-relaxed">
                Engineered for maximum aesthetic clarity and commercial performance. Architected with custom React components, Webflow CMS hierarchies, and Framer micro-interactions that respond dynamically to viewport daylight illumination.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['WebGL / Three.js', 'Framer Motion', 'Figma Tokens', 'GSAP Timeline', 'Lighthouse 100'].map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-[rgba(44,41,38,0.1)] text-[#3A362F]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[rgba(44,41,38,0.08)] space-y-3 text-xs">
              <div>
                <span className="text-[#8C8578] font-mono uppercase block text-[10px]">Client / Scope</span>
                <span className="font-semibold text-[#1C1A17]">{project.title} • Q3 2026</span>
              </div>
              <div>
                <span className="text-[#8C8578] font-mono uppercase block text-[10px]">Art Direction</span>
                <span className="font-semibold text-[#1C1A17]">Sandeep Sawant</span>
              </div>
              <div>
                <span className="text-[#8C8578] font-mono uppercase block text-[10px]">Live Benchmark</span>
                <span className="font-semibold text-emerald-600">0.4s First Contentful Paint</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[rgba(44,41,38,0.1)] flex items-center justify-between">
          <span className="text-xs text-[#7C756B] font-mono">Status: Production Deployed</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#1C1A17] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
          >
            Close Specimen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
