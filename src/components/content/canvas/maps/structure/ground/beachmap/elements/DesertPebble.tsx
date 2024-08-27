/*
https://poly.pizza/m/fqhwoqMd8A-
Desert pebble by Leigh Garland [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

type Props = {
  position: [number, number, number];
  color: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  receiveShadow?: boolean;
};
export const DesertPebble = ({
  position,
  color,
  scale = [1200, 30, 40],
  rotation = [0, 0, 0],
  receiveShadow = false,
}: Props) => {
  const { nodes }: { nodes: any; materials: any } = useGLTF(
    "/models/DesertPebble.glb"
  );
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh
        geometry={nodes.group536976416.geometry}
        receiveShadow={receiveShadow}
      >
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/DesertPebble.glb");
