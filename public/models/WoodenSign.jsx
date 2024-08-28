/*
https://poly.pizza/m/TzjiI94FC5
Wooden Sign by iPoly3D
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/WoodenSign.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={100}>
        <mesh
          geometry={nodes.Sign7_1.geometry}
          material={materials["Dark Wood"]}
        />
        <mesh
          geometry={nodes.Sign7_2.geometry}
          material={materials["Light Wood"]}
        />
        <mesh geometry={nodes.Sign7_3.geometry} material={materials.Herbs} />
      </group>
    </group>
  );
}

useGLTF.preload("/WoodenSign.glb");
