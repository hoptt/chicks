/*
https://poly.pizza/m/rVyPMVCGlw
Rubiks Cube by J-Toastie [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/RubiksCube.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.RubiksCube.geometry}
        material={materials.rubiks_cube_albedo}
        position={[0, 0.317, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={30}
      />
    </group>
  );
}

useGLTF.preload("/RubiksCube.glb");
