"use client"

import { useRef, useState, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Html } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Droplets,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Presentation,
  Users,
  GraduationCap,
  Timer,
  Camera,
  Download,
  Maximize,
  Minimize,
  MousePointer,
  PenTool,
  Eraser,
  FileText,
} from "lucide-react"

// Datos de horizontes del suelo con información edafológica completa
const soilHorizons = [
  {
    id: "O",
    name: "Horizonte O (Orgánico)",
    depth: { start: 0, end: 5 },
    color: "#2D1810",
    pH: 5.2,
    acidezIntercambiable: 0.8,
    basesTotales: 12.5,
    textureClass: "Franco",
    fragments: "Materia orgánica 85%",
    description: "Capa orgánica superficial",
    hasMottle: false,
    hasCracks: false,
    permeability: 0.9,
    educationalPoints: [
      "Observa el color oscuro característico",
      "Identifica la alta concentración de materia orgánica",
      "Nota la alta permeabilidad para retención de agua",
      "Reconoce la importancia para el ciclo de nutrientes",
    ],
    questions: [
      "¿Por qué este horizonte es tan oscuro?",
      "¿Qué organismos viven en esta capa?",
      "¿Cómo afecta la permeabilidad al crecimiento de plantas?",
    ],
    story: [
      "Bienvenido al fascinante mundo del suelo. Comenzamos nuestro viaje en la superficie...",
      "El Horizonte O es la capa más superficial, rica en materia orgánica fresca y en descomposición.",
      "Aquí encontramos hojas caídas, ramas pequeñas y restos vegetales en diferentes estados de descomposición.",
      "Los microorganismos trabajan incansablemente, transformando la materia orgánica en humus.",
      "Esta capa actúa como una esponja natural, reteniendo agua y nutrientes esenciales.",
      "Su color oscuro característico proviene de los compuestos húmicos formados durante la descomposición.",
    ],
  },
  {
    id: "A",
    name: "Horizonte A (Mineral-Orgánico)",
    depth: { start: 5, end: 20 },
    color: "#4A3728",
    pH: 5.8,
    acidezIntercambiable: 1.2,
    basesTotales: 18.3,
    textureClass: "Franco Arenoso",
    fragments: "Fragmentos rocosos 15%",
    description: "Mezcla de materia orgánica y mineral",
    hasMottle: true,
    mottleColor: "#8B4513",
    hasCracks: true,
    permeability: 0.7,
    educationalPoints: [
      "Examina la mezcla de materiales orgánicos y minerales",
      "Observa las grietas que permiten el movimiento del agua",
      "Identifica el moteado como indicador de procesos químicos",
      "Comprende la importancia para el desarrollo radicular",
    ],
    questions: [
      "¿Cómo se forman las grietas en este horizonte?",
      "¿Qué indica la presencia de moteado?",
      "¿Por qué es importante la textura franco arenosa?",
    ],
    story: [
      "Descendemos al Horizonte A, donde la magia de la mezcla ocurre...",
      "Aquí, la materia orgánica se combina íntimamente con partículas minerales.",
      "Las raíces de las plantas penetran esta capa, creando canales y liberando exudados.",
      "Los agregados del suelo se forman, creando una estructura porosa ideal para el crecimiento.",
      "Las lombrices y otros invertebrados mezclan constantemente los materiales orgánicos y minerales.",
      "Esta zona es fundamental para la retención de nutrientes y el desarrollo radicular.",
    ],
  },
  {
    id: "B1",
    name: "Horizonte B1 (Acumulación)",
    depth: { start: 20, end: 45 },
    color: "#8B4513",
    pH: 6.2,
    acidezIntercambiable: 0.6,
    basesTotales: 24.7,
    textureClass: "Franco Arcilloso",
    fragments: "Concreciones Fe-Mn 8%",
    description: "Acumulación de arcillas y óxidos",
    hasMottle: true,
    mottleColor: "#CD853F",
    hasCracks: true,
    permeability: 0.4,
    educationalPoints: [
      "Analiza el proceso de iluviación de arcillas",
      "Identifica las concreciones de hierro y manganeso",
      "Observa el cambio en la textura hacia franco arcilloso",
      "Comprende la función de acumulación de nutrientes",
    ],
    questions: [
      "¿Qué es la iluviación y cómo ocurre?",
      "¿Por qué se forman concreciones en esta capa?",
      "¿Cómo afecta la textura arcillosa al drenaje?",
    ],
    story: [
      "Entramos en el Horizonte B1, la zona de acumulación activa...",
      "Las arcillas y óxidos migran desde arriba y se depositan aquí.",
      "Los procesos de iluviación concentran minerales y nutrientes en esta capa.",
      "Las concreciones de hierro y manganeso se forman por procesos de oxidación-reducción.",
      "La estructura se vuelve más densa, pero mantiene canales para el movimiento del agua.",
      "Esta capa actúa como un reservorio de nutrientes para las plantas.",
    ],
  },
  {
    id: "B2",
    name: "Horizonte B2 (Iluviación)",
    depth: { start: 45, end: 80 },
    color: "#CD853F",
    pH: 6.5,
    acidezIntercambiable: 0.4,
    basesTotales: 31.2,
    textureClass: "Arcilloso",
    fragments: "Nódulos calcáreos 12%",
    description: "Máxima acumulación de arcillas",
    hasMottle: true,
    mottleColor: "#DEB887",
    hasCracks: false,
    permeability: 0.2,
    educationalPoints: [
      "Examina la máxima concentración de arcillas",
      "Identifica los nódulos calcáreos y su formación",
      "Observa la baja permeabilidad y sus implicaciones",
      "Comprende el papel como barrera hidráulica",
    ],
    questions: [
      "¿Por qué no hay grietas en este horizonte?",
      "¿Cómo se forman los nódulos calcáreos?",
      "¿Qué problemas puede causar la baja permeabilidad?",
    ],
    story: [
      "Llegamos al Horizonte B2, donde la acumulación alcanza su máximo...",
      "Esta es la zona de máxima concentración de arcillas iluviales.",
      "Los nódulos calcáreos se forman por precipitación de carbonatos.",
      "La permeabilidad disminuye debido a la alta concentración de arcillas.",
      "Los procesos pedogenéticos han transformado significativamente el material original.",
      "Esta capa puede actuar como una barrera para el movimiento descendente del agua.",
    ],
  },
  {
    id: "C",
    name: "Horizonte C (Material Parental)",
    depth: { start: 80, end: 120 },
    color: "#DEB887",
    pH: 7.1,
    acidezIntercambiable: 0.2,
    basesTotales: 42.8,
    textureClass: "Franco Limoso",
    fragments: "Roca meteorizada 35%",
    description: "Material parental poco alterado",
    hasMottle: false,
    hasCracks: false,
    permeability: 0.6,
    educationalPoints: [
      "Reconoce el material parental original",
      "Observa la roca meteorizada y su composición",
      "Identifica el pH más neutro comparado con horizontes superiores",
      "Comprende la base de formación de todo el perfil",
    ],
    questions: [
      "¿Cómo influye el material parental en todo el perfil?",
      "¿Por qué el pH es más alto en esta capa?",
      "¿Qué procesos de meteorización observamos?",
    ],
    story: [
      "Finalmente, alcanzamos el Horizonte C, el material parental...",
      "Aquí encontramos el material original del cual se formó el suelo.",
      "La roca meteorizada mantiene aún muchas de sus características originales.",
      "Los procesos de formación del suelo han tenido menor impacto en esta profundidad.",
      "Esta capa proporciona la base mineral para todo el perfil superior.",
      "Representa el punto de partida de la fascinante historia de formación del suelo.",
    ],
  },
]

