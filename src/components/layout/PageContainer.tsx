import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  accentColor?: "flight" | "health" | "animal" | "movie" | "primary";
}

const gradientClasses = {
  flight: "bg-gradient-flight",
  health: "bg-gradient-health",
  animal: "bg-gradient-animal",
  movie: "bg-gradient-movie",
  primary: "bg-gradient-primary",
};

export const PageContainer = ({
  children,
  title,
  subtitle,
  icon,
  accentColor = "primary",
}: PageContainerProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            {icon && (
              <div
                className={`w-14 h-14 rounded-2xl ${gradientClasses[accentColor]} flex items-center justify-center shadow-lg`}
              >
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
