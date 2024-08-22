import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Loader() {
  // portal
  const portalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "loading";
    portalRef.current.style.position = "fixed";
    portalRef.current.style.top = "0";
    portalRef.current.style.left = "0";
    portalRef.current.style.width = "100%";
    portalRef.current.style.height = "100%";
    portalRef.current.style.zIndex = "1";

    document.body.appendChild(portalRef.current);

    return () => {
      // 컴포넌트 언마운트 시 포털 DOM 노드 제거
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  return (
    <Html
      wrapperClass="wrapper__initial"
      className="sub__initial"
      portal={{ current: portalRef.current as HTMLElement }}
    >
      <div className="flex justify-center items-center h-full">
        <div className="ring__loader">
          <div />
          <span />
          <p>Loading...</p>
        </div>
      </div>
    </Html>
  );
}
