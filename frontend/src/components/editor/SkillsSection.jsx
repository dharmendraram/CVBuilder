import React, { useState } from 'react';
import { Code, Plus, Trash2 } from 'lucide-react';

export const SkillsSection = ({ resume, setResume }) => {
  const skills = resume?.skill || [];
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProgress, setNewSkillProgress] = useState(85);

  const handleAdd = (e) => {
    e?.preventDefault();
    if (!newSkillName.trim()) return;

    setResume((prev) => ({
      ...prev,
      skill: [
        ...prev.skill,
        {
          name: newSkillName.trim(),
          progress: Number(newSkillProgress),
        },
      ],
    }));
    setNewSkillName('');
    setNewSkillProgress(85);
  };

  const handleRemove = (index) => {
    setResume((prev) => ({
      ...prev,
      skill: prev.skill.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdate = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.skill];
      updated[index] = {
        ...updated[index],
        [field]: field === 'progress' ? Number(value) : value,
      };
      return {
        ...prev,
        skill: updated,
      };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Code className="w-5 h-5" />
          <h2 className="text-base text-slate-900">Skills & Proficiencies</h2>
        </div>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAdd} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col md:flex-row items-end gap-3">
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Skill Name</label>
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g. React.js, Java, Docker, Tailwind CSS"
            className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="w-full md:w-48">
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Proficiency</span>
            <span className="text-indigo-600">{newSkillProgress}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={newSkillProgress}
            onChange={(e) => setNewSkillProgress(e.target.value)}
            className="w-full accent-indigo-600"
          />
        </div>

        <button
          type="submit"
          disabled={!newSkillName.trim()}
          className="w-full md:w-auto px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm disabled:opacity-50 transition-all"
        >
          <Plus className="w-4 h-4 inline mr-1" /> Add
        </button>
      </form>

      {/* Current Skills List */}
      {skills.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-4">No skills added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((s, index) => (
            <div
              key={index}
              className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                  className="font-medium text-xs text-slate-800 bg-transparent w-full focus:outline-none focus:underline"
                />
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={s.progress || 80}
                    onChange={(e) => handleUpdate(index, 'progress', e.target.value)}
                    className="w-full accent-indigo-600 h-1.5"
                  />
                  <span className="text-[11px] font-medium text-slate-500 w-8 text-right">
                    {s.progress || 80}%
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
