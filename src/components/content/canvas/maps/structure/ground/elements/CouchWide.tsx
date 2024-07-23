import { useGLTF } from "@react-three/drei";

export function CouchWide() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/CouchWide.glb"
  );
  return (
    <group scale={2.5} rotation={[0, Math.PI, 0]} position={[-3, 0.5, -4]}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat23} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat17}
      />
      <mesh
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat16}
      />
      <mesh
        geometry={nodes["Node-Mesh_3"].geometry}
        material={materials.mat20}
      />
    </group>
  );
}

useGLTF.preload("/models/CouchWide.glb");
