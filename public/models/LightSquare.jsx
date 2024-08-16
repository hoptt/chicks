/*
https://poly.pizza/m/PSoamNnBPO
Light Square by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/LightSquare.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Light_Square_1.geometry}
          material={materials.DarkGrey}
        />
        <mesh
          geometry={nodes.Light_Square_2.geometry}
          material={materials.Grey}
        />
        <mesh
          geometry={nodes.Light_Square_3.geometry}
          material={materials.Light}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/LightSquare.glb");
