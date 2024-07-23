/*
CC BY Licesense
*/

import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export function Charizard() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Charizard.glb"
  );
  const [ref] = useBox(() => ({
    mass: 1,
    position: [-4.2, 3.8, 3.7],
    args: [0.52, 0.43, 0.2],
    rotation: [0, -Math.PI / 2, 0],
  }));
  return (
    <group ref={ref as any}>
      <group scale={0.5} position={[0, -0.1, 0]}>
        <mesh
          geometry={nodes.group434900071.geometry}
          material={materials.mat14}
        />
        <mesh
          geometry={nodes.mesh746345194.geometry}
          material={materials.mat13}
        />
        <mesh
          geometry={nodes.mesh746345194_1.geometry}
          material={materials.mat12}
        />
        <mesh
          geometry={nodes.mesh746345194_2.geometry}
          material={materials.mat21}
        />
        <mesh
          geometry={nodes.mesh746345194_3.geometry}
          material={materials.mat23}
        />
        <mesh
          geometry={nodes.mesh746345194_4.geometry}
          material={materials.mat11}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/Charizard.glb");
