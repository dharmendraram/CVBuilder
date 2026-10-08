import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { resumeService, templateService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ResumePreview } from '../components/templates/ResumePreview';
import { ProfileSection } from '../components/editor/ProfileSection';
import { ContactSection } from '../components/editor/ContactSection';
import { ExperienceSection } from '../components/editor/ExperienceSection';
import { EducationSection } from '../components/editor/EducationSection';
import { SkillsSection } from '../components/editor/SkillsSection';
import { ProjectsSection } from '../components/editor/ProjectsSection';
import { CertificationsSection } from '../components/editor/CertificationsSection';
import { LanguagesSection } from '../components/editor/LanguagesSection';
import { InterestsSection } from '../components/editor/InterestsSection';
import html2pdf from 'html2pdf.js';
import {
  Save,
  Download,
  Printer,
  ArrowLeft,
  Palette,
  Layout,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  Edit,
  Sparkles,
  Crown,
} from 'lucide-react';

const COLOR_PALETTES = [
  { name: 'Indigo Blue', primary: '#4f46e5' },
  { name: 'Cyan Nordic', primary: '#0891b2' },
  { name: 'Emerald Forest', primary: '#059669' },
  { name: 'Violet Royale', primary: '#7c3aed' },
  { name: 'Crimson Rose', primary: '#e11d48' },
  { name: 'Midnight Slate', primary: '#0f172a' },
  { name: 'Ocean Sky', primary: '#0284c7' },
  { name: 'Deep Navy', primary: '#1e1b4b' },
];

