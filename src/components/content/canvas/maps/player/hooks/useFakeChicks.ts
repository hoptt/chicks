import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

export function useFakeChicks() {
  const memoizedPosition = useMemo(() => new Vector3(-3, 0, 17), []);
  const childRef = useRef<any>(null);

  const { scene, materials, animations } = useGLTF("/models/Chick.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const nodes: any = objectMap.nodes;
  const { actions } = useAnimations(animations, childRef);

  useEffect(() => {
    if (!childRef.current) return;
    let animation: any;

    actions["AnimalArmature|AnimalArmature|AnimalArmature|Run"]
      ?.reset()
      .fadeIn(0.5)
      .play();
    animation = gsap.to(childRef.current.position, {
      duration: 7,
      yoyo: true,
      repeat: -1,
      x: 17,
      z: -3,
      ease: "linear",
      onUpdate: () => {
        const progress = animation.progress();
        if (Math.abs(progress) < 0.1) {
          childRef.current.lookAt(17, 0, -3);
        } else if (Math.abs(progress) > 0.99) {
          childRef.current.lookAt(-3, 0, 17);
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
    childRef,
    childnodes: nodes,
    materials,
    memoizedPosition,
  };
}
useGLTF.preload("/models/Chick.glb");
