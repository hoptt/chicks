/*
https://poly.pizza/m/Ks7xd8O5vy
Fence by Quaternius
*/

import { useBox } from "@react-three/cannon";
import { Merged, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

export function Railing() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/AtticRailing.glb"
  );
  const meshes = useMemo(
    () => ({
      Railing_FenceA: nodes.Fence_Middle_1,
      Railing_FenceB: nodes.Fence_Middle_2,
    }),
    []
  );
  useEffect(() => {
    materials.Wood_Light.color.set("#fed29b");
    materials.Wood.color.set("#cecab9");
  }, []);
  useBox(() => ({
    type: "Static",
    position: [5, 8, -36.5],
    args: [0.25, 1, 7],
  }));
  return (
    <group
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      scale={[80, 30, 70]}
      position={[5, 7.5, -38]}
    >
      <Merged meshes={meshes}>
        {(mesh: any) => {
          return (
            <>
              <group position={[0.02, 0, 0]}>
                <mesh.Railing_FenceA material={materials.Wood_Light} />
                <mesh.Railing_FenceB material={materials.Wood} />
              </group>
              <group position={[0, 0, 0]}>
                <mesh.Railing_FenceA material={materials.Wood_Light} />
                <mesh.Railing_FenceB material={materials.Wood} />
              </group>
              <group position={[-0.02, 0, 0]}>
                <mesh.Railing_FenceA material={materials.Wood_Light} />
                <mesh.Railing_FenceB material={materials.Wood} />
              </group>
              <group position={[-0.04, 0, 0]}>
                <mesh.Railing_FenceA material={materials.Wood_Light} />
                <mesh.Railing_FenceB material={materials.Wood} />
              </group>
              <group position={[-0.05, 0, 0]}>
                <mesh.Railing_FenceA material={materials.Wood_Light} />
                <mesh.Railing_FenceB material={materials.Wood} />
              </group>
            </>
          );
        }}
      </Merged>
      {/* <mesh
        geometry={nodes.Fence_Middle_1.geometry}
        material={materials.Wood_Light}
      />
      <mesh
        geometry={nodes.Fence_Middle_2.geometry}
        material={materials.Wood}
      /> */}
    </group>
  );
}

useGLTF.preload("/models/AtticRailing.glb");
