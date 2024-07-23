import { useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three-stdlib";

export function useEgg(
  eggPosition: [number, number, number],
  position: [number, number, number]
) {
  const eggRef = useRef();
  const memoizedPosition = useMemo(() => position, []);
  const { scene, materials } = useGLTF("/models/Egg.glb");
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const eggnodes = objectMap.nodes;

  /* 달걀 굴러가는 애니메이션 */
  useEffect(() => {
    if (eggRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      gsap.to(eggRef.current.position, {
        duration: 1,
        x: eggPosition[0],
        y: eggPosition[1],
        z: eggPosition[2],
        onComplete: () => {
          setIsAnimationOver(true);
        },
      });

      gsap.to(eggRef.current.rotation, {
        duration: 1,
        x: -Math.PI * 2,
        ease: "circ.out",
      });

      tl.to(
        eggRef.current.rotation,
        {
          duration: 0.5,
          z: Math.PI / 12,
        },
        "<0.5"
      )
        .to(
          eggRef.current.rotation,
          {
            duration: 0.5,
            z: -Math.PI / 12,
          },
          "<0.5"
        )
        .to(eggRef.current.rotation, {
          duration: 1,
          z: 0,
        });
    }
  }, []);

  return {
    memoizedPosition,
    isAnimationOver,
    eggRef,
    eggnodes,
    materials,
  };
}

useGLTF.preload("/models/Egg.glb");
