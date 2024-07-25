import { socket } from "@/sockets/clientSocket";
import { MeAtom } from "@/store/PlayersAtom";
import { IPlayer } from "@/types";
import LayingEggsUtils from "@/utils/LayingEggsUtils";
import { Triplet, useBox } from "@react-three/cannon";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Object3D, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

export function usePlayer(player: IPlayer) {
  const { id: playerId, keyEvt } = player;
  const { camera, scene } = useThree();
  const pivot = useMemo(() => new Object3D(), []);
  const me = useRecoilValue(MeAtom);
  // 모델의 rotation
  const cylinderRotationRef = useRef<Triplet>();
  // 공의 position
  const cylinderPositionRef = useRef<any>();
  // 유저 이름
  const nicknameRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isLayingEgg = useRef(false);
  const isStartMove = useRef(false);
  const isStartMove2 = useRef(false);

  const worldPosition = useMemo(() => new Vector3(), []);

  const memoizedPosition = useMemo(() => new Vector3(0, -0.5, 0), []);

  const [cylinderRef, cylinderApi] = useBox(() => ({
    userData: { id: playerId },
    type: "Dynamic",
    mass: 10,
    position: [player.position[0], 1, player.position[2]],
    linearDamping: 0.98,
    angularDamping: 0.98,
    args: [0.75, 1, 0.75],
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
  const clone = useMemo(() => SkeletonUtils.clone(scene2), [scene2]);
  // clone 한 정보로 그래프 접근
  const objectMap = useGraph(clone);
  const nodes: any = objectMap.nodes;
  const { actions } = useAnimations(animations, cylinderRef);

  const [animation, setAnimation] = useState(
    "AnimalArmature|AnimalArmature|AnimalArmature|Idle"
  );

  /* 시점 고정을 위한 임의의 카메라 생성 */
  useEffect(() => {
    if (me?.id !== playerId) return;
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
            cylinderPositionRef.current?.x! + x,
            cylinderPositionRef.current?.y! - 0.3,
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

      /* 키 */
      if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
        isStartMove.current = true;
        socket.emit("move", [
          cylinderPositionRef.current!.x,
          cylinderPositionRef.current!.y,
          cylinderPositionRef.current!.z,
        ]);
      }
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);

    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  let x = 0,
    z = 0;

  useEffect(() => {
    const unsubscribe = cylinderApi.position.subscribe((a) => {
      const x = parseFloat((Math.floor(a[0] * 1000) / 1000).toFixed(3));
      const y = parseFloat((Math.floor(a[1] * 1000) / 1000).toFixed(3));
      const z = parseFloat((Math.floor(a[2] * 1000) / 1000).toFixed(3));
      cylinderPositionRef.current = new Vector3(x, y, z);
    });

    return unsubscribe;
  }, []);

  // cylinder 의 rotation
  useEffect(() => {
    const unsubscribe = cylinderApi.rotation.subscribe((a) => {
      cylinderRotationRef.current = a;
    });

    return unsubscribe;
  }, []);

  // 애니메이션 변경
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.1).play();
    return () => {
      actions[animation]?.fadeOut(0.1);
    };
  }, [actions, animation]);

  // 점프
  useEffect(() => {
    if (keyEvt.Control) {
      cylinderApi.applyImpulse([0, 50, 0], [0, 0, 0]);
    }
  }, [keyEvt.Control]);

  useFrame(() => {
    /**
     * [ 방향으로 이동 제어 ]
     * 눌린 화살표 방향키로 +- 100 만큼 이동한 좌표를 서버로 보내고
     * 클라이언트에서는 해당 +- 100 좌표로 이동하도록 함
     * 이러면 매번 서버로 요청을 보내서 이동한 거리를 적용시키는것이 아닌
     * 서버에 이동시킬 좌표를 보내고, 클라이언트측에서 해당 좌표로 이동하는 방식 (서버 과부화 방지)
     * 화살표 방향키를 때면 현재 좌표를 서버에 보내서 플레이어 멈추게함
     *
     * [거리계산]
     * distance 를 계산할 때 y축은 점프거리도 있으므로 제외하고
     * x,z 만 계산하여 이동하도록 함
     */
    if (cylinderPositionRef.current) {
      const currentPosXZ = new Vector3(
        cylinderPositionRef.current?.x,
        0,
        cylinderPositionRef.current?.z
      );

      const playerPosXZ = new Vector3(
        player.position[0],
        0,
        player.position[2]
      );

      if (currentPosXZ.distanceTo(playerPosXZ) > 0.05) {
        const distance = currentPosXZ
          .clone()
          .sub(playerPosXZ)
          .normalize()
          .multiplyScalar(0.05);

        currentPosXZ.sub(distance);

        cylinderApi.position.set(
          currentPosXZ.x,
          cylinderPositionRef.current.y,
          currentPosXZ.z
        );
      }
    }

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
        cylinderPositionRef.current.y + 1.5,
        cylinderPositionRef.current.z
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
      cylinderApi.rotation.set(0, Math.PI + Math.PI / 4, 0);
      isStartMove.current = true;
      if (me?.id !== playerId) return;

      x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 - 5).toFixed(3)
      );

      if (player.position[0] + 1 > cylinderPositionRef.current!.x) {
        isStartMove2.current = false;
      }

      if (!isStartMove2.current) {
        isStartMove2.current = true;
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
      isStartMove.current = true;
      if (me?.id !== playerId) return;

      z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 + 5).toFixed(3)
      );

      if (player.position[2] - 1 < cylinderPositionRef.current!.z) {
        isStartMove2.current = false;
      }

      if (!isStartMove2.current) {
        isStartMove2.current = true;
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
      isStartMove.current = true;
      if (me?.id !== playerId) return;

      x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 + 5).toFixed(3)
      );

      if (player.position[0] - 1 < cylinderPositionRef.current!.x) {
        isStartMove2.current = false;
      }

      if (!isStartMove2.current) {
        isStartMove2.current = true;
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
      isStartMove.current = true;
      if (me?.id !== playerId) return;

      z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 - 5).toFixed(3)
      );

      if (player.position[2] + 1 > cylinderPositionRef.current!.z) {
        isStartMove2.current = false;
      }

      if (!isStartMove2.current) {
        isStartMove2.current = true;
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
      isStartMove2.current = false;
      if (me?.id !== playerId) return;

      x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 - 5).toFixed(3)
      );
      z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 - 5).toFixed(3)
      );

      if (
        player.position[0] + 1 > cylinderPositionRef.current!.x &&
        player.position[2] + 1 > cylinderPositionRef.current!.z
      ) {
        isStartMove.current = false;
      }

      if (!isStartMove.current) {
        isStartMove.current = true;
        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }

    if (keyEvt.ArrowDown) {
      cylinderApi.rotation.set(0, 0, 0);
      isStartMove2.current = false;
      if (me?.id !== playerId) return;

      x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 + 5).toFixed(3)
      );
      z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 + 5).toFixed(3)
      );

      if (
        player.position[0] - 1 < cylinderPositionRef.current!.x &&
        player.position[2] - 1 < cylinderPositionRef.current!.z
      ) {
        isStartMove.current = false;
      }

      if (!isStartMove.current) {
        isStartMove.current = true;
        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }

    if (keyEvt.ArrowLeft) {
      cylinderApi.rotation.set(0, -Math.PI / 2, 0);
      isStartMove2.current = false;
      if (me?.id !== playerId) return;
      x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 - 5).toFixed(3)
      );
      z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 + 5).toFixed(3)
      );

      if (
        player.position[0] + 1 > cylinderPositionRef.current!.x &&
        player.position[2] - 1 < cylinderPositionRef.current!.z
      ) {
        isStartMove.current = false;
      }

      if (!isStartMove.current) {
        isStartMove.current = true;
        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }

    if (keyEvt.ArrowRight) {
      cylinderApi.rotation.set(0, Math.PI / 2, 0);
      isStartMove2.current = false;
      if (me?.id !== playerId) return;

      x = parseFloat(
        (Math.floor(cylinderPositionRef.current!.x * 100) / 100 + 5).toFixed(3)
      );
      z = parseFloat(
        (Math.floor(cylinderPositionRef.current!.z * 100) / 100 - 5).toFixed(3)
      );

      if (
        player.position[0] - 1 < cylinderPositionRef.current!.x &&
        player.position[2] + 1 > cylinderPositionRef.current!.z
      ) {
        isStartMove.current = false;
      }

      if (!isStartMove.current) {
        isStartMove.current = true;
        socket.emit("move", [x, cylinderPositionRef.current!.y, z]);
      }

      return;
    }
  });

  return {
    cylinderRef,
    nicknameRef,
    nodes,
    materials,
    memoizedPosition,
  };
}
useGLTF.preload("/models/Chicken.glb");
