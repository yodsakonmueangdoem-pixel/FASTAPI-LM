import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Brain, PawPrint, Film, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "/flight",
    label: "พยากรณ์ราคาตั๋ว",
    icon: Plane,
    color: "flight",
  },
  {
    path: "/depression",
    label: "ประเมินภาวะซึมเศร้า",
    icon: Brain,
    color: "health",
  },
  {
    path: "/animal",
    label: "จำแนกสัตว์",
    icon: PawPrint,
    color: "animal",
  },
  {
    path: "/movie",
    label: "แนะนำหนัง",
    icon: Film,
    color: "movie",
  },
];

const colorClasses = {
  flight: "bg-flight text-flight-foreground",
  health: "bg-health text-health-foreground",
  animal: "bg-animal text-animal-foreground",
  movie: "bg-movie text-movie-foreground",
};

const hoverClasses = {
  flight: "hover:bg-flight-soft hover:text-flight",
  health: "hover:bg-health-soft hover:text-health",
  animal: "hover:bg-animal-soft hover:text-animal",
  movie: "hover:bg-movie-soft hover:text-movie",
};

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AI</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">
              AI Prediction Hub
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    isActive
                      ? colorClasses[item.color as keyof typeof colorClasses]
                      : `text-muted-foreground ${hoverClasses[item.color as keyof typeof hoverClasses]}`
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                      isActive
                        ? colorClasses[item.color as keyof typeof colorClasses]
                        : `text-muted-foreground ${hoverClasses[item.color as keyof typeof hoverClasses]}`
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
