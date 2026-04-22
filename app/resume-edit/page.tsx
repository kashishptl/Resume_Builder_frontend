"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  Download,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Palette,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/resume/Sidebar";
import ResumePreviewComponent from "@/components/resume/ResumePreviewComponent";
import TemplateSelector from "@/components/resume/TemplateSelector";
import AIActionButton from "@/components/resume/AIActionButton";
import FloatingAIButton from "@/components/resume/FloatingAIButton";

// Types
interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

interface PersonalInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

type ResumeRaw = Record<string, unknown>;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim() !== "";

const ensureArray = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : [];

const normalizeResumeData = (data: unknown): FormData => {
  const rawData =
    typeof data === "object" && data !== null ? (data as ResumeRaw) : {};
  const personalInfo =
    typeof rawData.personalInfo === "object" && rawData.personalInfo !== null
      ? (rawData.personalInfo as ResumeRaw)
      : {};

  const resolveString = (...values: unknown[]): string => {
    for (const value of values) {
      if (isNonEmptyString(value)) {
        return value;
      }
    }
    return "";
  };

  const experienceItems = ensureArray(
    rawData.experience ?? personalInfo.experience,
  );
  const educationItems = ensureArray(
    rawData.education ?? personalInfo.education,
  );
  const skillsItems = ensureArray(rawData.skills ?? personalInfo.skills);

  return {
    personalInfo: {
      name: resolveString(rawData.full_name, personalInfo.name),
      jobTitle: resolveString(rawData.job_title, personalInfo.jobTitle),
      email: resolveString(rawData.email, personalInfo.email),
      phone: resolveString(rawData.phone, personalInfo.phone),
      location: resolveString(rawData.location, personalInfo.location),
      website: resolveString(rawData.website, personalInfo.website),
      summary: resolveString(
        rawData.professional_summary,
        rawData.summary,
        personalInfo.summary,
      ),
    },
    experience: experienceItems.map((exp, index) => {
      const item =
        typeof exp === "object" && exp !== null ? (exp as ResumeRaw) : {};
      return {
        id: typeof item.id === "number" ? item.id : Date.now() + index,
        company: resolveString(item.company),
        role: resolveString(item.role, item.job_title),
        duration: resolveString(item.duration, item.start_date),
        description: resolveString(item.description),
      };
    }),
    education: educationItems.map((edu, index) => {
      const item =
        typeof edu === "object" && edu !== null ? (edu as ResumeRaw) : {};
      return {
        id: typeof item.id === "number" ? item.id : Date.now() + index,
        degree: resolveString(item.degree),
        institution: resolveString(item.institution),
        year: resolveString(item.year, item.end_year),
      };
    }),
    skills: skillsItems.filter(isNonEmptyString),
  };
};

interface ExpandedSections {
  personal: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
}

