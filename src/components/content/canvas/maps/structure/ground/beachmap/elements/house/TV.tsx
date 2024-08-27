/*
https://poly.pizza/m/2flJebZTUrg
TV by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { useGLTF, useTexture } from "@react-three/drei";

export function TV() {
  const texture = useTexture("/images/thumbnail.jpg");
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/TV.glb");
  return (
    <group position={[10.5, 2.5, -27.5]} rotation-y={Math.PI / 2} scale={0.7}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat23} />
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.05, 1.5, 2.5]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
useTexture.preload("/images/thumbnail.jpg");
useGLTF.preload("/models/TV.glb");
