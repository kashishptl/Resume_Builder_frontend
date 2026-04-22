// 'use client'
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { createGuestSession, getGuestSession } from "@/lib/guestSession";
// import {
//   ArrowRight,
//   ArrowLeft,
//   Sparkles,
//   User,
//   Briefcase,
//   GraduationCap,
//   Award,
//   Plus,
//   Trash2,
//   Trophy,
//   Folder,
//   Languages,
//   Heart
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import Sidebar from "@/components/resume/Sidebar";
// import AIActionButton from "@/components/resume/AIActionButton";

// // Types
// interface Experience {
//   id: number;
//   company: string;
//   role: string;
//   duration: string;
//   description: string;
// }

// interface Education {
//   id: number;
//   degree: string;
//   institution: string;
//   year: string;
// }

// interface Project {
//   id: number;
//   name: string;
//   description: string;
//   technologies: string;
//   link: string;
// }

// interface Achievement {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
// }

// interface PersonalInfo {
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
// }

// interface FormData {
//   personalInfo: PersonalInfo;
//   experience: Experience[];
//   education: Education[];
//   skills: string[];
//   projects: Project[];
//   achievements: Achievement[];
//   languages: string[];
//   hobbies: string[];
// }

// interface OptionalSections {
//   projects: boolean;
//   achievements: boolean;
//   languages: boolean;
//   hobbies: boolean;
// }

// const steps = [
//   { id: 1, name: "Personal Info", icon: User },
//   { id: 2, name: "Experience", icon: Briefcase },
//   { id: 3, name: "Education", icon: GraduationCap },
//   { id: 4, name: "Skills", icon: Award },
//   { id: 5, name: "Optional Sections", icon: Plus },
// ];

// const suggestedSkills = [
//   "JavaScript", "React", "Node.js", "Python", "TypeScript",
//   "AWS", "Docker", "MongoDB", "PostgreSQL", "Git"
// ];

// export default function CreateResume() {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [newSkill, setNewSkill] = useState("");
//   const [newLanguage, setNewLanguage] = useState("");
//   const [newHobby, setNewHobby] = useState("");

//   // Initialize guest session if not logged in
//   useEffect(() => {
//     const { isGuest, guestId } = getGuestSession();
//     if (!guestId && !localStorage.getItem('userId')) {
//       createGuestSession();
//     }
//   }, []);

//   const [optionalSections, setOptionalSections] = useState<OptionalSections>({
//     projects: false,
//     achievements: false,
//     languages: false,
//     hobbies: false,
//   });

//   const [formData, setFormData] = useState<FormData>({
//     personalInfo: {
//       name: "",
//       email: "",
//       phone: "",
//       location: "",
//       summary: ""
//     },
//     experience: [{ id: 1, company: "", role: "", duration: "", description: "" }],
//     education: [{ id: 1, degree: "", institution: "", year: "" }],
//     skills: [],
//     projects: [],
//     achievements: [],
//     languages: [],
//     hobbies: []
//   });

//   const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       personalInfo: { ...prev.personalInfo, [field]: value }
//     }));
//   };

//   const updateExperience = (id: number, field: keyof Experience, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       experience: prev.experience.map(exp =>
//         exp.id === id ? { ...exp, [field]: value } : exp
//       )
//     }));
//   };

//   const addExperience = () => {
//     setFormData(prev => ({
//       ...prev,
//       experience: [...prev.experience, {
//         id: Date.now(),
//         company: "",
//         role: "",
//         duration: "",
//         description: ""
//       }]
//     }));
//   };

//   const removeExperience = (id: number) => {
//     if (formData.experience.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         experience: prev.experience.filter(exp => exp.id !== id)
//       }));
//     }
//   };

//   const updateEducation = (id: number, field: keyof Education, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       education: prev.education.map(edu =>
//         edu.id === id ? { ...edu, [field]: value } : edu
//       )
//     }));
//   };

//   const addEducation = () => {
//     setFormData(prev => ({
//       ...prev,
//       education: [...prev.education, {
//         id: Date.now(),
//         degree: "",
//         institution: "",
//         year: ""
//       }]
//     }));
//   };

//   const removeEducation = (id: number) => {
//     if (formData.education.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         education: prev.education.filter(edu => edu.id !== id)
//       }));
//     }
//   };

