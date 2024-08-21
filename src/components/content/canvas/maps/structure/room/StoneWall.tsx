/*
https://poly.pizza/m/tdeAOh3LQV
Stone Wall by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { memo, useEffect } from "react";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};
export const StoneWall = memo(function StoneWall({
  position,
  rotation,
  scale,
}: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/StoneWall.glb"
  );
  useEffect(() => {
    materials.Stone_Light.color.set("#c3c3c3");
    materials.Stone.color.set("#a97c00");
    materials.Wood.color.set("#8b5f00");
  }, []);
  return (
    <group rotation={rotation} scale={scale} position={position}>
      <mesh
        geometry={nodes.Wall_SecondAge_1.geometry}
        material={materials.Stone}
      />
      <mesh
        geometry={nodes.Wall_SecondAge_2.geometry}
        material={materials.Stone_Light}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.Wall_SecondAge_3.geometry}
        material={materials.Wood}
      />
    </group>
  );
});

useGLTF.preload("/models/StoneWall.glb");
