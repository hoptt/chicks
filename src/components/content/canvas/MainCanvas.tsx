import { isDev } from "@/utils";
import { Physics } from "@react-three/cannon";
import { StatsGl } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Light from "./maps/light/Light";
import RootMap from "./maps/RootMap";
import ResizeHandler from "./component/ResizeHandler";
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
        near: 0.1,
        far: 1000,
        position: [12, 12, 12],
      }}
    >
      {/* <OrbitControls /> */}
      <ResizeHandler />
      <Light />
      <Physics allowSleep gravity={[0, -9, 0]}>
        {isDev ? (
          // <Debug>
          <RootMap />
        ) : (
          // </Debug>
          <RootMap />
        )}
      </Physics>

      {isDev && <DrawCallCounter />}
      {isDev && <StatsGl />}
    </Canvas>
  );
}