//   // Project functions
//   const updateProject = (id: number, field: keyof Project, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       projects: prev.projects.map(proj =>
//         proj.id === id ? { ...proj, [field]: value } : proj
//       )
//     }));
//   };

//   const addProject = () => {
//     setFormData(prev => ({
//       ...prev,
//       projects: [...prev.projects, {
//         id: Date.now(),
//         name: "",
//         description: "",
//         technologies: "",
//         link: ""
//       }]
//     }));
//   };

//   const removeProject = (id: number) => {
//     setFormData(prev => ({
//       ...prev,
//       projects: prev.projects.filter(proj => proj.id !== id)
//     }));
//   };

//   // Achievement functions
//   const updateAchievement = (id: number, field: keyof Achievement, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       achievements: prev.achievements.map(ach =>
//         ach.id === id ? { ...ach, [field]: value } : ach
//       )
//     }));
//   };

//   const addAchievement = () => {
//     setFormData(prev => ({
//       ...prev,
//       achievements: [...prev.achievements, {
//         id: Date.now(),
//         title: "",
//         description: "",
//         date: ""
//       }]
//     }));
//   };

//   const removeAchievement = (id: number) => {
//     setFormData(prev => ({
//       ...prev,
//       achievements: prev.achievements.filter(ach => ach.id !== id)
//     }));
//   };

//   const addSkill = (skill: string) => {
//     if (skill && !formData.skills.includes(skill)) {
//       setFormData(prev => ({
//         ...prev,
//         skills: [...prev.skills, skill]
//       }));
//       setNewSkill("");
//     }
//   };

//   const removeSkill = (skill: string) => {
//     setFormData(prev => ({
//       ...prev,
//       skills: prev.skills.filter(s => s !== skill)
//     }));
//   };

//   const addLanguage = (language: string) => {
//     if (language && !formData.languages.includes(language)) {
//       setFormData(prev => ({
//         ...prev,
//         languages: [...prev.languages, language]
//       }));
//       setNewLanguage("");
//     }
//   };

//   const removeLanguage = (language: string) => {
//     setFormData(prev => ({
//       ...prev,
//       languages: prev.languages.filter(l => l !== language)
//     }));
//   };

//   const addHobby = (hobby: string) => {
//     if (hobby && !formData.hobbies.includes(hobby)) {
//       setFormData(prev => ({
//         ...prev,
//         hobbies: [...prev.hobbies, hobby]
//       }));
//       setNewHobby("");
//     }
//   };

//   const removeHobby = (hobby: string) => {
//     setFormData(prev => ({
//       ...prev,
//       hobbies: prev.hobbies.filter(h => h !== hobby)
//     }));
//   };

