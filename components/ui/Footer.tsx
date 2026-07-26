import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 pt-16 pb-12 mt-auto">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                Talent<span className="text-indigo-600">OS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI-Powered Hiring Co-Pilot for startups and agile teams. Automate candidate screening with explainable AI.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Product</h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/jobs" className="hover:text-indigo-600 transition-colors">Job Openings</Link></li>
              <li><Link href="/dashboard/candidates" className="hover:text-indigo-600 transition-colors">Candidate Shortlists</Link></li>
              <li><Link href="/ai-transparency" className="hover:text-indigo-600 transition-colors">AI Transparency</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Features</h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><span className="text-slate-500">Explainable AI Scoring</span></li>
              <li><span className="text-slate-500">Kanban Applicant Pipeline</span></li>
              <li><span className="text-slate-500">AI Job Description Builder</span></li>
              <li><span className="text-slate-500">Automated Shortlisting</span></li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">BuildX’26 Edition</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Designed for hackathons, investors, and early-stage startup founders worldwide.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">
              BuildX’26 Platform
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TalentOS AI. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Startup Founders</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
