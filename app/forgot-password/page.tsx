'use client'
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/resume/AuthCard";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthCard 
        title="Check your email" 
        subtitle="We've sent you a password reset link"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-slate-400 text-sm mb-6">
            We've sent a password reset link to <span className="text-white font-medium">{email}</span>. 
            Please check your inbox and follow the instructions.
          </p>
          <Link href="/signin" className="w-full">
            <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl font-medium">
              Back to Login
            </Button>
          </Link>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard 
      title="Forgot password?" 
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-xl focus:border-blue-500 focus:ring-blue-500/20"
            required
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoading || !email}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </Button>

        {/* Back to login */}
        <Link
          href="/signin"
          className="flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </form>
    </AuthCard>
  );
}
