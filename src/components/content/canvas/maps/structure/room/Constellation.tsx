import { Line, Points } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { memo, useEffect, useRef, useState } from "react";

type Props = {
  pointsPosition: [number, number, number][];
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
};

export const Constellation = memo(function Constellation({
  pointsPosition,
  position,
  scale = 2,
  rotation = [0, Math.PI / 3, 0],
}: Props) {
  const [complete, setComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const rdmTime = useRef(0);

  useEffect(() => {
    const min = 50;
    const max = 100;
    if (currentIndex < pointsPosition.length) {
      rdmTime.current = Math.floor(Math.random() * (max - min + 1)) + min;
      const timeout = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, rdmTime.current); // 각 점 사이의 애니메이션 간격
      return () => clearTimeout(timeout);
    } else {
      rdmTime.current =
        Math.floor(Math.random() * (max * 200 - min * 100)) + min * 50;
      setComplete(true); // 모든 점이 연결
      const timeout = setTimeout(() => {
        setComplete(false);
        setCurrentIndex(0);
      }, rdmTime.current);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 별자리의 각 점 표시 */}
      <Points positions={new Float32Array(pointsPosition.flat())}>
        <pointsMaterial color="white" size={0.2} />
      </Points>

      {/* 점들을 연결하는 라인 애니메이션 */}
      {pointsPosition.slice(1, currentIndex).map((_, i) => (
        <group key={i}>
          <Line
            points={[pointsPosition[i], pointsPosition[i + 1]]}
            color="#fff"
            lineWidth={1}
            transparent
            opacity={0.2}
          />
        </group>
      ))}
      {/* 모든 점이 연결된 후 빛나는 효과 추가 */}
      {complete && (
        <motion.group
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Line
            points={pointsPosition}
            color="#29bfe5"
            lineWidth={1.5}
            transparent
            opacity={0.3}
          />
        </motion.group>
      )}
    </group>
  );
});