export default function ResumeEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const [template, setTemplate] = useState("modern");
  const [zoom, setZoom] = useState(0.7);
  const [showTemplates, setShowTemplates] = useState(false);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    personal: true,
    experience: true,
    education: true,
    skills: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: "John Doe",
      jobTitle: "Senior Software Engineer",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "johndoe.dev",
      summary:
        "Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.",
    },
    experience: [
      {
        id: 1,
        company: "Tech Corp",
        role: "Senior Software Engineer",
        duration: "Jan 2022 - Present",
        description:
          "Led the development of a microservices architecture that reduced system latency by 60%.",
      },
      {
        id: 2,
        company: "StartupXYZ",
        role: "Software Engineer",
        duration: "Mar 2019 - Dec 2021",
        description:
          "Built and maintained multiple React applications serving over 100k users.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        year: "2019",
      },
    ],
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "GraphQL",
    ],
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const loadResumeData = async () => {
      if (!resumeId) return;

      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.warn("No auth token available for resume load");
          return;
        }

        const res = await axios.get(
          `http://127.0.0.1:5000/resume/${resumeId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const json = res.data;
        const loaded = Array.isArray(json) ? (json[0] ?? null) : json;
        if (!loaded) return;

        setFormData(normalizeResumeData(loaded));
        if (loaded.template) {
          setTemplate(loaded.template);
        }
      } catch (error) {
        console.error("Resume load error:", error);
      }
    };

    loadResumeData();
  }, [resumeId]);

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateExperience = (
    id: number,
    field: keyof Experience,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: "",
          role: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: "",
          institution: "",
          year: "",
        },
      ],
    }));
  };

  const removeEducation = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSave = async () => {
    console.log("handleSave called");
    console.log("Current resumeId:", resumeId);

    if (!resumeId) {
      console.warn("Resume ID is missing!");
      setSaveMessage({
        type: "error",
        text: "Resume ID is missing - please check URL",
      });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("access_token");
      console.log("Token exists:", !!token);
      if (!token) {
        setSaveMessage({
          type: "error",
          text: "Authentication token not found. Please login again.",
        });
        setIsSaving(false);
        setTimeout(() => setSaveMessage(null), 3000);
        return;
      }

      const apiData = {
        full_name: formData.personalInfo.name,
        job_title: formData.personalInfo.jobTitle,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        location: formData.personalInfo.location,
        website: formData.personalInfo.website,
        professional_summary: formData.personalInfo.summary,
        experience: formData.experience.map((exp) => ({
          company: exp.company,
          role: exp.role,
          duration: exp.duration,
          description: exp.description,
        })),
        education: formData.education.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
        })),
        skills: formData.skills,
        template: template,
      };

      const url = `http://127.0.0.1:5000/resume/${resumeId}`;
      console.log("API URL:", url);
      console.log("Saving resume data:", JSON.stringify(apiData, null, 2));

      const response = await axios.put(url, apiData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      const responseData = response.data;
      console.log("Response data:", responseData);

      console.log("Resume saved successfully:", responseData);
      setSaveMessage({ type: "success", text: "Resume saved successfully!" });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error("Failed to save resume:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      setSaveMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Failed to save resume. Check console for details.",
      });
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIImprove = async (content: string) => {
    console.log("AI improving content:", content);
    // TODO: Integrate with actual AI API endpoint
    // For now, just a placeholder
    setSaveMessage({
      type: "success",
      text: "AI improvement feature coming soon!",
    });
    setTimeout(() => setSaveMessage(null), 2000);
  };

  const handleDownload = () => {
    // Trigger browser print dialog which allows saving as PDF
    window.print();
  };

  const handlePreview = () => {
    if (resumeId) {
      router.push(`/resume-preview/${resumeId}`);
    } else {
      setSaveMessage({
        type: "error",
        text: "Unable to preview: Resume ID missing",
      });
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const SectionHeader = ({
    title,
    section,
    icon: Icon,
  }: {
    title: string;
    section: keyof ExpandedSections;
    icon: React.ElementType;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
        <span className="font-semibold text-white">{title}</span>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-slate-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-slate-400" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar customNavigation={undefined} />

      {/* Sticky toolbar */}
      <div className="lg:ml-[260px] sticky top-0 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowTemplates(!showTemplates)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
            >
              <Palette className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-xl p-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
                className="text-slate-400 hover:text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-slate-400 text-sm w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setZoom((prev) => Math.min(1, prev + 0.1))}
                className="text-slate-400 hover:text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AIActionButton
              label="Improve with AI"
              size="sm"
              onGenerate={handleAIImprove}
            />
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handlePreview}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Template selector */}
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-700/50"
          >
            <TemplateSelector selected={template} onSelect={setTemplate} />
          </motion.div>
        )}

        {/* Save notification */}
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-3 rounded-lg text-sm font-medium ${
              saveMessage.type === "success"
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          >
            {saveMessage.text}
          </motion.div>
        )}
      </div>

      <main className="lg:ml-[60px] p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="space-y-4">
            {/* Personal Info */}
            <div>
              <SectionHeader
                title="Personal Information"
                section="personal"
                icon={Sparkles}
              />
              {expandedSections.personal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Full Name
                      </label>
                      <Input
                        value={formData.personalInfo.name}
                        onChange={(e) =>
                          updatePersonalInfo("name", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Job Title
                      </label>
                      <Input
                        value={formData.personalInfo.jobTitle}
                        onChange={(e) =>
                          updatePersonalInfo("jobTitle", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Email
                      </label>
                      <Input
                        value={formData.personalInfo.email}
                        onChange={(e) =>
                          updatePersonalInfo("email", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Phone
                      </label>
                      <Input
                        value={formData.personalInfo.phone}
                        onChange={(e) =>
                          updatePersonalInfo("phone", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Location
                      </label>
                      <Input
                        value={formData.personalInfo.location}
                        onChange={(e) =>
                          updatePersonalInfo("location", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">
                        Website
                      </label>
                      <Input
                        value={formData.personalInfo.website}
                        onChange={(e) =>
                          updatePersonalInfo("website", e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">
                      Summary
                    </label>
                    <Textarea
                      value={formData.personalInfo.summary}
                      onChange={(e) =>
                        updatePersonalInfo("summary", e.target.value)
                      }
                      className="bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[100px]"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Experience */}
            <div>
              <SectionHeader
                title="Work Experience"
                section="experience"
                icon={Sparkles}
              />
              {expandedSections.experience && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-4"
                >
                  {formData.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">
                          Experience {index + 1}
                        </span>
                        {formData.experience.length > 1 && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Role"
                          value={exp.role}
                          onChange={(e) =>
                            updateExperience(exp.id, "role", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Duration"
                          value={exp.duration}
                          onChange={(e) =>
                            updateExperience(exp.id, "duration", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl md:col-span-2"
                        />
                      </div>
                      <Textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value,
                          )
                        }
                        className="mt-3 bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[80px]"
                      />
                    </div>
                  ))}
                  <Button
                    onClick={addExperience}
                    variant="outline"
                    className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Education */}
            <div>
              <SectionHeader
                title="Education"
                section="education"
                icon={Sparkles}
              />
              {expandedSections.education && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-4"
                >
                  {formData.education.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">
                          Education {index + 1}
                        </span>
                        {formData.education.length > 1 && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, "degree", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) =>
                            updateEducation(edu.id, "year", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={addEducation}
                    variant="outline"
                    className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Skills */}
            <div>
              <SectionHeader title="Skills" section="skills" icon={Sparkles} />
              {expandedSections.skills && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-4"
                >
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
                      placeholder="Add a skill..."
                      className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                    />
                    <Button
                      onClick={() => addSkill(newSkill)}
                      className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill}
                        <Trash2 className="w-3 h-3 ml-2" />
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="hidden xl:block sticky top-32 h-fit">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 overflow-auto max-h-[calc(100vh-160px)]">
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                }}
              >
                <ResumePreviewComponent data={formData} template={template} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <FloatingAIButton />
    </div>
  );
}