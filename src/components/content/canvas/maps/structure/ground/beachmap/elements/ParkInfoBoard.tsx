/*
https://poly.pizza/m/KUjDbhPG3K
Park Info Board by J-Toastie [CC-BY] via Poly Pizza
*/
import Guestbook from "@/components/content/html/guestbook";
import {
  InteractionCriclePortalBoundingBoxAtom,
  IsInsideGuestbookAtom,
} from "@/store/InteractionAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { useStableArray } from "@/utils";
import { Html, useCursor, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Vector3 } from "three";
import { CircleInteractionPortalWithoutBoundingBox } from "./interactionPortal";
const position: [number, number, number] = [-8, 2.8, -3];
export function ParkInfoBoard() {
  const groupRef = useRef<any>();
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/ParkInfoBoard.glb"
  );
  const me = useRecoilValue(MeAtom);
  const IsInsideGuestbook = useRecoilValue(IsInsideGuestbookAtom);
  const setInteractionCriclePortalBoundingBox = useSetRecoilState(
    InteractionCriclePortalBoundingBoxAtom
  );

  // 방명록 portal
  const portalRef = useRef<HTMLDivElement | null>(null);

  const [isHover, setIsHover] = useState(false);
  const [isOpenGuestbook, setIsOpenGuestbook] = useState(false);

  useCursor(isHover);

  const handleCloseGuestbook = () => {
    setIsOpenGuestbook(false);
  };

  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "guestbook";
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
    materials.wood_shade1.color.set("#9b622a");
    materials.wood_shade2.color.set("#a5621f");

    if (!groupRef.current) return;

    const mesh = groupRef.current.children[0];
    const geometry = mesh.geometry;

    if (geometry.boundingBox) {
      const boundingBox = geometry.boundingBox.clone();
      mesh.updateMatrixWorld(true);
      boundingBox.applyMatrix4(mesh.matrixWorld);

      const center = new Vector3();
      boundingBox.getCenter(center);

      const scaledMin = new Vector3().lerpVectors(center, boundingBox.min, 1);
      const scaledMax = new Vector3().lerpVectors(center, boundingBox.max, 1);

      setInteractionCriclePortalBoundingBox((prev) => [
        ...prev,
        {
          name: "ParkInfoBoard",
          box: {
            max: scaledMax,
            min: scaledMin,
          },
          position,
          isMatrixUpdated: true,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (!IsInsideGuestbook) {
      setIsHover(false);
      setIsOpenGuestbook(false);
    }
  }, [IsInsideGuestbook]);

  useEffect(() => {
    if (portalRef.current)
      portalRef.current!.style.zIndex = isOpenGuestbook ? "1" : "-1";
  }, [isOpenGuestbook]);

  useEffect(() => {
    if (!IsInsideGuestbook) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === "F") {
        setIsOpenGuestbook(true);
        window.removeEventListener("keydown", handleKeyDown);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [IsInsideGuestbook]);

  return (
    <>
      <group
        ref={groupRef}
        position={position}
        rotation={[-Math.PI / 2, 0, Math.PI / 3]}
        scale={[150, 70, 100]}
        onClick={(e) => {
          if (!IsInsideGuestbook) return;
          e.stopPropagation();

          setIsOpenGuestbook(true);
        }}
        onPointerEnter={() => {
          if (!IsInsideGuestbook) return;
          setIsHover(true);
        }}
        onPointerOut={() => {
          if (!IsInsideGuestbook) return;
          setIsHover(false);
        }}
      >
        {IsInsideGuestbook && (
          <Html
            style={{ cursor: "pointer", pointerEvents: "none", width: "25px" }}
          >
            <img
              alt="클릭"
              src="/images/mouse_click.webp"
              style={{ transform: "translate(-50%,-10px)" }}
            />
            <span
              className="shorten__key"
              style={{
                transform: "translate(-50%, -80px)",
              }}
            >
              [ F ]
            </span>
          </Html>
        )}
        {isOpenGuestbook && (
          <Html
            wrapperClass="wrapper__initial"
            className="sub__initial"
            transform={false}
            portal={{ current: portalRef.current as HTMLElement }}
          >
            <Guestbook closeModal={handleCloseGuestbook} player={me!} />
          </Html>
        )}
        <mesh
          geometry={nodes.ParkInfoBoard_1.geometry}
          material={materials.wood_shade1}
          // castShadow
        />

        <mesh
          geometry={nodes.ParkInfoBoard_2.geometry}
          material={materials.board}
          // castShadow
        />
        <mesh
          geometry={nodes.ParkInfoBoard_3.geometry}
          material={materials.wood_shade2}
          // castShadow
        />
      </group>
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([
          position[0] + 2,
          position[1] - 1,
          position[2] + 1,
        ])}
        radius={0.5}
        isTouchDown={IsInsideGuestbook}
      />
    </>
  );
}

useGLTF.preload("/models/ParkInfoBoard.glb");
