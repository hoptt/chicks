/*
https://poly.pizza/m/PSlvyjTt1M
Wall Shelf by J-Toastie [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/WallShelf.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes["Cube-Mesh"].geometry} material={materials.Top} />
      <mesh
        geometry={nodes["Cube-Mesh_1"].geometry}
        material={materials.Supports}
      />
    </group>
  );
}

useGLTF.preload("/WallShelf.glb");
