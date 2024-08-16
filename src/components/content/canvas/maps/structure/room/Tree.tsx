/*
https://poly.pizza/m/6pwiq7hSrHr
Tree by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { memo } from "react";
type Props = {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
};
export const Tree = memo(function Tree({
  position,
  scale = [0.007, 0.007, 0.007],
  rotation = [0, 0, 0],
}: Props) {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Tree.glb");
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh
        geometry={nodes.tree01.geometry}
        material={materials.Mat}
        castShadow
      />
    </group>
  );
});

useGLTF.preload("/models/Tree.glb");
