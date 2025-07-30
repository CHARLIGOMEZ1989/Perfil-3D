import { useRef, useState, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment, ContactShadows } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"

// Componente 3D del horizonte del suelo mejorado
function SoilHorizon({ horizon, position, isSelected, isHighlighted, viewMode, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Animación sutil de respiración
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.01)
      
      // Efecto de hover
      if (hovered || isSelected) {
        meshRef.current.material.emissive.setHex(0x222222)
      } else {
        meshRef.current.material.emissive.setHex(0x000000)
      }
    }
  })

  const height = (horizon.depth.end - horizon.depth.start) * 0.1
  const yPosition = position[1] - height / 2

  // Crear textura procedural para el suelo
  const createSoilTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // Color base del horizonte
    ctx.fillStyle = horizon.color
    ctx.fillRect(0, 0, 512, 512)
    
    // Añadir ruido para textura realista
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const size = Math.random() * 3 + 1
      const opacity = Math.random() * 0.3
      
      ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 50}, ${Math.random() * 30}, ${opacity})`
      ctx.fillRect(x, y, size, size)
    }
    
    // Añadir grietas si corresponde
    if (horizon.hasCracks) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.lineWidth = 2
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * 512, 0)
        ctx.lineTo(Math.random() * 512, 512)
        ctx.stroke()
      }
    }
    
    // Añadir moteado si corresponde
    if (horizon.hasMottle) {
      ctx.fillStyle = horizon.mottleColor || '#8B4513'
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * 512
        const y = Math.random() * 512
        const radius = Math.random() * 10 + 5
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    return new THREE.CanvasTexture(canvas)
  }

  const texture = createSoilTexture()
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 1)

  return (
    <group position={[position[0], yPosition, position[2]]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8, height, 6]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.1}
          transparent={viewMode === "infiltration"}
          opacity={viewMode === "infiltration" ? horizon.permeability : 1}
        />
      </mesh>
      
      {/* Etiqueta del horizonte */}
      <Html position={[4.5, 0, 0]} distanceFactor={10}>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-lg border">
          <span className="font-bold text-sm">{horizon.id}</span>
        </div>
      </Html>
      
      {/* Partículas de agua para modo infiltración */}
      {viewMode === "infiltration" && (
        <WaterParticles permeability={horizon.permeability} position={[0, height/2, 0]} />
      )}
    </group>
  )
}

// Componente de partículas de agua
function WaterParticles({ permeability, position }) {
  const particlesRef = useRef()
  const particleCount = Math.floor(permeability * 50)
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] -= permeability * 0.02 // Velocidad de caída
        
        // Reiniciar partículas que han caído
        if (positions[i3 + 1] < -2) {
          positions[i3 + 1] = 2
          positions[i3] = (Math.random() - 0.5) * 8
          positions[i3 + 2] = (Math.random() - 0.5) * 6
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = Math.random() * 4
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6
  }

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4FC3F7" transparent opacity={0.8} />
    </points>
  )
}

// Componente principal de la escena 3D
export function SoilProfile3DScene({ 
  soilHorizons, 
  selectedHorizon, 
  onHorizonSelect, 
  viewMode, 
  currentHorizonIndex 
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [15, 8, 15], fov: 45 }}
        shadows
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          {/* Iluminación profesional mejorada */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[15, 15, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4FC3F7" />
          <pointLight position={[10, 10, 10]} intensity={0.3} color="#FFA726" />
          
          {/* Entorno y atmósfera mejorados */}
          <Environment preset="city" />
          <fog attach="fog" args={['#1a1a2e', 25, 60]} />
          
          {/* Horizontes del suelo con mejor posicionamiento */}
          <group position={[0, 0, 0]}>
            {soilHorizons.map((horizon, index) => {
              const yPos = -soilHorizons
                .slice(0, index)
                .reduce((acc, h) => acc + (h.depth.end - h.depth.start), 0) * 0.08
              
              return (
                <SoilHorizon
                  key={horizon.id}
                  horizon={horizon}
                  position={[0, yPos, 0]}
                  isSelected={selectedHorizon?.id === horizon.id}
                  isHighlighted={currentHorizonIndex === index}
                  viewMode={viewMode}
                  onClick={() => onHorizonSelect(horizon)}
                />
              )
            })}
          </group>
          
          {/* Superficie del suelo mejorada */}
          <mesh position={[0, 1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[25, 25]} />
            <meshStandardMaterial 
              color="#2E7D32" 
              transparent 
              opacity={0.4}
              roughness={0.8}
            />
          </mesh>
          
          {/* Plano base para sombras */}
          <mesh position={[0, -8, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial 
              color="#0f0f23" 
              transparent 
              opacity={0.6}
            />
          </mesh>
          
          {/* Sombras de contacto mejoradas */}
          <ContactShadows
            position={[0, -7.5, 0]}
            opacity={0.6}
            scale={20}
            blur={3}
            far={8}
            color="#000000"
          />
          
          {/* Controles de órbita mejorados */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

