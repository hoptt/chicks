/*
https://poly.pizza/m/8KMKYzAqWjp
Plant by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Plant() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Plant.glb");
  useEffect(() => {
    materials.None.color.set("#b1b1b1");
  }, []);
  return (
    <group position={[16.8, 5.1, -33.5]} scale={0.35}>
      <mesh geometry={nodes.plant.geometry} material={materials.None} />
    </group>
  );
}

useGLTF.preload("/models/Plant.glb");
