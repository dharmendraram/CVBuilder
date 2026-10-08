import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code2, FolderGit2, Award, Languages, Heart } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const Template01 = ({ resume, themeColor = '#4f46e5' }) => {
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
    <div className="bg-white text-slate-800 p-8 max-w-[850px] mx-auto shadow-sm print:p-0 print:shadow-none font-sans text-sm leading-normal">
      {/* Header Banner */}
      <div className="border-b-2 pb-5 flex flex-col sm:flex-row items-center sm:items-start gap-5" style={{ borderColor: themeColor }}>
        {profileInfo.profilePreviewUrl && (
          <img
            src={profileInfo.profilePreviewUrl}
            alt={profileInfo.fullName || 'Profile'}
            className="w-24 h-24 rounded-2xl object-cover border-2 shadow-sm shrink-0"
            style={{ borderColor: themeColor }}
          />
        )}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ color: themeColor }}>
            {profileInfo.fullName || 'Your Full Name'}
          </h1>
          <p className="text-base font-semibold text-slate-700 mt-0.5">
            {profileInfo.designation || 'Software Engineer / Professional Title'}
          </p>

          {profileInfo.summary && (
            <p className="text-slate-600 text-xs mt-2.5 leading-relaxed">
              {profileInfo.summary}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1.5 gap-x-3.5 mt-3 text-xs text-slate-600 font-medium">
            {contactInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
              </span>
            )}
            {contactInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <span>{contactInfo.phone}</span>
              </span>
            )}
            {contactInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <span>{contactInfo.location}</span>
              </span>
            )}
            {contactInfo.linkedIn && (
              <span className="flex items-center gap-1">
                <LinkedinIcon className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <a href={contactInfo.linkedIn} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              </span>
            )}
            {contactInfo.github && (
              <span className="flex items-center gap-1">
                <GithubIcon className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <a href={contactInfo.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
              </span>
            )}
            {contactInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <a href={contactInfo.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        {/* Main Column (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-3 border-b" style={{ color: themeColor }}>
                <Briefcase className="w-4 h-4" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="relative pl-3.5 border-l-2 border-slate-200">
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mb-1">{exp.company}</p>
                    {exp.description && (
                      <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Projects */}
          {project.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-3 border-b" style={{ color: themeColor }}>
                <FolderGit2 className="w-4 h-4" />
                Key Projects
              </h2>
              <div className="space-y-3">
                {project.map((proj, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-center flex-wrap gap-1">
                      <h3 className="font-bold text-slate-900 text-xs">{proj.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 font-medium">
                            <GithubIcon className="w-3 h-3" /> Source
                          </a>
                        )}
                        {proj.liveDemo && (
                          <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 font-medium">
                            <Globe className="w-3 h-3" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {proj.description}
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
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-3 border-b" style={{ color: themeColor }}>
                <GraduationCap className="w-4 h-4" />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                      <p className="text-xs text-slate-600">{edu.institute}</p>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold">
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
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-3 border-b" style={{ color: themeColor }}>
                <Code2 className="w-4 h-4" />
                Skills & Tech
              </h2>
              <div className="space-y-2">
                {skill.map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-800">{s.name}</span>
                      {s.progress && <span className="text-slate-400 text-[10px]">{s.progress}%</span>}
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
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
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-3 border-b" style={{ color: themeColor }}>
                <Award className="w-4 h-4" />
                Certifications
              </h2>
              <div className="space-y-2.5">
                {certification.map((cert, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-slate-900">{cert.title}</p>
                    <p className="text-slate-500 text-[11px]">
                      {cert.issuer} {cert.year && `• ${cert.year}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {language.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-3 border-b" style={{ color: themeColor }}>
                <Languages className="w-4 h-4" />
                Languages
              </h2>
              <div className="space-y-1.5">
                {language.map((lang, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="font-medium text-slate-800">{lang.name}</span>
                    <span className="text-slate-500 text-[11px]">{lang.progress ? `${lang.progress}%` : 'Proficient'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-3 border-b" style={{ color: themeColor }}>
                <Heart className="w-4 h-4" />
                Interests
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-medium"
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
