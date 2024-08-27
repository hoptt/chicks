/*
https://poly.pizza/m/4jf7PTHIMTe
Picture frame by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF, useTexture } from "@react-three/drei";

export function PictureFrame() {
  const { nodes }: { nodes: any; materials: any } = useGLTF(
    "/models/PictureFrame.glb"
  );
  const picture = useTexture("/images/picture1.jpg");
  return (
    <group position={[8, 4.3, -26.4]}>
      <group scale={0.000002} rotation={[0, Math.PI / 5, 0]}>
        <mesh geometry={nodes.Box001_1.geometry}>
          <meshStandardMaterial color="#c1c1c1" />
        </mesh>
      </group>
      <mesh
        geometry={nodes.Box001_1_1.geometry}
        // material={materials["02___Default"]}
      />
      <mesh position={[0.33, 2.23, -2]}>
        <boxGeometry args={[0.92, 1.2, 0.01]} />
        <meshStandardMaterial map={picture} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

useTexture.preload("/images/picture1.jpg");
useGLTF.preload("/models/PictureFrame.glb");
