/*
https://poly.pizza/m/F0ZVJsCnI3
Dirt Floor Tile by Kay Lousberg
*/

import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function DirtFloorTile() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/DirtFloorTile.glb"
  );
  const [ref] = useBox(() => ({
    type: "Static",
    material: "ground",
    position: [0.1, 1.25, -33.1],
    args: [7.5, 0.5, 5],
  }));
  useEffect(() => {
    materials.HalloweenBits.color.set("#79ce70");
  }, []);
  return (
    <group ref={ref as any}>
      <mesh
        geometry={nodes.floor_dirt.geometry}
        material={materials.HalloweenBits}
        position-y={0.2}
        scale={[190, 100, 120]}
        receiveShadow
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/DirtFloorTile.glb");
