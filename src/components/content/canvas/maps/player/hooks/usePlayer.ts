import { socket } from "@/sockets/clientSocket";
import { MeAtom, PlayerOutsideTutorialAtom } from "@/store/PlayersAtom";
import { IPlayer } from "@/types";
import LayingEggsUtils from "@/utils/LayingEggsUtils";
import { Triplet, useCylinder, useSphere } from "@react-three/cannon";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Object3D, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

const speed = 15;
let prevPos = [0, 0, 0];

export function usePlayer(player: IPlayer) {
  const { id: playerId, name, position, keyEvt } = player;
  const { camera, scene } = useThree();
  const pivot = useMemo(() => new Object3D(), []);
  const me = useRecoilValue(MeAtom);
  // 모델의 rotation
  const cylinderRotationRef = useRef<Triplet>();
  // 공의 position
  const spherePositionRef = useRef<Triplet>();
  // 유저 이름
  const nicknameRef = useRef(null);
  const setPlayerOutsideTutorial = useSetRecoilState(PlayerOutsideTutorialAtom);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isLayingEgg = useRef(false);

  const worldPosition = useMemo(() => new Vector3(), []);

  const memoizedPosition = useMemo(() => new Vector3(0, -1.1, 0), []);
  const [cylinderRef, cylindersphereApi] = useCylinder(() => ({
    type: "Kinematic",
    mass: 1,
    position: [0, 0.5, 0],
    args: [0.3, 0.3, 0.5, 32],
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
  const nodes = objectMap.nodes;
  const { actions } = useAnimations(animations, cylinderRef);

  const [animation, setAnimation] = useState(
    "AnimalArmature|AnimalArmature|AnimalArmature|Idle"
  );

  const [_, sphereApi] = useSphere(
    () => ({
      type: "Dynamic",
      position: [0, 0.5, 0],
      mass: 1,
      args: [0.3],
      linearDamping: 0.98, // 감속 속성 추가
      angularDamping: 0.98,

      onCollide: () => {
        console.log("Player collided");
      },
    }),
    useRef(null)
  );

  /* 시점 고정을 위한 임의의 카메라 생성 */
  useEffect(() => {
    if (me?.id !== playerId) return;
    camera.position.set(12, 12, 12);

    pivot.add(camera);
    scene.add(pivot);
  }, []);

  /* 임의로 생성한 카메라가 cylinder 를 따라다니도록 */
  const makeFollowCam = () => {
    const cylinderPosition = worldPosition.setFromMatrixPosition(
      cylinderRef.current!.matrixWorld
    );
    pivot.position.lerp(cylinderPosition, 0.1);
  };

  useEffect(() => {
    const keyDownPressHandler = (e: KeyboardEvent) => {
      if (me?.id !== playerId) return;

      if (e.key.toUpperCase() === "Z" && !isLayingEgg.current) {
        isLayingEgg.current = true;
        Object.entries(keyEvt).forEach(([key, _]) => {
          socket.emit("keyPress", {
            value: [key],
            isPress: false,
          });
        });
        socket.emit("keyPress", {
          value: "Z",
          isPress: true,
        });
        timerRef.current = setTimeout(() => {
          const { x, z } = new LayingEggsUtils().LayingPosition(
            cylinderRotationRef.current!
          );

          const eggPosition = [
            spherePositionRef.current?.[0]! + x,
            spherePositionRef.current?.[1]! - 0.3,
            spherePositionRef.current?.[2]! + z,
          ];

          const times = Date.now();
          socket.emit("layingEgg", {
            birthTime: times,
            crackTime: times + 5000,
            position: eggPosition,
            type: Math.random() > 0.2 ? "Chick" : "Raccoon",
          });
          socket.emit("keyPress", {
            value: "Z",
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
      if (me?.id !== playerId) return;
      if (e.key.toUpperCase() === "Z") {
        isLayingEgg.current = false;
        clearTimeout(timerRef.current);
        socket.emit("keyPress", {
          value: "Z",
          isPress: false,
        });
        return;
      }
      socket.emit("keyPress", {
        value: [e.key],
        isPress: false,
      });
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);

    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  // 공과 실린더의 위치를 동기화 및 서버에 위치 전송 및 특정 위치에 도달했는지
  useEffect(() => {
    const unsubscribe = sphereApi.position.subscribe((a) => {
      cylindersphereApi.position.set(a[0], a[1] + 0.8, a[2]);
      sphereApi.applyForce([0, -10, 0], [0, 0, 0]);
      spherePositionRef.current = [a[0], a[1], a[2]];

      /* 본인일 경우에만 key 이벤트로 움직이는 데이터 socket 으로 보내기 */
      if (me?.id !== playerId) return;

      const pov = [
        Number(a[0].toFixed(5)),
        Number(a[1].toFixed(5)),
        Number(a[2].toFixed(5)),
      ];
      if (JSON.stringify(pov) !== JSON.stringify(prevPos)) {
        prevPos = pov;
        socket.emit("move", spherePositionRef.current);
      }

      /* 튜토리얼 벗어났을 시*/
      if (spherePositionRef.current[2] < -2) {
        setPlayerOutsideTutorial(true);
      }
    });

    return unsubscribe;
  }, []);

  // cylinder 의 rotation
  useEffect(() => {
    const unsubscribe = cylindersphereApi.rotation.subscribe((a) => {
      cylinderRotationRef.current = a;
    });

    return unsubscribe;
  }, []);

  // 애니메이션 변경
  useEffect(() => {
    actions[animation]?.reset().fadeIn(1).play();
    return () => {
      actions[animation]?.fadeOut(1);
    };
  }, [actions, animation]);

  // 점프
  useEffect(() => {
    if (keyEvt.Control) {
      sphereApi.applyImpulse([0, 10, 0], [0, 0, 0]);
    }
  }, [keyEvt.Control]);

  // 공 방향키 이동, 애니메이션 및 사용자 동기화
  useFrame(() => {
    /* 각 사용자들의 position 계속 동기화 */
    sphereApi.position.set(position[0], position[1], position[2]);

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
    if (nicknameRef.current && spherePositionRef.current) {
      nicknameRef.current.position.set(
        spherePositionRef.current[0],
        spherePositionRef.current[1] + 1.5,
        spherePositionRef.current[2]
      );
      nicknameRef.current.lookAt(1000, 1000, 1000);
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

    if (keyEvt.ArrowUp && keyEvt.ArrowLeft) {
      sphereApi.applyForce([-speed - 5, 0, 0], [0, 0, 0]);

      cylindersphereApi.rotation.set(0, Math.PI + Math.PI / 4, 0);
      return;
    }
    if (keyEvt.ArrowDown && keyEvt.ArrowLeft) {
      sphereApi.applyForce([0, 0, speed + 5], [0, 0, 0]);
      cylindersphereApi.rotation.set(0, -Math.PI / 4, 0);
      return;
    }
    if (keyEvt.ArrowDown && keyEvt.ArrowRight) {
      sphereApi.applyForce([speed + 5, 0, 0], [0, 0, 0]);
      cylindersphereApi.rotation.set(0, Math.PI / 4, 0);
      return;
    }
    if (keyEvt.ArrowUp && keyEvt.ArrowRight) {
      sphereApi.applyForce([0, 0, -speed - 5], [0, 0, 0]);
      cylindersphereApi.rotation.set(0, -(Math.PI + Math.PI / 4), 0);
      return;
    }
    if (keyEvt.ArrowUp) {
      sphereApi.applyForce([-speed, 0, -speed], [0, 0, 0]);
      cylindersphereApi.rotation.set(0, Math.PI, 0);
      return;
    }

    if (keyEvt.ArrowDown) {
      sphereApi.applyForce([speed, 0, speed], [0, 0, 0]);
      cylindersphereApi.rotation.set(0, 0, 0);
      return;
    }

    if (keyEvt.ArrowLeft) {
      sphereApi.applyForce([-speed, 0, speed], [0, 0, 0]);
      cylindersphereApi.rotation.set(0, -Math.PI / 2, 0);
      return;
    }

    if (keyEvt.ArrowRight) {
      sphereApi.applyForce([speed, 0, -speed], [0, 0, 0]);
      cylindersphereApi.rotation.set(0, Math.PI / 2, 0);
      return;
    }
  });

  return { cylinderRef, nicknameRef, nodes, materials, memoizedPosition };
}
useGLTF.preload("/models/Chicken.glb");
