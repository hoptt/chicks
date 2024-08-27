/*
https://poly.pizza/m/TfdgUV2RYe
Shelf Small by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function ShelfSmall() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/ShelfSmall.glb"
  );
  useEffect(() => {
    materials.White.color.set("#e6e6e6");
  }, []);
  return (
    <group position={[10.5, 1.8, -27.6]} scale={150}>
      <mesh
        geometry={nodes.Shelf_Small2.geometry}
        material={materials.White}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/ShelfSmall.glb");
