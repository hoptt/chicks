/*
https://poly.pizza/m/LM6QWe8kFT
Picnic Table by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function PicnicTable() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/PicnicTable.glb"
  );
  useEffect(() => {
    materials.Bench.color.set("#aaaaaa");
  }, []);
  return (
    <group
      position={[-6, 2, -24]}
      scale={70}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
    >
      <mesh
        geometry={nodes.Bench.geometry}
        material={materials.Bench}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/PicnicTable.glb");
