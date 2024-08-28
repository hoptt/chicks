/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ParkInfoBoard.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/ParkInfoBoard.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.751, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[36.326, 40, 40]}>
        <mesh geometry={nodes.ParkInfoBoard_1.geometry} material={materials.wood_shade1} />
        <mesh geometry={nodes.ParkInfoBoard_2.geometry} material={materials.board} />
        <mesh geometry={nodes.ParkInfoBoard_3.geometry} material={materials.wood_shade2} />
      </group>
    </group>
  )
}

useGLTF.preload('/ParkInfoBoard.glb')