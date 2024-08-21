/*
https://poly.pizza/m/i6UFAevfcu
Campfire by Kenney
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Bucket.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.campfire.geometry} material={materials.wood} />
      <mesh geometry={nodes.bucket.geometry} material={materials.metal} />
      <mesh geometry={nodes.rocks.geometry} material={materials.rock} />
      <mesh geometry={nodes.wood.geometry} material={materials.wood} />
    </group>
  );
}

useGLTF.preload("/Bucket.glb");
