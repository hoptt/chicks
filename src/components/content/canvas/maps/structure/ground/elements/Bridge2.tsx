/*
https://poly.pizza/m/10nw136Xjl
Bridge by Pixel [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Bridge2() {
  const { nodes, materials } = useGLTF("/models/Bridge.glb");
  return (
    <group name="Root_Scene">
      <group name="RootNode">
        <mesh
          name="Bridge-wooden-lighter"
          geometry={nodes["Bridge-wooden-lighter"].geometry}
          material={materials["Texture-base.014"]}
          position={[2.05, 2, -17.26]}
          rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]}
          scale={[92.5, 90, 240]}
          castShadow
          receiveShadow
        />
      </group>
      {/* <mesh
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -4.1, -17.5]}
        castShadow
      >
        <cylinderGeometry args={[5.7, 5.7, 3, 32]} />
        <meshStandardMaterial color={"#542d00"} />
      </mesh> */}
    </group>
  );
}

useGLTF.preload("/models/Bridge.glb");
