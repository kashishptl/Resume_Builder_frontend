import { motion } from "framer-motion";

export default function StatsCard({ icon: Icon, label, value, trend, color = "blue", index = 0 }) {
  const colorClasses = {
    blue: {
      bg: "from-blue-500/20 to-blue-600/10",
      icon: "bg-blue-500/20 text-blue-400",
      border: "border-blue-500/30",
      glow: "shadow-blue-500/20"
    },
    violet: {
      bg: "from-violet-500/20 to-violet-600/10",
      icon: "bg-violet-500/20 text-violet-400",
      border: "border-violet-500/30",
      glow: "shadow-violet-500/20"
    },
    emerald: {
      bg: "from-emerald-500/20 to-emerald-600/10",
      icon: "bg-emerald-500/20 text-emerald-400",
      border: "border-emerald-500/30",
      glow: "shadow-emerald-500/20"
    },
    amber: {
      bg: "from-amber-500/20 to-amber-600/10",
      icon: "bg-amber-500/20 text-amber-400",
      border: "border-amber-500/30",
      glow: "shadow-amber-500/20"
    }
  };

  const c = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative bg-gradient-to-br ${c.bg} backdrop-blur-sm border ${c.border} rounded-2xl p-6 overflow-hidden group shadow-xl ${c.glow}`}
    >
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
              trend > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
            }`}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
          )}
        </div>
        
        <motion.h3 
          className="text-3xl font-bold text-white mb-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {value}
        </motion.h3>
        <p className="text-slate-400 text-sm">{label}</p>
      </div>
    </motion.div>
  );
}