"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Download,
  Edit,
  Share2,
  ArrowLeft,
  Lock,
  CheckCircle,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/resume/Sidebar";
import { isGuestUser } from "@/lib/guestSession";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { templates, getTemplateById } from "@/components/resume/templates";

const normalizeResumeData = (data) => {
  const raw = data || {};
  const personalInfo = raw.personalInfo || {};

  const getString = (...values) => {
    for (const value of values) {
      if (typeof value === "string" && value.trim() !== "") {
        return value;
      }
    }
    return "";
  };

  return {
    personalInfo: {
      name: getString(raw.full_name, raw.name, personalInfo?.name),
      email: getString(raw.email, personalInfo?.email),
      phone: getString(raw.phone, personalInfo?.phone),
      location: getString(raw.location, personalInfo?.location),
      summary: getString(
        raw.summary,
        raw.professional_summary,
        personalInfo?.summary,
      ),
    },
    experience: raw.experience || personalInfo?.experience || [],
    education: raw.education || personalInfo?.education || [],
    skills: raw.skills || personalInfo?.skills || [],
    projects: raw.projects || personalInfo?.projects || [],
    achievements: raw.achievements || personalInfo?.achievements || [],
    languages: raw.languages || personalInfo?.languages || [],
    hobbies: raw.hobbies || personalInfo?.hobbies || [],
  };
};

export default function ResumePreview() {
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.id;
  const [resumeData, setResumeData] = useState(null);
  const [isGuest, setIsGuest] = useState(null); // Start as null (unknown)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic");
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to update guest status
  const updateGuestStatus = () => {
    setIsGuest(isGuestUser());
  };

  useEffect(() => {
    // Listen for auth changes (login/logout in other tabs/windows)
    const handleAuthChange = () => {
      updateGuestStatus();
    };

    // Refresh guest status when window regains focus
    window.addEventListener("focus", handleAuthChange);
    // Listen for storage events (e.g., token removed/added in another tab)
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("focus", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      let rawData = null;

      if (resumeId) {
        try {
          const headers = {};
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }

          const res = await fetch(`http://127.0.0.1:5000/resume/${resumeId}`, {
            headers,
          });

          if (!res.ok) {
            throw new Error(`Failed to load resume (${res.status})`);
          }

          const json = await res.json();
          rawData = Array.isArray(json) ? (json[0] ?? null) : json;
        } catch (err) {
          console.error(err);
          setError(
            err instanceof Error ? err.message : "Failed to load resume",
          );
        }
      }

      if (!rawData) {
        const localData = localStorage.getItem("resumeData");
        if (localData) {
          try {
            rawData = JSON.parse(localData);
          } catch {
            rawData = null;
          }
        }
      }

      if (rawData) {
        setResumeData(normalizeResumeData(rawData));
      } else if (!resumeId) {
        router.push("/create-resume");
      }

      // Update guest status after resume loads
      updateGuestStatus();
      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate) {
        setSelectedTemplateId(savedTemplate);
      }
      setLoading(false);
    };

    loadResume();
  }, [resumeId, router]);

  const handleDownload = () => {
    if (isGuest === true) {
      setShowLoginModal(true);
    } else if (isGuest === false) {
      downloadPDF();
    }
    // If isGuest is null (still loading), do nothing or show a small loader
  };

  const downloadPDF = () => {
    console.log("Downloading PDF...");
    // PDF download logic here
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplateId(templateId);
    localStorage.setItem("selectedTemplate", templateId);
    setShowTemplateSelector(false);
  };

  // Show loading indicator while loading resume or guest status unknown
  if (loading || isGuest === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading your resume...</p>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <h2 className="text-2xl font-semibold mb-3">
            Unable to load resume preview
          </h2>
          <p className="text-slate-300 mb-2">
            {error || "Please try again or return to resume creation."}
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={() => router.push("/create-resume")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Create Resume
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/my-resumes")}
              className="border-slate-600 text-slate-200 hover:bg-slate-800"
            >
              View Resumes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const SelectedTemplate = getTemplateById(selectedTemplateId).component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar />

      <main className="lg:ml-[60px] p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Resume Preview
              </h1>
              <p className="text-slate-400">
                Review your resume before downloading
              </p>
            </div>
            <Button
              onClick={() => router.push("/create-resume")}
              variant="ghost"
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Guest Warning - only shown when isGuest is true */}
          {isGuest === true && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-amber-400 font-semibold mb-1">
                    Sign up to download your resume
                  </h3>
                  <p className="text-amber-200/80 text-sm mb-3">
                    Create a free account to download as PDF and save your
                    resume.
                  </p>
                  <div className="flex gap-2">
                    <Link href="/register">
                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                      >
                        Sign Up Free
                      </Button>
                    </Link>
                    <Link href="/signin">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-500/50 text-amber-400"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={() => router.push("/create-resume")}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Resume
          </Button>

          <Button
            onClick={() => setShowTemplateSelector(true)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Palette className="w-4 h-4 mr-2" />
            Change Template
          </Button>

          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>

          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Resume Preview */}
        <div className="flex justify-center">
          <motion.div
            key={selectedTemplateId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="shadow-2xl rounded-xl overflow-hidden"
          >
            <SelectedTemplate data={resumeData} />
          </motion.div>
        </div>
      </main>

      {/* Template Selector Modal */}
      <Dialog
        open={showTemplateSelector}
        onOpenChange={setShowTemplateSelector}
      >
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Choose Your Template</DialogTitle>
            <DialogDescription className="text-slate-400">
              Select a professional template that matches your style
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTemplateChange(template.id)}
                className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                  selectedTemplateId === template.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                <div
                  className={`w-full h-40 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center text-6xl mb-3`}
                >
                  {template.thumbnail}
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {template.name}
                </h3>
                <p className="text-slate-400 text-sm">{template.description}</p>
                {selectedTemplateId === template.id && (
                  <div className="flex items-center gap-1 mt-2 text-blue-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Selected</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Sign Up to Download Your Resume
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-center">
              Create a free account to download your resume as PDF
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-white mb-2">
                With a free account:
              </h3>
              {[
                "Download resume as PDF",
                "Save and edit anytime",
                "Create multiple versions",
                "AI-powered suggestions",
                "Access premium templates",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Link href="/register" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white h-12">
                  Sign Up Free
                </Button>
              </Link>
              <Link href="/signin" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 h-12"
                >
                  Already have an account? Sign In
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}