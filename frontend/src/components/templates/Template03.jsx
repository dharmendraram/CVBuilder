import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const Template03 = ({ resume, themeColor = '#0284c7' }) => {
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
      {/* Executive Clean Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b-2 gap-4" style={{ borderColor: themeColor }}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900" style={{ color: themeColor }}>
            {profileInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          <p className="text-sm font-semibold tracking-wide uppercase text-slate-600 mt-0.5">
            {profileInfo.designation || 'EXECUTIVE / SENIOR SPECIALIST'}
          </p>
        </div>

        {/* Compact Right-Aligned Contact Block */}
        <div className="text-right text-[11px] text-slate-600 space-y-0.5 sm:shrink-0">
          {contactInfo.email && (
            <div>
              <a href={`mailto:${contactInfo.email}`} className="text-slate-800 font-medium hover:underline">
                {contactInfo.email}
              </a>
            </div>
          )}
          {contactInfo.phone && <div>{contactInfo.phone}</div>}
          {contactInfo.location && <div>{contactInfo.location}</div>}
          <div className="flex flex-wrap gap-2 justify-start sm:justify-end text-[10px] font-medium pt-1">
            {contactInfo.linkedIn && (
              <a href={contactInfo.linkedIn} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                LinkedIn
              </a>
            )}
            {contactInfo.github && (
              <a href={contactInfo.github} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                • GitHub
              </a>
            )}
            {contactInfo.website && (
              <a href={contactInfo.website} target="_blank" rel="noreferrer" className="hover:underline text-slate-700">
                • Portfolio
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      {profileInfo.summary && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest pb-1 mb-1.5 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
            Executive Profile
          </h2>
          <p className="text-slate-700 leading-relaxed text-justify">
            {profileInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest pb-1 mb-2.5 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
            Leadership & Experience
          </h2>
          <div className="space-y-3.5">
            {workExperience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-700 mb-1" style={{ color: themeColor }}>
                  {exp.company}
                </div>
                {exp.description && (
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
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
          <h2 className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
            Key Projects & Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.map((p, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-xs">{p.title}</h3>
                  <div className="flex gap-2 text-[10px] text-slate-500 font-medium">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="hover:underline">Code</a>}
                    {p.liveDemo && <a href={p.liveDemo} target="_blank" rel="noreferrer" className="hover:underline">Demo</a>}
                  </div>
                </div>
                {p.description && (
                  <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">{p.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education 2-Column Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-[11px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-600">{edu.institute}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skill.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skill.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded text-[11px] font-medium border"
                  style={{ borderColor: `${themeColor}50`, color: themeColor, backgroundColor: `${themeColor}08` }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Details: Certifications, Languages, Interests */}
      {(certification.length > 0 || language.length > 0 || interests.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-2 border-t border-slate-200">
          {certification.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Certifications</h3>
              <ul className="space-y-0.5 text-slate-700">
                {certification.map((c, i) => (
                  <li key={i}>
                    • <span className="font-semibold">{c.title}</span> <span className="text-slate-400 text-[10px]">({c.issuer})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {language.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Languages</h3>
              <div className="space-y-0.5 text-slate-700">
                {language.map((l, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-slate-400 text-[10px]">{l.progress ? `${l.progress}%` : 'Fluent'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {interests.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Interests</h3>
              <p className="text-slate-600 text-[11px]">
                {interests.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
