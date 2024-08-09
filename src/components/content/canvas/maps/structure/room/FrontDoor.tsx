import { socket } from "@/sockets/clientSocket";
import { IsInsideHouseAtom } from "@/store/InteractionAtom";
import { FrontdoorAtom } from "@/store/ObjectsAtom";
import { useBox } from "@react-three/cannon";
import { Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MetalDoor } from "../ground/elements/MetalDoor";
import { Wall } from "../ground/elements/wall";
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
          {/* <mesh receiveShadow castShadow>
            <boxGeometry args={doorArgs} />
            <meshStandardMaterial color="brown" />
          </mesh> */}
          <MetalDoor
            doorknobPosition={[0.015, 0, 0]}
            position={[0, -0.85, -0.5]}
          />
        </group>
        <group ref={rightdoorRef as any}>
          {/* <mesh receiveShadow castShadow>
            <boxGeometry args={doorArgs} />
            <meshStandardMaterial color="brown" />
          </mesh> */}
          <MetalDoor doorknobPosition={[0, 0, 0]} position={[0, -0.85, -0.5]} />
        </group>
      </group>
      <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        args={[10.07, 0.2, 5]}
        position={[-0.065, 7, -33]}
        color={"#969696"}
        castShadow={false}
        isHidden={isInsideHouse}
      />
      <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        args={[4.5, 0.2, 1.8]}
        position={[-2.8, 3.7, -32.95]}
        color={"#e4e4e4"}
        castShadow={false}
        isHidden={isInsideHouse}
      />
      <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        args={[3.51, 0.2, 1.8]}
        position={[3.22, 3.65, -32.95]}
        color={"#e4e4e4"}
        castShadow={false}
        isHidden={isInsideHouse}
      />
    </>
  );
}
