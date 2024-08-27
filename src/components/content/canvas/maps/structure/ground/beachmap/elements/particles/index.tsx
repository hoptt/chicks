import { PointMaterial, Points } from "@react-three/drei";
import { useMemo, useRef } from "react";

export function SandParticles() {
  const pointsRef = useRef<any>();

  // 모래 입자를 위한 위치 데이터를 생성
  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 2;
      const z = (Math.random() - 0.3) * 35;

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, []);

  const pointsRef2 = useRef<any>();

  // 모래 입자를 위한 위치 데이터를 생성
  const particles2 = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 2;
      const z = (Math.random() - 0.3) * 35;

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, []);
  return (
    <group rotation-x={-0.1}>
      <Points ref={pointsRef} positions={particles}>
        <PointMaterial
          color="#d2b48c" // 모래와 비슷한 색상
          size={0.05}
          sizeAttenuation={true}
        />
      </Points>
      <Points ref={pointsRef2} positions={particles2}>
        <PointMaterial
          color="#272727" // 모래와 비슷한 색상
          size={0.05}
          sizeAttenuation={true}
        />
      </Points>
    </group>
  );
}
