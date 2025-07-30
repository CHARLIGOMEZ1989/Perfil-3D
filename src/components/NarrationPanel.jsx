import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function NarrationPanel({
  soilHorizons,
  introStory,
  currentHorizonIndex,
  currentStoryIndex,
  isNarrationPlaying,
  isNarrationStarted,
  onStartNarration,
  onPauseNarration,
  onNextStory,
  onPrevStory,
}) {
  const [isMuted, setIsMuted] = useState(false)

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

  const getProgress = () => {
    if (currentHorizonIndex === -1) {
      return ((currentStoryIndex + 1) / introStory.length) * 100
    } else {
      const totalStories = introStory.length + soilHorizons.reduce((acc, h) => acc + h.story.length, 0)
      const currentPosition = introStory.length + 
        soilHorizons.slice(0, currentHorizonIndex).reduce((acc, h) => acc + h.story.length, 0) + 
        currentStoryIndex + 1
      return (currentPosition / totalStories) * 100
    }
  }

  const getCurrentSection = () => {
    if (currentHorizonIndex === -1) {
      return "Introducción"
    } else {
      return `Horizonte ${soilHorizons[currentHorizonIndex].id}`
    }
  }

  return (
    <AnimatePresence>
      {isNarrationStarted && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 z-50"
        >
          <EnhancedCard 
            className="max-w-4xl mx-auto"
            gradient
            glowEffect
          >
            <div className="space-y-4">
              {/* Header con título y progreso */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <motion.h3 
                    key={getCurrentHorizonName()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    {getCurrentHorizonName()}
                  </motion.h3>
                  <Badge variant="secondary" className="text-sm">
                    {getCurrentSection()}
                  </Badge>
                </div>
                
                {/* Barra de progreso */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Progreso de la narración</span>
                    <span>{Math.round(getProgress())}%</span>
                  </div>
                  <Progress value={getProgress()} className="h-2" />
                </div>
              </div>

              {/* Contenido de la historia */}
              <motion.div
                key={`${currentHorizonIndex}-${currentStoryIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-[80px] flex items-center"
              >
                <p className="text-lg leading-relaxed text-gray-700">
                  {getCurrentStoryText()}
                </p>
              </motion.div>

              {/* Controles de reproducción */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onPrevStory}
                    disabled={currentHorizonIndex === -1 && currentStoryIndex === 0}
                    className="hover:bg-blue-50"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={onPauseNarration}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
                  >
                    {isNarrationPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continuar
                      </>
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onNextStory}
                    className="hover:bg-blue-50"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:bg-gray-100"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {currentStoryIndex + 1} / {
                      currentHorizonIndex === -1 
                        ? introStory.length 
                        : soilHorizons[currentHorizonIndex].story.length
                    }
                  </div>
                </div>
              </div>
            </div>
          </EnhancedCard>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function NarrationPanelSidebar({
  soilHorizons,
  introStory,
  currentHorizonIndex,
  currentStoryIndex,
  isNarrationPlaying,
  isNarrationStarted,
  onStartNarration,
  onPauseNarration,
  onNextStory,
  onPrevStory,
}) {
  const [isMuted, setIsMuted] = useState(false)

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

  const getProgress = () => {
    if (currentHorizonIndex === -1) {
      return ((currentStoryIndex + 1) / introStory.length) * 100
    } else {
      const totalStories = introStory.length + soilHorizons.reduce((acc, h) => acc + h.story.length, 0)
      const currentPosition = introStory.length + 
        soilHorizons.slice(0, currentHorizonIndex).reduce((acc, h) => acc + h.story.length, 0) + 
        currentStoryIndex + 1
      return (currentPosition / totalStories) * 100
    }
  }

  const getCurrentSection = () => {
    if (currentHorizonIndex === -1) {
      return "Introducción"
    } else {
      return `Horizonte ${soilHorizons[currentHorizonIndex].id}`
    }
  }

  if (!isNarrationStarted) {
    return (
      <EnhancedCard 
        className="h-full flex items-center justify-center"
        gradient
        glowEffect
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Narración Interactiva</h3>
          <p className="text-gray-300 text-sm mb-4">
            Descubre la historia fascinante de cada horizonte del suelo
          </p>
          <Button
            onClick={onStartNarration}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Comenzar Historia
          </Button>
        </div>
      </EnhancedCard>
    )
  }

  return (
    <EnhancedCard 
      className="h-full flex flex-col"
      gradient
      glowEffect
    >
      <div className="p-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <motion.h3 
            key={getCurrentHorizonName()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold text-white mb-2"
          >
            {getCurrentHorizonName()}
          </motion.h3>
          <Badge variant="secondary" className="text-xs mb-3">
            {getCurrentSection()}
          </Badge>
          
          {/* Barra de progreso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>Progreso</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="h-1" />
          </div>
        </div>

        {/* Contenido de la historia */}
        <div className="flex-1 mb-4">
          <motion.div
            key={`${currentHorizonIndex}-${currentStoryIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-black/20 backdrop-blur-sm rounded-lg p-4 h-full overflow-y-auto"
          >
            <p className="text-gray-200 text-sm leading-relaxed">
              {getCurrentStoryText()}
            </p>
          </motion.div>
        </div>

        {/* Controles de reproducción */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={onPrevStory}
                disabled={currentHorizonIndex === -1 && currentStoryIndex === 0}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <SkipBack className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                onClick={onPauseNarration}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4"
              >
                {isNarrationPlaying ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={onNextStory}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <SkipForward className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/10"
              >
                {isMuted ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </Button>
              
              <div className="text-xs text-gray-300">
                {currentStoryIndex + 1} / {
                  currentHorizonIndex === -1 
                    ? introStory.length 
                    : soilHorizons[currentHorizonIndex].story.length
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </EnhancedCard>
  )
}

