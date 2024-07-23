import { Cylinder, Text3D } from "@react-three/drei";

const fontUrl = "/fonts/Pretendard.json";
export default function HowToPlay() {
  return (
    <group>
      <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[1.1, 0.25, 7.1]}
        castShadow
      >
        <meshStandardMaterial color="#a8a8a8" />
        <Text3D
          font={fontUrl}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          position={[-0.07, 0.25, -0.38]}
          size={0.5}
        >
          ←
          <meshStandardMaterial color="gray" />
        </Text3D>
      </Cylinder>
      <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[2.1, 0.25, 8.1]}
        castShadow
      >
        <meshStandardMaterial color="#a8a8a8" />
        <Text3D
          font={fontUrl}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          size={0.5}
          position={[-0.07, 0.25, -0.38]}
        >
          →
          <meshStandardMaterial color="gray" />
        </Text3D>
      </Cylinder>
      <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[1.2, 0.25, 9]}
        castShadow
      >
        <meshStandardMaterial color="#a8a8a8" />
        <Text3D
          font={fontUrl}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          position={[-0.07, 0.25, -0.38]}
          size={0.5}
        >
          ↑
          <meshStandardMaterial color="gray" />
        </Text3D>
      </Cylinder>

      <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[3, 0.25, 7.2]}
        castShadow
      >
        <meshStandardMaterial color="#a8a8a8" />
        <Text3D
          font={fontUrl}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          position={[-0.07, 0.25, -0.38]}
          size={0.5}
        >
          ↓
          <meshStandardMaterial color="gray" />
        </Text3D>
      </Cylinder>
      <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[4.5, 0.25, 5.7]}
        castShadow
      >
        <meshStandardMaterial color="#a8a8a8" />
        <Text3D
          font={fontUrl}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
          position={[-0.15, 0.05, 0.35]}
          size={0.3}
        >
          Ctrl
          <meshStandardMaterial color="gray" />
        </Text3D>
      </Cylinder>
      <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[5.5, 0.25, 4.7]}
        castShadow
      >
        <meshStandardMaterial color="#a8a8a8" />
        <Text3D
          font={fontUrl}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
          position={[0, 0.035, 0.2]}
          size={0.35}
        >
          Z
          <meshStandardMaterial color="gray" />
        </Text3D>
      </Cylinder>

      {/* <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[5, 0.25, 5.1]}
        castShadow
      >
        <meshStandardMaterial color="gray" />
      </Cylinder>
      <Cylinder
        args={[0.65, 0.85, 0.45, 4]}
        position={[6.22, 0.25, 3.85]}
        castShadow
      >
        <meshStandardMaterial color="gray" />
      </Cylinder> */}
    </group>
  );
}
