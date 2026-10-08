import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code2, FolderGit2, Award, Languages, Heart } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const Template06 = ({ resume, themeColor = '#0f172a' }) => {
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
    <div className="bg-white text-slate-800 max-w-[850px] mx-auto shadow-sm print:p-0 print:shadow-none font-sans text-xs min-h-[900px] flex flex-col md:flex-row">
      {/* Left Accent Sidebar (35% width) */}
      <div
        className="w-full md:w-[35%] p-7 text-white space-y-6 shrink-0"
        style={{ backgroundColor: themeColor }}
      >
        {/* Profile Image & Name */}
        <div className="text-center">
          {profileInfo.profilePreviewUrl ? (
            <img
              src={profileInfo.profilePreviewUrl}
              alt={profileInfo.fullName || 'Profile'}
              className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-white/30 shadow-md mb-3.5"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/15 mx-auto flex items-center justify-center text-white text-2xl font-bold mb-3.5 ring-2 ring-white/20">
              {profileInfo.fullName ? profileInfo.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <h1 className="text-xl font-bold tracking-tight text-white">
            {profileInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs text-white/80 font-medium mt-1 uppercase tracking-wider">
            {profileInfo.designation || 'Specialist Role'}
          </p>
        </div>

        {/* Contact Info */}
        <div className="pt-2 border-t border-white/20">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
            Contact
          </h3>
          <div className="space-y-2.5 text-xs text-white/90">
            {contactInfo.email && (
              <div className="flex items-center gap-2.5 break-all">
                <Mail className="w-3.5 h-3.5 shrink-0 text-white/70" />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-white/70" />
                <span>{contactInfo.phone}</span>
              </div>
            )}
            {contactInfo.location && (
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-white/70" />
                <span>{contactInfo.location}</span>
              </div>
            )}
            {contactInfo.linkedIn && (
              <div className="flex items-center gap-2.5 break-all">
                <LinkedinIcon className="w-3.5 h-3.5 shrink-0 text-white/70" />
                <a href={contactInfo.linkedIn} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              </div>
            )}
            {contactInfo.github && (
              <div className="flex items-center gap-2.5 break-all">
                <GithubIcon className="w-3.5 h-3.5 shrink-0 text-white/70" />
                <a href={contactInfo.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
              </div>
            )}
            {contactInfo.website && (
              <div className="flex items-center gap-2.5 break-all">
                <Globe className="w-3.5 h-3.5 shrink-0 text-white/70" />
                <a href={contactInfo.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skill.length > 0 && (
          <div className="pt-2 border-t border-white/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
              Skills
            </h3>
            <div className="space-y-2.5">
              {skill.map((s, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs text-white/90 mb-1">
                    <span>{s.name}</span>
                    <span className="text-white/60 text-[10px]">{s.progress || 80}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-white h-full rounded-full"
                      style={{ width: `${s.progress || 80}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {language.length > 0 && (
          <div className="pt-2 border-t border-white/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
              Languages
            </h3>
            <div className="space-y-1.5 text-xs text-white/90">
              {language.map((lang, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-white/60 text-[11px]">{lang.progress ? `${lang.progress}%` : 'Fluent'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div className="pt-2 border-t border-white/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] bg-white/15 text-white/90 border border-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Column (65% width) */}
      <div className="w-full md:w-[65%] p-8 space-y-6">
        {/* Profile Summary */}
        {profileInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-2 border-b-2 border-slate-200">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              {profileInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 border-b-2 border-slate-200 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-600" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mb-1">{exp.company}</p>
                  {exp.description && (
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 border-b-2 border-slate-200 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-slate-600" />
              Projects
            </h2>
            <div className="space-y-3">
              {project.map((p, idx) => (
                <div key={idx} className="border-l-2 border-slate-200 pl-3">
                  <div className="flex justify-between items-center flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-xs">{p.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                          GitHub
                        </a>
                      )}
                      {p.liveDemo && (
                        <a href={p.liveDemo} target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  {p.description && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 border-b-2 border-slate-200 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
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

        {/* Certifications */}
        {certification.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 border-b-2 border-slate-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-slate-600" />
              Certifications
            </h2>
            <div className="space-y-2">
              {certification.map((cert, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-slate-900">{cert.title}</span>
                  <span className="text-slate-500 text-[11px]"> — {cert.issuer} {cert.year && `(${cert.year})`}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
