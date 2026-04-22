import { motion } from "framer-motion";
import { Check } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
    color: "from-blue-500 to-cyan-500",
    preview: {
      headerColor: "bg-blue-500",
      accentColor: "border-blue-500"
    }
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic and traditional look",
    color: "from-slate-600 to-slate-800",
    preview: {
      headerColor: "bg-slate-700",
      accentColor: "border-slate-600"
    }
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and eye-catching style",
    color: "from-violet-500 to-pink-500",
    preview: {
      headerColor: "bg-violet-500",
      accentColor: "border-violet-500"
    }
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design",
    color: "from-emerald-500 to-teal-500",
    preview: {
      headerColor: "bg-emerald-500",
      accentColor: "border-emerald-500"
    }
  }
];

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {templates.map((template, index) => (
        <motion.button
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(template.id)}
          className={`relative group text-left ${
            selected === template.id 
              ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900" 
              : ""
          } rounded-xl overflow-hidden`}
        >
          {/* Template preview */}
          <div className="aspect-[3/4] bg-white rounded-xl p-3 shadow-lg relative overflow-hidden">
            {/* Mini resume preview */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className={`h-8 ${template.preview.headerColor} rounded-lg mb-2`} />
              
              {/* Content lines */}
              <div className="space-y-1.5 flex-1">
                <div className="h-1.5 w-16 bg-slate-200 rounded" />
                <div className="h-1.5 w-12 bg-slate-100 rounded" />
                <div className={`h-0.5 w-full border-t-2 ${template.preview.accentColor} my-2`} />
                <div className="h-1 w-full bg-slate-100 rounded" />
                <div className="h-1 w-full bg-slate-100 rounded" />
                <div className="h-1 w-3/4 bg-slate-100 rounded" />
                <div className="h-1 w-12 bg-slate-200 rounded mt-2" />
                <div className="h-1 w-full bg-slate-100 rounded" />
                <div className="h-1 w-full bg-slate-100 rounded" />
              </div>
            </div>

            {/* Selected check */}
            {selected === template.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-xs font-medium">Use Template</span>
            </div>
          </div>

          {/* Template info */}
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${template.color}`} />
              <h3 className="font-medium text-white text-sm">{template.name}</h3>
            </div>
            <p className="text-slate-400 text-xs mt-1">{template.description}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}