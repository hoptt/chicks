import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Settings() {
  // portal
  const portalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "settings";
    portalRef.current.style.position = "fixed";
    portalRef.current.style.bottom = "0";
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

  return (
    <Html
      wrapperClass="wrapper__initial"
      className="sub__initial"
      portal={{ current: portalRef.current as HTMLElement }}
    >
      <div className="flex h-full justify-between items-end p-2">
        <span className="text-xs">© 2024 CHICKSFLY ALL RIGHTS RESERVED</span>
      </div>
    </Html>
  );
}
