/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 FlowerBed.glb 
*/

import { useGLTF } from "@react-three/drei";
import { memo, useEffect } from "react";
type Props = {
  position: [number, number, number];
};
export const FlowerBed = memo(function FlowerBed({ position }: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/FlowerBed.glb"
  );
  useEffect(() => {
    materials.ConcreteFlowerBed2.color.set("#b5b5b5");
    materials.GroundFlowerBed5.color.set("#5e5e5e");
  }, []);
  return (
    <group position={position} rotation-y={Math.PI / 2} scale={[1.7, 1.3, 1.3]}>
      <mesh
        geometry={nodes.FlowerBed2_1.geometry}
        material={materials.ConcreteFlowerBed2}
      />
      <mesh
        geometry={nodes.FlowerBed2_2.geometry}
        material={materials.GroundFlowerBed5}
      />
    </group>
  );
});

useGLTF.preload("/models/FlowerBed.glb");