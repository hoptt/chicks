/*
https://poly.pizza/m/9u6ZjCUoxtG
Bookshelf by sirkitree [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Cabinet() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Cabinet.glb"
  );
  return (
    <group rotation={[-1, -Math.PI / 1.2, -1]} scale={0.3}>
      <mesh
        geometry={nodes.group1425940537.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group630084855.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1134304036.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1516016514.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group528000529.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1575397239.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group2060297481.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1478564517.geometry}
        material={materials.mat20}
      />
    </group>
  );
}
