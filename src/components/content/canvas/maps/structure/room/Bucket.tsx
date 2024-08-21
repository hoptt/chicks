/*
https://poly.pizza/m/i6UFAevfcu
Campfire by Kenney
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Bucket() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Bucket.glb");

  useEffect(() => {
    materials.wood.color.set("#ad7900");
  }, []);
  return (
    <group position={[1.7, 10.1, -37]} scale={3.5}>
      <mesh geometry={nodes.campfire.geometry} material={materials.wood} />
      <mesh geometry={nodes.bucket.geometry} material={materials.metal} />
      <mesh geometry={nodes.rocks.geometry} material={materials.rock} />
      <mesh geometry={nodes.wood.geometry} material={materials.wood} />
    </group>
  );
}

useGLTF.preload("/models/Bucket.glb");
