/*
public domain
*/

import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export function Books() {
  const { nodes, materials } = useGLTF("/models/Books.glb");

  return (
    <group>
      <mesh
        geometry={nodes.Books.geometry}
        material={materials.Material}
        scale={300}
        rotation-y={Math.PI / 2}
        position={[-4.25, 2, 4]}
      />
    </group>
  );
}

useGLTF.preload("/models/Books.glb");
