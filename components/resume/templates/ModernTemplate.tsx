/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TemplateProps {
  data: any;
}

export default function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-0 min-h-[297mm] w-[210mm] mx-auto shadow-2xl overflow-hidden">
      <div className="grid grid-cols-3 gap-0 h-full">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 break-words leading-tight">
              {data.personalInfo.full_name || "Your Name"}
            </h1>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">
              Contact
            </h3>
            <div className="space-y-2 text-xs">
              {data.personalInfo.email && (
                <p className="break-words">{data.personalInfo.email}</p>
              )}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
            </div>
          </div>

          {/* Skills */}
          {data.skills?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs bg-slate-700 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">
                Languages
              </h3>
              <div className="space-y-1 text-xs">
                {data.languages.map((lang: string, index: number) => (
                  <p key={index}>{lang}</p>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">
                Interests
              </h3>
              <div className="space-y-1 text-xs">
                {data.hobbies.map((hobby: string, index: number) => (
                  <p key={index}>{hobby}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-8">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-3 border-b-2 border-blue-500 pb-2">
                PROFILE
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && data.experience[0]?.company && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-3 border-b-2 border-blue-500 pb-2">
                EXPERIENCE
              </h2>
              {data.experience.map((exp: any, index: number) => (
                exp.company && (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-base font-semibold text-gray-900">{exp.role}</h3>
                      <span className="text-xs text-gray-600">{exp.duration}</span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2 text-sm">{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {data.education?.length > 0 && data.education[0]?.degree && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-3 border-b-2 border-blue-500 pb-2">
                EDUCATION
              </h2>
              {data.education.map((edu: any, index: number) => (
                edu.degree && (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700 text-sm">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-gray-600">{edu.year}</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && data.projects[0]?.name && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-3 border-b-2 border-blue-500 pb-2">
                PROJECTS
              </h2>
              {data.projects.map((project: any, index: number) => (
                project.name && (
                  <div key={index} className="mb-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{project.name}</h3>
                    {project.description && (
                      <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                    )}
                    {project.technologies && (
                      <p className="text-gray-600 text-xs">
                        <span className="font-medium">Tech:</span> {project.technologies}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Achievements */}
          {data.achievements?.length > 0 && data.achievements[0]?.title && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-3 border-b-2 border-blue-500 pb-2">
                ACHIEVEMENTS
              </h2>
              {data.achievements.map((ach: any, index: number) => (
                ach.title && (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-base font-semibold text-gray-900">{ach.title}</h3>
                      {ach.date && <span className="text-xs text-gray-600">{ach.date}</span>}
                    </div>
                    {ach.description && (
                      <p className="text-gray-700 text-sm">{ach.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
