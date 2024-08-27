import { ALLOW_KEYS } from "@/consts";
import { socket } from "@/sockets/clientSocket";
import {
  InteractionCriclePortalBoundingBoxSelector,
  IsInsideBeachRugAtom,
  IsInsideCouchAtom,
  IsInsideElevatorAtom,
  IsInsideElevatorIndoorDoorAtom,
  IsInsideElevatorRooftopDoorAtom,
  IsInsideGuestbookAtom,
  IsInsideHouseAtom,
  IsInsideHouseDoorAtom,
  IsInsideSourceListAtom,
} from "@/store/InteractionAtom";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { IPlayer } from "@/types";
import FootPrintUtils from "@/utils/FootPrintUtils";
import LayingEggsUtils from "@/utils/LayingEggsUtils";
import { Triplet, useSphere } from "@react-three/cannon";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Object3D, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";
import { v4 as uuidv4 } from "uuid";

export function usePlayer(player: IPlayer) {
  const { id: playerId, keyEvt, position, chat } = player;
  const { camera, scene } = useThree();

  const pivot = useMemo(() => new Object3D(), []);
  const me = useRecoilValue(MeAtom);
  const isPlayerMe = me?.id === playerId;
  // 플레이어 rotation
  const cylinderRotationRef = useRef<Triplet>();
  const chatMessage = useRef("");

  const chatRef = useRef<any>();
  // 플레이어 position (현재 서버의 플레이어 포지션 값)
  const cylinderPositionRef = useRef<any>(
    new Vector3(position[0], 1, position[2])
  );
  // 유저 이름
  const nicknameRef = useRef<any>(null);
  // 모든 상호작용 오브젝트 경계선
  const InteractionCriclePortalBoundingBox = useRecoilValue(
    InteractionCriclePortalBoundingBoxSelector
  );
  const objects = useRecoilValue(ObjectsAtom);
  const chair = objects.find((o) => o.name === "chair")!.value as unknown as {
    id: number;
    player: string | undefined;
    position: [number, number, number];
  }[];

  const chairSitDownInfo = useMemo(
    () => chair.find((a) => a.player === playerId),
    [chair]
  );

  const chairPosition = useMemo(
    () => chair.find((a) => a.player === playerId)?.position,
    [chair]
  );

  const couch = objects.find((o) => o.name === "couch")!.value as unknown as {
    id: number;
    player: string | undefined;
    position: [number, number, number];
  }[];

  const couchSitDownInfo = useMemo(
    () => couch.find((a) => a.player === playerId),
    [couch]
  );
  const couchPosition = useMemo(
    () => couch.find((a) => a.player === playerId)?.position,
    [couch]
  );

  // 엔터 꾹 누름 방지
  const enterPressed = useRef(false);

  // 방명록 상호작용
  const setIsInsideGuestbook = useSetRecoilState(IsInsideGuestbookAtom);
  // 방명록 상호작용
  const setIsInsideSourceList = useSetRecoilState(IsInsideSourceListAtom);

  // 집 안 상호작용
  const setIsInsideHouse = useSetRecoilState(IsInsideHouseAtom);
  // 소파 상호작용
  const setIsInsideCouch = useSetRecoilState(IsInsideCouchAtom);
  // 집 문 상호작용
  const setIsInsideHouseDoor = useSetRecoilState(IsInsideHouseDoorAtom);
  // 엘레베이터 문 상호작용
  const setIsInsideElevatorIndoorDoor = useSetRecoilState(
    IsInsideElevatorIndoorDoorAtom
  );
  // 엘레베이터 문 상호작용
  const setIsInsideElevatorRooftopDoor = useSetRecoilState(
    IsInsideElevatorRooftopDoorAtom
  );
  // 엘레베이터 상호작용
  const setIsInsideElevator = useSetRecoilState(IsInsideElevatorAtom);

  // 해변 의자
  const setIsInsideBeachRug = useSetRecoilState(IsInsideBeachRugAtom);

  const [footprints, setFootprints] = useState<
    {
      key: number;
      position: [number, number, number];
      rotationZ: number;
      type: number;
    }[]
  >([]);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isLayingEgg = useRef(false);
  const isStartMoveLinear = useRef(false);
  const isStartMoveDiagonal = useRef(false);
  const currentPosXZ = useRef<any>();
  const playerPosXZ = useRef<any>();

  const worldPosition = useMemo(() => new Vector3(), []);

  const memoizedPosition = useMemo(() => new Vector3(0, -0.5, 0), []);

  const [cylinderRef, cylinderApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 10,
    position: [position[0], position[1], position[2]],
    linearDamping: 0.98,
    angularDamping: 0.98,
    args: [0.5],
    // 지면에 닿아있을때 방향이 물리엔진 영향을 받지않도록
    fixedRotation: true,
    allowSleep: false,
    // 아래 설정이 없으면 일정 시간 멈춘상태에서 cyliderApi.position 으로 포지션을 변경할 시 반영이 안됨.
    // 계속 물리엔진 영향을 받고있도록 설정한것
    sleepTimeLimit: Infinity,
  }));

  const {
    scene: scene2,
    materials,
    animations,
  } = useGLTF("/models/Chicken.glb");

  // 각 플레이어가 독립적인 모델 인스턴스를 가지도록
  // 다른 사용자가 이 모델로 앞으로 가면 다른 모델도 앞으로 가는 버그같은 문제
  const clone = useMemo(() => SkeletonUtils.clone(scene2), []);
  // clone 한 정보로 그래프 접근
  const objectMap = useGraph(clone);
  const nodes: any = objectMap.nodes;
  const { actions } = useAnimations(animations, cylinderRef);

  const [animation, setAnimation] = useState(
    "AnimalArmature|AnimalArmature|AnimalArmature|Idle"
  );

  /* 시점 고정을 위한 임의의 카메라 생성 */
  useEffect(() => {
    if (!isPlayerMe) return;
    camera.position.set(12, 12, 12);

    pivot.add(camera);
    scene.add(pivot);
  }, []);

  // /* 임의로 생성한 카메라가 cylinder 를 따라다니도록 */
  const makeFollowCam = () => {
    const cylinderPosition = worldPosition.setFromMatrixPosition(
      cylinderRef.current!.matrixWorld
    );
    pivot.position.lerp(cylinderPosition, 0.1);
  };

  useEffect(() => {
    const keyDownPressHandler = (e: KeyboardEvent) => {
      e.stopPropagation();
      // 허용되는 키
      if (!ALLOW_KEYS.includes(e.key.toUpperCase() as keyof typeof keyEvt))
        return;

      if (e.key.toUpperCase() === "ENTER") {
        if (!chatMessage.current) {
          if (keyEvt.Enter) {
            socket.emit("keyPress", {
              value: ["Enter"],
              isPress: false,
            });

            return;
          }
          if (!enterPressed.current) {
            enterPressed.current = true;
            socket.emit("keyPress", {
              value: ["Enter"],
              isPress: true,
            });
          }
        } else {
          socket.emit(
            "chat",
            { id: uuidv4(), message: chatMessage.current },
            () => {
              socket.emit("keyPress", {
                value: ["Enter"],
                isPress: false,
              });
            }
          );

          setTimeout(() => {
            socket.emit("chatRv");
          }, 3000);
        }

        chatMessage.current = "";
        return;
      }

      // 채팅창 열려있을때는 키 이벤트 막기
      if (keyEvt.Enter) return;

      // key 이벤트 반복 방지 (Enter 제외)
      if (keyEvt[e.key as keyof typeof keyEvt]) return;

      if (e.key.toUpperCase() === "Z" && !isLayingEgg.current) {
        isLayingEgg.current = true;
        const keys = Object.keys(keyEvt);
        socket.emit("keyPress", {
          value: keys,
          isPress: false,
        });

        socket.emit("move", [
          cylinderPositionRef.current!.x,
          cylinderPositionRef.current!.y,
          cylinderPositionRef.current!.z,
        ]);

        socket.emit("keyPress", {
          value: ["Z"],
          isPress: true,
        });
        timerRef.current = setTimeout(() => {
          const { x, z } = new LayingEggsUtils().LayingPosition(
            cylinderRotationRef.current!
          );

          const eggPosition = [
            cylinderPositionRef.current?.x! + x,
            cylinderPositionRef.current?.y! - 0.5,
            cylinderPositionRef.current?.z! + z,
          ];

          const times = Date.now();
          socket.emit("layingEgg", {
            birthTime: times,
            crackTime: times + 5000,
            position: eggPosition,
            type: Math.random() > 0.2 ? "Chick" : "Raccoon",
          });
          socket.emit("keyPress", {
            value: ["Z"],
            isPress: false,
          });
        }, 3000);

        return;
      }

      if (!isLayingEgg.current)
        socket.emit("keyPress", {
          value: [e.key],
          isPress: true,
        });
    };
    const keyUpPressHandler = (e: KeyboardEvent) => {
      e.stopPropagation();
      // 허용되는 키
      if (!ALLOW_KEYS.includes(e.key.toUpperCase() as keyof typeof keyEvt))
        return;

      if (e.key.toUpperCase() === "ENTER") {
        enterPressed.current = false;
        return;
      }

      // 채팅창 열려있을때는 키 이벤트 막기
      if (keyEvt.Enter) return;

      if (e.key.toUpperCase() === "Z") {
        isLayingEgg.current = false;
        clearTimeout(timerRef.current);
        socket.emit("keyPress", {
          value: ["Z"],
          isPress: false,
        });
        return;
      }
      socket.emit(
        "keyPress",
        {
          value: [e.key],
          isPress: false,
        },
        () => {
          if (
            ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)
          ) {
            isStartMoveDiagonal.current = false;

            socket.emit("move", [
              cylinderPositionRef.current!.x,
              cylinderPositionRef.current!.y,
              cylinderPositionRef.current!.z,
            ]);
          }
        }
      );

      /* 키 */
    };

    if (isPlayerMe) {
      window.addEventListener("keydown", keyDownPressHandler);
      window.addEventListener("keyup", keyUpPressHandler);

      return () => {
        window.removeEventListener("keydown", keyDownPressHandler);
        window.removeEventListener("keyup", keyUpPressHandler);
      };
    }
  }, [keyEvt]);

  const currentFoot = useRef(0);
  useEffect(() => {
    const unsubscribe = cylinderApi.position.subscribe((a) => {
      // 앉는 이벤트에는 동작하지 않도록
      if (chairSitDownInfo || couchSitDownInfo) return;

      const [x1, y1, z1] = a;

      currentPosXZ.current = new Vector3(x1, 0, z1);
      playerPosXZ.current = new Vector3(position[0], 0, position[2]);

      /**
       * [거리계산]
       * distance 를 계산할 때 y축은 점프거리이므로 제외하고
       * x,z 만 계산하여 이동하도록 함
       */

      if (currentPosXZ.current.distanceTo(playerPosXZ.current) > 0.05) {
        currentFoot.current = Math.floor(
          currentPosXZ.current.distanceTo(playerPosXZ.current)
        );

        const distance = currentPosXZ.current
          .clone()
          .sub(playerPosXZ.current)
          .normalize()
          .multiplyScalar(0.05);

        currentPosXZ.current.sub(distance);

        const x2 = parseFloat(
          (Math.floor(currentPosXZ.current.x * 1000) / 1000).toFixed(3)
        );
        const y2 = parseFloat((Math.floor(y1 * 1000) / 1000).toFixed(3));
        const z2 = parseFloat(
          (Math.floor(currentPosXZ.current.z * 1000) / 1000).toFixed(3)
        );
        cylinderPositionRef.current = new Vector3(x2, y2, z2);

        cylinderApi.position.set(x2, y2, z2);
        /* 발자국 로직 */
        if (
          currentFoot.current >
          Math.floor(currentPosXZ.current.distanceTo(playerPosXZ.current))
        ) {
          if (jumpRef.current.some((a) => a)) return;
          setFootprints((prev) => {
            const a = [...prev];
            let b = undefined;
            if (a.length > 1) {
              b = a.find((_, idx) => idx === 0)!.key;
              a.splice(0, 1);
            }
            const { z, type } = new FootPrintUtils().FootPrintDirection(
              cylinderRotationRef.current!
            );

            return [
              ...a,
              {
                key: b ?? a.length,
                rotationZ: z,
                type,
                position: [
                  cylinderPositionRef.current!.x,
                  cylinderPositionRef.current!.y - 0.5,
                  cylinderPositionRef.current!.z,
                ],
              },
            ];
          });
        }
      } else {
        /* 발자국 로직 */
        setFootprints([]);

        /**
         * 이동중일때만 currentPosXZ.current.distanceTo(playerPosXZ.current) > 0.05 조건이 활성화됨
         * 제자리 점프시에는 여기서 y 축 업데이트되도록
         */

        cylinderPositionRef.current = new Vector3(
          cylinderPositionRef.current.x,
          y1,
          cylinderPositionRef.current.z
        );
      }
    });

    return () => unsubscribe();
  }, [position, chairSitDownInfo, couchSitDownInfo]);

  // cylinder 의 rotation
  useEffect(() => {
    const unsubscribe = cylinderApi.rotation.subscribe((a) => {
      const [x1, y1, z1] = a;

      cylinderRotationRef.current = [x1, y1, z1];
    });

    return () => unsubscribe();
  }, []);

  // 애니메이션 변경
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.1).play();
    return () => {
      actions[animation]?.fadeOut(0.1);
    };
  }, [actions, animation]);

  const jumpRef = useRef([false, false, false]);

  // 점프
  // 최대 3번 점프 가능 (2초 간격 충전)
  useEffect(() => {
    if (keyEvt.Control) {
      if (jumpRef.current.some((a) => !a)) {
        cylinderApi.applyImpulse([0, 50, 0], [0, 0, 0]);
      }
      for (let i = 0; i < jumpRef.current.length; i++) {
        if (!jumpRef.current[i]) {
          jumpRef.current[i] = true;
          if (jumpRef.current[i]) {
            setTimeout(() => {
              jumpRef.current[i] = false;
            }, 2000);
          }
          break;
        }
      }
    }
  }, [keyEvt.Control]);

  useEffect(() => {
    // 의자 앉기
    if (chairSitDownInfo) {
      if (chairSitDownInfo.id === 1) {
        cylinderApi.rotation.set(0.9, 2.3, 0);
      } else if (chairSitDownInfo.id === 2) {
        cylinderApi.rotation.set(0.9, 2.3, 0);
      } else if (chairSitDownInfo.id === 3) {
        cylinderApi.rotation.set(0.3, -2.7, 0.8);
      } else if (chairSitDownInfo.id === 4) {
        cylinderApi.rotation.set(0.3, -2.7, 0.8);
      }

      // type Static
      cylinderApi.mass.set(0);

      cylinderApi.position.set(
        chairPosition![0],
        chairPosition![1] + 0.27,
        chairPosition![2]
      );
      cylinderPositionRef.current = new Vector3(
        chairPosition![0],
        chairPosition![1] + 0.27,
        chairPosition![2]
      );
    }
  }, [chairSitDownInfo]);
  useEffect(() => {
    // 의자 일어서기
    if (chairSitDownInfo) {
      if (
        keyEvt.ArrowDown ||
        keyEvt.ArrowUp ||
        keyEvt.ArrowLeft ||
        keyEvt.ArrowRight
      ) {
        // type Dynamic
        cylinderApi.mass.set(10);
        if (isPlayerMe)
          socket.emit("chair", {
            ...chairSitDownInfo,
            type: chairSitDownInfo.id,
            player: undefined,
          });
      }
    }
  }, [chairSitDownInfo, keyEvt, isPlayerMe]);

  useEffect(() => {
    // 소파 앉기
    if (couchSitDownInfo) {
      if (couchSitDownInfo.id === 1) {
        cylinderApi.rotation.set(-0.8, Math.PI / 5, 1.2);
      } else {
        cylinderApi.rotation.set(0, -(Math.PI + Math.PI / 4), 0);
      }

      // type Static
      cylinderApi.mass.set(0);

      cylinderApi.position.set(
        couchPosition![0],
        couchPosition![1] + (couchSitDownInfo.id === 1 ? 1 : 0.9),
        couchPosition![2]
      );
      cylinderPositionRef.current = new Vector3(
        couchPosition![0],
        couchPosition![1] + (couchSitDownInfo.id === 1 ? 1 : 0.9),
        couchPosition![2]
      );
    }
  }, [couchSitDownInfo]);

  useEffect(() => {
    // 소파 일어서기
    if (couchSitDownInfo) {
      if (
        keyEvt.ArrowDown ||
        keyEvt.ArrowUp ||
        keyEvt.ArrowLeft ||
        keyEvt.ArrowRight
      ) {
        // type Dynamic
        cylinderApi.mass.set(10);
        if (isPlayerMe)
          socket.emit("couch", {
            ...couchSitDownInfo,
            type: couchSitDownInfo.id,
            player: undefined,
          });
      }
    }
  }, [couchSitDownInfo, keyEvt, isPlayerMe]);

  useFrame(() => {
    /* 알 */
    player.chick
      .filter((a) => a.isEgg)
      .forEach((chi) => {
        const times = Date.now();
        if (chi.crackTime < times) {
          socket.emit("HatchEgg", chi.id);
        }
      });

    /* 카메라 시점 고정 */
    makeFollowCam();

    /* 유저 이름 */
    if (nicknameRef.current && cylinderPositionRef.current) {
      nicknameRef.current.position.set(
        cylinderPositionRef.current.x,
        cylinderPositionRef.current.y + 1.25,
        cylinderPositionRef.current.z
      );
      nicknameRef.current.lookAt(1000, 1000, 1000);
    }

    /* 채팅 */
    if (chatRef.current && cylinderPositionRef.current) {
      chatRef.current.position.set(
        cylinderPositionRef.current.x,
        cylinderPositionRef.current.y + 1,
        cylinderPositionRef.current.z
      );
      chatRef.current.lookAt(1000, 1000, 1000);
    }

    /* 모든 상호작용 이벤트 */

    /* 상호작용 이벤트(1) - 방명록 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "ParkInfoBoard"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideGuestbook(true);
      } else {
        setIsInsideGuestbook(false);
      }
    }

    /* 상호작용 이벤트(2) - 출처 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "innerSourceList"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideSourceList(true);
      } else {
        setIsInsideSourceList(false);
      }
    }

    /* 상호작용 이벤트(3) - 해변 의자 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "innerBeachRug"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideBeachRug(true);
      } else {
        setIsInsideBeachRug(false);
      }
    }

    /* 상호작용 이벤트(4) - 집 문 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "frontdoor"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideHouseDoor(true);
      } else {
        setIsInsideHouseDoor(false);
      }
    }

    /* 상호작용 이벤트(5) - 집 안 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "innerHouse"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideHouse(true);
      } else {
        setIsInsideHouse(false);
      }
    }

    /* 상호작용 이벤트(6) - 엘레베이터 문 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "elevatorIndoordoor"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideElevatorIndoorDoor(true);
      } else {
        setIsInsideElevatorIndoorDoor(false);
      }
    }

    /* 상호작용 이벤트(7) - 엘레베이터 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "elevatorRooftopdoor"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideElevatorRooftopDoor(true);
      } else {
        setIsInsideElevatorRooftopDoor(false);
      }
    }

    /* 상호작용 이벤트(8) - 엘레베이터 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "elevator"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideElevator(true);
      } else {
        setIsInsideElevator(false);
      }
    }

    /* 상호작용 이벤트(9) - 소파 앉기 */
    if (isPlayerMe) {
      const currentCloseStructure = InteractionCriclePortalBoundingBox.find(
        (structure) => {
          const getInRangeX =
            cylinderPositionRef.current.x < structure.corners[0].x &&
            cylinderPositionRef.current.x > structure.corners[2].x;
          const getInRangeY =
            cylinderPositionRef.current.y < structure.corners[0].y &&
            cylinderPositionRef.current.y > structure.corners[2].y;
          const getInRangeZ =
            cylinderPositionRef.current.z < structure.corners[0].z &&
            cylinderPositionRef.current.z > structure.corners[2].z;

          return (
            getInRangeX &&
            getInRangeY &&
            getInRangeZ &&
            structure.name === "innerCouch"
          );
        }
      );

      if (currentCloseStructure) {
        setIsInsideCouch(true);
      } else {
        setIsInsideCouch(false);
      }
    }

    /* 키 이벤트 */
    if (
      keyEvt.ArrowDown ||
      keyEvt.ArrowUp ||
      keyEvt.ArrowLeft ||
      keyEvt.ArrowRight
    ) {
      setAnimation("AnimalArmature|AnimalArmature|AnimalArmature|Run");
    } else if (keyEvt.Control || keyEvt.Z) {
      setAnimation("AnimalArmature|AnimalArmature|AnimalArmature|Idle_Peck");
    } else {
      setAnimation("AnimalArmature|AnimalArmature|AnimalArmature|Idle");
    }

    /**
     * [ 방향으로 이동 제어 ]
     * 눌린 화살표 방향키로 +- 100 만큼 이동한 좌표를 서버로 보내고
     * 클라이언트에서는 해당 +- 100 좌표로 이동하도록 함
     * 이러면 매번 서버로 요청을 보내서 이동한 거리를 적용시키는것이 아닌
     * 서버에 이동시킬 좌표를 보내고, 클라이언트측에서 해당 좌표로 이동하는 방식 (서버 과부화 방지)
     * 화살표 방향키를 때면 현재 좌표를 서버에 보내서 플레이어 멈추게함
     *
     */

    if (keyEvt.ArrowUp && keyEvt.ArrowLeft) {
      cylinderApi.rotation.set(0, Math.PI + Math.PI / 4, 0);

      if (!isPlayerMe) return;

      const x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 - 5).toFixed(3)
      );

      if (position[0] + 1 > cylinderPositionRef.current!.x) {
        isStartMoveDiagonal.current = false;
      }

      if (!isStartMoveDiagonal.current) {
        isStartMoveDiagonal.current = true;
        socket.emit("move", [
          x,
          cylinderPositionRef.current!.y,
          cylinderPositionRef.current!.z,
        ]);
      }

      return;
    }
    if (keyEvt.ArrowDown && keyEvt.ArrowLeft) {
      cylinderApi.rotation.set(0, -Math.PI / 4, 0);

      if (!isPlayerMe) return;

      const z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 + 5).toFixed(3)
      );

      if (position[2] - 1 < cylinderPositionRef.current!.z) {
        isStartMoveDiagonal.current = false;
      }

      if (!isStartMoveDiagonal.current) {
        isStartMoveDiagonal.current = true;
        socket.emit("move", [
          cylinderPositionRef.current!.x,
          cylinderPositionRef.current!.y,
          z,
        ]);
      }

      return;
    }
    if (keyEvt.ArrowDown && keyEvt.ArrowRight) {
      cylinderApi.rotation.set(0, Math.PI / 4, 0);

      if (!isPlayerMe) return;

      const x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 + 5).toFixed(3)
      );

      if (position[0] - 1 < cylinderPositionRef.current!.x) {
        isStartMoveDiagonal.current = false;
      }

      if (!isStartMoveDiagonal.current) {
        isStartMoveDiagonal.current = true;
        socket.emit("move", [
          x,
          cylinderPositionRef.current!.y,
          cylinderPositionRef.current!.z,
        ]);
      }

      return;
    }
    if (keyEvt.ArrowUp && keyEvt.ArrowRight) {
      cylinderApi.rotation.set(0, -(Math.PI + Math.PI / 4), 0);

      if (!isPlayerMe) return;

      const z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 - 5).toFixed(3)
      );

      if (position[2] + 1 > cylinderPositionRef.current!.z) {
        isStartMoveDiagonal.current = false;
      }

      if (!isStartMoveDiagonal.current) {
        isStartMoveDiagonal.current = true;
        socket.emit("move", [
          cylinderPositionRef.current!.x,
          cylinderPositionRef.current!.y,
          z,
        ]);
      }

      return;
    }
    if (keyEvt.ArrowUp) {
      cylinderApi.rotation.set(0, Math.PI, 0);
      if (!isPlayerMe) return;

      const x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 - 5).toFixed(3)
      );
      const z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 - 5).toFixed(3)
      );

      if (
        position[0] + 1 > cylinderPositionRef.current!.x &&
        position[2] + 1 > cylinderPositionRef.current!.z
      ) {
        isStartMoveLinear.current = false;
      }

      if (!isStartMoveLinear.current) {
        isStartMoveLinear.current = true;
        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }

    if (keyEvt.ArrowDown) {
      cylinderApi.rotation.set(0, 0, 0);
      if (!isPlayerMe) return;

      const x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 + 5).toFixed(3)
      );
      const z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 + 5).toFixed(3)
      );

      if (
        position[0] - 1 < cylinderPositionRef.current!.x &&
        position[2] - 1 < cylinderPositionRef.current!.z
      ) {
        isStartMoveLinear.current = false;
      }

      if (!isStartMoveLinear.current) {
        isStartMoveLinear.current = true;

        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }

    if (keyEvt.ArrowLeft) {
      cylinderApi.rotation.set(0, -Math.PI / 2, 0);

      if (!isPlayerMe) return;
      const x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 - 5).toFixed(3)
      );
      const z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 + 5).toFixed(3)
      );

      if (
        position[0] + 1 > cylinderPositionRef.current!.x &&
        position[2] - 1 < cylinderPositionRef.current!.z
      ) {
        isStartMoveLinear.current = false;
      }

      if (!isStartMoveLinear.current) {
        isStartMoveLinear.current = true;
        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }

    if (keyEvt.ArrowRight) {
      cylinderApi.rotation.set(0, Math.PI / 2, 0);

      if (!isPlayerMe) return;

      const x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 + 5).toFixed(3)
      );
      const z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 - 5).toFixed(3)
      );

      if (
        position[0] - 1 < cylinderPositionRef.current!.x &&
        position[2] + 1 > cylinderPositionRef.current!.z
      ) {
        isStartMoveLinear.current = false;
      }

      if (!isStartMoveLinear.current) {
        isStartMoveLinear.current = true;

        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }
  });

  return {
    isPlayerMe,
    chat,
    footprints,
    chatRef,
    chatMessage,
    cylinderRef,
    nicknameRef,
    nodes,
    materials,
    memoizedPosition,
    cylinderPositionRef,
  };
}
useGLTF.preload("/models/Chicken.glb");
