/*
https://poly.pizza/m/4IwPTeOmq6c
beach ball by the_ normalgamer [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/BeachBall.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.mesh1945116984.geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes.mesh1945116984_1.geometry}
        material={materials.mat12}
      />
      <mesh
        geometry={nodes.mesh1945116984_2.geometry}
        material={materials.mat8}
      />
      <mesh
        geometry={nodes.mesh1945116984_3.geometry}
        material={materials.mat5}
      />
    </group>
  );
}

useGLTF.preload("/BeachBall.glb");
