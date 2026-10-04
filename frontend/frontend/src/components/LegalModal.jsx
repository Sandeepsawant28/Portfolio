import React from 'react';

const LegalModal = ({ type, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141417] border-hairline rounded p-8 max-h-[85vh] overflow-y-auto space-y-6 text-[#9E9EA8]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-hairline-b">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#0052FF] tracking-wider block">
              LEGAL & GOVERNANCE COMPLIANCE
            </span>
            <h3 className="text-2xl font-bold text-[#EDEDED]" style={{ fontFamily: "'Syne', sans-serif" }}>
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#1B1B1F] border-hairline hover:bg-[#25252A] text-white flex items-center justify-center text-xs font-mono transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-xs font-mono space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="text-[#EDEDED]">Effective Date: October 2026 • Version 2.4</p>
              <p>
                Sandeep Sawant Studio enforces a strict zero-surveillance design standard. We do not set third-party marketing cookies, run behavioral tracking scripts, or transmit user analytics to advertising brokers.
              </p>
              <h4 className="text-sm font-semibold text-[#EDEDED] pt-2">1. Data Minimization</h4>
              <p>
                When submitting a project proposal via our direct inquiry portal, only your submitted contact name, corporate email address, and project brief are processed. This transmission occurs over encrypted HTTPS/TLS 1.3 channels solely for evaluating project viability.
              </p>
              <h4 className="text-sm font-semibold text-[#EDEDED] pt-2">2. Data Retention & Erasure</h4>
              <p>
                Inquiry data is retained only for the duration of the active consultation or project contract. You may request immediate deletion of your correspondence record by contacting sandeepsawant.design@gmail.com.
              </p>
              <h4 className="text-sm font-semibold text-[#EDEDED] pt-2">3. Sub-Processors & Edge Infrastructure</h4>
              <p>
                This website is hosted on high-performance edge compute nodes with strict data residency compliance.
              </p>
            </>
          ) : (
            <>
              <p className="text-[#EDEDED]">Effective Date: October 2026 • Version 1.8</p>
              <p>
                These terms govern all commercial and advisory web engineering, design systems architecture, and creative development delivered by Sandeep Sawant.
              </p>
              <h4 className="text-sm font-semibold text-[#EDEDED] pt-2">1. Code Ownership & Intellectual Property</h4>
              <p>
                Upon receipt of final milestone settlement, 100% of bespoke source code, component libraries, and custom asset pipelines transfer unconditionally to the commissioning organization. Sandeep Sawant retains non-commercial rights to showcase selected screenshots and architecture metrics in studio case studies.
              </p>
              <h4 className="text-sm font-semibold text-[#EDEDED] pt-2">2. Performance & Quality Guarantees</h4>
              <p>
                All production deployments are verified against strict performance benchmarks: minimum 95+ Core Web Vitals, zero layout shifts, fluid responsiveness across all standard viewports, and WCAG AAA compliance.
              </p>
              <h4 className="text-sm font-semibold text-[#EDEDED] pt-2">3. Retainer & Sprint Terms</h4>
              <p>
                Production calendar sprints are booked in 2 to 8-week increments. Advance commitment guarantees dedicated engineering bandwidth.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-hairline-t flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded bg-[#EDEDED] text-[#0C0C0E] text-xs font-mono font-medium hover:bg-white transition-colors cursor-pointer"
          >
            ACKNOWLEDGE & DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
