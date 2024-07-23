import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export default function Desk({
  position,
}: {
  position: [number, number, number];
}) {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Drawer.glb");
  const [ref] = useBox(() => ({
    type: "Static",
    args: [1.2, 1.3, 2.8],
    position,
  }));
  return (
    <group ref={ref as any}>
      <group
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={100}
        position-y={-0.7}
      >
        <mesh
          castShadow
          geometry={nodes.Drawer_5_1.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          geometry={nodes.Drawer_5_2.geometry}
          material={materials.Wood_Light}
        />
        <mesh
          castShadow
          geometry={nodes.Drawer_5_3.geometry}
          material={materials.Wood_Dark}
        />
      </group>
    </group>
  );
}
