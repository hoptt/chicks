/*
https://poly.pizza/m/rVyPMVCGlw
Rubiks Cube by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Cube() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/RubiksCube.glb"
  );
  return (
    <group
      position={[1.2, 8.85, -42.3]}
      rotation={[-Math.PI / 2, 0, 0.2]}
      scale={10}
    >
      <mesh
        geometry={nodes.RubiksCube.geometry}
        material={materials.rubiks_cube_albedo}
      />
    </group>
  );
}

useGLTF.preload("/models/RubiksCube.glb");
