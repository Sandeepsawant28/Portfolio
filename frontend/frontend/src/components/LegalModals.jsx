import React from 'react';

const LegalModals = ({ type, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl p-8 shadow-2xl border border-[rgba(44,41,38,0.12)] overflow-y-auto max-h-[85vh]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(44,41,38,0.1)]">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#EE9068] uppercase">Legal & Compliance</span>
            <h3 className="text-2xl font-bold text-[#1C1A17]" style={{ fontFamily: "'Syne', sans-serif" }}>
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-[#1C1A17] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 text-sm text-[#5C564C] space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-medium text-[#1C1A17]">Effective Date: October 2026</p>
              <p>
                At Sandeep Sawant Studio, your privacy is respected with the utmost integrity. This website does not use tracking cookies, aggressive marketing trackers, or third-party behavioral profiling.
              </p>
              <h4 className="text-base font-semibold text-[#1C1A17] pt-2">1. Data We Collect</h4>
              <p>
                When you submit a project inquiry via our contact form, we collect only your provided name, corporate email address, and project brief. This information is solely used to evaluate project viability and communicate proposal details.
              </p>
              <h4 className="text-base font-semibold text-[#1C1A17] pt-2">2. Data Security & Storage</h4>
              <p>
                All correspondence is handled via encrypted SSL/TLS channels. We never sell, lease, or monetize your contact information with advertising brokers.
              </p>
              <h4 className="text-base font-semibold text-[#1C1A17] pt-2">3. Your Rights</h4>
              <p>
                You may request complete removal of your inquiry data from our studio records at any time by contacting sandeepsawant.design@gmail.com.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-[#1C1A17]">Effective Date: October 2026</p>
              <p>
                By commissioning work or browsing the curated archives of Sandeep Sawant Studio, you acknowledge and agree to the following professional terms:
              </p>
              <h4 className="text-base font-semibold text-[#1C1A17] pt-2">1. Intellectual Property & Code Ownership</h4>
              <p>
                All bespoke visual brand marks, Webflow/Framer components, and web source code created for commissioned clients transfer in full upon final balance settlement. Case studies showcased herein remain protected by intellectual portfolio exhibition rights.
              </p>
              <h4 className="text-base font-semibold text-[#1C1A17] pt-2">2. Performance & Production Standards</h4>
              <p>
                Every project is architected to satisfy strict modern web performance standards: 95+ Google Lighthouse scores, semantic HTML5, fluid responsive adaptation, and robust typography hierarchy.
              </p>
              <h4 className="text-base font-semibold text-[#1C1A17] pt-2">3. Studio Availability</h4>
              <p>
                Studio slots are booked on a quarterly sprint basis. Deposits reserve creative calendar allocation.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-[rgba(44,41,38,0.1)] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1C1A17] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModals;
