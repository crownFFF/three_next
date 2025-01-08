import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { useRef } from "react"
import { Mesh } from "three"

const Sky: React.FC<{ isRotating: boolean }> = ({ isRotating }) => {
  const sky = useGLTF("/assets/3d/sky.glb")

  const skyRef = useRef<Mesh>(null!)

  useFrame((_, detla) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * detla
    }
  })

  return (
    <mesh>
      <primitive object={sky.scene} ref={skyRef} />
    </mesh>
  )
}

export default Sky
