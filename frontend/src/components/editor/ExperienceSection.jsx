import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

export const ExperienceSection = ({ resume, setResume }) => {
  const experiences = resume?.workExperience || [];

  const handleAdd = () => {
    setResume((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const handleRemove = (index) => {
    setResume((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, idx) => idx !== index),
    }));
  };

  const handleChange = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.workExperience];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return {
        ...prev,
        workExperience: updated,
      };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Briefcase className="w-5 h-5" />
          <h2 className="text-base text-slate-900">Work Experience</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
          <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 mb-3">No work experiences added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + Add your first position
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Experience #{index + 1}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company *</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Role / Job Title *</label>
                  <input
                    type="text"
                    value={exp.role || ''}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    placeholder="e.g. Jan 2021"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    placeholder="e.g. Present or Dec 2023"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Responsibilities & Achievements</label>
                <textarea
                  rows={3}
                  value={exp.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="• Developed high performance features...&#10;• Reduced latency by 40%...&#10;• Mentored junior engineers..."
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
