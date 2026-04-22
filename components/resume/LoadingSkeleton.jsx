import { motion } from "framer-motion";

export function SkeletonLine({ width = "100%", height = "16px", className = "" }) {
  return (
    <motion.div
      className={`bg-slate-700/50 rounded-lg ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 ${className}`}>
      <div className="flex items-start gap-4">
        <motion.div
          className="w-16 h-20 bg-slate-700/50 rounded-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="flex-1 space-y-3">
          <SkeletonLine width="60%" height="20px" />
          <SkeletonLine width="40%" height="14px" />
          <SkeletonLine width="80%" height="14px" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine 
          key={i} 
          width={i === lines - 1 ? "60%" : "100%"} 
          height="14px" 
        />
      ))}
    </div>
  );
}

export function AIThinkingSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-blue-500/30">
      <div className="relative">
        <motion.div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-300 font-medium">AI is thinking...</p>
        <div className="flex gap-1 mt-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResumePreviewSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded mx-auto animate-pulse" />
          <div className="h-4 w-32 bg-slate-200 rounded mx-auto animate-pulse" />
        </div>
        
        {/* Sections */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-3">
            <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-3/4 bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}