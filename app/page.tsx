// 'use client'

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Sparkles, ArrowRight } from 'lucide-react';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center"
//       >
//         <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 mb-8">
//           <Sparkles className="w-10 h-10 text-white" />
//         </div>
//         <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//           AI Resume Builder
//         </h1>
//         <p className="text-xl text-slate-400 mb-8">
//           Create professional resumes powered by AI
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Link href="/signin">
//             <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-violet-700 transition-all">
//               Sign In
//             </button>
//           </Link>
//           <Link href="/register">
//             <button className="px-6 py-3 border border-slate-600 text-white rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
//               Get Started <ArrowRight className="w-4 h-4" />
//             </button>
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// }



// 'use client'
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { 
//   Sparkles, 
//   FileText, 
//   Zap, 
//   Download, 
//   ArrowRight,
//   CheckCircle,
//   Users,
//   TrendingUp,
//   Palette,
//   Menu,
//   X
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export default function Home() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       {/* Navigation Bar */}
//       <nav className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/80">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-2 group">
//               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-white font-bold text-xl">Resume AI</span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-6">
//               <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
//                 Features
//               </Link>
//               <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
//                 How It Works
//               </Link>
//               <Link href="#templates" className="text-slate-300 hover:text-white transition-colors">
//                 Templates
//               </Link>
//             </div>

//             {/* Auth Buttons - Desktop */}
//             <div className="hidden md:flex items-center gap-3">
//               <Link href="/signin">
//                 <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
//                   Sign In
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white">
//                   Sign Up
//                 </Button>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden text-white p-2"
//             >
//               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="md:hidden py-4 border-t border-slate-700/50"
//             >
//               <div className="flex flex-col gap-4">
//                 <Link href="#features" className="text-slate-300 hover:text-white transition-colors px-4 py-2">
//                   Features
//                 </Link>
//                 <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors px-4 py-2">
//                   How It Works
//                 </Link>
//                 <Link href="#templates" className="text-slate-300 hover:text-white transition-colors px-4 py-2">
//                   Templates
//                 </Link>
//                 <div className="flex flex-col gap-2 px-4 pt-2 border-t border-slate-700/50">
//                   <Link href="/signin">
//                     <Button variant="ghost" className="w-full text-slate-300 hover:text-white hover:bg-slate-800">
//                       Sign In
//                     </Button>
//                   </Link>
//                   <Link href="/register">
//                     <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white">
//                       Sign Up
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center"
//         >
//           <motion.div
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6"
//           >
//             <Sparkles className="w-4 h-4" />
//             AI-Powered Resume Builder
//           </motion.div>

//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
//             Build Your Perfect Resume
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mt-2">
//               In Minutes, Not Hours
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto">
//             Create professional, ATS-friendly resumes with AI assistance. Stand out from the crowd and land your dream job.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link href="/create-resume">
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white text-lg px-8 h-14 group"
//               >
//                 <Sparkles className="w-5 h-5 mr-2" />
//                 Create Resume for Free
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//             <Link href="/register">
//               <Button 
//                 size="lg" 
//                 variant="outline" 
//                 className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-8 h-14"
//               >
//                 Sign Up Now
//               </Button>
//             </Link>
//           </div>

//           <p className="text-slate-500 text-sm mt-6">
//             ✨ No credit card required • No login needed to try • Export as PDF anytime
//           </p>
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
//         >
//           {[
//             { label: "Users", value: "50K+", icon: Users },
//             { label: "Resumes Created", value: "100K+", icon: FileText },
//             { label: "Success Rate", value: "95%", icon: TrendingUp },
//             { label: "Templates", value: "20+", icon: Palette },
//           ].map((stat, i) => {
//             const Icon = stat.icon;
//             return (
//               <div key={i} className="text-center">
//                 <Icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
//                 <div className="text-3xl font-bold text-white">{stat.value}</div>
//                 <div className="text-slate-400 text-sm">{stat.label}</div>
//               </div>
//             );
//           })}
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-slate-800/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
//               Everything You Need to Succeed
//             </h2>
//             <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//               Powerful features designed to help you create the perfect resume
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Sparkles,
//                 title: "AI-Powered Content",
//                 description: "Let AI help you write compelling, professional content that stands out to recruiters.",
//                 color: "from-blue-500 to-cyan-500"
//               },
//               {
//                 icon: FileText,
//                 title: "ATS-Friendly",
//                 description: "All templates are optimized for Applicant Tracking Systems to ensure your resume gets noticed.",
//                 color: "from-violet-500 to-purple-500"
//               },
//               {
//                 icon: Zap,
//                 title: "Quick & Easy",
//                 description: "Build your resume in minutes with our intuitive step-by-step process. No design skills needed.",
//                 color: "from-pink-500 to-rose-500"
//               },
//               {
//                 icon: Palette,
//                 title: "Beautiful Templates",
//                 description: "Choose from 20+ professionally designed templates that make your resume stand out.",
//                 color: "from-emerald-500 to-teal-500"
//               },
//               {
//                 icon: Download,
//                 title: "Export as PDF",
//                 description: "Download your resume as a high-quality PDF ready to send to employers instantly.",
//                 color: "from-amber-500 to-orange-500"
//               },
//               {
//                 icon: CheckCircle,
//                 title: "Real-Time Preview",
//                 description: "See changes instantly as you edit. What you see is exactly what you'll get.",
//                 color: "from-indigo-500 to-blue-500"
//               },
//             ].map((feature, i) => {
//               const Icon = feature.icon;
//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{ y: -5 }}
//                   className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all"
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center mb-4`}>
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
//                   <p className="text-slate-400">{feature.description}</p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
//               Create Your Resume in 3 Easy Steps
//             </h2>
//             <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//               Our simple process gets you from start to finish in minutes
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8 relative">
//             {[
//               {
//                 step: "01",
//                 title: "Enter Your Information",
//                 description: "Fill in your personal details, work experience, education, and skills using our easy-to-use forms."
//               },
//               {
//                 step: "02",
//                 title: "Customize & Preview",
//                 description: "Choose a template, customize colors, and see real-time updates as you build your perfect resume."
//               },
//               {
//                 step: "03",
//                 title: "Download & Apply",
//                 description: "Export your resume as a PDF and start applying to jobs with confidence. Update anytime!"
//               },
//             ].map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.2 }}
//                 className="relative"
//               >
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 relative z-10">
//                   <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-4">
//                     {step.step}
//                   </div>
//                   <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
//                   <p className="text-slate-400">{step.description}</p>
//                 </div>
//                 {i < 2 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 z-0" />
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-center mt-12"
//           >
//             <Link href="/create-resume">
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white text-lg px-8 h-14"
//               >
//                 Get Started Now
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               Ready to Build Your Future?
//             </h2>
//             <p className="text-xl text-blue-100 mb-8">
//               Join thousands of job seekers who landed their dream jobs with our AI-powered resume builder
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link href="/create-resume">
//                 <Button 
//                   size="lg" 
//                   className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 h-14"
//                 >
//                   Start Building for Free
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button 
//                   size="lg" 
//                   variant="outline" 
//                   className="border-white text-white hover:bg-white/10 text-lg px-8 h-14"
//                 >
//                   Create an Account
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-slate-700/50 bg-slate-900/50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
//                   <Sparkles className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-white font-bold text-lg">Resume AI</span>
//               </div>
//               <p className="text-slate-400 text-sm">
//                 Build professional resumes with AI assistance and land your dream job.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Product</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
//                 <li><Link href="#templates" className="hover:text-white transition-colors">Templates</Link></li>
//                 <li><Link href="/create-resume" className="hover:text-white transition-colors">Create Resume</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
//                 <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
//                 <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Get Started</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li><Link href="/signin" className="hover:text-white transition-colors">Sign In</Link></li>
//                 <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400 text-sm">
//             <p>&copy; 2026 Resume AI. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { 
  Sparkles, 
  FileText, 
  Zap, 
  Download, 
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Palette,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700/50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-900 dark:text-white font-bold text-xl">Resume AI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#templates" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Templates
              </Link>
            </div>

            {/* Auth Buttons & Theme Toggle - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle Button */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}
              
              <Link href="/signin">
                <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-900 dark:text-white p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700/50"
            >
              <div className="flex flex-col gap-4">
                <Link href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-4 py-2">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-4 py-2">
                  How It Works
                </Link>
                <Link href="#templates" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-4 py-2">
                  Templates
                </Link>
                <div className="flex flex-col gap-2 px-4 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                  <Link href="/signin">
                    <Button variant="ghost" className="w-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Resume Builder
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Build Your Perfect Resume
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-600 mt-2">
              In Minutes, Not Hours
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto">
            Create professional, ATS-friendly resumes with AI assistance. Stand out from the crowd and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create-resume">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white text-lg px-8 h-14 group"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create Resume for Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white text-lg px-8 h-14"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>

          <p className="text-slate-500 dark:text-slate-500 text-sm mt-6">
            ✨ No credit card required • No login needed to try • Export as PDF anytime
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { label: "Users", value: "50K+", icon: Users },
            { label: "Resumes Created", value: "100K+", icon: FileText },
            { label: "Success Rate", value: "95%", icon: TrendingUp },
            { label: "Templates", value: "20+", icon: Palette },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center">
                <Icon className="w-8 h-8 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-100 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect resume
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Content",
                description: "Let AI help you write compelling, professional content that stands out to recruiters.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: FileText,
                title: "ATS-Friendly",
                description: "All templates are optimized for Applicant Tracking Systems to ensure your resume gets noticed.",
                color: "from-violet-500 to-purple-500"
              },
              {
                icon: Zap,
                title: "Quick & Easy",
                description: "Build your resume in minutes with our intuitive step-by-step process. No design skills needed.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: Palette,
                title: "Beautiful Templates",
                description: "Choose from 20+ professionally designed templates that make your resume stand out.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: Download,
                title: "Export as PDF",
                description: "Download your resume as a high-quality PDF ready to send to employers instantly.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: CheckCircle,
                title: "Real-Time Preview",
                description: "See changes instantly as you edit. What you see is exactly what you'll get.",
                color: "from-indigo-500 to-blue-500"
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Create Your Resume in 3 Easy Steps
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our simple process gets you from start to finish in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Enter Your Information",
                description: "Fill in your personal details, work experience, education, and skills using our easy-to-use forms."
              },
              {
                step: "02",
                title: "Customize & Preview",
                description: "Choose a template, customize colors, and see real-time updates as you build your perfect resume."
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Export your resume as a PDF and start applying to jobs with confidence. Update anytime!"
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 relative z-10">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-600 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 z-0" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/create-resume">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white text-lg px-8 h-14"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of job seekers who landed their dream jobs with our AI-powered resume builder
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/create-resume">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 text-lg px-8 h-14"
                >
                  Start Building for Free
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  size="lg"
                  className="border-white text-blue-600 text-lg px-8 h-14"
                >
                  Create an Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-900 dark:text-white font-bold text-lg">Resume AI</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Build professional resumes with AI assistance and land your dream job.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                <li><Link href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#templates" className="hover:text-slate-900 dark:hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/create-resume" className="hover:text-slate-900 dark:hover:text-white transition-colors">Create Resume</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Get Started</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                <li><Link href="/signin" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700/50 pt-8 text-center text-slate-600 dark:text-slate-400 text-sm">
            <p>&copy; 2026 Resume AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

