/*
https://poly.pizza/m/YAS4fY6UL1
Dock by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/DockFloor.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Houses_FirstAge_3_Level1_1.geometry}
          material={materials.Wood}
        />
        <mesh
          geometry={nodes.Houses_FirstAge_3_Level1_2.geometry}
          material={materials.Wood_Light}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/DockFloor.glb");
