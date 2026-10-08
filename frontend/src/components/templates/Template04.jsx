import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code2, FolderGit2, Award, Languages, Heart, Calendar } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const Template04 = ({ resume, themeColor = '#0891b2' }) => {
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
    <div className="bg-white text-slate-800 p-8 max-w-[850px] mx-auto shadow-sm print:p-0 print:shadow-none font-sans text-xs leading-normal">
      {/* Top Header with Accent Background Block */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {profileInfo.profilePreviewUrl ? (
          <img
            src={profileInfo.profilePreviewUrl}
            alt={profileInfo.fullName || 'Profile'}
            className="w-24 h-24 rounded-full object-cover border-4 shadow-sm shrink-0"
            style={{ borderColor: themeColor }}
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-sm"
            style={{ backgroundColor: themeColor }}
          >
            {profileInfo.fullName ? profileInfo.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
        )}

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900" style={{ color: themeColor }}>
              {profileInfo.fullName || 'Your Full Name'}
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-700 mt-0.5">
            {profileInfo.designation || 'Software Engineer / Creative Specialist'}
          </p>

          {profileInfo.summary && (
            <p className="text-slate-600 text-xs mt-2.5 leading-relaxed">
              {profileInfo.summary}
            </p>
          )}

          {/* Contact Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 text-[11px] font-medium text-slate-700">
            {contactInfo.email && (
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-slate-300"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{contactInfo.email}</span>
              </a>
            )}
            {contactInfo.phone && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{contactInfo.phone}</span>
              </span>
            )}
            {contactInfo.location && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{contactInfo.location}</span>
              </span>
            )}
            {contactInfo.linkedIn && (
              <a
                href={contactInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:text-indigo-600"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>LinkedIn</span>
              </a>
            )}
            {contactInfo.github && (
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:text-indigo-600"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub</span>
              </a>
            )}
            {contactInfo.website && (
              <a
                href={contactInfo.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:text-indigo-600"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        {/* Main Column (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1.5 mb-3 border-b-2" style={{ borderColor: `${themeColor}40` }}>
                <span className="p-1 rounded bg-slate-100" style={{ color: themeColor }}>
                  <Briefcase className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Employment & Experience
                </h2>
              </div>

              <div className="space-y-4 pl-1">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                    <div
                      className="absolute -left-[5px] top-1 w-2 h-2 rounded-full ring-4 ring-white"
                      style={{ backgroundColor: themeColor }}
                    ></div>
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mt-0.5 mb-1" style={{ color: themeColor }}>
                      {exp.company}
                    </p>
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
              <div className="flex items-center gap-2 pb-1.5 mb-3 border-b-2" style={{ borderColor: `${themeColor}40` }}>
                <span className="p-1 rounded bg-slate-100" style={{ color: themeColor }}>
                  <FolderGit2 className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Featured Projects
                </h2>
              </div>

              <div className="space-y-3">
                {project.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <div className="flex justify-between items-center flex-wrap gap-1">
                      <h3 className="font-bold text-slate-900 text-xs">{p.title}</h3>
                      <div className="flex gap-2 text-[11px] font-medium text-slate-500">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                            <GithubIcon className="w-3 h-3" /> Code
                          </a>
                        )}
                        {p.liveDemo && (
                          <a href={p.liveDemo} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Live
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
              <div className="flex items-center gap-2 pb-1.5 mb-3 border-b-2" style={{ borderColor: `${themeColor}40` }}>
                <span className="p-1 rounded bg-slate-100" style={{ color: themeColor }}>
                  <GraduationCap className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Education Background
                </h2>
              </div>

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

        {/* Sidebar Column (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          {/* Skills */}
          {skill.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1.5 mb-3 border-b-2" style={{ borderColor: `${themeColor}40` }}>
                <span className="p-1 rounded bg-slate-100" style={{ color: themeColor }}>
                  <Code2 className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Skills
                </h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skill.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certification.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1.5 mb-3 border-b-2" style={{ borderColor: `${themeColor}40` }}>
                <span className="p-1 rounded bg-slate-100" style={{ color: themeColor }}>
                  <Award className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Certifications
                </h2>
              </div>

              <div className="space-y-2">
                {certification.map((cert, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-slate-900">{cert.title}</p>
                    <p className="text-slate-500 text-[11px]">{cert.issuer} {cert.year && `(${cert.year})`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {language.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1.5 mb-3 border-b-2" style={{ borderColor: `${themeColor}40` }}>
                <span className="p-1 rounded bg-slate-100" style={{ color: themeColor }}>
                  <Languages className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Languages
                </h2>
              </div>

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
              <div className="flex items-center gap-2 pb-1.5 mb-3 border-b-2" style={{ borderColor: `${themeColor}40` }}>
                <span className="p-1 rounded bg-slate-100" style={{ color: themeColor }}>
                  <Heart className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Interests
                </h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-600 border border-slate-200"
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
  );
};
