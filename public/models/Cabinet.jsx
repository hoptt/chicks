/*
https://poly.pizza/m/9u6ZjCUoxtG
Bookshelf by sirkitree [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Cabinet.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.group1425940537.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group630084855.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1134304036.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1516016514.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group528000529.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1575397239.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group2060297481.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1478564517.geometry}
        material={materials.mat20}
      />
    </group>
  );
}

useGLTF.preload("/Cabinet.glb");
