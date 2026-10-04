import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    scope: 'Full-Stack Web Application',
    budget: '$5k - $15k',
    details: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-6 border-hairline-b bg-[#0C0C0E]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-hairline-b">
          <span className="text-xs font-mono text-[#5F5F68] uppercase tracking-wider block mb-2">
            SECTION 04 / ENGAGEMENT & BRIEF
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#EDEDED]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Initiate a project dialogue.
          </h2>
          <p className="mt-3 text-sm text-[#9E9EA8] max-w-xl font-light">
            Currently reserving select engineering and design engagements for Q2/Q3 2026. Every inquiry receives a direct review within 24 hours.
          </p>
        </div>

        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Studio Channels (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#141417] border-hairline rounded p-8 space-y-6">
              <span className="text-xs font-mono text-[#0052FF] font-semibold block uppercase">
                DIRECT STUDIO CHANNELS
              </span>

              <div className="space-y-4 text-sm font-mono">
                <div>
                  <span className="text-[#5F5F68] text-[10px] block uppercase">Direct Electronic Mail</span>
                  <a
                    href="mailto:sandeepsawant.design@gmail.com"
                    className="text-[#EDEDED] hover:text-white underline underline-offset-4"
                  >
                    sandeepsawant.design@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-[#5F5F68] text-[10px] block uppercase">Location & Studio Time</span>
                  <span className="text-[#EDEDED]">Mumbai, India (IST / UTC+5:30)</span>
                </div>

                <div>
                  <span className="text-[#5F5F68] text-[10px] block uppercase">Response Commitment</span>
                  <span className="text-emerald-400">Within 24 Business Hours</span>
                </div>
              </div>
            </div>

            {/* Engagement Structure (No 3 SaaS Pricing Tiers!) */}
            <div className="bg-[#141417] border-hairline rounded p-8 space-y-4">
              <span className="text-xs font-mono text-[#EDEDED] font-semibold block uppercase">
                ENGAGEMENT FRAMEWORK
              </span>
              <p className="text-xs text-[#9E9EA8] leading-relaxed font-light">
                Work is structured either as targeted sprint milestones (2–6 weeks) or quarterly retained technical leadership. No bloated agency overhead, direct developer-to-stakeholder collaboration.
              </p>
              <div className="pt-2 text-xs font-mono text-[#5F5F68]">
                <span>TYPICAL SPRINTS: 2 TO 8 WEEKS</span>
              </div>
            </div>
          </div>

          {/* Form Area (7 columns) */}
          <div className="lg:col-span-7 bg-[#141417] border-hairline rounded p-8 sm:p-10">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <span className="text-xs font-mono text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded">
                  TRANSMISSION SUCCESSFUL
                </span>
                <h3 className="text-2xl font-bold text-[#EDEDED]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Brief Received by Sandeep
                </h3>
                <p className="text-sm text-[#9E9EA8] max-w-md mx-auto font-light leading-relaxed">
                  Thank you for outlining your vision. I will analyze the technical scope and return a preliminary timeline proposal to your email within 24 hours.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded bg-[#1B1B1F] border-hairline text-xs font-mono text-[#EDEDED] hover:bg-[#25252A] transition-colors cursor-pointer"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#9E9EA8] uppercase mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Thorne"
                      className="w-full px-4 py-3 bg-[#0C0C0E] border-hairline rounded text-[#EDEDED] focus:border-[#0052FF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9E9EA8] uppercase mb-2">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcus@company.com"
                      className="w-full px-4 py-3 bg-[#0C0C0E] border-hairline rounded text-[#EDEDED] focus:border-[#0052FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#9E9EA8] uppercase mb-2">Project Scope *</label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0C0C0E] border-hairline rounded text-[#EDEDED] focus:border-[#0052FF] focus:outline-none transition-colors"
                    >
                      <option>Full-Stack Web Application</option>
                      <option>Design System & Token Architecture</option>
                      <option>WebGL & 3D Spatial Canvas</option>
                      <option>Performance Optimization Audit</option>
                      <option>Art Direction & Brand Systems</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#9E9EA8] uppercase mb-2">Timeline Scope</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0C0C0E] border-hairline rounded text-[#EDEDED] focus:border-[#0052FF] focus:outline-none transition-colors"
                    >
                      <option>Q2 2026 Immediate Sprint</option>
                      <option>Q3 2026 Product Launch</option>
                      <option>Long-Term Technical Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#9E9EA8] uppercase mb-2">Project Brief & Objectives *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe your product requirements, current stack, and core deliverables..."
                    className="w-full px-4 py-3 bg-[#0C0C0E] border-hairline rounded text-[#EDEDED] focus:border-[#0052FF] focus:outline-none transition-colors font-sans text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded bg-[#0052FF] hover:bg-[#0047E0] text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer"
                >
                  TRANSMIT PROJECT BRIEF →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
