import React, { useState } from 'react';
import { Heart, Plus, X } from 'lucide-react';

export const InterestsSection = ({ resume, setResume }) => {
  const interests = resume?.interests || [];
  const [interestInput, setInterestInput] = useState('');

  const handleAdd = (e) => {
    e?.preventDefault();
    if (!interestInput.trim()) return;

    if (!interests.includes(interestInput.trim())) {
      setResume((prev) => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()],
      }));
    }
    setInterestInput('');
  };

  const handleRemove = (index) => {
    setResume((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Heart className="w-5 h-5" />
          <h2 className="text-base text-slate-900">Interests & Hobbies</h2>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          placeholder="e.g. Open Source, Machine Learning, Hiking, Chess"
          className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!interestInput.trim()}
          className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm disabled:opacity-50 transition-all"
        >
          <Plus className="w-4 h-4 inline mr-1" /> Add
        </button>
      </form>

      {interests.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium"
            >
              {interest}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
