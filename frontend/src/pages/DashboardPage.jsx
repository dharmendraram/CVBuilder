import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resumeService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  FileText, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Crown, 
  Clock, 
  AlertCircle, 
  Loader2,
  ExternalLink,
  Layers
} from 'lucide-react';

export const DashboardPage = () => {
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchResumes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await resumeService.getAllResumes();
      setResumes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load resumes:', err);
      setError('Could not fetch resumes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setCreating(true);
    try {
      const created = await resumeService.createResume(newTitle.trim());
      const resumeId = created._id || created.id;
      setIsModalOpen(false);
      setNewTitle('');
      navigate(`/resumes/${resumeId}`);
    } catch (err) {
      console.error('Error creating resume:', err);
      setError(err.response?.data?.message || 'Failed to create resume.');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteResume = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      await resumeService.deleteResume(id);
      setResumes((prev) => prev.filter((r) => (r._id || r.id) !== id));
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Could not delete resume. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Plan Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            My Resumes
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, customize, and download your CV documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isPremium && (
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:opacity-95 transition-all"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Pro (NPR 1,000)
            </Link>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create New Resume
          </button>
        </div>
      </div>

      {/* Plan Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isPremium ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isPremium ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'}`}>
            {isPremium ? <Crown className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-sm font-bold">
              Current Plan: {isPremium ? 'PRO Subscription' : 'FREE Plan'}
            </h2>
            <p className="text-xs opacity-80">
              {isPremium
                ? 'You have unlimited access to all designer templates, premium layouts, and priority export.'
                : 'You are using the Free tier (Template 01). Upgrade anytime to unlock Sidebar Pro and Minimalist Executive themes.'}
            </p>
          </div>
        </div>

        {!isPremium && (
          <Link
            to="/pricing"
            className="px-4 py-2 rounded-xl bg-white text-indigo-600 text-xs font-bold border border-indigo-200 shadow-xs hover:bg-indigo-50 transition-colors shrink-0"
          >
            View Pro Features
          </Link>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Resumes Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading your resumes...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-xs p-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">No resumes created yet</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Get started by creating your first professional resume with our modern templates.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
          >
            <Plus className="w-4 h-4" /> Create My First Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => {
            const resumeId = resume._id || resume.id;
            const updatedDate = resume.updatedAt 
              ? new Date(resume.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
              : 'Recently';

            return (
              <div
                key={resumeId}
                onClick={() => navigate(`/resumes/${resumeId}`)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        Template {resume.template?.theme || '01'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteResume(resumeId, e)}
                        disabled={deletingId === resumeId}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete resume"
                      >
                        {deletingId === resumeId ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {resume.title || 'Untitled Resume'}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {resume.profileInfo?.fullName || 'No name set'} • {resume.profileInfo?.designation || 'No role set'}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {updatedDate}
                  </span>

                  <span className="font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Edit & Export <Edit3 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Creating New Resume */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">Create New Resume</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateResume} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Resume Title *
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Software Engineer Resume 2026"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newTitle.trim()}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Resume'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
