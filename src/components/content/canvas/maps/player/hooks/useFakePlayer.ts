import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

export function useFakePlayer() {
  const memoizedPosition = useMemo(() => new Vector3(-3, 0, 17), []);
  const cylinderRef = useRef<any>(null);

  const { scene, materials, animations } = useGLTF("/models/Chicken.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const nodes: any = objectMap.nodes;
  const { actions } = useAnimations(animations, cylinderRef);

  useEffect(() => {
    if (!cylinderRef.current) return;
    let animation: any;

    actions["AnimalArmature|AnimalArmature|AnimalArmature|Run"]
      ?.reset()
      .fadeIn(0.5)
      .play();
    animation = gsap.to(cylinderRef.current.position, {
      duration: 7,
      yoyo: true,
      repeat: -1,
      x: 17,
      z: -3,
      ease: "linear",
      onUpdate: () => {
        const progress = animation.progress();
        if (Math.abs(progress) < 0.1) {
          cylinderRef.current.lookAt(17, 0, -3);
        } else if (Math.abs(progress) > 0.99) {
          cylinderRef.current.lookAt(-3, 0, 17);
        }
      },
    });

    animation.play();

    return () => {
      actions["AnimalArmature|AnimalArmature|AnimalArmature|Run"]?.fadeOut(0.5);

      animation.pause();
    };
  }, [actions]);

  return {
    cylinderRef,
    nodes,
    materials,
    memoizedPosition,
  };
}
useGLTF.preload("/models/Chicken.glb");
