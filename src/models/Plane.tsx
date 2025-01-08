import { useAnimations, useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import React, { useEffect, useRef } from "react"
import { Mesh } from "three"

type PlaneProps = ThreeElements["mesh"] & {
  isRotating: boolean
}

const Plane: React.FC<PlaneProps> = ({ isRotating, ...props }) => {
  const ref = useRef<Mesh>(null!)
  const { scene, animations } = useGLTF("./assets/3d/plane.glb")
  const { actions } = useAnimations(animations, ref)
  useEffect(() => {
    if (isRotating) {
      actions["Take 001"]?.play()
    } else {
      actions["Tale 001"]?.stop()
    }
  }, [actions, isRotating])
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Plane
