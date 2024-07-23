import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export function WindowLarge() {
  const { nodes, materials } = useGLTF("/models/WindowLarge.glb");

  const [ref, _] = useBox(() => ({
    type: "Static",
    position: [-4.93, 4.5, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [4, 4, 0.2],
  }));
  return (
    <group ref={ref}>
      <group position-y={-1.5} rotation={[-Math.PI / 2, 0, 0]} scale={200}>
        <mesh
          castShadow
          geometry={nodes.Window_Large2_1.geometry}
          material={materials.White}
        />
        {/* <mesh
          geometry={nodes.Window_Large2_2.geometry}
          material={materials.Glass}
        /> */}
      </group>
    </group>
  );
}

useGLTF.preload("/models/WindowLarge.glb");
