'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { Edit3, Eye, Download, MoreVertical, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ResumeCard({ resume, index }) {
  const templateColors = {
    modern: "from-blue-500 to-cyan-500",
    professional: "from-slate-600 to-slate-800",
    creative: "from-violet-500 to-pink-500",
    minimal: "from-emerald-500 to-teal-500"
  };

  const title = resume.title || resume.full_name || resume.email || "Untitled Resume";
  const subtitle = resume.jobTitle || resume.summary || resume.professional_summary || (resume.experience?.[0]?.role ? resume.experience[0].role : "");
  const updatedAt = resume.lastEdited || resume.updated_at || resume.created_at || "Recently edited";
  const templateKey = resume.template || "modern";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
          {/* Template preview mockup */}
          <div className="absolute inset-4 bg-white rounded-lg shadow-lg p-4 transform group-hover:scale-[1.02] transition-transform duration-300">
            <div className="space-y-2">
              <div className={`h-3 w-24 bg-gradient-to-r ${templateColors[templateKey] || templateColors.modern} rounded`} />
              <div className="h-2 w-16 bg-slate-200 rounded" />
              <div className="h-1.5 w-full bg-slate-100 rounded mt-3" />
              <div className="h-1.5 w-full bg-slate-100 rounded" />
              <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
              <div className="h-2 w-20 bg-slate-200 rounded mt-3" />
              <div className="h-1.5 w-full bg-slate-100 rounded" />
              <div className="h-1.5 w-full bg-slate-100 rounded" />
            </div>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Quick actions overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link href={`/resume-edit?id=${resume.resume_id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-700 shadow-lg"
              >
                <Edit3 className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link href={`/resume-preview?id=${resume.resume_id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-700 shadow-lg"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          {/* Template badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-lg bg-gradient-to-r ${templateColors[templateKey] || templateColors.modern} shadow-lg`}>
              {templateKey.charAt(0).toUpperCase() + templateKey.slice(1)}
            </span>
          </div>

          {/* More menu */}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 bg-slate-900/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-slate-900/70 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer" disabled>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>Last edited {updatedAt}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
            <Link href={`/resume-edit?id=${resume.resume_id}`} className="flex-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Link href={`/resume-preview?id=${resume.resume_id}`} className="flex-1">
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
