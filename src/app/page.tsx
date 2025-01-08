"use client"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import Loading from "@/components/Loading"
import Island from "@/models/Island"
import Sky from "@/models/Sky"
import Bird from "@/models/Bird"
import Plane from "@/models/Plane"
import HomeInfo from "@/components/HomeInfo"
import Image from "next/image"
import { soundoff, soundon } from "@/assets/icons"

export default function Home() {
  const audioRef = useRef<any>(null)
  const [isPlayMusic, setIsPlayMusic] = useState(false)
  useEffect(() => {
    audioRef.current = new Audio("/assets/sakura.mp3")
    audioRef.current.volume = 0.4
    audioRef.current.loop = true
  }, [])
  useEffect(() => {
    if (isPlayMusic) {
      audioRef.current.play()
    }
    return () => {
      audioRef.current.pause()
    }
  }, [isPlayMusic])

  const [islandSettings, setIslandSettings] = useState({
    scale: new THREE.Vector3(1, 1, 1),
    postion: new THREE.Vector3(0, -6.5, -43),
    retation: new THREE.Euler(0.1, 4.7, 0),
  })
  const [planeSettings, setPlaneSettings] = useState({
    scale: new THREE.Vector3(1, 1, 1),
    postion: new THREE.Vector3(0, -6.5, -4.3),
  })
  const [currentStage, setCurrentStage] = useState<number | null>(1)
  useEffect(() => {
    const adjustIslandForSceenSize = () => {
      const screenScale =
        window.innerWidth < 768
          ? new THREE.Vector3(0.9, 0.9, 0.9)
          : new THREE.Vector3(1, 1, 1)
      const screenPostion = new THREE.Vector3(0, -6.5, -43)
      const retation = new THREE.Euler(0.1, 4.7, 0)
      setIslandSettings({
        scale: screenScale,
        postion: screenPostion,
        retation: retation,
      })
    }
    const adjustPlaneForSceenSize = () => {
      const screenScale =
        window.innerWidth < 768
          ? new THREE.Vector3(1.5, 1.5, 1.5)
          : new THREE.Vector3(2, 2, 2)
      const screenPostion = window.innerWidth
        ? new THREE.Vector3(0, -1.5, 0)
        : new THREE.Vector3(3, 3, 3)
      setPlaneSettings({
        scale: screenScale,
        postion: screenPostion,
      })
    }
    adjustIslandForSceenSize()
    adjustPlaneForSceenSize()
    window.addEventListener("resize", adjustIslandForSceenSize)
    window.addEventListener("resize", adjustPlaneForSceenSize)
    return () => {
      window.removeEventListener("resize", adjustIslandForSceenSize)
      window.removeEventListener("resize", adjustPlaneForSceenSize)
    }
  }, [])

  const [isRotating, setIsRotating] = useState(false)

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <hemisphereLight groundColor="#000000" intensity={1} />
        <Suspense fallback={<Loading />}>
          {/* <Bird /> */}
          <Sky isRotating={isRotating} />
          <Island
            position={islandSettings.postion}
            scale={islandSettings.scale}
            rotation={islandSettings.retation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            position={planeSettings.postion}
            scale={planeSettings.scale}
            rotation={[0, 20, 0]}
            isRotating={isRotating}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2">
        <Image
          src={!isPlayMusic ? soundon : soundoff}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => {
            setIsPlayMusic(!isPlayMusic)
          }}
        />
      </div>
    </section>
  )
}
