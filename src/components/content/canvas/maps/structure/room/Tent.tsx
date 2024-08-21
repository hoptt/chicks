/*
https://poly.pizza/m/2tvQrMLf_tP
Tent by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Tent() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Tent.glb");
  useEffect(() => {
    materials.mat9.color.set("#878d2c");
    materials.mat20.color.set("#706600");
  }, []);
  return (
    <group
      position={[-0.5, 10.65, -39.5]}
      scale={[2, 2, 1.5]}
      rotation-y={-Math.PI / 1.1}
    >
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat9} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat20}
      />
    </group>
  );
}

useGLTF.preload("/models/Tent.glb");
