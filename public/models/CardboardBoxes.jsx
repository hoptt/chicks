/*
https://poly.pizza/m/V9KbWC8Vd6
Cardboard Boxes by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/CardboardBoxes.glb");
  return (
    <group rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={36.327}>
      <mesh
        geometry={nodes.CardboardBoxes_4_1.geometry}
        material={materials.Cardboard}
      />
      <mesh
        geometry={nodes.CardboardBoxes_4_2.geometry}
        material={materials.Tape}
      />
    </group>
  );
}

useGLTF.preload("/CardboardBoxes.glb");
