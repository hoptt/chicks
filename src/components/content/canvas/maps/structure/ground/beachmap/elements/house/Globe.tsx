/*
https://poly.pizza/m/2445qv4neDQ
Globe by jeremy [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Globe() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Globe.glb");
  return (
    <group position={[8, 4.1, -27.5]} scale={0.05}>
      <mesh
        geometry={nodes.globe_Circle013_1.geometry}
        material={materials["795548"]}
      />
      {/* <mesh
        geometry={nodes.globe_Circle013_1_1.geometry}
        material={materials["455A64"]}
      /> */}
      <mesh
        geometry={nodes.globe_Circle013_1_2.geometry}
        material={materials["039BE5"]}
      />
      <mesh
        geometry={nodes.globe_Circle013_1_3.geometry}
        material={materials["8BC34A"]}
      />
      <mesh
        geometry={nodes.globe_Circle013_1_4.geometry}
        material={materials.FFFFFF}
      />
    </group>
  );
}

useGLTF.preload("/models/Globe.glb");
