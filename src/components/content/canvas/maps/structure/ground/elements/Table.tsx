import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export default function Table({
  position,
}: {
  position: [number, number, number];
}) {
  const { nodes, materials } = useGLTF("/models/Table.glb");
  const [ref] = useBox(() => ({
    type: "Static",
    args: [1.3, 0.8, 3],
    position,
  }));
  return (
    <group ref={ref}>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
        position={[0, -0.5, 0]}
      >
        <mesh
          geometry={nodes.Table_1.geometry}
          material={materials.DarkWood}
          castShadow
        />
        <mesh
          geometry={nodes.Table_2.geometry}
          material={materials.Wood}
          castShadow
        />
      </group>
    </group>
  );
}
