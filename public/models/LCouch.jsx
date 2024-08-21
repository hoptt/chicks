/*
https://poly.pizza/m/1kwsjhpY84
L Couch by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/LCouch.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Couch_L_1.geometry}
          material={materials.Couch_BeigeDark}
        />
        <mesh
          geometry={nodes.Couch_L_2.geometry}
          material={materials.Couch_Beige}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/LCouch.glb");
