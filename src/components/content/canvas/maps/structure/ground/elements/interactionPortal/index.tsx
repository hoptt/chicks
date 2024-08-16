import {
  InteractionCriclePortalBoundingBoxAtom,
  IsInsideLightPortalAtom,
} from "@/store/InteractionAtom";
import { motion } from "framer-motion-3d";
import { uniqBy } from "lodash";
import { memo, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Vector3 } from "three";
type Props = {
  name: string;
  position: [number, number, number];
};

export function CircleInteractionPortal({ name, position }: Props) {
  const ref = useRef<any>();
  const isInsideLightPortal = useRecoilValue(IsInsideLightPortalAtom);
  const setInteractionCriclePortalBoundingBox = useSetRecoilState(
    InteractionCriclePortalBoundingBoxAtom
  );
  useEffect(() => {
    if (!ref.current) return;

    const mesh = ref.current.children[0];
    const geometry = mesh.geometry;

    // glb 가 아닌 일반 mesh 에는 BoundingBox 가 최적화 이유로 존재하지 않음
    // 다음과 같이 수동으로 생성
    geometry.computeBoundingBox();

    if (geometry.boundingBox) {
      // rotation 이 적용된 boundingBox 를 새로 적용
      const boundingBox = geometry.boundingBox.clone();
      mesh.updateMatrixWorld(true);
      boundingBox.applyMatrix4(mesh.matrixWorld);

      // boundingBox 의 중심점을 기준으로 스케일링 1.2 배 되도록
      const center = new Vector3();
      boundingBox.getCenter(center);
      const scaledMinXYZ = new Vector3().lerpVectors(
        center,
        boundingBox.min,
        1.2
      );
      const scaledMaxXYZ = new Vector3().lerpVectors(
        center,
        boundingBox.max,
        1.2
      );
      const scaledMin = new Vector3(scaledMinXYZ.x, 0, scaledMinXYZ.z);
      const scaledMax = new Vector3(scaledMaxXYZ.x, 2, scaledMaxXYZ.z);
      setInteractionCriclePortalBoundingBox((prev) =>
        uniqBy(
          [
            ...prev,
            {
              name,
              box: {
                max: scaledMax,
                min: scaledMin,
              },
              position,
              isMatrixUpdated: true,
            },
          ],
          "name"
        )
      );
    }
  }, []);

  return (
    <group ref={ref} name={name}>
      <mesh rotation-x={-Math.PI / 2} position={position}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0.2} />
      </mesh>
      <motion.mesh
        scale={0.85}
        rotation-x={-Math.PI / 2}
        position={position}
        animate={
          !isInsideLightPortal
            ? {
                opacity: [0.3, 0.5],
                y: [0.21, 0.4, 0.21],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                  repeat: Infinity,
                },
              }
            : { y: 0.21, transition: { duration: 0.5, ease: "easeInOut" } }
        }
      >
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0.2} />
      </motion.mesh>
    </group>
  );
}

type CProps = {
  radius: number;
  position: [number, number, number];
  isTouchDown: boolean;
  isHidden?: boolean;
};
export const CircleInteractionPortalWithoutBoundingBox = memo(
  function CircleInteractionPortalWithoutBoundingBox({
    isTouchDown,
    isHidden = false,
    position,
    radius,
  }: CProps) {
    if (isHidden) return null;
    return (
      <group position={position}>
        <mesh rotation-x={-Math.PI / 2}>
          <circleGeometry args={[radius, 32]} />
          <meshBasicMaterial color="white" transparent opacity={0.2} />
        </mesh>
        <motion.mesh
          scale={0.85}
          rotation-x={-Math.PI / 2}
          animate={
            !isTouchDown
              ? {
                  opacity: [0.3, 0.5],
                  y: [0.01, 0.07, 0.01],
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.3,
                    repeat: Infinity,
                  },
                }
              : {
                  y: 0.01,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }
          }
        >
          <circleGeometry args={[radius, 32]} />
          <meshBasicMaterial color="white" transparent opacity={0.2} />
        </motion.mesh>
      </group>
    );
  }
);
