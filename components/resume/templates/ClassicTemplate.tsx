/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface TemplateProps {
  data: any;
  
}

export default function ClassicTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-12 min-h-[297mm] w-[210mm] mx-auto shadow-2xl">
      {/* Header */}
      <div className="text-center border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          {data.personalInfo.name || "Full Name"}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && data.experience[0]?.company && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">
            Work Experience
          </h2>
          {data.experience.map((exp: any, index: number) => (
            exp.company && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && data.education[0]?.degree && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">Education</h2>
          {data.education.map((edu: any, index: number) => (
            edu.degree && (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600">{edu.year}</span>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && data.projects[0]?.name && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">Projects</h2>
          {data.projects.map((project: any, index: number) => (
            project.name && (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-700 mb-1">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </p>
                )}
                {project.link && (
                  <p className="text-blue-600 text-sm">
                    <span className="font-medium">Link:</span> {project.link}
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
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">
            Achievements
          </h2>
          {data.achievements.map((ach: any, index: number) => (
            ach.title && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">{ach.title}</h3>
                  {ach.date && (
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {ach.date}
                    </span>
                  )}
                </div>
                {ach.description && (
                  <p className="text-gray-700 leading-relaxed">{ach.description}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((language: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-md text-sm font-medium"
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {data.hobbies?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 uppercase">Hobbies & Interests</h2>
          <div className="flex flex-wrap gap-2">
            {data.hobbies.map((hobby: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
