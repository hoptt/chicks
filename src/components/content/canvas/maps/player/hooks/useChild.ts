import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

export function useChild(
  position: [number, number, number],
  eggPosition: [number, number, number],
  type: string,
  idx: number
) {
  const childRef = useRef<any>(null);

  const prevData = useRef<Vector3>();
  const isCheckPos = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const henPosition = new Vector3(position[0], position[1] - 0.25, position[2]);

  const memoizedEggPosition = useMemo(
    () => new Vector3(eggPosition[0], eggPosition[1], eggPosition[2]),
    []
  );
  const { scene, materials, animations } = useGLTF(`/models/${type}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const childnodes: any = objectMap.nodes;
  const [animation, setAnimation] = useState(
    "AnimalArmature|AnimalArmature|AnimalArmature|Idle"
  );

  const { actions } = useAnimations(animations, childRef);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();

    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  useFrame(() => {
    if (!childRef.current) return;
    /**
     * 3초마다 부모의 위치 저장
     * 부모의 위치 변화 감지하여 3초동안 변하지 않을시 다른 동작 애니메이션
     */
    if (!isCheckPos.current) {
      isCheckPos.current = true;
      timerRef.current = setTimeout(() => {
        prevData.current = henPosition;
        isCheckPos.current = false;
      }, 3000);
    }
    childRef.current.lookAt(henPosition);
    if (childRef.current.position.distanceTo(henPosition) > 1 + idx) {
      const distance = childRef.current.position
        .clone()
        .sub(henPosition)
        .normalize()
        .multiplyScalar(0.05);

      childRef.current.position.sub(distance);

      setAnimation("AnimalArmature|AnimalArmature|AnimalArmature|Run");
    } else {
      if (childRef.current.position.y > henPosition.y) {
        childRef.current.position.y -= 0.05;
      }

      /* 좀 더 매끄러운 정지를 위해 */
      if (childRef.current.position.distanceTo(henPosition) < 0.975 + idx) {
        /* 한자리에 계속 머물고 있다면 */
        if (prevData.current && henPosition.equals(prevData.current)) {
          setAnimation(
            `AnimalArmature|AnimalArmature|AnimalArmature|${
              type === "Raccoon" ? "Headbutt" : "Idle_Peck"
            }`
          );
        } else {
          setAnimation("AnimalArmature|AnimalArmature|AnimalArmature|Idle");
        }
      }
    }
  });

  return { childRef, childnodes, materials, memoizedEggPosition };
}

useGLTF.preload("/models/Chick.glb");
useGLTF.preload("/models/Raccoon.glb");
