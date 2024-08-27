/*
https://poly.pizza/m/TfdgUV2RYe
Shelf Small by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function ShelfSmall() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/ShelfSmall.glb"
  );
  return (
    <group>
      <mesh
        geometry={nodes.Shelf_Small2.geometry}
        material={materials.White}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}
