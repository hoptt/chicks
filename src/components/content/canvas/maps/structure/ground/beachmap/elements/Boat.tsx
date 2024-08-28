/*
https://poly.pizza/m/5UEl54KsuC
Boat by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Boat() {
  const { nodes }: { nodes: any; materials: any } = useGLTF("/models/Boat.glb");
  const ref = useRef<any>();
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(time) * 0.1;
    ref.current.rotation.z = Math.sin(time / 2) * 0.05;
  });
  return (
    <group
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={40}
      position={[-3, 0.1, -15]}
    >
      <mesh geometry={nodes.Boat_1.geometry}>
        <meshStandardMaterial color="rgb(119, 105, 67)" />
      </mesh>
      <mesh geometry={nodes.Boat_2.geometry}>
        <meshStandardMaterial color="rgb(143, 112, 26)" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Boat.glb");
