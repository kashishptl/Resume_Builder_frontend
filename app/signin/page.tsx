'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/resume/AuthCard";
import axios from "axios";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      // assuming backend returns token and user info
      const token = res.data.access_token;
      const user = res.data.user; // e.g., { name: "John Doe", email: "john@example.com" }

      // Store token and user data in localStorage
      localStorage.setItem("access_token", token);
      if (user) {
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
      } else {
        // Fallback: use the email from the form
        localStorage.setItem("userEmail", email);
        // If name is not provided, you could set a default or leave it empty
        localStorage.setItem("userName", email.split('@')[0]); // optional
      }

      // Redirect to dashboard
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setError(
        err.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/dashboard");
  };

  return (
    <AuthCard 
      title="Welcome back" 
      subtitle="Sign in to continue building your perfect resume"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-xl focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-11 pr-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-xl focus:border-blue-500 focus:ring-blue-500/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-slate-500">or continue with</span>
          </div>
        </div>

        {/* Google login */}
        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          variant="outline"
          className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl font-medium"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Register link */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Dont have an account?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}