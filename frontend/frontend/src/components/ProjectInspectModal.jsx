import React from 'react';

const ProjectInspectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#141417] border-hairline rounded p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-hairline-b">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 rounded bg-[#0052FF] text-white text-[10px] font-mono">
              CASE STUDY {project.id}
            </span>
            <span className="text-xs font-mono text-[#9E9EA8]">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#1B1B1F] border-hairline hover:bg-[#25252A] text-white flex items-center justify-center text-xs font-mono transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#EDEDED]" style={{ fontFamily: "'Syne', sans-serif" }}>
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[#9E9EA8] font-light leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Large Media */}
        <div className="w-full bg-[#0C0C0E] border-hairline rounded overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Engineering Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-hairline-t text-xs font-mono">
          <div className="space-y-4">
            <div>
              <span className="text-[#5F5F68] uppercase block text-[10px]">Client / Organization</span>
              <span className="text-[#EDEDED] font-semibold">{project.details.client}</span>
            </div>
            <div>
              <span className="text-[#5F5F68] uppercase block text-[10px]">Role / Discipline</span>
              <span className="text-[#EDEDED] font-semibold">{project.details.role}</span>
            </div>
            <div>
              <span className="text-[#5F5F68] uppercase block text-[10px]">Production Outcome</span>
              <span className="text-emerald-400 font-semibold">{project.details.results}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[#5F5F68] uppercase block text-[10px] mb-2">Core Deliverables</span>
              <ul className="space-y-1.5 text-[#9E9EA8]">
                {project.details.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-[#0052FF]">0{i + 1}.</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[#5F5F68] uppercase block text-[10px] mb-2">Technical Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-[#1B1B1F] text-[#EDEDED] border-hairline text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-hairline-t flex items-center justify-between">
          <span className="text-xs font-mono text-[#5F5F68]">BENCHMARK: {project.metrics}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#EDEDED] text-[#0C0C0E] text-xs font-mono font-medium hover:bg-white transition-colors cursor-pointer"
          >
            DISMISS INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInspectModal;
