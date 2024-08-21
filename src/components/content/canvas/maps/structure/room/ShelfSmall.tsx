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
    <group position={[13.55, 4.25, -42.1]} scale={[2, 2, 2]}>
      <mesh
        geometry={nodes.Shelf_Small2.geometry}
        material={materials.White}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/models/ShelfSmall.glb");
