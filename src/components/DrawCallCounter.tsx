import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";

export default function DrawCallCounter() {
  const { gl } = useThree();
  //   gl.info.autoReset = false;
  const [count, setCount] = useState(0);

  useFrame(() => {
    setCount(gl.info.render.calls);
    // gl.info.reset();
  });
  return (
    <Html
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "white",
        }}
      >
        Calls: {count}
      </div>
    </Html>
  );
}
