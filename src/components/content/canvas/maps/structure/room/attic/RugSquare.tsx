/*
https://poly.pizza/m/7H5qKjuxVY
Rug by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function RugSquare() {
  const { nodes }: { nodes: any; materials: any } = useGLTF(
    "/models/RugSquare.glb"
  );
  return (
    <group position={[2.3, 7.55, -36.5]} scale={[2, 1, 2]}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Carpet_1_1.geometry}
          //   material={materials.DarkRed}
          receiveShadow
        >
          <meshStandardMaterial color={"#9f9f9f"} />
        </mesh>
        <mesh
          geometry={nodes.Carpet_1_2.geometry}
          //   material={materials.LightOrange}
        >
          <meshStandardMaterial color={"#e4e4e4"} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/RugSquare.glb");
