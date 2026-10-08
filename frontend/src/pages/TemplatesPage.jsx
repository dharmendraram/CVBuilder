import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { templateService, resumeService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Layout, Check, ArrowRight, Loader2, Sparkles, ShieldCheck, Crown } from 'lucide-react';

export const TemplatesPage = () => {
  const { isLoggedIn, isPremium } = useAuth();
  const navigate = useNavigate();

  const [templatesData, setTemplatesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatingTheme, setCreatingTheme] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const data = await templateService.getTemplates();
          setTemplatesData(data);
        }
      } catch (err) {
        console.error('Failed to load templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [isLoggedIn]);

  const handleUseTemplate = async (themeCode) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please sign in to start creating a resume with this template.' } });
      return;
    }

    const isFreeTemplate = ['01', '02', '03', '04'].includes(themeCode);
    const isAllowed = isFreeTemplate || isPremium || templatesData?.availableTemplates?.includes(themeCode);

    if (!isAllowed) {
      if (window.confirm('Template ' + themeCode + ' is a PRO design. Would you like to upgrade to PRO (NPR 1,000) to unlock all templates?')) {
        navigate('/pricing');
      }
      return;
    }

    setCreatingTheme(themeCode);
    try {
      const titles = {
        '01': 'Modern Professional Resume',
        '02': 'ATS Single-Column Resume',
        '03': 'Executive Corporate Resume',
        '04': 'Creative Nordic Resume',
        '05': 'Tech Lead Pro Resume',
        '06': 'Elite Sidebar Pro Resume',
      };
      const defaultTitle = titles[themeCode] || `Resume (Template ${themeCode})`;
      const created = await resumeService.createResume(defaultTitle);
      const resumeId = created._id || created.id;

      const defaultColors = {
        '01': ['#4f46e5'],
        '02': ['#0f172a'],
        '03': ['#0284c7'],
        '04': ['#0891b2'],
        '05': ['#1e1b4b'],
        '06': ['#0f172a'],
      };

      // Update template theme
      await resumeService.updateResume(resumeId, {
        ...created,
        template: {
          theme: themeCode,
          colorPalette: defaultColors[themeCode] || ['#4f46e5'],
        },
      });

      navigate(`/resumes/${resumeId}`);
    } catch (err) {
      console.error('Error creating resume from template:', err);
      alert('Failed to initialize resume. Please try again from Dashboard.');
    } finally {
      setCreatingTheme(null);
    }
  };

  const templatesList = [
    {
      id: '01',
      name: 'Modern Professional',
      badge: 'FREE • ATS-READY',
      isPro: false,
      description: 'Balanced modern layout with clean profile photo header, contact pills, and structured 2-column body grid.',
      color: '#4f46e5',
      features: [
        '100% ATS Optimized Header',
        'Two-Column Content Hierarchy',
        'Skill Level Progress Sliders',
        'Interactive Code & Live Links',
      ],
    },
    {
      id: '02',
      name: 'Pure Single-Column ATS',
      badge: 'FREE • RECRUITER FAVORITE',
      isPro: false,
      description: 'The definitive linear single-column format recommended by Fortune 500 recruiters for frictionless ATS parsing.',
      color: '#0f172a',
      features: [
        'Workday & Taleo Certified Structure',
        'Strict Linear Scanning Architecture',
        'Clean Header with Bullet Separators',
        'High-Density Content Layout',
      ],
    },
    {
      id: '03',
      name: 'Executive Corporate',
      badge: 'FREE • LEADERSHIP',
      isPro: false,
      description: 'Sophisticated corporate design tailored for Senior Engineers, Tech Leads, Managers, and Directors.',
      color: '#0284c7',
      features: [
        'Clean Executive Header Block',
        'High-Impact Core Competency Badges',
        'Refined Section Underlines',
        'Key Projects & Initiatives Grid',
      ],
    },
    {
      id: '04',
      name: 'Creative Nordic Compact',
      badge: 'FREE • SAJILOCV STYLE',
      isPro: false,
      description: 'Clean modern layout inspired by SajiloCV with vertical timeline connectors, pill contacts, and sleek tags.',
      color: '#0891b2',
      features: [
        'Modern Rounded Pill Header',
        'Visual Timeline Milestone Dots',
        'Compact Skills & Competencies Badges',
        'Fresh Minimalist Typography',
      ],
    },
    {
      id: '05',
      name: 'Silicon Valley Tech Lead',
      badge: 'PRO • HIGH-IMPACT',
      isPro: true,
      description: 'High-contrast dark header block with glowing accents, metrics-focused project cards, and elite typography.',
      color: '#1e1b4b',
      features: [
        'High-Contrast Dark Theme Header',
        'Metrics-Driven Project Highlights',
        'Advanced Technical Stack Matrix',
        'Senior & Principal Engineer Favorite',
      ],
    },
    {
      id: '06',
      name: 'Elite Sidebar Pro',
      badge: 'PRO • PORTFOLIO CV',
      isPro: true,
      description: 'Sleek dual-tone layout with full dark vertical sidebar on the left and roomy white canvas on the right.',
      color: '#0f172a',
      features: [
        'Full Dark Accent Left Column',
        'Circular Profile Avatar Frame',
        'Skill & Language Proficiency Meters',
        'Roomy Right Column for Achievements',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Layout className="w-4 h-4" />
            <span>6 Curated Resume Templates (4 Free + 2 Pro)</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            ATS-Friendly & Designer Templates
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Choose from standard ATS single-column layouts, modern SajiloCV-style designs, or premium Silicon Valley executive templates.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templatesList.map((tpl) => {
            const isUnlocked = !tpl.isPro || isPremium;

            return (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Visual Header */}
                  <div
                    className="h-44 p-4 flex flex-col justify-between relative overflow-hidden transition-colors"
                    style={{ backgroundColor: `${tpl.color}15` }}
                  >
                    <div className="flex justify-between items-center z-10">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white shadow-xs text-slate-800">
                        Template {tpl.id}
                      </span>
                      {tpl.isPro ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs tracking-wider">
                          <Crown className="w-3 h-3" /> PRO DESIGN
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-xs tracking-wider">
                          {tpl.badge}
                        </span>
                      )}
                    </div>

                    {/* Mock visual mockup */}
                    <div className="bg-white rounded-t-lg p-3 shadow-md mx-4 -mb-6 space-y-2 border border-slate-200 group-hover:-translate-y-1 transition-transform">
                      <div className="h-3 rounded w-1/3" style={{ backgroundColor: tpl.color }}></div>
                      <div className="h-1.5 bg-slate-200 rounded w-2/3"></div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="h-6 bg-slate-100 rounded"></div>
                        <div className="h-6 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 pt-8 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{tpl.name}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tpl.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Highlights</span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {tpl.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleUseTemplate(tpl.id)}
                    disabled={creatingTheme === tpl.id}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                      isUnlocked
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
                    }`}
                  >
                    {creatingTheme === tpl.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isUnlocked ? (
                      <>
                        <span>Use Template {tpl.id}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <Crown className="w-4 h-4" />
                        <span>Unlock with PRO Plan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Banner */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-500/20">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wide">
                <Crown className="w-3.5 h-3.5" /> PRO Lifetime Deal
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Unlock All Pro Templates (05 & 06) for only NPR 1,000
              </h2>
              <p className="text-xs md:text-sm text-amber-100 max-w-xl">
                Upgrade once and get lifetime access to all premium designer templates, unlimited custom palette exports, and instant priority eSewa activation.
              </p>
            </div>
            <Link
              to="/pricing"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-lg hover:bg-amber-50 transition-all shrink-0 hover:scale-105"
            >
              Upgrade to PRO
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
