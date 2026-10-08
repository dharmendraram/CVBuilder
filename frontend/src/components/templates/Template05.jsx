import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code2, FolderGit2, Award, Languages, Heart, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const Template05 = ({ resume, themeColor = '#1e1b4b' }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    workExperience = [],
    education = [],
    skill = [],
    project = [],
    certification = [],
    language = [],
    interests = [],
  } = resume || {};

  return (
    <div className="bg-white text-slate-800 max-w-[850px] mx-auto shadow-sm print:p-0 print:shadow-none font-sans text-xs leading-normal">
      {/* High-Impact Dark Header */}
      <div className="p-8 text-white relative overflow-hidden" style={{ backgroundColor: themeColor }}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {profileInfo.profilePreviewUrl ? (
            <img
              src={profileInfo.profilePreviewUrl}
              alt={profileInfo.fullName || 'Profile'}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-white/10 ring-4 ring-white/10 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {profileInfo.fullName ? profileInfo.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {profileInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-medium text-amber-300 mt-0.5">
              {profileInfo.designation || 'Lead Architect & Senior Engineer'}
            </p>

            {profileInfo.summary && (
              <p className="text-white/80 text-xs mt-2.5 leading-relaxed max-w-2xl">
                {profileInfo.summary}
              </p>
            )}

            {/* Header Contact Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-[11px] text-white/90">
              {contactInfo.email && (
                <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <Mail className="w-3.5 h-3.5 text-white/70" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
                </span>
              )}
              {contactInfo.phone && (
                <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <Phone className="w-3.5 h-3.5 text-white/70" />
                  <span>{contactInfo.phone}</span>
                </span>
              )}
              {contactInfo.location && (
                <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-white/70" />
                  <span>{contactInfo.location}</span>
                </span>
              )}
              {contactInfo.linkedIn && (
                <a href={contactInfo.linkedIn} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20">
                  <LinkedinIcon className="w-3.5 h-3.5 text-white/70" />
                  <span>LinkedIn</span>
                </a>
              )}
              {contactInfo.github && (
                <a href={contactInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20">
                  <GithubIcon className="w-3.5 h-3.5 text-white/70" />
                  <span>GitHub</span>
                </a>
              )}
              {contactInfo.website && (
                <a href={contactInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20">
                  <Globe className="w-3.5 h-3.5 text-white/70" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Work & Projects (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 mb-3 border-b-2 flex items-center gap-2" style={{ borderColor: themeColor }}>
                  <Briefcase className="w-4 h-4 text-slate-700" />
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {workExperience.map((exp, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40">
                      <div className="flex justify-between items-baseline flex-wrap gap-1">
                        <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {exp.startDate} – {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-indigo-700 mt-0.5 mb-1.5">{exp.company}</p>
                      {exp.description && (
                        <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {project.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 mb-3 border-b-2 flex items-center gap-2" style={{ borderColor: themeColor }}>
                  <FolderGit2 className="w-4 h-4 text-slate-700" />
                  Notable Projects
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {project.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center flex-wrap gap-1">
                        <h3 className="font-bold text-slate-900 text-xs">{p.title}</h3>
                        <div className="flex gap-2 text-[11px] font-medium text-slate-500">
                          {p.github && (
                            <a href={p.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 text-slate-700">
                              <GithubIcon className="w-3 h-3" /> Code
                            </a>
                          )}
                          {p.liveDemo && (
                            <a href={p.liveDemo} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 text-slate-700">
                              <Globe className="w-3 h-3" /> Demo
                            </a>
                          )}
                        </div>
                      </div>
                      {p.description && (
                        <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                          {p.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 mb-3 border-b-2 flex items-center gap-2" style={{ borderColor: themeColor }}>
                  <GraduationCap className="w-4 h-4 text-slate-700" />
                  Education
                </h2>
                <div className="space-y-2.5">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-baseline flex-wrap gap-1">
                      <div>
                        <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                        <p className="text-slate-600 text-xs">{edu.institute}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Metrics & Skills (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            {/* Skills */}
            {skill.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 mb-3 border-b-2" style={{ borderColor: themeColor }}>
                  Technical Expertise
                </h2>
                <div className="space-y-2.5">
                  {skill.map((s, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-800">{s.name}</span>
                        {s.progress && <span className="text-slate-400 text-[10px]">{s.progress}%</span>}
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.progress || 85}%`, backgroundColor: themeColor }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certification.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 mb-3 border-b-2" style={{ borderColor: themeColor }}>
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certification.map((cert, idx) => (
                    <div key={idx} className="text-xs flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900">{cert.title}</p>
                        <p className="text-slate-500 text-[11px]">{cert.issuer} {cert.year && `(${cert.year})`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {language.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 mb-3 border-b-2" style={{ borderColor: themeColor }}>
                  Languages
                </h2>
                <div className="space-y-1.5">
                  {language.map((lang, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="font-medium text-slate-800">{lang.name}</span>
                      <span className="text-slate-500 text-[11px]">{lang.progress ? `${lang.progress}%` : 'Fluent'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {interests.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 mb-3 border-b-2" style={{ borderColor: themeColor }}>
                  Interests
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {interests.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
