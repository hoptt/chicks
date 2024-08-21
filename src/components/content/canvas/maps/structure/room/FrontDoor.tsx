import { socket } from "@/sockets/clientSocket";
import { IsInsideHouseAtom } from "@/store/InteractionAtom";
import { FrontdoorAtom } from "@/store/ObjectsAtom";
import { useStableArray } from "@/utils";
import { useBox } from "@react-three/cannon";
import { Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CircleInteractionPortalWithoutBoundingBox } from "../ground/elements/interactionPortal";
import { MetalDoor } from "../ground/elements/MetalDoor";
import { Wall, WallTexture } from "../ground/elements/wall";
import { usePortal } from "./usePortal";

export default function FrontDoor() {
  const { value: isOpen } = useRecoilValue(FrontdoorAtom);
  const { isInsideHouseDoor } = usePortal();
  const isInsideHouse = useRecoilValue(IsInsideHouseAtom);
  const [isHover, setIsHover] = useState(false);
  const [leftRotation, setLeftRotation] = useState(0);
  const [rightRotation, setRightRotation] = useState(0);
  const leftDoorPosition: [number, number, number] = [-1, 3.65, -32.95];
  const rightDoorPosition: [number, number, number] = [2, 3.65, -32.95];
  const doorArgs: [number, number, number] = [1, 1.7, 0.25];
  const [leftdoorRef, leftdoorApi] = useBox(() => ({
    type: "Kinematic",
    args: doorArgs,
    position: leftDoorPosition,
  }));
  const [rightdoorRef, rightdoorApi] = useBox(() => ({
    type: "Kinematic",
    args: doorArgs,
    position: rightDoorPosition,
  }));

  useCursor(isHover);
  useFrame(() => {
    if (isOpen && leftRotation < Math.PI / 2) {
      setLeftRotation((prev) => Math.min(prev + 0.07, Math.PI / 2));
    } else if (!isOpen && leftRotation > 0) {
      setLeftRotation((prev) => Math.max(prev - 0.07, 0));
    }
    leftdoorApi.rotation.set(0, -leftRotation, 0);
    leftdoorApi.position.set(
      leftDoorPosition[0] + Math.cos(leftRotation * 0.75),
      leftDoorPosition[1],
      Math.sin(leftRotation * 0.5) + leftDoorPosition[2]
    );

    // 문이 열릴 때와 닫힐 때의 회전 애니메이션
    if (isOpen && rightRotation < Math.PI / 2) {
      setRightRotation((prev) => Math.min(prev + 0.07, Math.PI / 2));
    } else if (!isOpen && rightRotation > 0) {
      setRightRotation((prev) => Math.max(prev - 0.07, 0));
    }
    rightdoorApi.rotation.set(0, rightRotation, 0);
    rightdoorApi.position.set(
      rightDoorPosition[0] - Math.cos(rightRotation * 0.75),
      rightDoorPosition[1],
      Math.sin(rightRotation * 0.5) + rightDoorPosition[2]
    );
  });

  useEffect(() => {
    if (!isInsideHouseDoor) {
      setIsHover(false);
    }
  }, [isInsideHouseDoor]);
  return (
    <>
      <group
        onClick={() => {
          if (!isInsideHouseDoor) return;
          socket.emit("frontdoor", !isOpen);
        }}
        onPointerEnter={() => {
          if (!isInsideHouseDoor) return;
          setIsHover(true);
        }}
        onPointerOut={() => {
          if (!isInsideHouseDoor) return;
          setIsHover(false);
        }}
      >
        <group ref={leftdoorRef as any}>
          {isInsideHouseDoor && (
            <Html
              style={{
                cursor: "pointer",
                pointerEvents: "none",
                width: "25px",
              }}
            >
              <img
                alt="클릭"
                src="/images/mouse_click.webp"
                style={{ transform: "translate(-50%,-10px)" }}
              />
            </Html>
          )}

          <MetalDoor
            doorknobPosition={useStableArray([0.015, 0, 0])}
            position={useStableArray([0, -0.85, -0.5])}
            isHidden={isInsideHouse && !isInsideHouseDoor}
          />
        </group>
        {!isInsideHouse && (
          <group position={[0.5, 3.45, -33.1]}>
            <mesh>
              <boxGeometry args={[2, 2, 0.1]} />
              <meshStandardMaterial color="#3d9300" transparent opacity={0.5} />
            </mesh>
          </group>
        )}

        <group ref={rightdoorRef as any}>
          <MetalDoor
            doorknobPosition={useStableArray([0, 0, 0])}
            position={useStableArray([0, -0.85, -0.5])}
            isHidden={isInsideHouse && !isInsideHouseDoor}
          />
        </group>
      </group>
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([0.35, 2.8, -33.7])}
        radius={0.5}
        isTouchDown={isInsideHouseDoor}
      />
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([0.35, 1.5, -32.3])}
        radius={0.5}
        isTouchDown={isInsideHouseDoor}
      />

      {/* 가벽 2 */}

      <Wall
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10.2, 0.2, 1.85])}
        position={useStableArray([0, 8.65, -32.99])}
        color={"#787878"}
        castShadow={false}
        isHidden={isInsideHouse}
        transparent
        opacity={0.8}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10.2, 0.2, 3.25])}
        position={useStableArray([0, 6.1, -32.8])}
        color={"#e4e4e4"}
        castShadow={false}
        isHidden={isInsideHouse}
        repeat={1}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([4.5, 0.2, 1.8])}
        position={useStableArray([-2.8, 3.65, -32.99])}
        color={"#e4e4e4"}
        castShadow={false}
        isHidden={isInsideHouse}
        repeat={1}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([3.65, 0.2, 1.8])}
        position={useStableArray([3.28, 3.65, -32.99])}
        color={"#e4e4e4"}
        castShadow={false}
        isHidden={isInsideHouse}
        repeat={1}
      />
    </>
  );
}
