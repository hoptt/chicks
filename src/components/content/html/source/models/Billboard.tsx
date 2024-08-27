/*
https://poly.pizza/m/71gPkTkcnHg
Billboard by sirkitree [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Billboard() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Billboard.glb"
  );
  return (
    <group scale={2.5} rotation={[-1.5, 3, 1]}>
      <mesh
        geometry={nodes.group176403894.geometry}
        material={materials.mat22}
      />
      <mesh
        geometry={nodes.mesh205358114.geometry}
        material={materials.mat22}
      />
      <mesh
        geometry={nodes.mesh205358114_1.geometry}
        material={materials.mat17}
      />
      <mesh
        geometry={nodes.mesh205358114_2.geometry}
        material={materials.mat21}
      />
    </group>
  );
}

useGLTF.preload("/models/Billboard.glb");
