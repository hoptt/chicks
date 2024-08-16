import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function DrawCallCounter() {
  const { gl } = useThree();
  //   gl.info.autoReset = false;
  const [count, setCount] = useState(0);

  // portal
  const portalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "etcdev";
    portalRef.current.style.position = "fixed";
    portalRef.current.style.top = "0";
    portalRef.current.style.left = "0";
    portalRef.current.style.width = "100%";
    portalRef.current.style.height = "5%";
    portalRef.current.style.zIndex = "1";

    document.body.appendChild(portalRef.current);

    return () => {
      // 컴포넌트 언마운트 시 포털 DOM 노드 제거
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);
  useFrame(() => {
    setCount(gl.info.render.calls);
    // gl.info.reset();
  });
  // etcdev
  return (
    <Html
      wrapperClass="wrapper__initial"
      className="sub__initial"
      portal={{ current: portalRef.current as HTMLElement }}
    >
      <div className="flex justify-center text-white text-xl">
        Calls: {count}
      </div>
    </Html>
  );
}
