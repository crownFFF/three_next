"use client"
import * as THREE from "three"
import React, { useRef, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame, useThree, ThreeElements } from "@react-three/fiber"
import { a } from "@react-spring/three"

type IslandProps = ThreeElements["group"] & {
  isRotating: boolean
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentStage: React.Dispatch<React.SetStateAction<number|null>>
}
interface Object3D{
  nodes?: any,
  isMesh?: any,
  geometry?: any,
  materials?: any,
  animations?:any
}

const Island: React.FC<IslandProps> = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) => {
  const IslandRef = useRef<THREE.Group>(null!)
  const { nodes, materials } = useGLTF("/assets/3D/island.glb") as Object3D

  const { gl, viewport } = useThree()

  const lastX = useRef(0)
  const rotationSpeed = useRef(0)
  const dampingFact0r = 0.95

  const handlePointDown = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setIsRotating(true)

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    lastX.current = clientX
  }

  const handlePointUp = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setIsRotating(false)
  }

  const handlePointMove = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const delta = (clientX - lastX.current) / viewport.width
      IslandRef.current.rotation.y += delta * 0.01 * Math.PI
      lastX.current = clientX
      rotationSpeed.current = delta * 0.01 * Math.PI
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true)
      IslandRef.current.rotation.y += 0.01 * Math.PI
      rotationSpeed.current = .0125
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true)
      IslandRef.current.rotation.y -= 0.01 * Math.PI
      rotationSpeed.current = -.0125
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false)
    }
  }

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFact0r
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0
      }
      IslandRef.current.rotation.y += rotationSpeed.current
    } else {
      const rotation = IslandRef.current.rotation.y
      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4)
          break
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3)
          break
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2)
          break
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1)
          break
        default:
          setCurrentStage(null)
      }
    }
  })

  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener("pointerdown", handlePointDown)
    canvas.addEventListener("pointerup", handlePointUp)
    canvas.addEventListener("pointermove", handlePointMove)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      canvas.removeEventListener("pointerdown", handlePointDown)
      canvas.removeEventListener("pointerup", handlePointUp)
      canvas.removeEventListener("pointermove", handlePointMove)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [gl, handlePointDown, handlePointUp, handlePointMove])

  return (
    <a.group dispose={null} ref={IslandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  )
}

export default Island
