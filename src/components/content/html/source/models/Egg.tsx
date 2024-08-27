/*
https://poly.pizza/m/6IlWtCejyrO
Egg by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Egg() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Egg.glb");
  return (
    <group scale={0.0025}>
      <mesh geometry={nodes.Uncracked_Egg.geometry} material={materials.Mat} />
    </group>
  );
}
