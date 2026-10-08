import React, { useRef, useState } from 'react';
import { User, Camera, Upload, Loader2 } from 'lucide-react';
import { authService, resumeService } from '../../services/api';

export const ProfileSection = ({ resume, setResume, resumeId }) => {
  const profileInfo = resume?.profileInfo || {};
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setResume((prev) => ({
      ...prev,
      profileInfo: {
        ...prev.profileInfo,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // First try uploadResumeImages endpoint
      if (resumeId) {
        const res = await resumeService.uploadResumeImages(resumeId, null, file);
        if (res.profilePreviewUrl) {
          handleChange('profilePreviewUrl', res.profilePreviewUrl);
        }
      } else {
        // Fallback to generic image upload
        const res = await authService.uploadAvatar(file);
        if (res.imageUrl) {
          handleChange('profilePreviewUrl', res.imageUrl);
        }
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      // Local object url fallback for immediate visual preview
      const localUrl = URL.createObjectURL(file);
      handleChange('profilePreviewUrl', localUrl);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center gap-2 text-indigo-600 font-semibold border-b border-slate-100 pb-3">
        <User className="w-5 h-5" />
        <h2 className="text-base text-slate-900">Personal & Profile Details</h2>
      </div>

      {/* Profile Photo Upload */}
      <div className="flex items-center gap-5">
        <div className="relative group">
          {profileInfo.profilePreviewUrl ? (
            <img
              src={profileInfo.profilePreviewUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
              <Camera className="w-8 h-8" />
            </div>
          )}

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div>
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
          {profileInfo.profilePreviewUrl && (
            <button
              type="button"
              onClick={() => handleChange('profilePreviewUrl', '')}
              className="ml-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Remove
            </button>
          )}
          <p className="text-[11px] text-slate-400 mt-1">PNG, JPG or WEBP up to 5MB</p>
        </div>
      </div>

      {/* Name and Designation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={profileInfo.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. John Doe"
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Professional Title / Designation *
          </label>
          <input
            type="text"
            value={profileInfo.designation || ''}
            onChange={(e) => handleChange('designation', e.target.value)}
            placeholder="e.g. Senior Full Stack Developer"
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Professional Summary
        </label>
        <textarea
          rows={4}
          value={profileInfo.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief summary highlighting your background, key expertise, and career goals..."
          className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
        />
      </div>
    </div>
  );
};
