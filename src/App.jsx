import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SoilProfile3DScene } from './components/SoilProfile3D'
import { SoilDashboard } from './components/SoilDashboard'
import { NarrationPanelSidebar } from './components/NarrationPanel'
import { soilHorizons, introStory } from './data/soilData'
import './App.css'

function App() {
  const [selectedHorizon, setSelectedHorizon] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState("structure")
  const [currentHorizonIndex, setCurrentHorizonIndex] = useState(-1) // -1 para intro
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false)
  const [isNarrationStarted, setIsNarrationStarted] = useState(false)

  // Control de narración automática
  useEffect(() => {
    if (!isNarrationPlaying) return

    const timer = setInterval(() => {
      if (currentHorizonIndex === -1) {
        // Narración de introducción
        if (currentStoryIndex < introStory.length - 1) {
          setCurrentStoryIndex((prev) => prev + 1)
        } else {
          // Pasar al primer horizonte
          setCurrentHorizonIndex(0)
          setCurrentStoryIndex(0)
          setSelectedHorizon(soilHorizons[0])
        }
      } else {
        // Narración de horizontes
        const currentHorizon = soilHorizons[currentHorizonIndex]
        if (currentStoryIndex < currentHorizon.story.length - 1) {
          setCurrentStoryIndex((prev) => prev + 1)
        } else if (currentHorizonIndex < soilHorizons.length - 1) {
          // Pasar al siguiente horizonte
          const nextIndex = currentHorizonIndex + 1
          setCurrentHorizonIndex(nextIndex)
          setCurrentStoryIndex(0)
          setSelectedHorizon(soilHorizons[nextIndex])
        } else {
          // Fin de la narración
          setIsNarrationPlaying(false)
        }
      }
    }, 5000) // Cambiar cada 5 segundos

    return () => clearInterval(timer)
  }, [isNarrationPlaying, currentHorizonIndex, currentStoryIndex])

  const startNarration = () => {
    setIsNarrationStarted(true)
    setIsNarrationPlaying(true)
    setCurrentHorizonIndex(-1)
    setCurrentStoryIndex(0)
    setSelectedHorizon(null)
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
        setSelectedHorizon(soilHorizons[0])
      }
    } else {
      const currentHorizon = soilHorizons[currentHorizonIndex]
      if (currentStoryIndex < currentHorizon.story.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1)
      } else if (currentHorizonIndex < soilHorizons.length - 1) {
        const nextIndex = currentHorizonIndex + 1
        setCurrentHorizonIndex(nextIndex)
        setCurrentStoryIndex(0)
        setSelectedHorizon(soilHorizons[nextIndex])
      }
    }
  }

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1)
    } else if (currentHorizonIndex > 0) {
      const prevIndex = currentHorizonIndex - 1
      setCurrentHorizonIndex(prevIndex)
      setCurrentStoryIndex(soilHorizons[prevIndex].story.length - 1)
      setSelectedHorizon(soilHorizons[prevIndex])
    } else if (currentHorizonIndex === 0) {
      setCurrentHorizonIndex(-1)
      setCurrentStoryIndex(introStory.length - 1)
      setSelectedHorizon(null)
    }
  }

  const handleHorizonSelect = (horizon) => {
    setSelectedHorizon(horizon)
    // Si hay narración activa, sincronizar con la selección
    if (isNarrationStarted) {
      const horizonIndex = soilHorizons.findIndex(h => h.id === horizon.id)
      if (horizonIndex !== -1) {
        setCurrentHorizonIndex(horizonIndex)
        setCurrentStoryIndex(0)
      }
    }
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Nuevo fondo más sofisticado */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 200, 120, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(120, 200, 120, 0.3) 0%, transparent 50%),
             linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)`,
            `radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(120, 200, 120, 0.3) 0%, transparent 50%),
             linear-gradient(135deg, #533483 0%, #0f3460 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)`,
            `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(120, 200, 120, 0.3) 0%, transparent 50%),
             linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)`
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Partículas flotantes mejoradas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Layout principal con grid */}
      <div className="w-full h-full grid grid-cols-12 gap-4 p-4 relative z-10">
        
        {/* Panel de narración lateral izquierdo */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Dashboard compacto */}
          <SoilDashboard
            soilHorizons={soilHorizons}
            selectedHorizon={selectedHorizon}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          />
          
          {/* Panel de narración lateral */}
          <div className="flex-1">
            <NarrationPanelSidebar
              soilHorizons={soilHorizons}
              introStory={introStory}
              currentHorizonIndex={currentHorizonIndex}
              currentStoryIndex={currentStoryIndex}
              isNarrationPlaying={isNarrationPlaying}
              isNarrationStarted={isNarrationStarted}
              onStartNarration={startNarration}
              onPauseNarration={pauseNarration}
              onNextStory={nextStory}
              onPrevStory={prevStory}
            />
          </div>
        </div>

        {/* Vista 3D centrada */}
        <div className="col-span-9 relative">
          <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <SoilProfile3DScene
              soilHorizons={soilHorizons}
              selectedHorizon={selectedHorizon}
              onHorizonSelect={handleHorizonSelect}
              viewMode={viewMode}
              currentHorizonIndex={currentHorizonIndex}
            />
          </div>
          
          {/* Título flotante */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-4 right-4 z-40"
          >
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/10">
              <h1 className="text-2xl font-bold text-white">
                Perfil de Suelo Profesional
              </h1>
              <p className="text-gray-200 mt-1 text-sm">Análisis Edafológico Avanzado</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-500/30">
                  Científico
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                  Interactivo
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                  3D
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Botón de inicio de narración centrado */}
      {!isNarrationStarted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <button
            onClick={startNarration}
            className="bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">▶</div>
              Iniciar Experiencia Interactiva
            </div>
          </button>
        </motion.div>
      )}

      {/* Indicadores de carga */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
          />
          <p className="text-xl font-semibold text-white">Cargando experiencia 3D...</p>
          <p className="text-gray-300 mt-2">Preparando análisis edafológico</p>
        </div>
      </motion.div>
    </div>
  )
}

export default App

