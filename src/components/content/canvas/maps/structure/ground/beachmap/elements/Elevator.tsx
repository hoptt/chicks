import { socket } from "@/sockets/clientSocket";
import {
  IsInsideElevatorAtom,
  IsInsideElevatorIndoorDoorAtom,
  IsInsideElevatorRooftopDoorAtom,
} from "@/store/InteractionAtom";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { useStableArray } from "@/utils";
import { useBox } from "@react-three/cannon";
import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { BoxGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { CircleInteractionPortalWithoutBoundingBox } from "./interactionPortal";

const floor1Y = 1.5;
const floor2Y = 7.4;

const floor1LeftDoorX = 15;
const floor1RightDoorX = 15.85;
const floor1DoorY = 2.4;

const floor2DoorX = 13.95;
const floor2LeftDoorZ = -27.1;
const floor2RightDoorZ = -27.95;
const floor2DoorY = 8.4;

const elevatorX = 15.3;
const elevatorZ = -27.43;

const floor1DoorZ = -26;

const fontUrl = "/fonts/Pretendard.json";
const fontStyle = {
  font: fontUrl,
  size: 0.25,
  letterSpacing: 0.01,
  height: 0.02,
  bevelEnabled: true,
  bevelOffset: 0.005,
  bevelSize: 0.001,
  bevelThickness: 0.001,
};

export default function Elevator() {
  const me = useRecoilValue(MeAtom);
  // const isInsideHouse = useRecoilValue(IsInsideHouseAtom);
  const objects = useRecoilValue(ObjectsAtom);

  // (로컬) 은 후에 서버로 보내 동기화 해주어야함

  // 1층 엘레베이터 문앞인지 (로컬)
  const isInsideElevatorIndoorDoorLocal = useRecoilValue(
    IsInsideElevatorIndoorDoorAtom
  );
  // 옥상 엘레베이터 문앞인지 (로컬)
  const isInsideElevatorRooftopDoorLocal = useRecoilValue(
    IsInsideElevatorRooftopDoorAtom
  );
  // 엘레베이터 안에 있는지 (로컬)
  const isInsideElevatorLocal = useRecoilValue(IsInsideElevatorAtom);

  // 서버에서 받은 현재 엘레베이터 층
  const floor = objects.find((o) => o.name === "elevator")!.value;

  // 서버에서 받은 현재 1층 엘레베이터 문앞에 있는 유저 배열
  const isInsideElevatorIndoorDoor = objects.find(
    (o) => o.name === "elevatorIndoorDoor"
  )!.value as string[];
  // 서버에서 받은 현재 옥상 엘레베이터 문앞에 있는 유저 배열
  const isInsideElevatorRooftopDoor = objects.find(
    (o) => o.name === "elevatorRooftopDoor"
  )!.value as string[];
  // 서버에서 받은 현재 엘레베이터가 작동중인지 (작동중일땐 조작못하도록)
  const elevatorIsOperation = objects.find(
    (o) => o.name === "elevatorIsOperation"
  )!.value;
  // 서버에서 받은 현재 엘레베이터 안에 있는 유저 배열
  const isInsideElevator = objects.find((o) => o.name === "elevatorInPeople")!
    .value as string[];

  const isInsideElevaterMe =
    isInsideElevator.findIndex((a) => a === me!.id) !== -1;
  const isInsideRooftopDoorMe =
    isInsideElevatorRooftopDoor.findIndex((a) => a === me!.id) !== -1;

  // 엘레베이터가 작동중인지 (로컬)
  const [elevatorIsOperationLocal, setElevatorIsOperationLocal] = useState(
    () => elevatorIsOperation
  );
  const leftdoor = useRef(0);
  const rightdoor = useRef(0);
  const leftdoor_rooftop = useRef(0);
  const rightdoor_rooftop = useRef(0);

  const floor_1 = useRef(new Vector3(0, floor1Y, 0));
  const floor_2 = useRef(new Vector3(0, floor2Y, 0));

  // 엘레베이터 화살표 애니메이션
  const direction = useRef(0);
  const goUpRef = useRef<any>();
  const goDownRef = useRef<any>();
  const goUpRooftopRef = useRef<any>();
  const goDownRooftopRef = useRef<any>();

  const [elevatorRef, elevatorApi] = useBox(() => ({
    type: "Kinematic",
    material: "ground",
    position: [elevatorX, floor === 2 ? floor2Y : floor1Y, elevatorZ],
    args: [2.35, 0.25, 2.3],
  }));

  const [firstLeftDoorRef, firstLeftDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [floor1LeftDoorX, floor1DoorY, floor1DoorZ],
    args: [0.2, 1.7, 0.89],
    rotation: [0, Math.PI / 2, 0],
  }));
  const [firstRightDoorRef, firstRightDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [floor1RightDoorX, floor1DoorY, floor1DoorZ],
    args: [0.2, 1.7, 0.9],
    rotation: [0, Math.PI / 2, 0],
  }));
  const [rooftopLeftDoorRef, rooftopLeftDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [floor2DoorX, floor2DoorY, floor2LeftDoorZ],
    args: [0.2, 1.7, 0.89],
  }));
  const [rooftopRightDoorRef, rooftopRightDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [floor2DoorX, floor2DoorY, floor2RightDoorZ],
    args: [0.2, 1.7, 0.9],
  }));

  // (로컬) => 서버
  useEffect(() => {
    if (isInsideElevatorIndoorDoorLocal) {
      socket.emit("elevatorIndoorDoor", me?.id);
    } else {
      socket.emit("elevatorIndoorDoor", null);
    }
  }, [isInsideElevatorIndoorDoorLocal]);

  // (로컬) => 서버
  useEffect(() => {
    if (isInsideElevatorRooftopDoorLocal) {
      socket.emit("elevatorRooftopDoor", me?.id);
    } else {
      socket.emit("elevatorRooftopDoor", null);
    }
  }, [isInsideElevatorRooftopDoorLocal]);

  // 엘레베이터가 작동중이 아니고, 엘레베이터 문앞에 있으면서 문이 완전히 닫혔을 때
  // 해당 층수로 엘레베이터가 작동하도록 서버에 전송
  useEffect(() => {
    if (!elevatorIsOperation) {
      if (
        isInsideElevatorIndoorDoor.length > 0 &&
        leftdoor_rooftop.current < 0.01
      ) {
        socket.emit("elevator", 1);
      }
      if (isInsideElevatorRooftopDoor.length > 0 && leftdoor.current < 0.01) {
        socket.emit("elevator", 2);
      }
    }
  }, [
    elevatorIsOperation,
    isInsideElevatorIndoorDoor.length,
    isInsideElevatorRooftopDoor.length,
  ]);

  // (로컬) => 서버
  useEffect(() => {
    if (isInsideElevatorLocal) {
      socket.emit("elevatorInPeople", me?.id);
    } else {
      socket.emit("elevatorInPeople", null);
    }
  }, [isInsideElevatorLocal]);

  // (로컬) => 서버
  useEffect(() => {
    socket.emit("elevatorIsOperation", elevatorIsOperationLocal);
  }, [elevatorIsOperationLocal]);

  useEffect(() => {
    if (!elevatorRef.current) return;

    const unobserve = elevatorApi.position.subscribe((v) => {
      const y = v[1];
      const currentPosY = new Vector3(0, y, 0);
      /**
       * [동작원리]
       * 서버에 현재 엘레베이터가 이동할 층을 보내고,
       * 서버에서 받은 이동할 층과 현재 엘레베이터의 위치를 y축으로 비교하고 계산시켜 이동
       *
       * [엘레베이터 작동(operation)중인것으로 판단]
       * (1)엘레베이터안에 사람이 있으면서 문이 닫히고 이동할 때
       * (2)이동할 층과 현재 엘레베이터의 위치를 y축으로 비교하여 계산시켜 이동중일 때
       *
       * [문이 열리는 기준]
       * 엘레베이터가 해당 층수에 (도착) 혹은 (정지)해 있다면
       * (1)(정지) 문앞에 사람이 있을 때
       * (2)(도착) 엘레베이터 안에 사람이 있을 때
       */

      if (floor === 1) {
        if (currentPosY.distanceTo(floor_1.current) > 0.05) {
          const distance = currentPosY
            .clone()
            .sub(floor_1.current)
            .normalize()
            .multiplyScalar(0.03);

          currentPosY.sub(distance);

          elevatorApi.position.set(elevatorX, currentPosY.y, elevatorZ);
          setElevatorIsOperationLocal(true);
          direction.current = 1;
        } else {
          direction.current = 0;
          if (isInsideElevator.length > 0) {
            if (leftdoor.current < 0.01) {
              if (!elevatorIsOperation) {
                setElevatorIsOperationLocal(true);
                socket.emit("elevator", 2);
                return;
              }
            }
          } else {
            setElevatorIsOperationLocal(false);
          }

          if (isInsideElevatorIndoorDoor.length > 0 || elevatorIsOperation) {
            if (leftdoor.current < 0.9) {
              leftdoor.current += 0.02;
            }
            if (rightdoor.current > -0.9) {
              rightdoor.current -= 0.02;
            }
          } else {
            if (leftdoor.current > 0) {
              leftdoor.current -= 0.02;
            }
            if (rightdoor.current < 0) {
              rightdoor.current += 0.02;
            }
          }
          firstLeftDoorApi.position.set(
            floor1LeftDoorX - leftdoor.current,
            floor1DoorY,
            floor1DoorZ
          );
          firstRightDoorApi.position.set(
            floor1RightDoorX - rightdoor.current,
            floor1DoorY,
            floor1DoorZ
          );
        }
      } else if (floor === 2) {
        if (currentPosY.distanceTo(floor_2.current) > 0.05) {
          const distance = currentPosY
            .clone()
            .sub(floor_2.current)
            .normalize()
            .multiplyScalar(0.03);

          currentPosY.sub(distance);

          elevatorApi.position.set(elevatorX, currentPosY.y, elevatorZ);
          setElevatorIsOperationLocal(true);
          direction.current = 2;
        } else {
          direction.current = 0;
          if (isInsideElevator.length > 0) {
            if (leftdoor_rooftop.current < 0.01) {
              if (!elevatorIsOperation) {
                socket.emit("elevator", 1);
                setElevatorIsOperationLocal(true);
                return;
              }
            }
          } else {
            setElevatorIsOperationLocal(false);
          }
          if (isInsideElevatorRooftopDoor.length > 0 || elevatorIsOperation) {
            if (leftdoor_rooftop.current < 0.9) {
              leftdoor_rooftop.current += 0.02;
            }
            if (rightdoor_rooftop.current > -0.9) {
              rightdoor_rooftop.current -= 0.02;
            }
          } else {
            if (leftdoor_rooftop.current > 0) {
              leftdoor_rooftop.current -= 0.02;
            }
            if (rightdoor_rooftop.current < 0) {
              rightdoor_rooftop.current += 0.02;
            }
          }
          rooftopLeftDoorApi.position.set(
            floor2DoorX,
            floor2DoorY,
            floor2LeftDoorZ + leftdoor_rooftop.current
          );
          rooftopRightDoorApi.position.set(
            floor2DoorX,
            floor2DoorY,
            floor2RightDoorZ + rightdoor_rooftop.current
          );
        }
      }
    });

    return () => unobserve();
  }, [
    floor,
    isInsideElevatorRooftopDoor.length,
    isInsideElevatorIndoorDoor.length,
    elevatorIsOperation,
    isInsideElevator.length,
  ]);

  useFrame(({ clock }) => {
    if (direction.current === 1) {
      const elapsedTime = clock.getElapsedTime() * 2;
      const colorValue = (Math.sin(elapsedTime * 2) + 1) / 2; // 값을 0에서 1 사이로 변환
      if (goDownRef.current) {
        goDownRef.current.color.setRGB(colorValue, colorValue, colorValue);
      }
      if (goDownRooftopRef.current) {
        goDownRooftopRef.current.color.setRGB(
          colorValue,
          colorValue,
          colorValue
        );
      }
    } else if (direction.current === 2) {
      const elapsedTime = clock.getElapsedTime() * 2;
      const colorValue = (Math.sin(elapsedTime * 2) + 1) / 2; // 값을 0에서 1 사이로 변환
      if (goUpRef.current) {
        goUpRef.current.color.setRGB(colorValue, colorValue, colorValue);
      }
      if (goUpRooftopRef.current) {
        goUpRooftopRef.current.color.setRGB(colorValue, colorValue, colorValue);
      }
    } else {
      if (
        !goUpRef.current ||
        !goDownRef.current ||
        !goUpRooftopRef.current ||
        !goDownRooftopRef.current
      )
        return;
      goUpRef.current.color.setRGB(1, 1, 1);
      goDownRef.current.color.setRGB(1, 1, 1);
      goUpRooftopRef.current.color.setRGB(1, 1, 1);
      goDownRooftopRef.current.color.setRGB(1, 1, 1);
    }
  });
  return (
    <>
      <group ref={elevatorRef as any} name="elevator">
        <mesh>
          <boxGeometry args={[2.35, 0.25, 2.3]} />
          <meshStandardMaterial color="#8b8371" />
        </mesh>
      </group>
      <InnerWall />
      {!isInsideElevaterMe && !isInsideRooftopDoorMe && <OuterWall />}

      <group position={[15.25, 3.5, -26.13]}>
        <Text3D
          {...(fontStyle as any)}
          rotation={[0, 0, Math.PI / 2]}
          position={[-0.2, 0, 0.21]}
        >
          {">"}
          <meshBasicMaterial ref={goUpRef} />
        </Text3D>

        <Text3D
          {...(fontStyle as any)}
          rotation={[0, 0, 0]}
          position={[0, 0, 0.2]}
        >
          1F
          <meshNormalMaterial />
        </Text3D>
        <Text3D
          {...(fontStyle as any)}
          rotation={[0, 0, Math.PI / 2]}
          position={[0.8, 0.05, 0.21]}
        >
          {"<"}
          <meshBasicMaterial ref={goDownRef} />
        </Text3D>
      </group>

      <group position={[14.25, 9.6, -27.3]}>
        <Text3D
          {...(fontStyle as any)}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          position={[0, 0, 0.7]}
        >
          {">"}
          <meshBasicMaterial ref={goUpRooftopRef} />
        </Text3D>

        <Text3D
          {...(fontStyle as any)}
          rotation={[0, Math.PI / 2, 0]}
          position={[0, 0, 0.2]}
        >
          2F
          <meshNormalMaterial />
        </Text3D>
        <Text3D
          {...(fontStyle as any)}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          position={[0, 0, -0.8]}
        >
          {"<"}
          <meshBasicMaterial ref={goDownRooftopRef} />
        </Text3D>
      </group>

      <group ref={firstLeftDoorRef as any}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.2, 1.7, 0.9]} />
          <meshStandardMaterial
            metalness={0.8}
            color="#f9f8f8"
            roughness={0.5}
          />
        </mesh>
      </group>
      <group ref={firstRightDoorRef as any}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.2, 1.7, 0.9]} />
          <meshStandardMaterial
            metalness={0.8}
            color="#f9f8f8"
            roughness={0.5}
          />
        </mesh>
      </group>
      <group ref={rooftopLeftDoorRef as any}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.2, 1.7, 0.9]} />
          <meshStandardMaterial
            metalness={0.8}
            color="#f9f8f8"
            roughness={0.5}
          />
        </mesh>
      </group>
      <group ref={rooftopRightDoorRef as any}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.2, 1.7, 0.9]} />
          <meshStandardMaterial
            metalness={0.8}
            color="#f9f8f8"
            roughness={0.5}
          />
        </mesh>
      </group>
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([15.5, 1.55, -25])}
        radius={0.5}
        isTouchDown={isInsideElevatorIndoorDoor.length > 0}
      />

      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([13, 7.55, -27.6])}
        radius={0.5}
        isTouchDown={isInsideElevatorRooftopDoor.length > 0}
      />
    </>
  );
}
const InnerWall = () => {
  const mergedGeometry = useMemo(() => {
    const geometries = [];

    const box1 = new BoxGeometry(2.55, 10, 0.25);
    box1.translate(15.3, 5, -28.5);
    geometries.push(box1);
    const box2 = new BoxGeometry(0.1, 6.1, 2.5);
    box2.translate(14, 4.5, -27.5);
    geometries.push(box2);
    const box3 = new BoxGeometry(2.5, 0.25, 2.4);
    box3.translate(15.25, 1.4, -27.5);
    geometries.push(box3);

    const box4 = new BoxGeometry(0.25, 0.6, 2.45);
    box4.translate(14.12, 9.7, -27.4);
    geometries.push(box4);

    const box5 = new BoxGeometry(0.2, 2, 1);
    box5.translate(13.96, 8.5, -26.2);
    geometries.push(box5);

    // 모든 지오메트리를 병합
    const mergedGeometry = mergeBufferGeometries(geometries);

    return mergedGeometry;
  }, []);

  return (
    <mesh geometry={mergedGeometry as any}>
      <meshStandardMaterial color={"#6d4e20"} />
    </mesh>
  );
};

const OuterWall = () => {
  const mergedGeometry = useMemo(() => {
    const geometries = [];

    const box1 = new BoxGeometry(2.5, 6.85, 0.25);
    box1.translate(15.25, 6.58, -26.3);
    geometries.push(box1);

    const box2 = new BoxGeometry(0.55, 2, 0.25);
    box2.translate(14.25, 2.5, -26);
    geometries.push(box2);

    const box3 = new BoxGeometry(1, 10, 3);
    box3.translate(16.9, 4.99999, -27.115);
    geometries.push(box3);

    const box4 = new BoxGeometry(2.4, 0.2, 2.4);
    box4.translate(15.35, 9.9, -27.37);
    geometries.push(box4);

    // 모든 지오메트리를 병합
    const mergedGeometry = mergeBufferGeometries(geometries);

    return mergedGeometry;
  }, []);

  return (
    <mesh geometry={mergedGeometry as any}>
      <meshStandardMaterial color={"#6d4e20"} />
    </mesh>
  );
};
