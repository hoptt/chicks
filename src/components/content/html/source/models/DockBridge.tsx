/*
https://poly.pizza/m/XViKoBh2UN
Dock by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function DockBridge() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/DockBridge.glb"
  );
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
      <mesh
        geometry={nodes.Dock_FirstAge_1.geometry}
        material={materials.Wood}
      />
      <mesh
        geometry={nodes.Dock_FirstAge_2.geometry}
        material={materials.Wood_Light}
      />
    </group>
  );
}
