/*
https://poly.pizza/m/78wlnTXRp50
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
    <group position={position} rotation={rotation} scale={0.000002}>
      <mesh
        geometry={nodes.Box001.geometry}
        material={materials["02___Default"]}
      />
    </group>
  );
});

useGLTF.preload("/models/CinderBlock.glb");
