import React, { useState } from 'react';
import { Languages, Plus, Trash2 } from 'lucide-react';

export const LanguagesSection = ({ resume, setResume }) => {
  const languages = resume?.language || [];
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(100);

  const handleAdd = (e) => {
    e?.preventDefault();
    if (!name.trim()) return;

    setResume((prev) => ({
      ...prev,
      language: [
        ...prev.language,
        {
          name: name.trim(),
          progress: Number(progress),
        },
      ],
    }));
    setName('');
    setProgress(100);
  };

  const handleRemove = (index) => {
    setResume((prev) => ({
      ...prev,
      language: prev.language.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Languages className="w-5 h-5" />
          <h2 className="text-base text-slate-900">Languages</h2>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. English, Nepali, Hindi, French"
          className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm disabled:opacity-50 transition-all"
        >
          <Plus className="w-4 h-4 inline mr-1" /> Add
        </button>
      </form>

      {languages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700"
            >
              <span>{lang.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-slate-400 hover:text-red-500"
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
