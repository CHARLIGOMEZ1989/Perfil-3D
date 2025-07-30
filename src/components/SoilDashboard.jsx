import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts"
import { 
  Beaker, Droplets, Layers, TrendingUp, Eye, EyeOff, 
  ChevronDown, ChevronUp, BarChart3, PieChart as PieChartIcon,
  Activity, Zap, Leaf, Mountain
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EnhancedCard, MetricCard } from "@/components/ui/enhanced-card"
import { soilConstants } from "@/data/soilData"

export function SoilDashboard({ 
  soilHorizons, 
  selectedHorizon, 
  viewMode, 
  onViewModeChange,
  isCollapsed,
  onToggleCollapse 
}) {
  const [activeChart, setActiveChart] = useState("depth")

  // Preparar datos para gráficos
  const depthData = soilHorizons.map(h => ({
    name: h.id,
    depth: h.depth.end - h.depth.start,
    pH: h.pH,
    permeability: h.permeability * 100,
    organicMatter: h.materiaOrganica,
    clay: h.arcilla,
  }))

  const textureData = soilHorizons.map(h => ({
    name: h.id,
    arena: h.arena,
    limo: h.limo,
    arcilla: h.arcilla,
  }))

  const chemicalData = soilHorizons.map(h => ({
    horizon: h.id,
    pH: h.pH,
    CE: h.conductividadElectrica,
    CIC: h.capacidadIntercambioCationico,
    MO: h.materiaOrganica,
    CN: h.relacionCN,
  }))

  const qualityRadarData = selectedHorizon ? [
    { subject: 'Fertilidad', A: selectedHorizon.indiceCalidad, fullMark: 10 },
    { subject: 'Estructura', A: selectedHorizon.permeability * 10, fullMark: 10 },
    { subject: 'pH', A: Math.abs(selectedHorizon.pH - 7) < 1 ? 10 : 5, fullMark: 10 },
    { subject: 'M.O.', A: Math.min(selectedHorizon.materiaOrganica * 2, 10), fullMark: 10 },
    { subject: 'CIC', A: Math.min(selectedHorizon.capacidadIntercambioCationico / 5, 10), fullMark: 10 },
    { subject: 'Porosidad', A: selectedHorizon.porosidadTotal / 10, fullMark: 10 },
  ] : []

  const getInterpretation = (value, type) => {
    const interpretations = soilConstants[`interpretacion${type}`]
    if (!interpretations) return "No disponible"
    
    for (const [key, range] of Object.entries(interpretations)) {
      if (typeof range === 'string') {
        if (range.includes('-')) {
          const [min, max] = range.split('-').map(v => parseFloat(v))
          if (value >= min && value <= max) return key
        } else if (range.startsWith('<')) {
          if (value < parseFloat(range.slice(1))) return key
        } else if (range.startsWith('>')) {
          if (value > parseFloat(range.slice(1))) return key
        }
      }
    }
    return "No clasificado"
  }

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <div className="space-y-4">
      {/* Panel de control principal */}
      <EnhancedCard 
        className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-80"}`}
        gradient
        glowEffect
      >
        <div className="space-y-4">
          {/* Header con controles */}
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 text-white">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Análisis Edafológico</h3>
                  <p className="text-sm text-muted-foreground">Dashboard Científico</p>
                </div>
              </div>
            )}
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onToggleCollapse}
              className="hover:bg-white/20"
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
          </div>

          {!isCollapsed && (
            <>
              {/* Controles de vista */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === "structure" ? "default" : "outline"}
                    onClick={() => onViewModeChange("structure")}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Estructura
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "infiltration" ? "default" : "outline"}
                    onClick={() => onViewModeChange("infiltration")}
                    className="flex-1"
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    Infiltración
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={activeChart === "depth" ? "default" : "outline"}
                    onClick={() => setActiveChart("depth")}
                    className="flex-1"
                  >
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Perfil
                  </Button>
                  <Button
                    size="sm"
                    variant={activeChart === "texture" ? "default" : "outline"}
                    onClick={() => setActiveChart("texture")}
                    className="flex-1"
                  >
                    <PieChartIcon className="w-4 h-4 mr-1" />
                    Textura
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Métricas rápidas */}
              <div className="grid grid-cols-2 gap-3">
                <MetricCard
                  label="Horizontes"
                  value={soilHorizons.length}
                  icon={<Layers className="w-4 h-4" />}
                  color="blue"
                />
                <MetricCard
                  label="Profundidad"
                  value={Math.max(...soilHorizons.map(h => h.depth.end))}
                  unit="cm"
                  icon={<Mountain className="w-4 h-4" />}
                  color="green"
                />
              </div>

              {/* Lista de horizontes */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Horizontes del Perfil
                </h4>
                {soilHorizons.map((horizon, index) => (
                  <motion.div
                    key={horizon.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedHorizon?.id === horizon.id 
                        ? "bg-blue-100 border border-blue-300 shadow-md" 
                        : "hover:bg-white/50"
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded border-2 border-white shadow-sm" 
                      style={{ backgroundColor: horizon.color }} 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{horizon.id}</span>
                        <Badge variant="secondary" className="text-xs">
                          {horizon.depth.start}-{horizon.depth.end} cm
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {horizon.textureClass}
                      </div>
                    </div>
                    {viewMode === "infiltration" && (
                      <Badge variant="outline" className="text-xs">
                        {(horizon.permeability * 100).toFixed(0)}%
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </EnhancedCard>

      {/* Panel de gráficos */}
      {!isCollapsed && (
        <EnhancedCard 
          title="Análisis Gráfico"
          icon={<BarChart3 className="w-5 h-5" />}
          gradient
          className="w-80"
        >
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {activeChart === "depth" && (
                <motion.div
                  key="depth"
                  variants={chartVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-sm mb-3">Propiedades por Profundidad</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={depthData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                      <Bar dataKey="pH" fill="#8884d8" name="pH" />
                      <Bar dataKey="organicMatter" fill="#82ca9d" name="M.O. %" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {activeChart === "texture" && (
                <motion.div
                  key="texture"
                  variants={chartVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-sm mb-3">Composición Textural</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={textureData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                      <Bar dataKey="arena" stackId="a" fill="#ffc658" name="Arena %" />
                      <Bar dataKey="limo" stackId="a" fill="#8884d8" name="Limo %" />
                      <Bar dataKey="arcilla" stackId="a" fill="#82ca9d" name="Arcilla %" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </EnhancedCard>
      )}

      {/* Panel de información del horizonte seleccionado */}
      {selectedHorizon && !isCollapsed && (
        <EnhancedCard 
          title={selectedHorizon.name}
          subtitle={`${selectedHorizon.depth.start}-${selectedHorizon.depth.end} cm`}
          icon={<Beaker className="w-5 h-5" />}
          gradient
          glowEffect
          className="w-80"
        >
          <div className="space-y-4">
            {/* Métricas principales */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                label="pH"
                value={selectedHorizon.pH}
                icon={<Activity className="w-4 h-4" />}
                color="blue"
              />
              <MetricCard
                label="M.O."
                value={selectedHorizon.materiaOrganica.toFixed(1)}
                unit="%"
                icon={<Leaf className="w-4 h-4" />}
                color="green"
              />
              <MetricCard
                label="CIC"
                value={selectedHorizon.capacidadIntercambioCationico.toFixed(1)}
                unit="cmol/kg"
                icon={<Zap className="w-4 h-4" />}
                color="orange"
              />
              <MetricCard
                label="Permeabilidad"
                value={(selectedHorizon.permeability * 100).toFixed(0)}
                unit="%"
                icon={<Droplets className="w-4 h-4" />}
                color="purple"
              />
            </div>

            {/* Gráfico radar de calidad */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Índice de Calidad del Suelo</h4>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={qualityRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} />
                  <Radar
                    name="Calidad"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Interpretaciones */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Interpretación</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>pH:</span>
                  <Badge variant="outline">{getInterpretation(selectedHorizon.pH, "pH")}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Salinidad:</span>
                  <Badge variant="outline">{getInterpretation(selectedHorizon.conductividadElectrica, "CE")}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>M.O.:</span>
                  <Badge variant="outline">{getInterpretation(selectedHorizon.materiaOrganica, "MO")}</Badge>
                </div>
              </div>
            </div>

            {/* Propiedades detalladas */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Propiedades Físicas</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Arena:</span>
                  <span className="font-mono">{selectedHorizon.arena}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Limo:</span>
                  <span className="font-mono">{selectedHorizon.limo}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Arcilla:</span>
                  <span className="font-mono">{selectedHorizon.arcilla}%</span>
                </div>
                <div className="flex justify-between">
                  <span>D.A.:</span>
                  <span className="font-mono">{selectedHorizon.densidadAparente} g/cm³</span>
                </div>
              </div>
            </div>
          </div>
        </EnhancedCard>
      )}
    </div>
  )
}

