"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  TrendingUp,
  Eye,
  Download,
  Sparkles,
  ArrowRight,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/resume/Sidebar";
import StatsCard from "@/components/resume/StatsCard";
import ResumeCard from "@/components/resume/ResumeCard";
import FloatingAIButton from "@/components/resume/FloatingAIButton";
import axios from "axios";

// Types
interface Resume {
  id: string;
  title: string;
  jobTitle: string;
  template: string;
  lastEdited: string;
  updated_at?: string;
}

interface ApiResume {
  id: number | string;
  title?: string;
  full_name?: string;
  job_title?: string;
  template?: string;
  updated_at?: string;
  last_edited?: string;
}

// Constants
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
const STALE_TIME = 5 * 60 * 1000; // 5 minutes

// Utility function (extracted for reusability)
const formatRelativeTime = (dateString?: string): string => {
  if (!dateString) return "Recently";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    return date.toLocaleDateString();
  } catch {
    return "Recently";
  }
};

// Custom hook for fetching resumes
const useResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const router = useRouter();

  const fetchResumes = useCallback(async (force = false) => {
    // Basic cache check
    if (!force && lastFetched && Date.now() - lastFetched < STALE_TIME) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Authentication token missing. Please log in again.");
        router.push("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/resume`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let resumesData = response.data;
      if (!Array.isArray(resumesData)) {
        resumesData = resumesData.resumes || [];
      }

      const formattedResumes: Resume[] = resumesData.map((item: ApiResume) => ({
        id: item.id?.toString() || "",
        title: item.title || item.full_name || "Untitled Resume",
        jobTitle: item.job_title || "",
        template: item.template || "modern",
        lastEdited: formatRelativeTime(item.updated_at || item.last_edited),
      }));

      setResumes(formattedResumes);
      setLastFetched(Date.now());
    } catch (err: unknown) {
      console.error("Failed to fetch resumes:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login");
        } else {
          setError(err.response?.data?.message || "Failed to load resumes. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [lastFetched, router]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return { resumes, loading, error, refetch: () => fetchResumes(true) };
};

export default function Dashboard() {
  const { resumes, loading, error, refetch } = useResumes();

  // Memoized stats (these could be replaced with real API data)
  const stats = useMemo(() => {
    const totalResumes = resumes.length;
    // Placeholder values - ideally fetch from analytics endpoint
    const totalViews = 128;
    const totalDownloads = 24;
    const completionRate = totalResumes > 0 ? "85%" : "0%";
    return { totalResumes, totalViews, totalDownloads, completionRate };
  }, [resumes]);

  const handleRetry = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Sidebar customNavigation={undefined} />
        <main className="lg:ml-[60px] p-6 lg:p-8 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Loader2 className="w-10 h-10 text-blue-400 animate-spin mx-auto" />
            <p className="text-slate-400">Loading your resumes...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar customNavigation={undefined} />

      <main className="lg:ml-[60px] p-6 lg:p-8">
        {/* Header with refresh button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-slate-400">
                {resumes.length === 0
                  ? "Create your first resume to get started"
                  : `You have ${resumes.length} resume${resumes.length === 1 ? "" : "s"} ready`}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleRetry}
                className="border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                aria-label="Refresh resumes"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Link href="/create-resume">
                <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl h-12 px-6 shadow-lg shadow-blue-500/25">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Resume
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={FileText}
            label="Total Resumes"
            value={stats.totalResumes.toString()}
            trend={0}
            color="blue"
            index={0}
          />
          <StatsCard
            icon={Eye}
            label="Total Views"
            value={stats.totalViews.toString()}
            trend={12}
            color="violet"
            index={1}
          />
          <StatsCard
            icon={Download}
            label="Downloads"
            value={stats.totalDownloads.toString()}
            trend={8}
            color="emerald"
            index={2}
          />
          <StatsCard
            icon={TrendingUp}
            label="Completion Rate"
            value={stats.completionRate}
            trend={0}
            color="amber"
            index={3}
          />
        </div>

        {/* AI Prompt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  AI-Powered Resume Builder
                </h3>
                <p className="text-slate-400 text-sm">
                  Let our AI help you create a standout resume in minutes
                </p>
              </div>
            </div>
            <Link href="/create-resume">
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Resumes Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Your Resumes</h2>
          {resumes.length > 3 && (
            <Link
              href="/my-resumes"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              View all
            </Link>
          )}
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <RefreshCw className="w-3 h-3 mr-2" />
              Retry
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!error && resumes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/50"
          >
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No resumes yet
            </h3>
            <p className="text-slate-400 mb-6">
              Create your first resume using our AI-powered builder
            </p>
            <Link href="/create-resume">
              <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Resume
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Resumes Grid */}
        {!error && resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {resumes.map((resume, index) => (
              <ResumeCard key={resume.id} resume={resume} index={index} />
            ))}

            {/* Create new card - always shown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: resumes.length * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link href="/create-resume">
                <div className="h-full min-h-[320px] bg-slate-800/30 backdrop-blur-sm border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-slate-700/50 group-hover:bg-blue-500/20 flex items-center justify-center mb-4 transition-colors">
                    <Plus className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    Create New Resume
                  </h3>
                  <p className="text-slate-400 text-sm text-center">
                    Start from scratch or use our AI assistant
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        )}
      </main>

      <FloatingAIButton />
    </div>
  );
}