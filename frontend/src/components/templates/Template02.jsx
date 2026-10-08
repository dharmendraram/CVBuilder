import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const Template02 = ({ resume, themeColor = '#0f172a' }) => {
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
    <div className="bg-white text-slate-900 p-8 max-w-[850px] mx-auto shadow-sm print:p-0 print:shadow-none font-sans text-xs leading-normal">
      {/* Header (ATS Recruiter Format) */}
      <div className="text-center pb-4 border-b-2" style={{ borderColor: themeColor }}>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase" style={{ color: themeColor }}>
          {profileInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-semibold text-slate-700 mt-0.5">
          {profileInfo.designation || 'Software Engineer / Professional Title'}
        </p>

        {/* Linear ATS Contact Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-600 font-medium">
          {contactInfo.location && <span>{contactInfo.location}</span>}
          {contactInfo.phone && <span>• {contactInfo.phone}</span>}
          {contactInfo.email && (
            <span>
              • <a href={`mailto:${contactInfo.email}`} className="text-slate-900 hover:underline">{contactInfo.email}</a>
            </span>
          )}
          {contactInfo.linkedIn && (
            <span>
              • <a href={contactInfo.linkedIn} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">LinkedIn</a>
            </span>
          )}
          {contactInfo.github && (
            <span>
              • <a href={contactInfo.github} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">GitHub</a>
            </span>
          )}
          {contactInfo.website && (
            <span>
              • <a href={contactInfo.website} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">Portfolio</a>
            </span>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {profileInfo.summary && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-300" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          <p className="text-slate-700 text-xs leading-relaxed text-justify">
            {profileInfo.summary}
          </p>
        </div>
      )}

      {/* Technical Skills */}
      {skill.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-300" style={{ color: themeColor }}>
            Skills & Competencies
          </h2>
          <div className="text-xs text-slate-800 leading-relaxed">
            <span className="font-semibold text-slate-900">Technical Skills: </span>
            {skill.map((s, idx) => (
              <span key={idx}>
                {s.name}{idx < skill.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-300" style={{ color: themeColor }}>
            Work Experience
          </h2>
          <div className="space-y-3">
            {workExperience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="font-bold text-slate-950 text-xs">{exp.role}</span>
                  <span className="text-[11px] text-slate-600 font-semibold">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-slate-700 font-medium mb-1">
                  <span className="italic">{exp.company}</span>
                </div>
                {exp.description && (
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed pl-2 border-l border-slate-200">
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
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-300" style={{ color: themeColor }}>
            Projects
          </h2>
          <div className="space-y-2.5">
            {project.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="font-bold text-slate-950">{proj.title}</span>
                  <div className="text-[10px] text-slate-500 flex gap-2 font-medium">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="hover:underline">
                        [Code]
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="hover:underline">
                        [Demo]
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="text-slate-600 leading-relaxed mt-0.5 pl-2 border-l border-slate-200">
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
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-300" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline flex-wrap">
                <div>
                  <span className="font-bold text-slate-950">{edu.degree}</span>
                  <span className="text-slate-700">, {edu.institute}</span>
                </div>
                <span className="text-[11px] text-slate-600 font-semibold">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages Footer Grid */}
      {(certification.length > 0 || language.length > 0 || interests.length > 0) && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {certification.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-300" style={{ color: themeColor }}>
                Certifications
              </h2>
              <ul className="space-y-1 text-slate-700">
                {certification.map((c, i) => (
                  <li key={i} className="flex justify-between">
                    <span className="font-medium">• {c.title}</span>
                    <span className="text-slate-500 text-[10px]">{c.issuer} {c.year && `(${c.year})`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {language.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-300" style={{ color: themeColor }}>
                Languages
              </h2>
              <div className="text-slate-700">
                {language.map((l, i) => (
                  <span key={i}>
                    {l.name} {l.progress ? `(${l.progress}%)` : ''}{i < language.length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
