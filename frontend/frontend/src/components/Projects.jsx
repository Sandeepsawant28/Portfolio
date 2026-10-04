import React, { useState } from 'react';

import astraImg from '../assets/Astra.png';
import sandeepImg from '../assets/sandeep.png';
import showcaseLanding from '../assets/showcase-landing.jpg';
import showcaseBranding from '../assets/showcase-branding.jpg';

const Projects = ({ onSelectProject }) => {
  const [filter, setFilter] = useState('ALL');

  const projectList = [
    {
      id: '01',
      title: 'Astra AI Spatial Interface',
      category: 'WEBGL / INTERFACE',
      year: '2026',
      summary: 'Next-generation spatial canvas interface built with Three.js, React 19, and Tailwind. Zero-latency micro-interactions and hardware-accelerated fluid components.',
      tags: ['React 19', 'Three.js', 'WebGL', 'Tailwind', 'Performance Optimization'],
      metrics: '60 FPS Canvas • 0.35s FCP',
      image: astraImg,
      details: {
        client: 'Astra Labs Inc.',
        role: 'Lead Creative Developer',
        deliverables: ['Custom WebGL Canvas', 'Interactive State Engine', 'Responsive Desktop/Mobile Viewports'],
        results: 'Deployed to over 150,000 monthly active operators with 99.98% runtime stability.',
      },
    },
    {
      id: '02',
      title: 'Sandeep Design Systems & Tokens',
      category: 'DESIGN SYSTEMS',
      year: '2025',
      summary: 'Multi-platform design token architecture and component library. Built with strict TypeScript typings, automated contrast verification, and fluid fluid typography curves.',
      tags: ['TypeScript', 'Design Tokens', 'Storybook', 'Figma API', 'Accessibility AAA'],
      metrics: '100% WCAG AAA • Zero CLS',
      image: sandeepImg,
      details: {
        client: 'Proprietary Studio Tooling',
        role: 'Systems Architect',
        deliverables: ['Token Pipeline', 'Headless UI Primitives', 'Automated A11y Test Suite'],
        results: 'Reduced frontend development cycle time by 42% across all client builds.',
      },
    },
    {
      id: '03',
      title: 'Lumina Architecture & Living',
      category: 'EDITORIAL WEB',
      year: '2025',
      summary: 'Digital flagship web publication for a Copenhagen architectural atelier. Custom smooth scrolling engine, progressive image hydration, and daylight-responsive themes.',
      tags: ['React', 'Next.js', 'Fluid Rem Scale', 'Image Optimization', 'SSR'],
      metrics: '100 Lighthouse • 3.2x Inquiries',
      image: showcaseLanding,
      details: {
        client: 'Lumina Atelier',
        role: 'Frontend Architect & Art Director',
        deliverables: ['Headless CMS Integration', 'High-Res Asset Pipeline', 'Responsive 3D Space Viewer'],
        results: 'Tripled architectural proposal requests within the first quarter post-launch.',
      },
    },
    {
      id: '04',
      title: 'Komorebi Brand Identity & Visual Guidelines',
      category: 'BRAND SYSTEMS',
      year: '2024',
      summary: 'Complete physical and digital identity system for artisanal tea producers. Custom typographic geometry, embossed stationery packaging, and precision digital brand guidelines.',
      tags: ['Brand Architecture', 'Typography', 'Packaging Design', 'Vector Systems'],
      metrics: 'Global Distribution Across 8 Countries',
      image: showcaseBranding,
      details: {
        client: 'Komorebi Group',
        role: 'Brand Designer & Developer',
        deliverables: ['Custom Monogram', 'Packaging Die-Lines', 'Digital Brand Guidelines Portal'],
        results: 'Secured international shelf distribution in Tokyo, London, and Berlin.',
      },
    },
  ];

  const filteredProjects =
    filter === 'ALL'
      ? projectList
      : projectList.filter((p) => p.category.includes(filter));

  return (
    <section id="works" className="py-28 px-6 border-hairline-b bg-[#0C0C0E]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-hairline-b gap-6">
          <div>
            <span className="text-xs font-mono text-[#5F5F68] uppercase tracking-wider block mb-2">
              SECTION 01 / SELECTED WORK
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#EDEDED]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Case studies & production archives.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            {['ALL', 'WEBGL', 'DESIGN SYSTEMS', 'EDITORIAL'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-[#EDEDED] text-[#0C0C0E] font-medium'
                    : 'bg-[#141417] text-[#9E9EA8] hover:text-white border-hairline'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical 2-Column Editorial Grid (No 3 cards in a row!) */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-[#141417] border-hairline rounded p-6 hover:border-[#EDEDED]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Media Container */}
                <div
                  className="w-full bg-[#1B1B1F] rounded overflow-hidden relative mb-6 border-hairline"
                  style={{ aspectRatio: '16/10' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0C0C0E]/90 px-2.5 py-1 rounded text-[10px] font-mono text-[#EDEDED] border-hairline">
                    INDEX {project.id}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#0C0C0E]/90 px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 border-hairline">
                    {project.metrics}
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-[#5F5F68] mb-2">
                  <span>{project.category}</span>
                  <span>RELEASED {project.year}</span>
                </div>

                <h3
                  className="text-2xl font-bold text-[#EDEDED] group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {project.title}
                </h3>

                <p className="mt-3 text-sm text-[#9E9EA8] leading-relaxed font-light">
                  {project.summary}
                </p>
              </div>

              {/* Tags and CTA */}
              <div className="pt-6 mt-6 border-hairline-t flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#1B1B1F] text-[10px] font-mono text-[#9E9EA8] border-hairline"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-mono text-[#EDEDED] group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>INSPECT</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
