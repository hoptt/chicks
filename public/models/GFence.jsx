/*
https://poly.pizza/m/qWKhREFj7H
Metal Fence by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/GFence.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={100}>
        <mesh
          geometry={nodes.MetalFence_1.geometry}
          material={materials.Grey}
        />
        <mesh
          geometry={nodes.MetalFence_2.geometry}
          material={nodes.MetalFence_2.material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/GFence.glb");
