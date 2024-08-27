/*
https://poly.pizza/m/5UEl54KsuC
Boat by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function Boat() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Boat.glb");
  return (
    <group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={10}>
        <mesh geometry={nodes.Boat_1.geometry} material={materials.DarkWood} />
        <mesh geometry={nodes.Boat_2.geometry} material={materials.Wood} />
      </group>
    </group>
  );
}
