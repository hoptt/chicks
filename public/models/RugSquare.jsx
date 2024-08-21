/*
https://poly.pizza/m/7H5qKjuxVY
Rug by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/RugSquare.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Carpet_1_1.geometry}
          material={materials.DarkRed}
        />
        <mesh
          geometry={nodes.Carpet_1_2.geometry}
          material={materials.LightOrange}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/RugSquare.glb");
