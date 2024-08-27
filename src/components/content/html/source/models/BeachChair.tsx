/*
https://poly.pizza/m/9TN4PyhWvz1
Beach chair by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function BeachChair() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BeachChair.glb"
  );
  return (
    <group scale={0.005}>
      <mesh
        geometry={nodes.Beach_Chair.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
}
