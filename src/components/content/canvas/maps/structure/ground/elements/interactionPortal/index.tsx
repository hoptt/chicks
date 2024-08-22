import { motion } from "framer-motion-3d";
import { memo } from "react";

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
