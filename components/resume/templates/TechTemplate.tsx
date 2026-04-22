import React from 'react';

interface TemplateProps {
  data: any;
}

export default function TechTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-slate-900 text-white p-12 min-h-[297mm] w-[210mm] mx-auto shadow-2xl font-mono">
      {/* Terminal Header */}
      <div className="border border-emerald-400 rounded-lg p-6 mb-6 bg-slate-800">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-emerald-400">$</span>{' '}
            <span className="text-blue-400">whoami</span>
          </p>
          <p className="text-xl font-bold text-emerald-400">
            {data.personalInfo.name || "user@resume"}
          </p>
          <div className="text-gray-400 text-xs space-y-1 mt-2">
            {data.personalInfo.email && <p>📧 {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>📱 {data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <p className="text-emerald-400 mb-2 text-sm">
            <span>$</span> cat about.txt
          </p>
          <div className="bg-slate-800 border-l-4 border-emerald-400 p-4 rounded">
            <p className="text-gray-300 text-xs leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && data.experience[0]?.company && (
        <div className="mb-6">
          <p className="text-emerald-400 mb-2 text-sm">
            <span>$</span> ls -la experience/
          </p>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              exp.company && (
                <div key={index} className="bg-slate-800 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-blue-400">{exp.role}</h3>
                      <p className="text-emerald-400 text-xs">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-slate-700 px-2 py-1 rounded">
                      {exp.duration}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-400 text-xs">{exp.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-6">
          <p className="text-emerald-400 mb-2 text-sm">
            <span>$</span> echo $SKILLS
          </p>
          <div className="bg-slate-800 p-4 rounded">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-900/30 text-emerald-300 border border-emerald-500/30 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && data.education[0]?.degree && (
        <div className="mb-6">
          <p className="text-emerald-400 mb-2 text-sm">
            <span>$</span> cat education.json
          </p>
          <div className="bg-slate-800 p-4 rounded space-y-3">
            {data.education.map((edu: any, index: number) => (
              edu.degree && (
                <div key={index} className="text-xs">
                  <p className="text-blue-400 font-semibold">{edu.degree}</p>
                  <p className="text-gray-400">{edu.institution} • {edu.year}</p>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && data.projects[0]?.name && (
        <div className="mb-6">
          <p className="text-emerald-400 mb-2 text-sm">
            <span>$</span> ls projects/
          </p>
          <div className="bg-slate-800 p-4 rounded space-y-3">
            {data.projects.map((project: any, index: number) => (
              project.name && (
                <div key={index} className="border-l-2 border-violet-500 pl-3">
                  <h3 className="text-violet-400 font-semibold text-sm">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-400 text-xs mt-1">{project.description}</p>
                  )}
                  {project.technologies && (
                    <p className="text-emerald-400 text-xs mt-1">{project.technologies}</p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {data.achievements?.length > 0 && data.achievements[0]?.title && (
        <div className="mb-6">
          <p className="text-emerald-400 mb-2 text-sm">
            <span>$</span> cat achievements.log
          </p>
          <div className="bg-slate-800 p-4 rounded space-y-2">
            {data.achievements.map((ach: any, index: number) => (
              ach.title && (
                <div key={index} className="text-xs">
                  <div className="flex justify-between items-start">
                    <p className="text-yellow-400 font-semibold">{ach.title}</p>
                    {ach.date && <span className="text-gray-500">{ach.date}</span>}
                  </div>
                  {ach.description && (
                    <p className="text-gray-400 mt-1">{ach.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Languages & Hobbies */}
      <div className="grid grid-cols-2 gap-4">
        {data.languages?.length > 0 && (
          <div>
            <p className="text-emerald-400 mb-2 text-sm">
              <span>$</span> cat languages.txt
            </p>
            <div className="bg-slate-800 p-4 rounded">
              <div className="space-y-1 text-xs text-gray-400">
                {data.languages.map((language: string, index: number) => (
                  <p key={index}>• {language}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {data.hobbies?.length > 0 && (
          <div>
            <p className="text-emerald-400 mb-2 text-sm">
              <span>$</span> cat interests.txt
            </p>
            <div className="bg-slate-800 p-4 rounded">
              <div className="space-y-1 text-xs text-gray-400">
                {data.hobbies.map((hobby: string, index: number) => (
                  <p key={index}>• {hobby}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
