/*
https://poly.pizza/m/PCJv96DB6b
Metal Door by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/MetalDoor.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={100}>
        <mesh
          geometry={nodes.Door_Closed_1.geometry}
          material={materials.Atlas}
        />
        <mesh
          geometry={nodes.Door_Closed_2.geometry}
          material={materials.Material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/MetalDoor.glb");
