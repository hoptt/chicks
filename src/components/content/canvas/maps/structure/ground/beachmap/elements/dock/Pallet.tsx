/*
https://poly.pizza/m/cUAsYHDqfD
Pallet by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function Pallet() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Pallet.glb");
  return (
    <group position={[18.5, 0.4, -12]}>
      <mesh
        geometry={nodes.Pallet.geometry}
        material={materials.Wood}
        rotation={[-Math.PI / 2, -0.3, 0.1]}
        scale={[7, 80.942, 7]}
      />
    </group>
  );
}

useGLTF.preload("/models/Pallet.glb");
