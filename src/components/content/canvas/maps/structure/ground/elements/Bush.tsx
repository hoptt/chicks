/*
https://poly.pizza/m/d6STyhH76Qe
Bush by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { Merged, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

export function Bush() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Bush.glb");

  const meshes = useMemo(
    () => ({
      Bush: nodes.Node,
    }),
    [nodes]
  );

  useEffect(() => {
    if (materials.mat9) {
      materials.mat9.color.set("#187c02");
    }
  }, [materials]);

  return (
    <>
      <Merged castShadow meshes={meshes}>
        {(mesh: any) => {
          return (
            <>
              <group scale={20} position={[1, 0, 13]} rotation-y={-Math.PI / 2}>
                <mesh.Bush material={materials.mat9} castShadow />
              </group>

              <group scale={30} position={[12, 0, 2]} rotation-y={Math.PI / 2}>
                <mesh.Bush material={materials.mat9} castShadow />
              </group>

              <group
                scale={25}
                position={[16, 0, -1.5]}
                rotation-y={-Math.PI / 2}
              >
                <mesh.Bush material={materials.mat9} castShadow />
              </group>
            </>
          );
        }}
      </Merged>
    </>
  );
}

useGLTF.preload("/models/Bush.glb");
