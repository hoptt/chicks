/*
https://poly.pizza/m/5UEl54KsuC
Boat by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Boat.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.Boat_1.geometry} material={materials.DarkWood} />
        <mesh geometry={nodes.Boat_2.geometry} material={materials.Wood} />
      </group>
    </group>
  );
}

useGLTF.preload("/Boat.glb");
