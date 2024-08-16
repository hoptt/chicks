import { socket } from "@/sockets/clientSocket";
import {
  IsInsideElevatorAtom,
  IsInsideElevatorIndoorDoorAtom,
  IsInsideElevatorRooftopDoorAtom,
  IsInsideHouseAtom,
} from "@/store/InteractionAtom";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { useStableArray } from "@/utils";
import { useBox, useCompoundBody } from "@react-three/cannon";
import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Vector3 } from "three";
import { CircleInteractionPortalWithoutBoundingBox } from "../ground/elements/interactionPortal";
import { WallTexture } from "../ground/elements/wall";

const floor1Y = 4.1;
const floor2Y = 10.45;
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
  const isInsideHouse = useRecoilValue(IsInsideHouseAtom);
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
  )!.value as number[];
  // 서버에서 받은 현재 옥상 엘레베이터 문앞에 있는 유저 배열
  const isInsideElevatorRooftopDoor = objects.find(
    (o) => o.name === "elevatorRooftopDoor"
  )!.value as number[];
  // 서버에서 받은 현재 엘레베이터가 작동중인지 (작동중일땐 조작못하도록)
  const elevatorIsOperation = objects.find(
    (o) => o.name === "elevatorIsOperation"
  )!.value;
  // 서버에서 받은 현재 엘레베이터 안에 있는 유저 배열
  const isInsideElevator = objects.find((o) => o.name === "elevatorInPeople")!
    .value as number[];

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
    position: [18.7, floor === 2 ? floor2Y : floor1Y, -38],
    args: [2, 0.5, 2],
  }));

  useCompoundBody(() => ({
    type: "Kinematic",
    shapes: [
      { type: "Box", position: [18.7, 8.5, -36.5], args: [2, 9, 0.5] },
      { type: "Box", position: [18.7, 8.5, -39.5], args: [2, 9, 0.5] },
      {
        type: "Box",
        position: [20, 8.5, -38],
        args: [0.5, 9, 2.5],
      },
      {
        type: "Box",
        position: [18.7, 13, -38],
        args: [2, 0.2, 2],
      },
      {
        type: "Box",
        position: [18.7, 4.1, -38],
        args: [2, 0.2, 2],
      },
    ],
  }));
  const [firstLeftDoorRef, firstLeftDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [17.39, 5.1, -37.5],
    args: [0.2, 1.7, 0.89],
  }));
  const [firstRightDoorRef, firstRightDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [17.39, 5.1, -38.35],
    args: [0.2, 1.7, 0.9],
  }));
  const [rooftopLeftDoorRef, rooftopLeftDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [17.39, 11.4, -37.5],
    args: [0.2, 1.7, 0.89],
  }));
  const [rooftopRightDoorRef, rooftopRightDoorApi] = useBox(() => ({
    type: "Kinematic",
    position: [17.39, 11.4, -38.35],
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

          elevatorApi.position.set(18.7, currentPosY.y, -38);
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
          firstLeftDoorApi.position.set(17.39, 5.1, -37.5 + leftdoor.current);
          firstRightDoorApi.position.set(17.39, 5.1, -38.4 + rightdoor.current);
        }
      } else if (floor === 2) {
        if (currentPosY.distanceTo(floor_2.current) > 0.05) {
          const distance = currentPosY
            .clone()
            .sub(floor_2.current)
            .normalize()
            .multiplyScalar(0.03);

          currentPosY.sub(distance);

          elevatorApi.position.set(18.7, currentPosY.y, -38);
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
            17.39,
            11.4,
            -37.5 + leftdoor_rooftop.current
          );
          rooftopRightDoorApi.position.set(
            17.39,
            11.4,
            -38.4 + rightdoor_rooftop.current
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
        {!isInsideHouse && (
          <mesh>
            <boxGeometry args={[2, 0.5, 2]} />
            <meshStandardMaterial color="white" />
          </mesh>
        )}
      </group>
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([0.2, 6.25, 4.1])}
        position={useStableArray([17.5, 7.35, -34.95])}
        color={"#dedede"}
        castShadow={false}
        isHidden={isInsideHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([0.2, 6.25, 3.89])}
        position={useStableArray([17.5, 7.35, -40.8])}
        color={"#dedede"}
        castShadow={false}
        isHidden={isInsideHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([0.2, 4.35, 1.9])}
        position={useStableArray([17.51, 8.3, -37.95])}
        color={"#dedede"}
        castShadow={false}
        isHidden={isInsideHouse}
      />

      {(!isInsideHouse ||
        isInsideElevatorIndoorDoor.length > 0 ||
        leftdoor.current > 0.01) && (
        <group position={[17.6, 6.7, -37.85]}>
          <Text3D
            {...(fontStyle as any)}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            position={[0, 0, 0.7]}
          >
            {">"}
            <meshBasicMaterial ref={goUpRef} />
          </Text3D>

          <Text3D
            {...(fontStyle as any)}
            rotation={[0, Math.PI / 2, 0]}
            position={[0, 0, 0.2]}
          >
            1F
            <meshNormalMaterial />
          </Text3D>
          <Text3D
            {...(fontStyle as any)}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            position={[0, 0, -0.8]}
          >
            {"<"}
            <meshBasicMaterial ref={goDownRef} />
          </Text3D>
        </group>
      )}

      {!isInsideHouse && (
        <group position={[17.6, 12.7, -37.85]}>
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
      )}
      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([16.7, 4.3, -37.9])}
        radius={0.5}
        isTouchDown={isInsideElevatorIndoorDoor.length > 0}
      />

      <CircleInteractionPortalWithoutBoundingBox
        position={useStableArray([16.7, 10.9, -37.9])}
        radius={0.5}
        isTouchDown={isInsideElevatorRooftopDoor.length > 0}
        isHidden={isInsideHouse}
      />

      <group ref={firstLeftDoorRef as any}>
        {(!isInsideHouse ||
          isInsideElevatorIndoorDoor.length > 0 ||
          leftdoor.current > 0.01) && (
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.2, 1.7, 0.9]} />
            <meshStandardMaterial
              metalness={0.8}
              color="#f9f8f8"
              roughness={0.5}
            />
          </mesh>
        )}
      </group>
      <group ref={firstRightDoorRef as any}>
        {(!isInsideHouse ||
          isInsideElevatorIndoorDoor.length > 0 ||
          leftdoor.current > 0.01) && (
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.2, 1.7, 0.9]} />
            <meshStandardMaterial
              metalness={0.8}
              color="#f9f8f8"
              roughness={0.5}
            />
          </mesh>
        )}
      </group>
      <group ref={rooftopLeftDoorRef as any}>
        {!isInsideHouse && (
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.2, 1.7, 0.9]} />
            <meshStandardMaterial
              metalness={0.8}
              color="#f9f8f8"
              roughness={0.5}
            />
          </mesh>
        )}
      </group>
      <group ref={rooftopRightDoorRef as any}>
        {!isInsideHouse && (
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.2, 1.7, 0.9]} />
            <meshStandardMaterial
              metalness={0.8}
              color="#f9f8f8"
              roughness={0.5}
            />
          </mesh>
        )}
      </group>
    </>
  );
}
