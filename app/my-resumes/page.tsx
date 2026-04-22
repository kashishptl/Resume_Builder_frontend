"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/components/resume/Sidebar";
import ResumeCard from "@/components/resume/ResumeCard";
import FloatingAIButton from "@/components/resume/FloatingAIButton";
import { useEffect } from "react";
import axios from "axios";

// Types
interface Resume {
  id: string;
  title?: string;
  jobTitle?: string;
  template?: string;
  lastEdited?: string;
  full_name?: string;
  email?: string;
  summary?: string;
  professional_summary?: string;
  updated_at?: string;
  created_at?: string;
  job_title?: string;
}

export default function MyResumes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //   const handleLogout = () => {
  //     router.push("/signin");
  //   };

  const filteredResumes = Array.isArray(resumes)
    ? resumes.filter((resume) => {
        const title = (
          resume.title ||
          resume.full_name ||
          resume.email ||
          ""
        ).toLowerCase();
        const jobTitle = (
          resume.jobTitle ||
          resume.job_title ||
          resume.professional_summary ||
          ""
        ).toLowerCase();
        const query = searchQuery.toLowerCase();

        return title.includes(query) || jobTitle.includes(query);
      })
    : [];

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://127.0.0.1:5000/resumes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setResumes(Array.isArray(data) ? data : [data]);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "Failed to fetch resumes");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                My Resumes
              </h1>
              <p className="text-slate-400">
                Manage and organize all your resumes
              </p>
            </div>
            <Link href="/create-resume">
              <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl h-12 px-6 shadow-lg shadow-blue-500/25">
                <Plus className="w-5 h-5 mr-2" />
                Create New
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 rounded-xl"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-slate-700/50 border-slate-600 text-white rounded-xl">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="recent">Recently Edited</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
              </SelectContent>
            </Select>

            {/* View toggle */}
            <div className="flex items-center bg-slate-700/50 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex flex-col gap-2 mb-4 md:flex-row md:items-center md:justify-between">
          <p className="text-slate-400 text-sm">
            Showing {filteredResumes.length} resume
            {filteredResumes.length !== 1 ? "s" : ""}
          </p>
          {error && <p className="text-rose-300 text-sm">{error}</p>}
        </div>
        {loading ? (
          <div className="text-center py-16 text-slate-400">
            Loading resumes...
          </div>
        ) : filteredResumes.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredResumes.map((resume, index) => (
              <ResumeCard key={resume.id} resume={resume} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">No resumes found</h3>
            <p className="text-slate-400 text-sm">
              Try adjusting your search or create a new resume
            </p>
          </motion.div>
        )}
      </main>

      <FloatingAIButton />
    </div>
  );
}
