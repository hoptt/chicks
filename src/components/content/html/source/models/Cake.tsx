/*
https://poly.pizza/m/2WvdDP8C3a5
Cake by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Cake() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Cake.glb");
  return (
    <group scale={0.05}>
      <mesh
        geometry={nodes.pCylinder30_1.geometry}
        material={materials.blinn6SG}
      />
      <mesh
        geometry={nodes.pCylinder30_1_1.geometry}
        material={materials.blinn10SG}
      />
      <mesh
        geometry={nodes.pCylinder30_1_2.geometry}
        material={materials.blinn8SG}
      />
    </group>
  );
}

useGLTF.preload("/models/Cake.glb");
