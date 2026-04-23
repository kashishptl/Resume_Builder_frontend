"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Download,
  Edit,
  Share2,
  ArrowLeft,
  Lock,
  CheckCircle,
  Palette,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/resume/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { templates, getTemplateById } from "@/components/resume/templates";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

interface ResumePreviewData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: unknown[];
  education: unknown[];
  skills: unknown[];
  projects: unknown[];
  achievements: unknown[];
  languages: unknown[];
  hobbies: unknown[];
}

const normalizeResumeData = (data: unknown): ResumePreviewData => {
  const raw = (data as Record<string, unknown>) || {};
  console.log("RAW DATAA", raw);
  const personalInfo = raw.personalInfo as Record<string, unknown> | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizeArray = (arr: unknown[], key?: string) => {
    if (!Array.isArray(arr)) return [];

    return arr
      .map((item) => {
        if (typeof item === "string") return item;
        if (key && item?.[key]) return item[key];
        return "";
      })
      .filter(Boolean);
  };

  const getString = (...values: Array<unknown>) => {
    for (const value of values) {
      if (typeof value === "string" && value.trim() !== "") {
        return value;
      }
    }
    return "";
  };

  return {
    personalInfo: {
      name: getString(
        raw?.full_name,
        raw?.name,
        personalInfo?.full_name,
        personalInfo?.name,
      ),
      email: getString(raw.email, personalInfo?.email),
      phone: getString(raw.phone, personalInfo?.phone),
      location: getString(raw.location, personalInfo?.location),
      summary: getString(
        raw.summary,
        raw.professional_summary,
        personalInfo?.summary,
      ),
    },
    experience:
      (raw.experience as unknown[]) ||
      (personalInfo?.experience as unknown[]) ||
      [],
    education:
      (raw.education as unknown[]) ||
      (personalInfo?.education as unknown[]) ||
      [],
    skills: normalizeArray(
      (raw.skills as unknown[]) || (personalInfo?.skills as unknown[]) || [],
    ),
    projects:
      (raw.projects as unknown[]) ||
      (personalInfo?.projects as unknown[]) ||
      [],
    achievements:
      (raw.achievements as unknown[]) ||
      (personalInfo?.achievements as unknown[]) ||
      [],
    languages: normalizeArray(
      (raw.languages as unknown[]) || (personalInfo?.languages as unknown[]),
      "language_name",
    ),

    hobbies: normalizeArray(
      (raw.hobbies as unknown[]) || (personalInfo?.hobbies as unknown[]),
      "hobby_name",
    ),
  };
};

// Direct guest check – no external dependency
const isGuest = (): boolean => {
  const token = localStorage.getItem("access_token");
  // If token exists and is not the guest placeholder, user is logged in
  if (token && token !== "guest" && token !== "guest-session") {
    return false; // not a guest
  }
  return true; // guest
};

export default function ResumePreview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const [resumeData, setResumeData] = useState<ResumePreviewData | null>(null);
  const [isGuestUser, setIsGuestUser] = useState<boolean | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic");
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false); // ← new state

  const updateGuestStatus = () => {
    setIsGuestUser(isGuest());
  };

  const resumeRef = useRef<HTMLDivElement>(null); // ← new ref

  // Re-check on route changes and window focus
  useEffect(() => {
    updateGuestStatus();
    const handleFocus = () => updateGuestStatus();
    const handleStorage = () => updateGuestStatus();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorage);
    };
  }, [router]);

  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("access_token");
      let rawData: unknown = null;
      console.log("ResumeId from URL:", resumeId);
      if (resumeId) {
        try {
          const headers: Record<string, string> = {};
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

      updateGuestStatus();

      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate) {
        setSelectedTemplateId(savedTemplate);
      }
      setLoading(false);
    };

    loadResume();
  }, [resumeId, router]);

  const downloadPDF = async () => {
  if (!resumeRef.current) {
    alert("Preview not ready. Please wait.");
    return;
  }

  setDownloading(true);

  try {
    const original = resumeRef.current;

    // 1. Clone deeply
    const clone = original.cloneNode(true) as HTMLElement;

    // 2. Force visible styles on the clone (override any white text)
    clone.style.position = "fixed";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.width = `${original.scrollWidth}px`;
    clone.style.backgroundColor = "#ffffff";
    clone.style.color = "#000000"; // Force black text
    clone.style.opacity = "1";
    clone.style.visibility = "visible";
    clone.style.zIndex = "99999";

    // 3. Ensure all text inside becomes black (override template)
    clone.querySelectorAll("*").forEach((el) => {
      const htmlEl = el as HTMLElement;
      // Only override if the computed color is likely white
      const currentColor = window.getComputedStyle(original).color;
      if (currentColor === "rgb(255, 255, 255)" || currentColor === "white") {
        htmlEl.style.color = "#000000";
      }
      // Also ensure backgrounds are not transparent
      if (htmlEl.style.backgroundColor === "transparent") {
        htmlEl.style.backgroundColor = "#ffffff";
      }
    });

    // 4. Append clone to body (visible off-screen but will be captured)
    document.body.appendChild(clone);
    // Force reflow
    clone.offsetHeight;

    // 5. Wait for images
    const images = clone.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve(null);
            else {
              img.onload = () => resolve(null);
              img.onerror = () => resolve(null);
            }
          })
      )
    );

    await new Promise((r) => setTimeout(r, 200));

    // 6. Capture using html-to-image
    const dataUrl = await toPng(clone, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });

    // 7. Remove clone
    document.body.removeChild(clone);

    // 8. Generate PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgWidth = pdfWidth;
    const imgHeight = (img.height * imgWidth) / img.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const name = resumeData?.personalInfo?.name?.trim() || "resume";
    pdf.save(`${name.replace(/\s+/g, "_")}_resume.pdf`);
  } catch (err) {
    console.error("PDF error:", err);
    alert(`PDF generation failed: ${err instanceof Error ? err.message : "Unknown error"}`);
  } finally {
    setDownloading(false);
  }
};

  const handleDownload = () => {
    if (isGuestUser === true) {
      setShowLoginModal(true);
    } else if (isGuestUser === false) {
      downloadPDF();
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    localStorage.setItem("selectedTemplate", templateId);
    setShowTemplateSelector(false);
  };

  if (loading || isGuestUser === null) {
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
      <Sidebar customNavigation={undefined} />
      <main className="lg:ml-[60px] p-6 lg:p-8">
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

          {/* Guest Warning – only when isGuestUser === true */}
          {isGuestUser === true && (
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

        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={() => router.push(`/resume-edit?id=${resumeId}`)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Edit className="w-4 h-4 mr-2" /> Edit Resume
          </Button>
          <Button
            onClick={() => setShowTemplateSelector(true)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Palette className="w-4 h-4 mr-2" /> Change Template
          </Button>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>

        <div className="flex justify-center">
          <motion.div
            key={selectedTemplateId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="shadow-2xl rounded-xl overflow-hidden"
          >
            {/* ✅ Added ref for PDF capture */}
            <div ref={resumeRef}>
              <SelectedTemplate data={resumeData} />
            </div>
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
                    <CheckCircle className="w-4 h-4" /> <span>Selected</span>
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
