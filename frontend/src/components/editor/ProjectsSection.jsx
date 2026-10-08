import React from 'react';
import { FolderGit2, Plus, Trash2, Globe } from 'lucide-react';
import { GithubIcon } from '../Icons';

export const ProjectsSection = ({ resume, setResume }) => {
  const projects = resume?.project || [];

  const handleAdd = () => {
    setResume((prev) => ({
      ...prev,
      project: [
        ...prev.project,
        {
          title: '',
          description: '',
          github: '',
          liveDemo: '',
        },
      ],
    }));
  };

  const handleRemove = (index) => {
    setResume((prev) => ({
      ...prev,
      project: prev.project.filter((_, idx) => idx !== index),
    }));
  };

  const handleChange = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.project];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return {
        ...prev,
        project: updated,
      };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <FolderGit2 className="w-5 h-5" />
          <h2 className="text-base text-slate-900">Projects</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
          <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 mb-3">No key projects highlighted yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + Add a project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={proj.title || ''}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  placeholder="e.g. AI Resume Builder Web App"
                  className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5 text-slate-400" /> GitHub Repository
                  </label>
                  <input
                    type="text"
                    value={proj.github || ''}
                    onChange={(e) => handleChange(index, 'github', e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" /> Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={proj.liveDemo || ''}
                    onChange={(e) => handleChange(index, 'liveDemo', e.target.value)}
                    placeholder="https://demo.app.com"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Project Description & Tech Stack</label>
                <textarea
                  rows={2}
                  value={proj.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Built with React, Spring Boot, and MySQL. Implemented authentication and automated PDF rendering..."
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
