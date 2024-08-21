/*
https://poly.pizza/m/LM6QWe8kFT
Picnic Table by J-Toastie [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/PicnicTable.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Bench.geometry}
        material={materials.Bench}
        position={[0, 0.846, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={59.842}
      />
    </group>
  );
}

useGLTF.preload("/PicnicTable.glb");
