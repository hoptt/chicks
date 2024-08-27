/*
https://poly.pizza/m/IaUtCxMAxg
Dock Stairs by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function DockStairs() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/DockStairs.glb"
  );
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={10}>
      <mesh geometry={nodes.Dock_Stairs_1.geometry} material={materials.Wood} />
      <mesh
        geometry={nodes.Dock_Stairs_2.geometry}
        material={materials.LightWood}
      />
    </group>
  );
}
