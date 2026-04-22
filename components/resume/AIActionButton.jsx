import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIActionButton({ 
  onGenerate, 
  label = "Enhance with AI",
  size = "default",
  variant = "ai"
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const mockAIResponses = {
    summary: "Results-driven software engineer with 5+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact products that increased user engagement by 40%. Passionate about clean code, user experience, and mentoring junior developers.",
    experience: "Led the development of a microservices architecture that reduced system latency by 60% and improved deployment frequency from monthly to daily releases. Collaborated with product managers to define technical requirements and deliver features that generated $2M in additional annual revenue.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL", "Redis", "Kubernetes"]
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = mockAIResponses.summary;
    setGeneratedText(response);
    setIsLoading(false);
    setShowResult(true);
    
    if (onGenerate) {
      onGenerate(response);
    }
  };

  const handleAccept = () => {
    setShowResult(false);
    if (onGenerate) {
      onGenerate(generatedText);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const buttonVariants = {
    ai: "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white shadow-lg shadow-blue-500/25",
    outline: "border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10",
    ghost: "text-blue-400 hover:bg-blue-500/10"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGenerate}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 ${buttonVariants[variant]} ${sizeClasses[size]} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="sparkles"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        <span>{isLoading ? "Generating..." : label}</span>
      </motion.button>

      {/* AI Result Modal */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-3 z-50"
          >
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-white">AI Suggestion</span>
              </div>
              
              <motion.p 
                className="text-slate-300 text-sm leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {generatedText}
              </motion.p>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Accept
                </Button>
                <Button
                  onClick={handleRegenerate}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-lg"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
                <Button
                  onClick={() => setShowResult(false)}
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white rounded-lg ml-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}