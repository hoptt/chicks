/*
https://poly.pizza/m/03iCPYXZpJ
Pipe by CreativeTrio
*/

import { useGLTF } from "@react-three/drei";

export function Pipe() {
  const { nodes }: { nodes: any; materials: any } = useGLTF("/models/Pipe.glb");

  return (
    <group
      position={[17, 7.5, -32.4]}
      scale={[3, 4, 3.9]}
      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
    >
      <mesh geometry={nodes.Pipe.geometry} scale={100}>
        <meshStandardMaterial color="#c1c1c1" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Pipe.glb");
