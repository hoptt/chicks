/*
https://poly.pizza/m/IaUtCxMAxg
Dock Stairs by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function DockStairs() {
  const { nodes }: { nodes: any; materials: any } = useGLTF(
    "/models/DockStairs.glb"
  );
  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[20, 20, 20]}
      position={[13, 0.3, -13.5]}
    >
      <mesh geometry={nodes.Dock_Stairs_1.geometry}>
        <meshStandardMaterial color="#855f23" />
      </mesh>
      {/* <mesh
        geometry={nodes.Dock_Stairs_2.geometry}
        material={materials.LightWood}
      /> */}
    </group>
  );
}

useGLTF.preload("/models/DockStairs.glb");
