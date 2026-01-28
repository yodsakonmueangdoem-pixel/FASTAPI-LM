import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "flight" | "health" | "animal" | "movie" | "default";
  className?: string;
}

const variantClasses = {
  flight: "border-flight/30 bg-flight-soft",
  health: "border-health/30 bg-health-soft",
  animal: "border-animal/30 bg-animal-soft",
  movie: "border-movie/30 bg-movie-soft",
  default: "border-border bg-card",
};

const iconClasses = {
  flight: "bg-flight text-flight-foreground",
  health: "bg-health text-health-foreground",
  animal: "bg-animal text-animal-foreground",
  movie: "bg-movie text-movie-foreground",
  default: "bg-primary text-primary-foreground",
};

export const ResultCard = ({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
  className,
}: ResultCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-2xl border-2 p-6 shadow-sm",
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
              iconClasses[variant]
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground truncate">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
