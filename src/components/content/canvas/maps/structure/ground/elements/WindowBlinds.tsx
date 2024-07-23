import { useGLTF } from "@react-three/drei";

export function WindowBlinds() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WindowBlinds.glb"
  );
  return (
    <group position={[-4.5, 4.7, 2]} rotation-y={[Math.PI / 2]}>
      <mesh
        geometry={nodes.Node.geometry}
        material={materials.mat21}
        scale={0.8}
      />
    </group>
  );
}

useGLTF.preload("/models/WindowBlinds.glb");