// Configuraciones de presentación predefinidas
const presentationModes = {
  elementary: {
    name: "Educación Primaria",
    description: "Conceptos básicos y visuales",
    duration: 3000,
    showTechnicalData: false,
    simplifiedLanguage: true,
  },
  secondary: {
    name: "Educación Secundaria",
    description: "Conceptos intermedios con datos",
    duration: 4000,
    showTechnicalData: true,
    simplifiedLanguage: false,
  },
  university: {
    name: "Educación Universitaria",
    description: "Análisis completo y técnico",
    duration: 5000,
    showTechnicalData: true,
    simplifiedLanguage: false,
  },
}

// Narración de introducción
const introStory = [
  "🌱 Bienvenido al Viaje a través del Perfil del Suelo",
  "Estás a punto de explorar uno de los ecosistemas más complejos de la Tierra.",
  "Cada horizonte cuenta una historia única de formación, transformación y vida.",
  "Observa cómo cada capa tiene características distintivas y funciones específicas.",
  "Prepárate para descubrir los secretos ocultos bajo nuestros pies...",
]

export default function SoilProfile3D() {
  const [selectedHorizon, setSelectedHorizon] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState("structure")
  const [currentHorizonIndex, setCurrentHorizonIndex] = useState(-1)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false)
  const [isNarrationStarted, setIsNarrationStarted] = useState(false)

  // Estados del modo presentación
  const [isPresentationMode, setIsPresentationMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [presentationLevel, setPresentationLevel] = useState("secondary")
  const [showLaserPointer, setShowLaserPointer] = useState(false)
  const [laserPosition, setLaserPosition] = useState({ x: 0, y: 0 })
  const [annotations, setAnnotations] = useState([])
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [currentAnnotation, setCurrentAnnotation] = useState("")
  const [presentationTimer, setPresentationTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [presenterNotes, setPresenterNotes] = useState("")
  const [showStudentView, setShowStudentView] = useState(false)
  const [capturedScreenshots, setCapturedScreenshots] = useState([])

  // Timer para presentación
  useEffect(() => {
    let interval = null
    if (isTimerRunning) {
      interval = setInterval(() => {
        setPresentationTimer((timer) => timer + 1)
      }, 1000)
    } else if (!isTimerRunning && presentationTimer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, presentationTimer])

  // Control de narración automática
  useEffect(() => {
    if (!isNarrationPlaying) return

    const currentMode = presentationModes[presentationLevel]
    const timer = setInterval(() => {
      if (currentHorizonIndex === -1) {
        if (currentStoryIndex < introStory.length - 1) {
          setCurrentStoryIndex((prev) => prev + 1)
        } else {
          setCurrentHorizonIndex(0)
          setCurrentStoryIndex(0)
        }
      } else {
        const currentHorizon = soilHorizons[currentHorizonIndex]
        if (currentStoryIndex < currentHorizon.story.length - 1) {
          setCurrentStoryIndex((prev) => prev + 1)
        } else if (currentHorizonIndex < soilHorizons.length - 1) {
          setCurrentHorizonIndex((prev) => prev + 1)
          setCurrentStoryIndex(0)
        } else {
          setIsNarrationPlaying(false)
        }
      }
    }, currentMode.duration)

    return () => clearInterval(timer)
  }, [isNarrationPlaying, currentHorizonIndex, currentStoryIndex, presentationLevel])

  const startNarration = () => {
    setIsNarrationStarted(true)
    setIsNarrationPlaying(true)
    setCurrentHorizonIndex(-1)
    setCurrentStoryIndex(0)
    if (!isTimerRunning) {
      setIsTimerRunning(true)
    }
  }

  const pauseNarration = () => {
    setIsNarrationPlaying(!isNarrationPlaying)
  }

  const nextStory = () => {
    if (currentHorizonIndex === -1) {
      if (currentStoryIndex < introStory.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1)
      } else {
        setCurrentHorizonIndex(0)
        setCurrentStoryIndex(0)
      }
    } else {
      const currentHorizon = soilHorizons[currentHorizonIndex]
      if (currentStoryIndex < currentHorizon.story.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1)
      } else if (currentHorizonIndex < soilHorizons.length - 1) {
        setCurrentHorizonIndex((prev) => prev + 1)
        setCurrentStoryIndex(0)
      }
    }
  }

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1)
    } else if (currentHorizonIndex > 0) {
      setCurrentHorizonIndex((prev) => prev - 1)
      setCurrentStoryIndex(soilHorizons[currentHorizonIndex - 1].story.length - 1)
    } else if (currentHorizonIndex === 0) {
      setCurrentHorizonIndex(-1)
      setCurrentStoryIndex(introStory.length - 1)
    }
  }

  const togglePresentationMode = () => {
    setIsPresentationMode(!isPresentationMode)
    if (!isPresentationMode) {
      setIsTimerRunning(true)
      setPresentationTimer(0)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleMouseMove = (e) => {
    if (showLaserPointer) {
      setLaserPosition({ x: e.clientX, y: e.clientY })
    }
  }

  const handleCanvasClick = (e) => {
    if (isAnnotating) {
      const rect = e.target.getBoundingClientRect()
      const newAnnotation = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        text: currentAnnotation || "Punto de interés",
        timestamp: new Date().toLocaleTimeString(),
      }
      setAnnotations([...annotations, newAnnotation])
      setCurrentAnnotation("")
    }
  }

  const clearAnnotations = () => {
    setAnnotations([])
  }

  const captureScreenshot = () => {
    // Simulación de captura de pantalla
    const screenshot = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      horizon: currentHorizonIndex >= 0 ? soilHorizons[currentHorizonIndex].name : "Vista general",
      annotations: annotations.length,
    }
    setCapturedScreenshots([...capturedScreenshots, screenshot])
  }

  const exportPresentationData = () => {
    const data = {
      presentationLevel,
      duration: presentationTimer,
      screenshots: capturedScreenshots,
      annotations,
      notes: presenterNotes,
      timestamp: new Date().toLocaleString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `soil-profile-presentation-${Date.now()}.json`
    a.click()
  }

  const getCurrentStoryText = () => {
    if (currentHorizonIndex === -1) {
      return introStory[currentStoryIndex]
    } else {
      return soilHorizons[currentHorizonIndex].story[currentStoryIndex]
    }
  }

  const getCurrentHorizonName = () => {
    if (currentHorizonIndex === -1) {
      return "Introducción al Perfil del Suelo"
    } else {
      return soilHorizons[currentHorizonIndex].name
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-200 to-green-100 relative" onMouseMove={handleMouseMove}>
      {/* Barra de herramientas del presentador */}
      {isPresentationMode && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
          <Card className="bg-black/80 text-white border-gray-600">
            <CardContent className="p-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-600 text-white">
                  🔴 PRESENTANDO
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Timer className="w-4 h-4" />
                  {formatTime(presentationTimer)}
                </div>
                <Separator orientation="vertical" className="h-6" />
                <Button size="sm" variant="ghost" onClick={() => setShowLaserPointer(!showLaserPointer)}>
                  <MousePointer className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsAnnotating(!isAnnotating)}>
                  <PenTool className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={clearAnnotations}>
                  <Eraser className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={captureScreenshot}>
                  <Camera className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={togglePresentationMode}>
                  ✕
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Puntero láser */}
      {showLaserPointer && (
        <div
          className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-30 animate-pulse"
          style={{
            left: laserPosition.x - 8,
            top: laserPosition.y - 8,
            boxShadow: "0 0 20px #ff0000",
          }}
        />
      )}

      {/* Anotaciones */}
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          className="absolute z-25 pointer-events-none"
          style={{ left: annotation.x, top: annotation.y }}
        >
          <div className="bg-yellow-400 text-black p-2 rounded-lg shadow-lg text-sm max-w-48">
            <div className="font-semibold">{annotation.text}</div>
            <div className="text-xs opacity-70">{annotation.timestamp}</div>
          </div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400 mx-auto" />
        </div>
      ))}

      {/* Panel principal de control */}
      <div className="absolute top-4 left-4 z-10">
        <Card className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-80"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              {!isCollapsed && (
                <>
                  🌱 Perfil de Suelo 3D
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={viewMode === "structure" ? "default" : "outline"}
                      onClick={() => setViewMode("structure")}
                      title="Vista de estructura"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "infiltration" ? "default" : "outline"}
                      onClick={() => setViewMode("infiltration")}
                      title="Vista de infiltración"
                    >
                      <Droplets className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
              <Button size="sm" variant="ghost" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          {!isCollapsed && (
            <CardContent>
              <div className="space-y-4">
                {/* Herramientas de presentación */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Presentation className="w-4 h-4" />
                    Herramientas Educativas
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={isPresentationMode ? "default" : "outline"}
                      onClick={togglePresentationMode}
                      className="text-xs"
                    >
                      <GraduationCap className="w-3 h-3 mr-1" />
                      Modo Profesor
                    </Button>
                    <Button
                      size="sm"
                      variant={showStudentView ? "default" : "outline"}
                      onClick={() => setShowStudentView(!showStudentView)}
                      className="text-xs"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Vista Estudiante
                    </Button>
                  </div>

                  {/* Configuración de nivel educativo */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Nivel Educativo:</label>
                    <select
                      value={presentationLevel}
                      onChange={(e) => setPresentationLevel(e.target.value)}
                      className="w-full p-1 text-xs border rounded"
                    >
                      {Object.entries(presentationModes).map(([key, mode]) => (
                        <option key={key} value={key}>
                          {mode.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Separator />

                {/* Controles de narración */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Narración Interactiva</h4>
                  <div className="flex gap-1">
                    {!isNarrationStarted ? (
                      <Button size="sm" onClick={startNarration} className="flex-1">
                        <Play className="w-4 h-4 mr-1" />
                        Iniciar Historia
                      </Button>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={prevStory}>
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button size="sm" onClick={pauseNarration} className="flex-1">
                          {isNarrationPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                          {isNarrationPlaying ? "Pausar" : "Continuar"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={nextStory}>
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Herramientas de exportación */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Exportar Datos
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={exportPresentationData}
                      className="text-xs bg-transparent"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Reporte
                    </Button>
                    <Button size="sm" variant="outline" onClick={captureScreenshot} className="text-xs bg-transparent">
                      <Camera className="w-3 h-3 mr-1" />
                      Captura
                    </Button>
                  </div>
                  {capturedScreenshots.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {capturedScreenshots.length} capturas guardadas
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  {soilHorizons.map((horizon, index) => (
                    <div
                      key={horizon.id}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-muted ${
                        currentHorizonIndex === index ? "bg-blue-100 border border-blue-300" : ""
                      }`}
                      onClick={() => setSelectedHorizon(horizon)}
                    >
                      <div className="w-4 h-4 rounded border" style={{ backgroundColor: horizon.color }} />
                      <span className="text-sm font-medium">{horizon.id}</span>
                      <span className="text-xs text-muted-foreground">
                        {horizon.depth.start}-{horizon.depth.end} cm
                      </span>
                      {viewMode === "infiltration" && (
                        <div className="ml-auto">
                          <Badge variant="secondary" className="text-xs">
                            {(horizon.permeability * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Panel de notas del presentador */}
      {isPresentationMode && !showStudentView && (
        <div className="absolute top-4 right-4 z-10">
          <Card className="w-80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notas del Presentador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                placeholder="Escribe tus notas aquí..."
                value={presenterNotes}
                onChange={(e) => setPresenterNotes(e.target.value)}
                className="text-sm h-20"
              />

              {currentHorizonIndex >= 0 && (
                <div className="space-y-2">
                  <h5 className="font-semibold text-xs">Puntos Clave:</h5>
                  <ul className="text-xs space-y-1">
                    {soilHorizons[currentHorizonIndex].educationalPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <h5 className="font-semibold text-xs">Preguntas Sugeridas:</h5>
                  <ul className="text-xs space-y-1">
                    {soilHorizons[currentHorizonIndex].questions.map((question, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-green-500">?</span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isAnnotating && (
                <div className="space-y-2">
                  <Input
                    placeholder="Texto de anotación..."
                    value={currentAnnotation}
                    onChange={(e) => setCurrentAnnotation(e.target.value)}
                    className="text-xs"
                  />
                  <p className="text-xs text-muted-foreground">Haz clic en el modelo 3D para agregar anotaciones</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Panel de narración */}
      {isNarrationStarted && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{getCurrentHorizonName()}</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        currentHorizonIndex === -1
                          ? ((currentStoryIndex + 1) / introStory.length) * 100
                          : currentHorizonIndex * 20 +
                            ((currentStoryIndex + 1) / soilHorizons[currentHorizonIndex].story.length) * 20
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {currentHorizonIndex === -1 ? "Intro" : `Horizonte ${soilHorizons[currentHorizonIndex].id}`}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{getCurrentStoryText()}</p>

              {/* Información técnica según el nivel educativo */}
              {presentationModes[presentationLevel].showTechnicalData && currentHorizonIndex >= 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">pH:</span> {soilHorizons[currentHorizonIndex].pH}
                    </div>
                    <div>
                      <span className="font-semibold">Textura:</span> {soilHorizons[currentHorizonIndex].textureClass}
                    </div>
                    <div>
                      <span className="font-semibold">Permeabilidad:</span>{" "}
                      {(soilHorizons[currentHorizonIndex].permeability * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {selectedHorizon && !showStudentView && (
        <div className="absolute top-4 right-4 z-10" style={{ right: isPresentationMode ? "340px" : "16px" }}>
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {selectedHorizon.name}
                <Button size="sm" variant="ghost" onClick={() => setSelectedHorizon(null)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  Profundidad: {selectedHorizon.depth.start}-{selectedHorizon.depth.end} cm
                </Badge>
                <p className="text-sm text-muted-foreground">{selectedHorizon.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Propiedades Químicas</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>pH:</span>
                      <span className="font-mono">{selectedHorizon.pH}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acidez Int.:</span>
                      <span className="font-mono">{selectedHorizon.acidezIntercambiable} cmol/kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bases Totales:</span>
                      <span className="font-mono">{selectedHorizon.basesTotales} cmol/kg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Propiedades Físicas</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">Clase Textural:</span>
                      <br />
                      <Badge variant="secondary" className="text-xs">
                        {selectedHorizon.textureClass}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium">Permeabilidad:</span>
                      <br />
                      <Badge variant="outline" className="text-xs">
                        {(selectedHorizon.permeability * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-sm mb-2">Características Estructurales</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedHorizon.hasMottle && (
                    <Badge variant="outline" className="text-xs">
                      🎨 Moteado
                    </Badge>
                  )}
                  {selectedHorizon.hasCracks && (
                    <Badge variant="outline" className="text-xs">
                      🔲 Grietas
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {selectedHorizon.fragments}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Canvas camera={{ position: [5, 2, 5], fov: 60 }} onClick={handleCanvasClick}>
        <Suspense fallback={null}>
          {viewMode === "structure" ? (
            <SoilStructureScene
              horizons={soilHorizons}
              onHorizonClick={setSelectedHorizon}
              currentHorizonIndex={currentHorizonIndex}
              isNarrationPlaying={isNarrationPlaying}
            />
          ) : (
            <WaterInfiltrationScene
              horizons={soilHorizons}
              onHorizonClick={setSelectedHorizon}
              currentHorizonIndex={currentHorizonIndex}
              isNarrationPlaying={isNarrationPlaying}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

function SoilStructureScene({ horizons, onHorizonClick, currentHorizonIndex, isNarrationPlaying }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current && isNarrationPlaying) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Etiquetas estáticas */}
      <DepthLabels horizons={horizons} />
      <HorizonLabels horizons={horizons} onHorizonClick={onHorizonClick} currentHorizonIndex={currentHorizonIndex} />

      {/* Perfil del suelo con rotación durante narración */}
      <group ref={groupRef}>
        {horizons.map((horizon, index) => (
          <SoilHorizonWithStructure key={horizon.id} horizon={horizon} isHighlighted={currentHorizonIndex === index} />
        ))}
      </group>

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={!isNarrationPlaying} />

      {/* Plano de referencia */}
      <mesh position={[0, -6.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshLambertMaterial color="#90EE90" opacity={0.3} transparent />
      </mesh>
    </>
  )
}

function WaterInfiltrationScene({ horizons, onHorizonClick, currentHorizonIndex, isNarrationPlaying }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current && isNarrationPlaying) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Etiquetas estáticas */}
      <DepthLabels horizons={horizons} />
      <HorizonLabels horizons={horizons} onHorizonClick={onHorizonClick} currentHorizonIndex={currentHorizonIndex} />

      {/* Perfil con simulación de agua */}
      <group ref={groupRef}>
        {horizons.map((horizon, index) => (
          <SoilHorizonWithWater key={horizon.id} horizon={horizon} isHighlighted={currentHorizonIndex === index} />
        ))}
      </group>

      {/* Partículas de lluvia */}
      <RainParticles />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={!isNarrationPlaying} />

      {/* Plano de referencia */}
      <mesh position={[0, -6.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshLambertMaterial color="#90EE90" opacity={0.3} transparent />
      </mesh>
    </>
  )
}

function SoilHorizonWithStructure({ horizon, isHighlighted }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const thickness = (horizon.depth.end - horizon.depth.start) / 10
  const yPosition = -(horizon.depth.start + horizon.depth.end) / 20

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered || isHighlighted ? 1.05 : 1
      meshRef.current.scale.setScalar(scale)

      // Efecto de brillo para el horizonte destacado
      if (isHighlighted) {
        meshRef.current.material.emissive.setHex(0x222222)
      } else {
        meshRef.current.material.emissive.setHex(0x000000)
      }
    }
  })

  return (
    <group>
      {/* Cilindro principal */}
      <mesh
        ref={meshRef}
        position={[0, yPosition, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[1.5, 1.5, thickness, 32]} />
        <meshLambertMaterial color={horizon.color} transparent opacity={0.8} />
      </mesh>

      {/* Moteado - manchas de colores diferentes como parches planos */}
      {horizon.hasMottle && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh
              key={`mottle-${i}`}
              position={[
                (Math.random() - 0.5) * 2.6,
                yPosition + (Math.random() - 0.5) * thickness,
                (Math.random() - 0.5) * 2.6,
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <planeGeometry args={[0.15 + Math.random() * 0.1, 0.1 + Math.random() * 0.08]} />
              <meshLambertMaterial color={horizon.mottleColor} transparent opacity={0.8} side={2} />
            </mesh>
          ))}
          {/* Manchas adicionales más pequeñas */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={`mottle-small-${i}`}
              position={[
                (Math.random() - 0.5) * 2.8,
                yPosition + (Math.random() - 0.5) * thickness,
                (Math.random() - 0.5) * 2.8,
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <circleGeometry args={[0.05 + Math.random() * 0.03, 8]} />
              <meshLambertMaterial color={horizon.mottleColor} transparent opacity={0.9} side={2} />
            </mesh>
          ))}
        </>
      )}

      {/* Grietas - líneas verticales */}
      {horizon.hasCracks && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh
              key={`crack-${i}`}
              position={[Math.cos((i * Math.PI * 2) / 6) * 1.4, yPosition, Math.sin((i * Math.PI * 2) / 6) * 1.4]}
              rotation={[0, (i * Math.PI * 2) / 6, 0]}
            >
              <boxGeometry args={[0.02, thickness, 0.1]} />
              <meshLambertMaterial color="#1a1a1a" />
            </mesh>
          ))}
        </>
      )}

      {/* Fragmentos rocosos */}
      {horizon.fragments.includes("rocosos") && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={`fragment-${i}`}
              position={[
                (Math.random() - 0.5) * 2.5,
                yPosition + (Math.random() - 0.5) * thickness,
                (Math.random() - 0.5) * 2.5,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshLambertMaterial color="#666666" />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}

function SoilHorizonWithWater({ horizon, isHighlighted }) {
  const meshRef = useRef()
  const waterRef = useRef()
  const [hovered, setHovered] = useState(false)

  const thickness = (horizon.depth.end - horizon.depth.start) / 10
  const yPosition = -(horizon.depth.start + horizon.depth.end) / 20

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered || isHighlighted ? 1.05 : 1
      meshRef.current.scale.setScalar(scale)

      if (isHighlighted) {
        meshRef.current.material.emissive.setHex(0x222222)
      } else {
        meshRef.current.material.emissive.setHex(0x000000)
      }
    }

    // Animación del agua
    if (waterRef.current) {
      waterRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group>
      {/* Cilindro principal */}
      <mesh
        ref={meshRef}
        position={[0, yPosition, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[1.5, 1.5, thickness, 32]} />
        <meshLambertMaterial color={horizon.color} transparent opacity={0.7} />
      </mesh>

      {/* Agua infiltrándose */}
      <mesh ref={waterRef} position={[0, yPosition, 0]}>
        <cylinderGeometry args={[1.4, 1.4, thickness * 0.8, 32]} />
        <meshLambertMaterial color="#4A90E2" transparent opacity={horizon.permeability * 0.4} />
      </mesh>

      {/* Gotas de agua cayendo */}
      {Array.from({ length: Math.floor(horizon.permeability * 10) }).map((_, i) => (
        <WaterDrop
          key={`drop-${i}`}
          position={[(Math.random() - 0.5) * 2.5, yPosition + thickness / 2, (Math.random() - 0.5) * 2.5]}
          speed={horizon.permeability}
        />
      ))}
    </group>
  )
}

function WaterDrop({ position, speed }) {
  const dropRef = useRef()

  useFrame((state, delta) => {
    if (dropRef.current) {
      dropRef.current.position.y -= delta * speed * 2
      if (dropRef.current.position.y < -6) {
        dropRef.current.position.y = position[1]
      }
    }
  })

  return (
    <mesh ref={dropRef} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshLambertMaterial color="#4A90E2" transparent opacity={0.8} />
    </mesh>
  )
}

function RainParticles() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <RainDrop key={i} />
      ))}
    </>
  )
}

function RainDrop() {
  const dropRef = useRef()
  const startX = (Math.random() - 0.5) * 10
  const startZ = (Math.random() - 0.5) * 10

  useFrame((state, delta) => {
    if (dropRef.current) {
      dropRef.current.position.y -= delta * 3
      if (dropRef.current.position.y < -1) {
        dropRef.current.position.y = 8
        dropRef.current.position.x = startX
        dropRef.current.position.z = startZ
      }
    }
  })

  return (
    <mesh ref={dropRef} position={[startX, 8, startZ]}>
      <sphereGeometry args={[0.01, 4, 4]} />
      <meshLambertMaterial color="#87CEEB" transparent opacity={0.6} />
    </mesh>
  )
}

function HorizonLabels({ horizons, onHorizonClick, currentHorizonIndex }) {
  return (
    <>
      {horizons.map((horizon, index) => {
        const yPosition = -(horizon.depth.start + horizon.depth.end) / 20
        const isHighlighted = currentHorizonIndex === index
        return (
          <Html key={`label-${horizon.id}`} position={[2.2, yPosition, 0]}>
            <div
              className={`px-3 py-1 rounded-lg shadow-lg text-sm font-bold cursor-pointer border transition-all duration-300 ${
                isHighlighted
                  ? "bg-blue-100 border-blue-400 text-blue-800 scale-110"
                  : "bg-white/95 border-gray-200 hover:bg-blue-50"
              }`}
              onClick={() => onHorizonClick(horizon)}
            >
              {horizon.id}
            </div>
          </Html>
        )
      })}
    </>
  )
}

function DepthLabels({ horizons }) {
  return (
    <>
      {horizons.map((horizon) => (
        <group key={`depth-${horizon.id}`}>
          <Text position={[-2.5, -horizon.depth.start / 10, 0]} fontSize={0.15} color="#333" anchorX="right">
            {horizon.depth.start} cm
          </Text>
          <Text position={[-2.5, -horizon.depth.end / 10, 0]} fontSize={0.15} color="#333" anchorX="right">
            {horizon.depth.end} cm
          </Text>
        </group>
      ))}
    </>
  )
}
