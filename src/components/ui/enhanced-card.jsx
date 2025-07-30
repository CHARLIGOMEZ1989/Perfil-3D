import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function EnhancedCard({ 
  children, 
  className, 
  title, 
  subtitle,
  icon,
  gradient = false,
  glowEffect = false,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={cn(
        "relative",
        glowEffect && "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20 before:blur-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        className
      )}
    >
      <Card 
        className={cn(
          "relative z-10 backdrop-blur-sm border-white/20 shadow-xl",
          gradient && "bg-gradient-to-br from-white/90 to-white/70",
          "hover:shadow-2xl transition-all duration-300"
        )}
        {...props}
      >
        {(title || icon) && (
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              {icon && (
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {icon}
                </div>
              )}
              <div>
                {title && <div className="text-lg font-semibold">{title}</div>}
                {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
              </div>
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function MetricCard({ label, value, unit, trend, icon, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden"
    >
      <Card className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{value}</span>
                {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
              </div>
              {trend && (
                <div className={cn(
                  "text-xs flex items-center gap-1 mt-1",
                  trend > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
                </div>
              )}
            </div>
            {icon && (
              <div className={cn(
                "p-3 rounded-full bg-gradient-to-br text-white shadow-lg",
                colorClasses[color]
              )}>
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

