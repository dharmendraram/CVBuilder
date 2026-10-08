import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

export const CertificationsSection = ({ resume, setResume }) => {
  const certifications = resume?.certification || [];

  const handleAdd = () => {
    setResume((prev) => ({
      ...prev,
      certification: [
        ...prev.certification,
        {
          title: '',
          issuer: '',
          year: '',
        },
      ],
    }));
  };

  const handleRemove = (index) => {
    setResume((prev) => ({
      ...prev,
      certification: prev.certification.filter((_, idx) => idx !== index),
    }));
  };

  const handleChange = (index, field, value) => {
    setResume((prev) => {
      const updated = [...prev.certification];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return {
        ...prev,
        certification: updated,
      };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Award className="w-5 h-5" />
          <h2 className="text-base text-slate-900">Certifications & Awards</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 mb-3">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + Add a certificate
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-end gap-3"
            >
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium text-slate-700 mb-1">Certificate Title</label>
                <input
                  type="text"
                  value={cert.title || ''}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="w-full md:w-1/3">
                <label className="block text-xs font-medium text-slate-700 mb-1">Issuer Organization</label>
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="w-full md:w-28">
                <label className="block text-xs font-medium text-slate-700 mb-1">Year</label>
                <input
                  type="text"
                  value={cert.year || ''}
                  onChange={(e) => handleChange(index, 'year', e.target.value)}
                  placeholder="e.g. 2023"
                  className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
