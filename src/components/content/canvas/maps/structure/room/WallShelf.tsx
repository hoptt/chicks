/*
https://poly.pizza/m/PSlvyjTt1M
Wall Shelf by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function WallShelf() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WallShelf.glb"
  );
  return (
    <group
      position={[2, 8.5, -42.5]}
      rotation-y={Math.PI / 2}
      scale={[0.7, 0.7, 1.5]}
    >
      <mesh
        geometry={nodes["Cube-Mesh"].geometry}
        // material={materials.Top}
        castShadow
      >
        <meshStandardMaterial color="#c1c1c1" />
      </mesh>
      <mesh
        geometry={nodes["Cube-Mesh_1"].geometry}
        material={materials.Supports}
      />
    </group>
  );
}

useGLTF.preload("/models/WallShelf.glb");
