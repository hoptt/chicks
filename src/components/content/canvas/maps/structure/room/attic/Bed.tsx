/*
https://poly.pizza/m/1Lisi_4xxFL
Bed by Alex Safayan [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Bed() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Bed.glb");
  return (
    <group position={[-3, 8, -40.5]} scale={4} rotation-y={Math.PI / 2}>
      <mesh
        geometry={nodes.group1163561573.geometry}
        material={materials.mat19}
      />
      <mesh
        geometry={nodes.group873723508.geometry}
        material={materials.mat19}
      />
      <mesh
        geometry={nodes.group226031731.geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes.group1608457623.geometry}
        material={materials.mat15}
      />
      <mesh
        geometry={nodes.group650785582.geometry}
        material={materials.mat5}
      />
      <mesh
        geometry={nodes.group1998901131.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.mesh1022306024.geometry}
        material={materials.mat18}
      />
      <mesh
        geometry={nodes.mesh1022306024_1.geometry}
        material={materials.mat22}
      />
      <mesh
        geometry={nodes.mesh1793700176.geometry}
        material={materials.mat22}
      />
      <mesh
        geometry={nodes.mesh1793700176_1.geometry}
        material={materials.mat18}
      />
    </group>
  );
}

useGLTF.preload("/models/Bed.glb");
