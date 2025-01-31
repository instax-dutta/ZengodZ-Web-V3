"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Manrope } from "next/font/google"
import Image from "next/image"

const manrope = Manrope({ subsets: ["latin"] })

function SpinningLogo() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#5865F2" />
      </mesh>
      <mesh position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#99AAB5" />
      </mesh>
      <mesh position={[-0.5, -0.5, -0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#2C2F33" />
      </mesh>
    </group>
  )
}

function AnimatedBox({ initialPosition }: { initialPosition: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...initialPosition))
  const currentPosition = useRef(new THREE.Vector3(...initialPosition))

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    return new THREE.Vector3(current.x + randomDirection[0] * 3, 0.5, current.z + randomDirection[1] * 3)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current)
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x))
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z))
      setTargetPosition(newPosition)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetPosition, currentPosition]) // Added dependencies

  useFrame((state, delta) => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.1)
      meshRef.current.position.copy(currentPosition.current)
    }
  })

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial attach="material" color="#00ff00" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
  ]

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={[0, 1, 0]}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  )
}

export default function Component() {
  return (
    <div className={`relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden ${manrope.className}`}>
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,0,0.1)_50%,transparent_75%)] bg-[length:10px_10px] animate-[gradient_2s_linear_infinite]"></div>

      <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-captivating-3d-render-of-the-zengodz-esports-log-ar8Ji9N7QaOMTC4it0otCA-GqPHmfd3RTKMT8NEJpMP1Q-removebg-preview%20(1)-IcAwxyRJVRnGd4wkWnN2oW5hjkdxcC.png"
                  alt="ZengodZ Esports Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                ZengodZ Esports
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-pulse">
            Welcome to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              ZengodZ Esports
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8">Where Gamers Become Legends</p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <a
              href="https://discord.gg/XJy7bAYN8r"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-lg rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(88,101,242,0.5)]"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Join our Discord
            </a>
          </div>
        </div>
      </main>

      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [30, 30, 30], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Gaming-style decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
    </div>
  )
}

