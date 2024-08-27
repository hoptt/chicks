/*
https://poly.pizza/m/2DgM36qZW2u
Crab by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Crab() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Crab.glb");
  return (
    <group scale={0.005}>
      <mesh
        geometry={nodes.Geo_Crab.geometry}
        material={materials.lambert2SG}
      />
    </group>
  );
}
