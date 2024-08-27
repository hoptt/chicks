/*
https://poly.pizza/m/XViKoBh2UN
Dock by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/DockStairs.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Dock_Stairs_1.geometry}
          material={materials.Wood}
        />
        <mesh
          geometry={nodes.Dock_Stairs_2.geometry}
          material={materials.LightWood}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/DockStairs.glb");
