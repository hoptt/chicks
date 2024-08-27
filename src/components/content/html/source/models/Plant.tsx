/*
https://poly.pizza/m/8KMKYzAqWjp
Plant by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Plant() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Plant.glb");
  return (
    <group>
      <mesh geometry={nodes.plant.geometry} material={materials.None} />
    </group>
  );
}
