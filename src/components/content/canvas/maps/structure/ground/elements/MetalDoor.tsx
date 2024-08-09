/*
https://poly.pizza/m/PCJv96DB6b
Metal Door by Quaternius
*/

import { useGLTF } from "@react-three/drei";

type Props = {
  doorknobPosition: [number, number, number];
  position: [number, number, number];
};
export function MetalDoor({ doorknobPosition, position }: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/MetalDoor.glb"
  );
  return (
    <group scale={[50, 41.5, 50]} position={position}>
      <mesh
        geometry={nodes.Door_Closed_1.geometry}
        material={materials.Atlas}
        position={doorknobPosition}
      />
      <mesh
        geometry={nodes.Door_Closed_2.geometry}
        material={materials.Material}
      />
    </group>
  );
}

useGLTF.preload("/models/MetalDoor.glb");
