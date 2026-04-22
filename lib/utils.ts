import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName: string): string {
  const pageRoutes: Record<string, string> = {
    "Dashboard": "/dashboard",
    "MyResumes": "/my-resumes",
    "CreateResume": "/create-resume",
    "ResumeEdit": "/resume-edit",
    "ResumePreview": "/resume-preview",
    "Profile": "/profile",
    "SignIn": "/signin",
    "Register": "/register",
    "ForgotPassword": "/forgot-password",
    "Login": "/signin"
  };
  
  return pageRoutes[pageName] || "/";
}
