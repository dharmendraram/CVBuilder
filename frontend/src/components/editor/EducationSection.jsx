import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export const EducationSection = ({ resume, setResume }) => {
  const educations = resume?.education || [];

  const handleAdd = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: '',
          institute: '',
          startDate: '',
          endDate: '',
        },
      ],
    }));
  };

  const handleRemove = (index) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== index),
    }));
  };

  const handleChange = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.education];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return {
        ...prev,
        education: updated,
      };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <GraduationCap className="w-5 h-5" />
          <h2 className="text-base text-slate-900">Education</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
          <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 mb-3">No education details added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + Add degree or diploma
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Education #{index + 1}
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">Degree / Certification *</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">University / Institute *</label>
                  <input
                    type="text"
                    value={edu.institute || ''}
                    onChange={(e) => handleChange(index, 'institute', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Start Year / Date</label>
                  <input
                    type="text"
                    value={edu.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    placeholder="e.g. 2018"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">End Year / Date</label>
                  <input
                    type="text"
                    value={edu.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    placeholder="e.g. 2022"
                    className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
