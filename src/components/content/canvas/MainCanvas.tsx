import { Canvas } from "@react-three/fiber";
import Light from "./maps/light/Light";
import { Box, OrbitControls, Stats } from "@react-three/drei";
import GroundElements from "./maps/structure/ground";
import { Debug, Physics } from "@react-three/cannon";
import DrawCallCounter from "@/components/DrawCallCounter";

export default function MainCanvas() {
  const aspectRatio = window.innerWidth / window.innerHeight;

  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows
      camera={{
        fov: 45,
        aspect: aspectRatio,
        near: 0.01,
        far: 100000,
        position: [12, 12, 12],
      }}
    >
      {/* <OrbitControls /> */}
      <Light />
      <Physics broadphase="SAP" allowSleep gravity={[0, -9, 0]}>
        {/* <Debug> */}
        {/* <Box args={[1, 1, 1]} castShadow>
            <meshStandardMaterial color="hotpink" />
          </Box> */}
        <GroundElements />
        {/* </Debug> */}
      </Physics>
      <DrawCallCounter />
    </Canvas>
  );
}
