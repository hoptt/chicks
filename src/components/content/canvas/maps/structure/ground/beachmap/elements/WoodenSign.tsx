/*
https://poly.pizza/m/TzjiI94FC5
Wooden Sign by iPoly3D
*/

import { IsInsideHowToPlayAtom } from "@/store/InteractionAtom";
import { useStableArray } from "@/utils";
import { Html, useCursor, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { CircleInteractionPortalWithoutBoundingBox } from "./interactionPortal";
import HowToPlay from "@/components/content/html/howtoplay";

export function WoodenSign() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WoodenSign.glb"
  );
  // 플레이 방법 portal
  const portalRef = useRef<HTMLDivElement | null>(null);
  const isInsideHowToPlay = useRecoilValue(IsInsideHowToPlayAtom);
  const [isHover, setIsHover] = useState(false);
  const [isOpenHowToPlay, setIsOpenHowToPlay] = useState(false);
  useCursor(isHover);
  const handleCloseHowToPlay = () => {
    setIsOpenHowToPlay(false);
  };

  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "howtoplay";
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
    if (!isInsideHowToPlay) {
      setIsHover(false);
      setIsOpenHowToPlay(false);
    }
  }, [isInsideHowToPlay]);
  useEffect(() => {
    if (portalRef.current)
      portalRef.current!.style.zIndex = isOpenHowToPlay ? "1" : "-1";
  }, [isOpenHowToPlay]);
  return (
    <group
      position={[-1, 2.3, 5]}
      rotation-y={Math.PI}
      onClick={(e) => {
        if (!isInsideHowToPlay) return;
        e.stopPropagation();

        setIsOpenHowToPlay(true);
      }}
      onPointerEnter={() => {
        if (!isInsideHowToPlay) return;
        setIsHover(true);
      }}
      onPointerOut={() => {
        if (!isInsideHowToPlay) return;
        setIsHover(false);
      }}
    >
      {isInsideHowToPlay && (
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
      {isOpenHowToPlay && (
        <Html
          wrapperClass="wrapper__initial"
          className="sub__initial"
          transform={false}
          portal={{ current: portalRef.current as HTMLElement }}
        >
          <HowToPlay closeModal={handleCloseHowToPlay} />
        </Html>
      )}
      <group scale={90}>
        <mesh
          geometry={nodes.Sign7_1.geometry}
          material={materials["Dark Wood"]}
        />
        <mesh
          geometry={nodes.Sign7_2.geometry}
          material={materials["Light Wood"]}
        />
        <mesh geometry={nodes.Sign7_3.geometry} material={materials.Herbs} />
      </group>
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([0, -0.2, 1])}
        radius={0.5}
        isTouchDown={isInsideHowToPlay}
      />
    </group>
  );
}

useGLTF.preload("/models/WoodenSign.glb");
