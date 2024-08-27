/*
https://poly.pizza/m/XViKoBh2UN
Dock by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { memo } from "react";

export const DockBridge = memo(function DockBridge() {
  const { nodes }: { nodes: any; materials: any } = useGLTF(
    "/models/DockBridge.glb"
  );

  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[300, 200, 500]}
      position={[13, 0.9, -15.5]}
    >
      <mesh geometry={nodes.Dock_FirstAge_1.geometry}>
        <meshStandardMaterial color="#855f23" />
      </mesh>
      {/* <mesh
        geometry={nodes.Dock_FirstAge_2.geometry}
        material={materials.Wood_Light}
      /> */}
    </group>
  );
});

useGLTF.preload("/models/DockBridge.glb");
