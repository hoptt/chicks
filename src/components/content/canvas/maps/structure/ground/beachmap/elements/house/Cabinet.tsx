/*
https://poly.pizza/m/9u6ZjCUoxtG
Bookshelf by sirkitree [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Cabinet() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Cabinet.glb"
  );
  useEffect(() => {
    materials.mat20.color.set("#d8d8d8");
  }, []);
  return (
    <group scale={0.8}>
      <group
        position={[13, 5, -35]}
        rotation-y={-Math.PI}
        scale={[2.5, 1.5, 1]}
      >
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2, 3, 0.25]} />
          <meshBasicMaterial color={"#595959"} />
        </mesh>
        <mesh position={[0, -1.9, -0.5]}>
          <boxGeometry args={[3.5, 0.1, 1]} />
          <meshBasicMaterial color={"#979797"} />
        </mesh>
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
    </group>
  );
}

useGLTF.preload("/models/Cabinet.glb");