//   const toggleOptionalSection = (section: keyof OptionalSections) => {
//     setOptionalSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const handleNext = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Save to localStorage for guest users
//       localStorage.setItem('resumeData', JSON.stringify(formData));
//       localStorage.setItem('optionalSections', JSON.stringify(optionalSections));
//       router.push("/resume-edit?new=true");
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleAIGenerate = async (content: string) => {
//     console.log("AI generating content:", content);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       <Sidebar />

//       <main className="lg:ml-[260px] p-6 lg:p-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
//             Create New Resume
//           </h1>
//           <p className="text-slate-400">
//             Fill in your information to generate a professional resume
//           </p>
//         </motion.div>

//         {/* Progress Steps */}
//         <div className="max-w-4xl mx-auto mb-8 overflow-x-auto">
//           <div className="flex items-center justify-between min-w-[600px]">
//             {steps.map((step, index) => {
//               const Icon = step.icon;
//               const isActive = currentStep === step.id;
//               const isCompleted = currentStep > step.id;

//               return (
//                 <div key={step.id} className="flex items-center flex-1">
//                   <div className="flex flex-col items-center flex-1">
//                     <div
//                       className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25"
//                           : isCompleted
//                           ? "bg-emerald-500"
//                           : "bg-slate-700"
//                       }`}
//                     >
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>
//                     <span
//                       className={`text-sm mt-2 font-medium ${
//                         isActive ? "text-white" : "text-slate-400"
//                       }`}
//                     >
//                       {step.name}
//                     </span>
//                   </div>
//                   {index < steps.length - 1 && (
//                     <div
//                       className={`h-1 flex-1 mx-4 rounded transition-all duration-300 ${
//                         currentStep > step.id ? "bg-emerald-500" : "bg-slate-700"
//                       }`}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="max-w-3xl mx-auto">
//           <AnimatePresence mode="wait">
//             {/* Step 1: Personal Info */}
//             {currentStep === 1 && (
//               <motion.div
//                 key="step1"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-semibold text-white">Personal Information</h2>
//                   <AIActionButton
//                     label="Enhance with AI"
//                     size="sm"
//                     onGenerate={handleAIGenerate}
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm text-slate-400 mb-2">Full Name *</label>
//                       <Input
//                         value={formData.personalInfo.name}
//                         onChange={(e) => updatePersonalInfo("name", e.target.value)}
//                         placeholder="John Doe"
//                         className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-slate-400 mb-2">Email *</label>
//                       <Input
//                         type="email"
//                         value={formData.personalInfo.email}
//                         onChange={(e) => updatePersonalInfo("email", e.target.value)}
//                         placeholder="john@example.com"
//                         className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-slate-400 mb-2">Phone</label>
//                       <Input
//                         value={formData.personalInfo.phone}
//                         onChange={(e) => updatePersonalInfo("phone", e.target.value)}
//                         placeholder="+1 (555) 000-0000"
//                         className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-slate-400 mb-2">Location</label>
//                       <Input
//                         value={formData.personalInfo.location}
//                         onChange={(e) => updatePersonalInfo("location", e.target.value)}
//                         placeholder="San Francisco, CA"
//                         className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-2">Professional Summary</label>
//                     <Textarea
//                       value={formData.personalInfo.summary}
//                       onChange={(e) => updatePersonalInfo("summary", e.target.value)}
//                       placeholder="Brief description of your professional background..."
//                       className="bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[120px]"
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Step 2: Experience */}
//             {currentStep === 2 && (
//               <motion.div
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-semibold text-white">Work Experience</h2>
//                   <AIActionButton
//                     label="Generate with AI"
//                     size="sm"
//                     onGenerate={handleAIGenerate}
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   {formData.experience.map((exp, index) => (
//                     <div
//                       key={exp.id}
//                       className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
//                     >
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="text-sm text-slate-400">Experience {index + 1}</span>
//                         {formData.experience.length > 1 && (
//                           <Button
//                             size="icon"
//                             variant="ghost"
//                             onClick={() => removeExperience(exp.id)}
//                             className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         )}
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <Input
//                           placeholder="Company"
//                           value={exp.company}
//                           onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                         />
//                         <Input
//                           placeholder="Role"
//                           value={exp.role}
//                           onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                         />
//                         <Input
//                           placeholder="Duration (e.g., Jan 2020 - Present)"
//                           value={exp.duration}
//                           onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl md:col-span-2"
//                         />
//                       </div>
//                       <Textarea
//                         placeholder="Description of your responsibilities and achievements..."
//                         value={exp.description}
//                         onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
//                         className="mt-3 bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[80px]"
//                       />
//                     </div>
//                   ))}
//                   <Button
//                     onClick={addExperience}
//                     variant="outline"
//                     className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Experience
//                   </Button>
//                 </div>
//               </motion.div>
//             )}

//             {/* Step 3: Education */}
//             {currentStep === 3 && (
//               <motion.div
//                 key="step3"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
//               >
//                 <h2 className="text-xl font-semibold text-white mb-6">Education</h2>

//                 <div className="space-y-4">
//                   {formData.education.map((edu, index) => (
//                     <div
//                       key={edu.id}
//                       className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
//                     >
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="text-sm text-slate-400">Education {index + 1}</span>
//                         {formData.education.length > 1 && (
//                           <Button
//                             size="icon"
//                             variant="ghost"
//                             onClick={() => removeEducation(edu.id)}
//                             className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         )}
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                         <Input
//                           placeholder="Degree"
//                           value={edu.degree}
//                           onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                         />
//                         <Input
//                           placeholder="Institution"
//                           value={edu.institution}
//                           onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                         />
//                         <Input
//                           placeholder="Year"
//                           value={edu.year}
//                           onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                   <Button
//                     onClick={addEducation}
//                     variant="outline"
//                     className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Education
//                   </Button>
//                 </div>
//               </motion.div>
//             )}

//             {/* Step 4: Skills */}
//             {currentStep === 4 && (
//               <motion.div
//                 key="step4"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
//               >
//                 <h2 className="text-xl font-semibold text-white mb-6">Skills</h2>

//                 <div className="space-y-6">
//                   <div className="flex gap-2">
//                     <Input
//                       value={newSkill}
//                       onChange={(e) => setNewSkill(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
//                       placeholder="Add a skill..."
//                       className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                     />
//                     <Button
//                       onClick={() => addSkill(newSkill)}
//                       className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
//                     >
//                       Add
//                     </Button>
//                   </div>

//                   {formData.skills.length > 0 && (
//                     <div>
//                       <p className="text-sm text-slate-400 mb-3">Your Skills</p>
//                       <div className="flex flex-wrap gap-2">
//                         {formData.skills.map(skill => (
//                           <Badge
//                             key={skill}
//                             className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
//                             onClick={() => removeSkill(skill)}
//                           >
//                             {skill}
//                             <Trash2 className="w-3 h-3 ml-2" />
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div>
//                     <p className="text-sm text-slate-400 mb-3">Suggested Skills</p>
//                     <div className="flex flex-wrap gap-2">
//                       {suggestedSkills
//                         .filter(skill => !formData.skills.includes(skill))
//                         .map(skill => (
//                           <Badge
//                             key={skill}
//                             className="bg-slate-700/50 text-slate-300 border border-slate-600 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
//                             onClick={() => addSkill(skill)}
//                           >
//                             {skill}
//                             <Plus className="w-3 h-3 ml-2" />
//                           </Badge>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Step 5: Optional Sections */}
//             {currentStep === 5 && (
//               <motion.div
//                 key="step5"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-6"
//               >
//                 {/* Section Selection */}
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
//                   <h2 className="text-xl font-semibold text-white mb-4">Optional Sections</h2>
//                   <p className="text-slate-400 text-sm mb-6">
//                     Select additional sections you want to include in your resume
//                   </p>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {[
//                       { key: 'projects' as keyof OptionalSections, label: 'Projects', icon: Folder, desc: 'Showcase your personal or professional projects' },
//                       { key: 'achievements' as keyof OptionalSections, label: 'Achievements', icon: Trophy, desc: 'Highlight awards and accomplishments' },
//                       { key: 'languages' as keyof OptionalSections, label: 'Languages', icon: Languages, desc: 'List languages you speak' },
//                       { key: 'hobbies' as keyof OptionalSections, label: 'Hobbies', icon: Heart, desc: 'Share your interests and hobbies' },
//                     ].map((section) => {
//                       const Icon = section.icon;
//                       return (
//                         <div
//                           key={section.key}
//                           onClick={() => toggleOptionalSection(section.key)}
//                           className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
//                             optionalSections[section.key]
//                               ? 'border-blue-500 bg-blue-500/10'
//                               : 'border-slate-700 hover:border-slate-600'
//                           }`}
//                         >
//                           <div className="flex items-start gap-3">
//                             <Checkbox
//                               checked={optionalSections[section.key]}
//                               className="mt-1"
//                             />
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-1">
//                                 <Icon className="w-5 h-5 text-blue-400" />
//                                 <h3 className="font-semibold text-white">{section.label}</h3>
//                               </div>
//                               <p className="text-slate-400 text-sm">{section.desc}</p>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Projects Section */}
//                 {optionalSections.projects && (
//                   <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
//                     <div className="flex items-center gap-2 mb-6">
//                       <Folder className="w-5 h-5 text-blue-400" />
//                       <h2 className="text-xl font-semibold text-white">Projects</h2>
//                     </div>

//                     <div className="space-y-4">
//                       {formData.projects.map((proj, index) => (
//                         <div
//                           key={proj.id}
//                           className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
//                         >
//                           <div className="flex items-center justify-between mb-3">
//                             <span className="text-sm text-slate-400">Project {index + 1}</span>
//                             <Button
//                               size="icon"
//                               variant="ghost"
//                               onClick={() => removeProject(proj.id)}
//                               className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <div className="space-y-3">
//                             <Input
//                               placeholder="Project Name"
//                               value={proj.name}
//                               onChange={(e) => updateProject(proj.id, "name", e.target.value)}
//                               className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                             />
//                             <Textarea
//                               placeholder="Project Description"
//                               value={proj.description}
//                               onChange={(e) => updateProject(proj.id, "description", e.target.value)}
//                               className="bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[80px]"
//                             />
//                             <Input
//                               placeholder="Technologies Used (e.g., React, Node.js)"
//                               value={proj.technologies}
//                               onChange={(e) => updateProject(proj.id, "technologies", e.target.value)}
//                               className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                             />
//                             <Input
//                               placeholder="Project Link (optional)"
//                               value={proj.link}
//                               onChange={(e) => updateProject(proj.id, "link", e.target.value)}
//                               className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                             />
//                           </div>
//                         </div>
//                       ))}
//                       <Button
//                         onClick={addProject}
//                         variant="outline"
//                         className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Project
//                       </Button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Achievements Section */}
//                 {optionalSections.achievements && (
//                   <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
//                     <div className="flex items-center gap-2 mb-6">
//                       <Trophy className="w-5 h-5 text-blue-400" />
//                       <h2 className="text-xl font-semibold text-white">Achievements</h2>
//                     </div>

//                     <div className="space-y-4">
//                       {formData.achievements.map((ach, index) => (
//                         <div
//                           key={ach.id}
//                           className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
//                         >
//                           <div className="flex items-center justify-between mb-3">
//                             <span className="text-sm text-slate-400">Achievement {index + 1}</span>
//                             <Button
//                               size="icon"
//                               variant="ghost"
//                               onClick={() => removeAchievement(ach.id)}
//                               className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <div className="space-y-3">
//                             <Input
//                               placeholder="Achievement Title"
//                               value={ach.title}
//                               onChange={(e) => updateAchievement(ach.id, "title", e.target.value)}
//                               className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                             />
//                             <Textarea
//                               placeholder="Description"
//                               value={ach.description}
//                               onChange={(e) => updateAchievement(ach.id, "description", e.target.value)}
//                               className="bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[80px]"
//                             />
//                             <Input
//                               placeholder="Date"
//                               value={ach.date}
//                               onChange={(e) => updateAchievement(ach.id, "date", e.target.value)}
//                               className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                             />
//                           </div>
//                         </div>
//                       ))}
//                       <Button
//                         onClick={addAchievement}
//                         variant="outline"
//                         className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Achievement
//                       </Button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Languages Section */}
//                 {optionalSections.languages && (
//                   <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
//                     <div className="flex items-center gap-2 mb-6">
//                       <Languages className="w-5 h-5 text-blue-400" />
//                       <h2 className="text-xl font-semibold text-white">Languages</h2>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex gap-2">
//                         <Input
//                           value={newLanguage}
//                           onChange={(e) => setNewLanguage(e.target.value)}
//                           onKeyDown={(e) => e.key === "Enter" && addLanguage(newLanguage)}
//                           placeholder="Add a language (e.g., English - Fluent)..."
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                         />
//                         <Button
//                           onClick={() => addLanguage(newLanguage)}
//                           className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
//                         >
//                           Add
//                         </Button>
//                       </div>

//                       {formData.languages.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                           {formData.languages.map(language => (
//                             <Badge
//                               key={language}
//                               className="bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
//                               onClick={() => removeLanguage(language)}
//                             >
//                               {language}
//                               <Trash2 className="w-3 h-3 ml-2" />
//                             </Badge>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Hobbies Section */}
//                 {optionalSections.hobbies && (
//                   <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
//                     <div className="flex items-center gap-2 mb-6">
//                       <Heart className="w-5 h-5 text-blue-400" />
//                       <h2 className="text-xl font-semibold text-white">Hobbies & Interests</h2>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex gap-2">
//                         <Input
//                           value={newHobby}
//                           onChange={(e) => setNewHobby(e.target.value)}
//                           onKeyDown={(e) => e.key === "Enter" && addHobby(newHobby)}
//                           placeholder="Add a hobby..."
//                           className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
//                         />
//                         <Button
//                           onClick={() => addHobby(newHobby)}
//                           className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
//                         >
//                           Add
//                         </Button>
//                       </div>

//                       {formData.hobbies.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                           {formData.hobbies.map(hobby => (
//                             <Badge
//                               key={hobby}
//                               className="bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
//                               onClick={() => removeHobby(hobby)}
//                             >
//                               {hobby}
//                               <Trash2 className="w-3 h-3 ml-2" />
//                             </Badge>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <div className="flex items-center justify-between mt-8">
//             <Button
//               onClick={handlePrevious}
//               disabled={currentStep === 1}
//               variant="outline"
//               className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Previous
//             </Button>

//             <div className="text-slate-400 text-sm">
//               Step {currentStep} of {steps.length}
//             </div>

//             <Button
//               onClick={handleNext}
//               className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl"
//             >
//               {currentStep === steps.length ? "Finish & Preview" : "Next"}
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createGuestSession, getGuestSession } from "@/lib/guestSession";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Trophy,
  Folder,
  Languages,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Sidebar from "@/components/resume/Sidebar";
import AIActionButton from "@/components/resume/AIActionButton";

// Types
interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  achievements: Achievement[];
  languages: string[];
  hobbies: string[];
}

interface OptionalSections {
  projects: boolean;
  achievements: boolean;
  languages: boolean;
  hobbies: boolean;
}

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Experience", icon: Briefcase },
  { id: 3, name: "Education", icon: GraduationCap },
  { id: 4, name: "Skills", icon: Award },
  { id: 5, name: "Optional Sections", icon: Plus },
];

const suggestedSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "Git",
];

export default function CreateResume() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newHobby, setNewHobby] = useState("");

  const [optionalSections, setOptionalSections] = useState<OptionalSections>({
    projects: false,
    achievements: false,
    languages: false,
    hobbies: false,
  });

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [
      { id: 1, company: "", role: "", duration: "", description: "" },
    ],
    education: [{ id: 1, degree: "", institution: "", year: "" }],
    skills: [],
    projects: [],
    achievements: [],
    languages: [],
    hobbies: [],
  });

  // Initialize guest session if not logged in
  useEffect(() => {
    const { isGuest, guestId } = getGuestSession();
    if (!guestId && !localStorage.getItem("userId")) {
      createGuestSession();
    }
  }, []);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateExperience = (
    id: number,
    field: keyof Experience,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: "",
          role: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: number) => {
    if (formData.experience.length > 1) {
      setFormData((prev) => ({
        ...prev,
        experience: prev.experience.filter((exp) => exp.id !== id),
      }));
    }
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: "",
          institution: "",
          year: "",
        },
      ],
    }));
  };

  const removeEducation = (id: number) => {
    if (formData.education.length > 1) {
      setFormData((prev) => ({
        ...prev,
        education: prev.education.filter((edu) => edu.id !== id),
      }));
    }
  };

  const updateProject = (id: number, field: keyof Project, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj,
      ),
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    }));
  };

  const removeProject = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const updateAchievement = (
    id: number,
    field: keyof Achievement,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach) =>
        ach.id === id ? { ...ach, [field]: value } : ach,
      ),
    }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          id: Date.now(),
          title: "",
          description: "",
          date: "",
        },
      ],
    }));
  };

  const removeAchievement = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((ach) => ach.id !== id),
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addLanguage = (language: string) => {
    if (language && !formData.languages.includes(language)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, language],
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }));
  };

  const addHobby = (hobby: string) => {
    if (hobby && !formData.hobbies.includes(hobby)) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, hobby],
      }));
      setNewHobby("");
    }
  };

  const removeHobby = (hobby: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h !== hobby),
    }));
  };

  const toggleOptionalSection = (section: keyof OptionalSections) => {
    setOptionalSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const token = localStorage.getItem("access_token");

        const res = await fetch("http://127.0.0.1:5000/resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: formData.personalInfo.name,
            email: formData.personalInfo.email,
            phone: formData.personalInfo.phone,
            location: formData.personalInfo.location,
            summary: formData.personalInfo.summary,
            experience: formData.experience,
            education: formData.education,
            skills: formData.skills,
            projects: optionalSections.projects ? formData.projects : [],
            achievements: optionalSections.achievements
              ? formData.achievements
              : [],
            languages: optionalSections.languages ? formData.languages : [],
            hobbies: optionalSections.hobbies ? formData.hobbies : [],
          }),
        });

        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error("Server error");
        }

        if (!res.ok) {
          throw new Error(data.error || "Failed to create resume");
        }

        // ✅ Redirect with ID
        router.push(`/resume-preview?id=${data.resume_id}`);
      } catch (err) {
        console.error(err);
        alert(err instanceof Error ? err.message : "Something went wrong");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAIGenerate = async (content: string) => {
    console.log("AI generating content:", content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar customNavigation={undefined} />

      <main className="lg:ml-[60px] p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Create New Resume
          </h1>
          <p className="text-slate-400">
            Fill in your information to generate a professional resume
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px]">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25"
                          : isCompleted
                            ? "bg-emerald-500"
                            : "bg-slate-700"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 rounded transition-all duration-300 ${
                        currentStep > step.id
                          ? "bg-emerald-500"
                          : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Personal Information
                  </h2>
                  <AIActionButton
                    label="Enhance with AI"
                    size="sm"
                    onGenerate={handleAIGenerate}
                  />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.personalInfo.name}
                        onChange={(e) =>
                          updatePersonalInfo("name", e.target.value)
                        }
                        placeholder="John Doe"
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) =>
                          updatePersonalInfo("email", e.target.value)
                        }
                        placeholder="john@example.com"
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Phone
                      </label>
                      <Input
                        value={formData.personalInfo.phone}
                        onChange={(e) =>
                          updatePersonalInfo("phone", e.target.value)
                        }
                        placeholder="+1 (555) 000-0000"
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Location
                      </label>
                      <Input
                        value={formData.personalInfo.location}
                        onChange={(e) =>
                          updatePersonalInfo("location", e.target.value)
                        }
                        placeholder="San Francisco, CA"
                        className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Professional Summary
                    </label>
                    <Textarea
                      value={formData.personalInfo.summary}
                      onChange={(e) =>
                        updatePersonalInfo("summary", e.target.value)
                      }
                      placeholder="Brief description of your professional background..."
                      className="bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[120px]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Experience */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Work Experience
                  </h2>
                  <AIActionButton
                    label="Generate with AI"
                    size="sm"
                    onGenerate={handleAIGenerate}
                  />
                </div>

                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">
                          Experience {index + 1}
                        </span>
                        {formData.experience.length > 1 && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Role"
                          value={exp.role}
                          onChange={(e) =>
                            updateExperience(exp.id, "role", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Duration (e.g., Jan 2020 - Present)"
                          value={exp.duration}
                          onChange={(e) =>
                            updateExperience(exp.id, "duration", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl md:col-span-2"
                        />
                      </div>
                      <Textarea
                        placeholder="Description of your responsibilities and achievements..."
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value,
                          )
                        }
                        className="mt-3 bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[80px]"
                      />
                    </div>
                  ))}
                  <Button
                    onClick={addExperience}
                    variant="outline"
                    className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold text-white mb-6">
                  Education
                </h2>

                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">
                          Education {index + 1}
                        </span>
                        {formData.education.length > 1 && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, "degree", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Input
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) =>
                            updateEducation(edu.id, "year", e.target.value)
                          }
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={addEducation}
                    variant="outline"
                    className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Skills */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold text-white mb-6">
                  Skills
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
                      placeholder="Add a skill..."
                      className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                    />
                    <Button
                      onClick={() => addSkill(newSkill)}
                      className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
                    >
                      Add
                    </Button>
                  </div>

                  {formData.skills.length > 0 && (
                    <div>
                      <p className="text-sm text-slate-400 mb-3">Your Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill}
                            <Trash2 className="w-3 h-3 ml-2" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-slate-400 mb-3">
                      Suggested Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills
                        .filter((skill) => !formData.skills.includes(skill))
                        .map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-slate-700/50 text-slate-300 border border-slate-600 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
                            onClick={() => addSkill(skill)}
                          >
                            {skill}
                            <Plus className="w-3 h-3 ml-2" />
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Optional Sections */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Section Selection */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Optional Sections
                  </h2>
                  <p className="text-slate-400 text-sm mb-6">
                    Select additional sections you want to include in your
                    resume
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        key: "projects" as keyof OptionalSections,
                        label: "Projects",
                        icon: Folder,
                        desc: "Showcase your personal or professional projects",
                      },
                      {
                        key: "achievements" as keyof OptionalSections,
                        label: "Achievements",
                        icon: Trophy,
                        desc: "Highlight awards and accomplishments",
                      },
                      {
                        key: "languages" as keyof OptionalSections,
                        label: "Languages",
                        icon: Languages,
                        desc: "List languages you speak",
                      },
                      {
                        key: "hobbies" as keyof OptionalSections,
                        label: "Hobbies",
                        icon: Heart,
                        desc: "Share your interests and hobbies",
                      },
                    ].map((section) => {
                      const Icon = section.icon;
                      return (
                        <div
                          key={section.key}
                          onClick={() => toggleOptionalSection(section.key)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            optionalSections[section.key]
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-slate-700 hover:border-slate-600"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={optionalSections[section.key]}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="w-5 h-5 text-blue-400" />
                                <h3 className="font-semibold text-white">
                                  {section.label}
                                </h3>
                              </div>
                              <p className="text-slate-400 text-sm">
                                {section.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Projects Section */}
                {optionalSections.projects && (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Folder className="w-5 h-5 text-blue-400" />
                      <h2 className="text-xl font-semibold text-white">
                        Projects
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {formData.projects.map((proj, index) => (
                        <div
                          key={proj.id}
                          className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-slate-400">
                              Project {index + 1}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeProject(proj.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-3">
                            <Input
                              placeholder="Project Name"
                              value={proj.name}
                              onChange={(e) =>
                                updateProject(proj.id, "name", e.target.value)
                              }
                              className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                            />
                            <Textarea
                              placeholder="Project Description"
                              value={proj.description}
                              onChange={(e) =>
                                updateProject(
                                  proj.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[80px]"
                            />
                            <Input
                              placeholder="Technologies Used (e.g., React, Node.js)"
                              value={proj.technologies}
                              onChange={(e) =>
                                updateProject(
                                  proj.id,
                                  "technologies",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                            />
                            <Input
                              placeholder="Project Link (optional)"
                              value={proj.link}
                              onChange={(e) =>
                                updateProject(proj.id, "link", e.target.value)
                              }
                              className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                            />
                          </div>
                        </div>
                      ))}
                      <Button
                        onClick={addProject}
                        variant="outline"
                        className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </div>
                )}

                {/* Achievements Section */}
                {optionalSections.achievements && (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Trophy className="w-5 h-5 text-blue-400" />
                      <h2 className="text-xl font-semibold text-white">
                        Achievements
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {formData.achievements.map((ach, index) => (
                        <div
                          key={ach.id}
                          className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-slate-400">
                              Achievement {index + 1}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeAchievement(ach.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-3">
                            <Input
                              placeholder="Achievement Title"
                              value={ach.title}
                              onChange={(e) =>
                                updateAchievement(
                                  ach.id,
                                  "title",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                            />
                            <Textarea
                              placeholder="Description"
                              value={ach.description}
                              onChange={(e) =>
                                updateAchievement(
                                  ach.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-700/50 border-slate-600 text-white rounded-xl min-h-[80px]"
                            />
                            <Input
                              placeholder="Date"
                              value={ach.date}
                              onChange={(e) =>
                                updateAchievement(
                                  ach.id,
                                  "date",
                                  e.target.value,
                                )
                              }
                              className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                            />
                          </div>
                        </div>
                      ))}
                      <Button
                        onClick={addAchievement}
                        variant="outline"
                        className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Achievement
                      </Button>
                    </div>
                  </div>
                )}

                {/* Languages Section */}
                {optionalSections.languages && (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Languages className="w-5 h-5 text-blue-400" />
                      <h2 className="text-xl font-semibold text-white">
                        Languages
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && addLanguage(newLanguage)
                          }
                          placeholder="Add a language (e.g., English - Fluent)..."
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Button
                          onClick={() => addLanguage(newLanguage)}
                          className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
                        >
                          Add
                        </Button>
                      </div>

                      {formData.languages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.languages.map((language) => (
                            <Badge
                              key={language}
                              className="bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
                              onClick={() => removeLanguage(language)}
                            >
                              {language}
                              <Trash2 className="w-3 h-3 ml-2" />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Hobbies Section */}
                {optionalSections.hobbies && (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Heart className="w-5 h-5 text-blue-400" />
                      <h2 className="text-xl font-semibold text-white">
                        Hobbies & Interests
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newHobby}
                          onChange={(e) => setNewHobby(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && addHobby(newHobby)
                          }
                          placeholder="Add a hobby..."
                          className="bg-slate-700/50 border-slate-600 text-white rounded-xl"
                        />
                        <Button
                          onClick={() => addHobby(newHobby)}
                          className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
                        >
                          Add
                        </Button>
                      </div>

                      {formData.hobbies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.hobbies.map((hobby) => (
                            <Badge
                              key={hobby}
                              className="bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
                              onClick={() => removeHobby(hobby)}
                            >
                              {hobby}
                              <Trash2 className="w-3 h-3 ml-2" />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="text-slate-400 text-sm">
              Step {currentStep} of {steps.length}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl"
            >
              {currentStep === steps.length ? "Finish & Preview" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
