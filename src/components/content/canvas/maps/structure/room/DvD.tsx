/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 DvD.glb 
*/

import { useGLTF } from "@react-three/drei";

export function DvD() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/DvD.glb");
  return (
    <group position={[11, 5, -42]} scale={0.008}>
      <mesh
        geometry={nodes.Text001.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox001_1.geometry}
        material={materials["01___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox001_1_1.geometry}
        material={materials["02___Default"]}
      />
    </group>
  );
}

useGLTF.preload("/models/DvD.glb");