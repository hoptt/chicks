/*
https://poly.pizza/m/bOuqwqoXiy2
Chair by CMHT Oculus [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Chair.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.Office_Cha}
      />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.Office_Cha_1}
      />
    </group>
  );
}

useGLTF.preload("/Chair.glb");
