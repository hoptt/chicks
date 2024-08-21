/*
https://poly.pizza/m/tr0LwyNnCt
Rug Round by J-Toastie [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/RugRound.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.rug.geometry}
        material={materials.rug_albedo}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/RugRound.glb");
