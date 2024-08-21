/*
https://poly.pizza/m/fhFGDsv5jje
Wall desk speakers by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/WallDeskSpeakers.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.WallDeskSpeakers_mesh.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
}

useGLTF.preload("/WallDeskSpeakers.glb");
