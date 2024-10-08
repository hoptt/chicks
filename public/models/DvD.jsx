/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 DvD.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/DvD.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.ChamferCyl001.geometry} material={materials['03___Default']} />
      <mesh geometry={nodes.ChamferCyl002.geometry} material={materials['03___Default']} />
      <mesh geometry={nodes.ChamferCyl003.geometry} material={materials['03___Default']} />
      <mesh geometry={nodes.Text001.geometry} material={materials['04___Default']} />
      <mesh geometry={nodes.ChamferBox001_1.geometry} material={materials['01___Default']} />
      <mesh geometry={nodes.ChamferBox001_1_1.geometry} material={materials['02___Default']} />
    </group>
  )
}

useGLTF.preload('/DvD.glb')
