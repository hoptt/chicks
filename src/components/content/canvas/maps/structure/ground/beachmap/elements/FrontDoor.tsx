import { socket } from "@/sockets/clientSocket";
import {
  IsInsideHouseAtom,
  IsInsideHouseDoorAtom,
} from "@/store/InteractionAtom";
import { FrontdoorAtom } from "@/store/ObjectsAtom";
import { useStableArray } from "@/utils";
import { useBox } from "@react-three/cannon";
import { Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MetalDoor } from "./MetalDoor";
import { CircleInteractionPortalWithoutBoundingBox } from "./interactionPortal";

export default function FrontDoor() {
  const isInsideHouseDoor = useRecoilValue(IsInsideHouseDoorAtom);
  const { value: isOpen } = useRecoilValue(FrontdoorAtom);
  const isInsideHouse = useRecoilValue(IsInsideHouseAtom);
  const [isHover, setIsHover] = useState(false);
  //   const [leftRotation, setLeftRotation] = useState(0);
  const [rightRotation, setRightRotation] = useState(0);
  //   const leftDoorPosition: [number, number, number] = [-1, 3.65, -10];
  const rightDoorPosition: [number, number, number] = [6.45, 2.5, -18.45];
  const doorArgs: [number, number, number] = [1, 1.8, 0.05];

  const [rightdoorRef, rightdoorApi] = useBox(() => ({
    type: "Kinematic",
    args: doorArgs,
    position: rightDoorPosition,
  }));

  useCursor(isHover);
  useFrame(() => {
    // if (isOpen && leftRotation < Math.PI / 2) {
    //   setLeftRotation((prev) => Math.min(prev + 0.07, Math.PI / 2));
    // } else if (!isOpen && leftRotation > 0) {
    //   setLeftRotation((prev) => Math.max(prev - 0.07, 0));
    // }
    // leftdoorApi.rotation.set(0, -leftRotation, 0);
    // leftdoorApi.position.set(
    //   leftDoorPosition[0] + Math.cos(leftRotation * 0.75),
    //   leftDoorPosition[1],
    //   Math.sin(leftRotation * 0.5) + leftDoorPosition[2]
    // );

    // 문이 열릴 때와 닫힐 때의 회전 애니메이션
    if (isOpen && rightRotation > -Math.PI / 2) {
      setRightRotation((prev) => Math.max(prev - 0.07, -Math.PI / 2));
    } else if (!isOpen && rightRotation < 0) {
      setRightRotation((prev) => Math.min(prev + 0.07, 0));
    }
    rightdoorApi.rotation.set(0, rightRotation, 0);
    rightdoorApi.position.set(
      rightDoorPosition[0] - Math.cos(rightRotation * 0.6),
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
        {!isInsideHouse && (
          <group position={[5.5, 2.5, -18.5]}>
            <mesh>
              <boxGeometry args={[1.3, 1.95, 0.05]} />
              <meshStandardMaterial color="#663600" transparent opacity={0.8} />
            </mesh>
          </group>
        )}
        <group ref={rightdoorRef as any}>
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
            doorknobPosition={useStableArray([0, 0, 0])}
            position={useStableArray([0, -0.85, -0.5])}
            isHidden={isInsideHouse && !isInsideHouseDoor}
          />
        </group>
      </group>
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([5.55, 1.55, -17.6])}
        radius={0.5}
        isTouchDown={isInsideHouseDoor}
      />
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([5.55, 1.7, -19.5])}
        radius={0.5}
        isTouchDown={isInsideHouseDoor}
      />
    </>
  );
}
