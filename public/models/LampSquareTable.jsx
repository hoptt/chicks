/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 LampSquareTable.glb 
*/

import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/LampSquareTable.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.lampSquareTable_2.geometry}
        material={materials.lamp}
      />
      <mesh
        geometry={nodes.lampSquareTable_2_1.geometry}
        material={materials.metal}
      />
      <mesh
        geometry={nodes.lampSquareTable_3.geometry}
        material={materials.metal}
      />
      <mesh
        geometry={nodes.lampSquareTable_3_1.geometry}
        material={materials.lamp}
      />
    </group>
  );
}

useGLTF.preload("/LampSquareTable.glb");
