/*
https://poly.pizza/m/WMW4C2J021
Laptop by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Laptop() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Laptop.glb");
  return (
    <group
      position={[-3.5, 8.3, -34.5]}
      rotation={[-Math.PI / 2, 0, 0.1]}
      scale={40}
    >
      <mesh
        geometry={nodes.laptop.geometry}
        material={materials.laptop_albedo}
      />
    </group>
  );
}

useGLTF.preload("/models/Laptop.glb");