export const ResumeEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPremium, isLoggedIn } = useAuth();

  const [resume, setResume] = useState(null);
  const [templateRestrictions, setTemplateRestrictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'editor' | 'preview'

  const previewRef = useRef(null);

  // Fetch Resume and Templates restrictions
  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);
      try {
        const [resumeData, templatesData] = await Promise.all([
          resumeService.getResumeById(id),
          isLoggedIn ? templateService.getTemplates().catch(() => null) : null,
        ]);

        if (templatesData) {
          setTemplateRestrictions(templatesData);
        }

        // Ensure proper object structures
        const cleanData = {
          ...resumeData,
          template: resumeData.template || { theme: '01', colorPalette: ['#4f46e5'] },
          profileInfo: resumeData.profileInfo || {},
          contactInfo: resumeData.contactInfo || {},
          workExperience: resumeData.workExperience || [],
          education: resumeData.education || [],
          skill: resumeData.skill || [],
          project: resumeData.project || [],
          certification: resumeData.certification || [],
          language: resumeData.language || [],
          interests: resumeData.interests || [],
        };

        if (!cleanData.template.colorPalette || cleanData.template.colorPalette.length === 0) {
          cleanData.template.colorPalette = ['#4f46e5'];
        }

        setResume(cleanData);
      } catch (err) {
        console.error('Failed to load resume:', err);
        setError('Resume not found or access denied.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadResume();
    }
  }, [id, isLoggedIn]);

  // Save Resume
  const handleSave = async (showNotification = true) => {
    if (!resume) return;
    setSaving(true);
    setError('');
    try {
      const updated = await resumeService.updateResume(id, resume);
      setResume((prev) => ({
        ...prev,
        ...updated,
      }));
      if (showNotification) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save resume:', err);
      setError('Could not save resume changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Change Template Theme
  const handleSelectTemplate = (templateTheme) => {
    const isFree = ['01', '02', '03', '04'].includes(templateTheme);
    const isAllowed =
      isFree ||
      isPremium ||
      templateRestrictions?.availableTemplates?.includes(templateTheme);

    if (!isAllowed) {
      if (
        window.confirm(
          `Template ${templateTheme} is a PRO feature. Would you like to upgrade to PRO (NPR 1,000) to unlock all templates?`
        )
      ) {
        navigate('/pricing');
      }
      return;
    }

    setResume((prev) => ({
      ...prev,
      template: {
        ...prev.template,
        theme: templateTheme,
      },
    }));
  };

  // Change Theme Color
  const handleSelectColor = (colorHex) => {
    setResume((prev) => ({
      ...prev,
      template: {
        ...prev.template,
        colorPalette: [colorHex],
      },
    }));
  };

  // Download PDF
  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setDownloading(true);

    try {
      // Auto save before download
      await handleSave(false);

      const element = previewRef.current;
      const opt = {
        margin: 0,
        filename: `${(resume.title || 'Resume').replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading resume editor...</p>
        </div>
      </div>
    );
  }

  if (error && !resume) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">{error}</h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const selectedTheme = resume?.template?.theme || '01';
  const selectedColor = resume?.template?.colorPalette?.[0] || '#4f46e5';

  const editorTemplates = [
    { id: '01', title: '01. Modern Pro', desc: 'Header & 2-Col ATS', isPro: false },
    { id: '02', title: '02. Pure ATS', desc: '1-Col Tech Standard', isPro: false },
    { id: '03', title: '03. Executive', desc: 'Corporate Leadership', isPro: false },
    { id: '04', title: '04. Nordic', desc: 'SajiloCV Timeline', isPro: false },
    { id: '05', title: '05. Tech Lead', desc: 'High-Impact Dark', isPro: true },
    { id: '06', title: '06. Sidebar', desc: 'Dual-Tone Portfolio', isPro: true },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Editor Toolbar */}
      <header className="bg-white border-b border-slate-200 sticky top-16 z-40 px-4 sm:px-6 py-3 no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Back to Resumes"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <input
                type="text"
                value={resume?.title || ''}
                onChange={(e) => setResume((prev) => ({ ...prev, title: e.target.value }))}
                className="font-bold text-slate-900 text-base md:text-lg bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none transition-colors px-1"
                placeholder="Resume Title"
              />
            </div>
          </div>

          {/* Center: View Switcher for mobile/desktop */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1 rounded-lg transition-colors md:hidden ${
                viewMode === 'editor' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : 'text-slate-600'
              }`}
            >
              <Edit className="w-3.5 h-3.5 inline mr-1" /> Editor
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded-lg transition-colors md:hidden ${
                viewMode === 'preview' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" /> Preview
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Saved
              </span>
            )}

            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all disabled:opacity-50"
            >
              {downloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editor Controls & Form (lg: 6 cols) */}
          <div className={`lg:col-span-6 space-y-6 ${viewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
            {/* Template & Color Selector Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Layout className="w-4 h-4 text-indigo-600" />
                  <span>Choose Resume Template</span>
                </div>
                {!isPremium && (
                  <Link
                    to="/pricing"
                    className="text-[11px] font-semibold text-amber-600 hover:underline flex items-center gap-1"
                  >
                    <Crown className="w-3 h-3" /> Upgrade to Pro
                  </Link>
                )}
              </div>

              {/* Template Buttons (6 Grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {editorTemplates.map((t) => {
                  const isLocked = t.isPro && !isPremium;

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTemplate(t.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all relative ${
                        selectedTheme === t.id
                          ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/50'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-xs text-slate-900">{t.title}</span>
                        {t.isPro ? (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                            <Crown className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> PRO
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">
                            FREE
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{t.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Color Palette Selector */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-400" /> Theme Accent Color
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COLOR_PALETTES.map((color) => (
                    <button
                      key={color.primary}
                      type="button"
                      onClick={() => handleSelectColor(color.primary)}
                      title={color.name}
                      style={{ backgroundColor: color.primary }}
                      className={`w-5 h-5 rounded-full transition-transform ${
                        selectedColor === color.primary
                          ? 'scale-125 ring-2 ring-offset-2 ring-indigo-500 shadow-sm'
                          : 'hover:scale-110 opacity-90'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Tabs for Form Sections */}
            <div className="flex overflow-x-auto pb-1 gap-1.5 no-scrollbar text-xs font-semibold text-slate-600 border-b border-slate-200">
              {[
                { id: 'profile', label: 'Profile' },
                { id: 'contact', label: 'Contact' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'certs', label: 'Certifications' },
                { id: 'languages', label: 'Languages & Hobbies' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Section Panels */}
            <div>
              {activeTab === 'profile' && (
                <ProfileSection resume={resume} setResume={setResume} resumeId={id} />
              )}
              {activeTab === 'contact' && (
                <ContactSection resume={resume} setResume={setResume} />
              )}
              {activeTab === 'experience' && (
                <ExperienceSection resume={resume} setResume={setResume} />
              )}
              {activeTab === 'education' && (
                <EducationSection resume={resume} setResume={setResume} />
              )}
              {activeTab === 'skills' && (
                <SkillsSection resume={resume} setResume={setResume} />
              )}
              {activeTab === 'projects' && (
                <ProjectsSection resume={resume} setResume={setResume} />
              )}
              {activeTab === 'certs' && (
                <CertificationsSection resume={resume} setResume={setResume} />
              )}
              {activeTab === 'languages' && (
                <div className="space-y-6">
                  <LanguagesSection resume={resume} setResume={setResume} />
                  <InterestsSection resume={resume} setResume={setResume} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Resume Preview (lg: 6 cols) */}
          <div className={`lg:col-span-6 sticky top-36 ${viewMode === 'editor' ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-slate-800 p-3 rounded-t-2xl flex items-center justify-between text-white text-xs font-medium no-print">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" />
                Live Preview (Template {selectedTheme})
              </span>
              <span className="text-slate-400 text-[11px]">
                {['01', '02', '03', '04'].includes(selectedTheme) ? 'Free Tier' : 'Pro Tier'}
              </span>
            </div>

            <div className="bg-slate-200 p-3 sm:p-6 rounded-b-2xl overflow-x-auto shadow-inner">
              <ResumePreview ref={previewRef} resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
