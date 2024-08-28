/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 DockBridge.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/DockBridge.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.Dock_FirstAge_1.geometry} material={materials.Wood} />
        <mesh geometry={nodes.Dock_FirstAge_2.geometry} material={materials.Wood_Light} />
      </group>
    </group>
  )
}

useGLTF.preload('/DockBridge.glb')