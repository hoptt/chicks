import { Cloud, Sparkles, Stars } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 } from "three";

export function Effects() {
  const vector3 = useMemo(() => new Vector3(10, 10, 10), []);
  return (
    <>
      <Sparkles
        count={30}
        scale={2}
        size={7}
        speed={0.5}
        color={"#fede4e"}
        position={[-6.5, 5, -28]}
      />
      <Stars
        radius={20}
        depth={20}
        count={5000}
        factor={2}
        saturation={0}
        fade
        speed={1}
      />
      <Cloud
        position={[0, 10, -70]}
        opacity={0.2}
        speed={0.2}
        scale={vector3}
        segments={1}
      />
    </>
  );
}
