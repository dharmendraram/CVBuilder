import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Download, 
  Layout, 
  ShieldCheck, 
  Zap,
  Layers,
  Crown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-indigo-50/60 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-100/80 text-indigo-700 border border-indigo-200 mb-6 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Next-Gen ATS-Ready Resume Builder</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-tight">
              Create an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">ATS-Friendly Resume</span> That Gets You Hired
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Build recruiter-approved resumes in minutes. Choose from 4 free ATS templates and 2 pro designer layouts, customize accents in real-time, and download high-resolution PDFs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isLoggedIn ? '/dashboard' : '/register'}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{isLoggedIn ? 'Go to Dashboard' : 'Build Free Resume'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/templates"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Layout className="w-4 h-4" />
                <span>Explore 6 Templates</span>
              </Link>
            </div>

            {/* Quick Benefits Badges */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4 Free ATS-ready templates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time live preview
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Workday & Greenhouse tested
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant PDF download
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Everything you need for job search success
            </h2>
            <p className="text-slate-600 mt-3 text-sm">
              Designed for engineers, designers, graduates, and executive leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Live Split Editor</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Edit sections on the left and see changes immediately on the A4 page preview on the right.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">6 Modern Layouts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From pure 1-column ATS formats and SajiloCV-style Nordic themes to executive tech lead layouts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Vector-Clear PDF Export</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Export ATS-scannable, vector-crisp PDFs ready for Taleo, Greenhouse, and Workday systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview Strip */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Templates</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">Stand out with curated styles</h2>
            </div>
            <Link
              to="/templates"
              className="text-indigo-600 font-semibold text-sm hover:underline mt-4 md:mt-0 flex items-center gap-1"
            >
              View all 6 templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Template Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-800 text-sm">Template 01: Modern Pro</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">FREE</span>
              </div>
              <div className="p-6 h-64 bg-slate-50 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-indigo-600/30 rounded w-1/2"></div>
                  <div className="h-2.5 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-2.5 bg-slate-200 rounded w-full"></div>
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    <div className="h-16 bg-white rounded border border-slate-200"></div>
                    <div className="h-16 bg-white rounded border border-slate-200"></div>
                  </div>
                </div>
                <Link
                  to="/templates"
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold text-center group-hover:bg-indigo-700 transition-colors"
                >
                  Use Template 01
                </Link>
              </div>
            </div>

            {/* Template Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-800 text-sm">Template 02: Pure ATS</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">FREE</span>
              </div>
              <div className="p-6 h-64 bg-slate-50 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-center space-y-1">
                    <div className="h-3 bg-slate-800 rounded w-1/3 mx-auto"></div>
                    <div className="h-1.5 bg-slate-300 rounded w-1/2 mx-auto"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                  <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                </div>
                <Link
                  to="/templates"
                  className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold text-center group-hover:bg-indigo-600 transition-colors"
                >
                  Use Template 02
                </Link>
              </div>
            </div>

            {/* Template Card 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-800 text-sm">Template 04: Nordic Compact</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">FREE</span>
              </div>
              <div className="p-6 h-64 bg-slate-50 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-600/30 shrink-0"></div>
                    <div className="space-y-1 flex-1">
                      <div className="h-3 bg-cyan-600/40 rounded w-1/2"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                  <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                </div>
                <Link
                  to="/templates"
                  className="w-full py-2 bg-cyan-700 text-white rounded-lg text-xs font-semibold text-center group-hover:bg-cyan-800 transition-colors"
                >
                  Use Template 04
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ready to create a standout resume today?
          </h2>
          <p className="text-indigo-100 text-base max-w-xl mx-auto">
            Join thousands of job seekers who landed interviews at top tech companies.
          </p>
          <div className="pt-4">
            <Link
              to={isLoggedIn ? '/dashboard' : '/register'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl shadow-black/10 transition-all hover:scale-105"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
