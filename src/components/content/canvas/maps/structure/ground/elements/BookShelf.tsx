/*
public domain
*/

import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export function BookShelf() {
  const { nodes, materials } = useGLTF("/models/Bookshelf.glb");
  const { nodes: nodes2, materials: materials2 } = useGLTF("/models/Books.glb");
  const [ref] = useBox(() => ({
    mass: 1,
    position: [-4.25, 2, 4],
    rotation: [0, Math.PI / 2, 0],
    args: [1.8, 3.9, 0.7],
  }));
  return (
    <group ref={ref}>
      <mesh
        geometry={nodes.Bookshelf.geometry}
        material={materials.Material}
        scale={300}
        position={[0, -2, 0]}
      >
        <meshStandardMaterial color="rgb(194, 172, 143)" />
      </mesh>
      <mesh
        geometry={nodes2.Books.geometry}
        material={materials2.Material}
        scale={300}
        rotation-y={Math.PI / 2}
        // position={[-4.25, 2, 4]}
      />
    </group>
  );
}

useGLTF.preload("/models/Books.glb");
useGLTF.preload("/models/Bookshelf.glb");
