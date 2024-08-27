/*
https://poly.pizza/m/71gPkTkcnHg
Billboard by sirkitree [CC-BY] via Poly Pizza
*/

import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";

export function Billboard() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Billboard.glb"
  );
  const picture = useTexture("/images/picture2.jpg");
  useEffect(() => {
    materials.mat22.color.set("#5c4804");
  }, []);

  return (
    <>
      <group position={[8, 8.5, -19]}>
        <group scale={[10, 7, 10]} rotation-y={-Math.PI / 1.2}>
          <mesh
            geometry={nodes.group176403894.geometry}
            material={materials.mat22}
          />
          <mesh
            geometry={nodes.mesh205358114.geometry}
            material={materials.mat22}
          />
          <mesh geometry={nodes.mesh205358114_1.geometry}>
            <meshStandardMaterial color="#a0a0a0" />
          </mesh>
        </group>
        <mesh
          position={[-1, 0.7, 0]}
          // geometry={nodes.mesh205358114_2.geometry}
          // material={materials.mat21}
          // rotation-y={Math.PI / 3}
        >
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshStandardMaterial map={picture} />
        </mesh>
        <rectAreaLight
          args={["#b3af98", 10, 5, 2]}
          rotation={[1.3, 0, 0]}
          position={[-1, -0.8, 1.3]}
        />
      </group>
    </>
  );
}
useTexture.preload("/images/picture2.jpg");
useGLTF.preload("/models/Billboard.glb");
