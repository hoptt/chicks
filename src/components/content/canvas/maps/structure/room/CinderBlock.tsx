/*
https://poly.pizza/m/d69NgO3BXv1
Cinder block by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { memo } from "react";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
};
export const CinderBlock = memo(function CinderBlock({
  position,
  rotation,
}: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/CinderBlock.glb"
  );
  return (
    <group position={position} rotation={rotation} scale={1.3}>
      <mesh geometry={nodes.Node.geometry} material={materials.lambert2SG} />
    </group>
  );
});

useGLTF.preload("/models/CinderBlock.glb");
