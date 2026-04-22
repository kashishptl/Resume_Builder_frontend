/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TemplateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 text-gray-900 p-12 min-h-[297mm] w-[210mm] mx-auto shadow-2xl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 -m-12 mb-8 rounded-b-3xl">
        <h1 className="text-4xl font-bold mb-3">
          {data.personalInfo.full_name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo.email && <span>✉️ {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>📞 {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
        </div>
      </div>

      <div className="px-4">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && data.experience[0]?.company && (
          <div className="mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Experience
            </h2>
            {data.experience.map((exp: any, index: number) => (
              exp.company && (
                <div key={index} className="mb-4 bg-white p-6 rounded-2xl shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                    <span className="text-xs text-purple-600 font-medium bg-purple-100 px-3 py-1 rounded-full">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2 text-sm">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-700 text-sm">{exp.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Education */}
          {data.education?.length > 0 && data.education[0]?.degree && (
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Education
              </h2>
              {data.education.map((edu: any, index: number) => (
                edu.degree && (
                  <div key={index} className="mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                    <p className="text-gray-700 text-xs">{edu.institution}</p>
                    <p className="text-gray-600 text-xs">{edu.year}</p>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {data.projects?.length > 0 && data.projects[0]?.name && (
          <div className="mb-6 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Projects
            </h2>
            {data.projects.map((project: any, index: number) => (
              project.name && (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-700 text-xs mt-1">{project.description}</p>
                  )}
                  {project.technologies && (
                    <p className="text-gray-600 text-xs mt-1">
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
          <div className="mb-6 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Achievements
            </h2>
            {data.achievements.map((ach: any, index: number) => (
              ach.title && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-sm">{ach.title}</h3>
                    {ach.date && <span className="text-xs text-purple-600">{ach.date}</span>}
                  </div>
                  {ach.description && (
                    <p className="text-gray-700 text-xs mt-1">{ach.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Languages & Hobbies Grid */}
        {(data.languages?.length > 0 || data.hobbies?.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {data.languages?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Languages
                </h2>
                <div className="space-y-1">
                  {data.languages.map((language: string, index: number) => (
                    <p key={index} className="text-sm text-gray-700">• {language}</p>
                  ))}
                </div>
              </div>
            )}

            {data.hobbies?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Interests
                </h2>
                <div className="space-y-1">
                  {data.hobbies.map((hobby: string, index: number) => (
                    <p key={index} className="text-sm text-gray-700">• {hobby}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
