/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TemplateProps {
  data: any;
}

export default function ExecutiveTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-12 min-h-[297mm] w-[210mm] mx-auto shadow-2xl">
      {/* Elegant Header */}
      <div className="border-l-8 border-emerald-600 pl-6 mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-2">
          {data.personalInfo.full_name || "Your Name"}
        </h1>
        <div className="flex gap-4 text-sm text-gray-600 font-light">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>|</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>|</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
          <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-widest">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed font-light text-sm">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && data.experience[0]?.company && (
        <div className="mb-8">
          <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Professional Experience
          </h2>
          {data.experience.map((exp: any, index: number) => (
            exp.company && (
              <div key={index} className="mb-6 border-l-2 border-gray-200 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-600 font-light">{exp.duration}</span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 font-light leading-relaxed text-sm">{exp.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && data.education[0]?.degree && (
        <div className="mb-8">
          <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Education
          </h2>
          {data.education.map((edu: any, index: number) => (
            edu.degree && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-light text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-600 font-light">{edu.year}</span>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-8">
          <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {data.skills.map((skill: string, index: number) => (
              <div key={index} className="text-sm text-gray-700 font-light">
                • {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && data.projects[0]?.name && (
        <div className="mb-8">
          <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Key Projects
          </h2>
          {data.projects.map((project: any, index: number) => (
            project.name && (
              <div key={index} className="mb-4 border-l-2 border-gray-200 pl-6">
                <h3 className="text-base font-semibold text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-700 font-light text-sm mt-1">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="text-gray-600 font-light text-xs mt-1">
                    {project.technologies}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Achievements */}
      {data.achievements?.length > 0 && data.achievements[0]?.title && (
        <div className="mb-8">
          <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Notable Achievements
          </h2>
          {data.achievements.map((ach: any, index: number) => (
            ach.title && (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-gray-900">{ach.title}</h3>
                  {ach.date && <span className="text-xs text-gray-600 font-light">{ach.date}</span>}
                </div>
                {ach.description && (
                  <p className="text-gray-700 font-light text-sm mt-1">{ach.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Languages & Hobbies */}
      <div className="grid grid-cols-2 gap-8">
        {data.languages?.length > 0 && (
          <div>
            <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
            <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-widest">
              Languages
            </h2>
            <div className="space-y-1">
              {data.languages.map((language: string, index: number) => (
                <p key={index} className="text-sm text-gray-700 font-light">• {language}</p>
              ))}
            </div>
          </div>
        )}

        {data.hobbies?.length > 0 && (
          <div>
            <div className="h-1 w-20 bg-emerald-600 mb-4"></div>
            <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-widest">
              Interests
            </h2>
            <div className="space-y-1">
              {data.hobbies.map((hobby: string, index: number) => (
                <p key={index} className="text-sm text-gray-700 font-light">• {hobby}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
