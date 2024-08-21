/*
https://poly.pizza/m/4jf7PTHIMTe
Picture frame by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/PictureFrame.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Box001_1.geometry}
        material={materials._crayfishdiffuse}
      />
      <mesh
        geometry={nodes.Box001_1_1.geometry}
        material={materials["02___Default"]}
      />
    </group>
  );
}

useGLTF.preload("/PictureFrame.glb");
