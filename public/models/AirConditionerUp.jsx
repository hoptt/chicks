/*
https://poly.pizza/m/4m3lja-ZCkA
Air conditioner by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/AirConditionerUp.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Air_Conditioner.geometry}
        material={materials.Mat}
      />
    </group>
  );
}

useGLTF.preload("/AirConditionerUp.glb");
