/*
https://poly.pizza/m/L4E32Wee6C
Wood Log by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function Log2() {
  const { nodes }: { nodes: any; materials: any } = useGLTF("/models/Log2.glb");
  return (
    <group
      position={[-9, 1, -8]}
      rotation={[-Math.PI / 2, 1.5, 1.5]}
      scale={198.943}
    >
      <mesh geometry={nodes.WoodLog_1.geometry} castShadow>
        <meshStandardMaterial color="#c98758" />
      </mesh>
      <mesh geometry={nodes.WoodLog_2.geometry}>
        <meshStandardMaterial color="#ab6638" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Log2.glb");
