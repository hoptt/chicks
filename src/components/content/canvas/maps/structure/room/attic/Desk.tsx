/*
https://poly.pizza/m/OhXey2fljr
Computer Desk by Zsky [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Desk() {
  const { nodes }: { nodes: any; materials: any } = useGLTF(
    "/models/ComputerDesk.glb"
  );
  return (
    <group
      position={[-3.5, 7.9, -35]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      scale={[150, 150, 100]}
    >
      <mesh geometry={nodes.ComputerDesk1.geometry} castShadow receiveShadow>
        <meshStandardMaterial color={"#c4c4c4"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/ComputerDesk.glb");
