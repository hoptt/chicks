/*
https://poly.pizza/m/PCJv96DB6b
Metal Door by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { memo } from "react";

type Props = {
  doorknobPosition: [number, number, number];
  position: [number, number, number];
  isHidden?: boolean;
};
export const MetalDoor = memo(function MetalDoor({
  doorknobPosition,
  position,
  isHidden = false,
}: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/MetalDoor.glb"
  );
  if (isHidden) return null;
  return (
    <group scale={[60, 47, 50]} position={position}>
      <mesh
        geometry={nodes.Door_Closed_1.geometry}
        material={materials.Atlas}
        position={doorknobPosition}
      />
      <mesh
        geometry={nodes.Door_Closed_2.geometry}
        // material={materials.Material}
      >
        <meshStandardMaterial color="#89653d" />
      </mesh>
    </group>
  );
});

useGLTF.preload("/models/MetalDoor.glb");
