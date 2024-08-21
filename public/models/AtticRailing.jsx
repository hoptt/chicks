/*
https://poly.pizza/m/Ks7xd8O5vy
Fence by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/AtticRailing.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Fence_Middle_1.geometry}
          material={materials.Wood_Light}
        />
        <mesh
          geometry={nodes.Fence_Middle_2.geometry}
          material={materials.Wood}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/AtticRailing.glb");
