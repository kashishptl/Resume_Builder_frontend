import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

const templateStyles = {
  modern: {
    headerBg: "bg-gradient-to-r from-blue-600 to-cyan-600",
    headerText: "text-white",
    sectionTitle: "text-blue-600 border-b-2 border-blue-600",
    accent: "text-blue-600"
  },
  professional: {
    headerBg: "bg-slate-800",
    headerText: "text-white",
    sectionTitle: "text-slate-800 border-b-2 border-slate-800",
    accent: "text-slate-700"
  },
  creative: {
    headerBg: "bg-gradient-to-r from-violet-600 to-pink-600",
    headerText: "text-white",
    sectionTitle: "text-violet-600 border-b-2 border-violet-600",
    accent: "text-violet-600"
  },
  minimal: {
    headerBg: "bg-emerald-600",
    headerText: "text-white",
    sectionTitle: "text-emerald-600 border-b-2 border-emerald-600",
    accent: "text-emerald-600"
  }
};

export default function ResumePreviewComponent({ data, template = "modern", scale = 1 }) {
  const style = templateStyles[template] || templateStyles.modern;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-2xl overflow-hidden"
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
    >
      {/* Header */}
      <div className={`${style.headerBg} ${style.headerText} p-8`}>
        <h1 className="text-3xl font-bold mb-1">
          {data.personalInfo?.full_name || "Full Name"}
        </h1>
        <p className="text-xl opacity-90 mb-4">
          {data.personalInfo?.jobTitle || "Professional Title"}
        </p>
        
        {/* Contact info */}
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {data.personalInfo?.summary && (
          <section>
            <h2 className={`text-lg font-bold ${style.sectionTitle} pb-2 mb-3`}>
              Professional Summary
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold ${style.sectionTitle} pb-2 mb-3`}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className={`font-semibold ${style.accent}`}>{exp.role}</h3>
                      <p className="text-slate-700">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold ${style.sectionTitle} pb-2 mb-3`}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold ${style.accent}`}>{edu.degree}</h3>
                    <p className="text-slate-700">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-slate-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold ${style.sectionTitle} pb-2 mb-3`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}