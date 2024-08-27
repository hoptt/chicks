/*
https://poly.pizza/m/tFxdxO5clk
Shrine by Kay Lousberg
*/

import { Html, useCursor, useGLTF } from "@react-three/drei";
import { CircleInteractionPortalWithoutBoundingBox } from "./interactionPortal";
import { useStableArray } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { IsInsideSourceListAtom } from "@/store/InteractionAtom";
import SourceList from "@/components/content/html/source";

export function Shrine() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Shrine.glb");
  // 출처 portal
  const portalRef = useRef<HTMLDivElement | null>(null);
  const isInsideSourceList = useRecoilValue(IsInsideSourceListAtom);
  const [isHover, setIsHover] = useState(false);
  const [isOpenSourceList, setIsOpenSourceList] = useState(false);
  useCursor(isHover);
  const handleCloseSourceList = () => {
    setIsOpenSourceList(false);
  };

  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "source-list";
    portalRef.current.style.position = "fixed";
    portalRef.current.style.top = "0";
    portalRef.current.style.left = "0";
    portalRef.current.style.width = "100%";
    portalRef.current.style.height = "100%";

    document.body.appendChild(portalRef.current);

    return () => {
      // 컴포넌트 언마운트 시 포털 DOM 노드 제거
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInsideSourceList) {
      setIsHover(false);
      setIsOpenSourceList(false);
    }
  }, [isInsideSourceList]);
  useEffect(() => {
    if (portalRef.current)
      portalRef.current!.style.zIndex = isOpenSourceList ? "1" : "-1";
  }, [isOpenSourceList]);
  return (
    <group position={[-9.5, 1.6, 2]}>
      <group
        rotation={[0, Math.PI / 2, 0.2]}
        onClick={(e) => {
          if (!isInsideSourceList) return;
          e.stopPropagation();

          setIsOpenSourceList(true);
        }}
        onPointerEnter={() => {
          if (!isInsideSourceList) return;
          setIsHover(true);
        }}
        onPointerOut={() => {
          if (!isInsideSourceList) return;
          setIsHover(false);
        }}
      >
        {isInsideSourceList && (
          <Html
            style={{ cursor: "pointer", pointerEvents: "none", width: "25px" }}
          >
            <img
              alt="클릭"
              src="/images/mouse_click.webp"
              style={{ transform: "translate(-50%,-70px)" }}
            />
          </Html>
        )}
        {isOpenSourceList && (
          <Html
            wrapperClass="wrapper__initial"
            className="sub__initial"
            transform={false}
            portal={{ current: portalRef.current as HTMLElement }}
          >
            <SourceList closeModal={handleCloseSourceList} />
          </Html>
        )}
        <mesh
          geometry={nodes.shrine.geometry}
          material={materials.HalloweenBits}
          scale={100}
        />
      </group>
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([1.5, 0.25, 0])}
        radius={0.5}
        isTouchDown={true}
      />
    </group>
  );
}

useGLTF.preload("/models/Shrine.glb");
