/*
https://poly.pizza/m/aH83BlSFxJu
Candle by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Candle.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder001_Cylinder002.geometry}
        material={materials.phong1SG}
      />
    </group>
  );
}

useGLTF.preload("/Candle.glb");
