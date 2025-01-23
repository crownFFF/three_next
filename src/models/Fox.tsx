"use client"
import React, { useEffect, useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import * as THREE from "three"
import { GLTF } from 'three-stdlib'

type FoxProps = ThreeElements["group"] & {
  currentAnimation: string
}

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh
    Object_8: THREE.SkinnedMesh
    Object_9: THREE.SkinnedMesh
    Object_10: THREE.SkinnedMesh
    Object_11: THREE.SkinnedMesh
    GLTF_created_0_rootJoint: THREE.Bone
  }
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial
  }
}

const Fox: React.FC<FoxProps> = ({ currentAnimation, ...props }) => {
  const group = useRef<THREE.Group>(null!)
  const { nodes, materials, animations } = useGLTF(
    "/assets/3D/fox.glb"
  ) as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.stop())
    if (actions[currentAnimation]) {
      actions[currentAnimation].play()
    }
  }, [actions, currentAnimation])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />

        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  )
}
export default Fox
