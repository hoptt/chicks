import { useEffect, useRef } from "react";
import { Object3D } from "three";

export default function Light() {
  const directionalLightRef = useRef<any>(null);
  const target = useRef(new Object3D());

  useEffect(() => {
    if (!directionalLightRef.current) return;

    target.current.position.set(0, 0, -30); // 타겟 위치 설정
    directionalLightRef.current.target = target.current;
  }, []);
  return (
    <>
      <ambientLight name="ambientLight" intensity={0.5} />
      <directionalLight
        ref={directionalLightRef}
        castShadow
        intensity={0.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[-50, 20, 0]}
        shadow-normalBias={0.1}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      />
    </>
  );
}
