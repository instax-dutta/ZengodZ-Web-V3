"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { useEffect, useRef, useState, useCallback } from "react"
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
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[-0.5, -0.5, -0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
    </group>
  )
}

function AnimatedBox({ initialPosition }: { initialPosition: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...initialPosition))
  const currentPosition = useRef(new THREE.Vector3(...initialPosition))

  const getAdjacentIntersection = useCallback((current: THREE.Vector3) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    return new THREE.Vector3(current.x + randomDirection[0] * 3, 0.5, current.z + randomDirection[1] * 3)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current)
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x))
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z))
      setTargetPosition(newPosition)
    }, 1000)

    return () => clearInterval(interval)
  }, [getAdjacentIntersection])

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
        <lineBasicMaterial attach="material" color="#000000" linewidth={2} />
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
        sectionColor={[0.5, 0.5, 0.5]}
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
    <div
      className={`relative w-full min-h-screen bg-black text-white overflow-hidden ${manrope.className} flex flex-col justify-between`}
    >
      <header className="absolute top-0 left-0 right-0 z-10 p-4 lg:p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-captivating-3d-render-of-the-zengodz-esports-log-ar8Ji9N7QaOMTC4it0otCA-GqPHmfd3RTKMT8NEJpMP1Q-removebg-preview%20(1)-IcAwxyRJVRnGd4wkWnN2oW5hjkdxcC.png"
              alt="ZenGodZ Esports Logo"
              width={60}
              height={60}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <span className="text-xl sm:text-2xl font-bold">ZenGodZ Esports</span>
          </div>
        </nav>
      </header>
      <main className="flex-grow flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 max-w-4xl mx-auto [text-shadow:_2px_2px_10px_rgb(255_0_0_/_80%)]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-amber-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-pulse">
              Welcome to ZenGodZ
            </span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl mb-8">A community created by gamers for gamers!</h2>
          <a
            href="https://discord.gg/XJy7bAYN8r"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-md bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors duration-300"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            Join our Discord
          </a>
        </div>
      </main>
      <footer className="z-10 p-4 text-center">
        <p className="text-sm">&copy; 2025 ZenGodZ Esports. All rights reserved.</p>
      </footer>
      <div className="absolute inset-0 top-1/4 z-0">
        <Canvas shadows camera={{ position: [20, 20, 20], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>
    </div>
  )
}

