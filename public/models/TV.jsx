/*
https://poly.pizza/m/2flJebZTUrg
TV by Jarlan Perez [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/TV.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat23} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat17}
      />
      <mesh
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat12}
      />
      <mesh
        geometry={nodes["Node-Mesh_3"].geometry}
        material={materials.mat4}
      />
      <mesh
        geometry={nodes["Node-Mesh_4"].geometry}
        material={materials.mat8}
      />
    </group>
  );
}

useGLTF.preload("/TV.glb");
