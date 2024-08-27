import { AnimatePresence } from "framer-motion";
import { Shape } from "three";
import { motion } from "framer-motion-3d";

type Props = {
  footPrints: {
    key: number;
    position: [number, number, number];
    rotationZ: number;
    type: number;
  }[];
};
export const FootPrints = ({ footPrints }: Props) => {
  const shape = new Shape();

  const capsuleWidth = 0.3; // 캡슐의 전체 너비 (길이)
  const capsuleHeight = 0.15; // 캡슐의 높이 (반원의 직경)

  const radius = capsuleHeight / 2; // 반원의 반지름

  // 왼쪽 반원 그리기
  shape.absarc(
    -capsuleWidth / 2 + radius,
    0,
    radius,
    Math.PI / 2,
    -Math.PI / 2,
    false
  );

  // 상단 직선
  shape.lineTo(capsuleWidth / 2 - radius, -capsuleHeight / 2);

  // 오른쪽 반원 그리기
  shape.absarc(
    capsuleWidth / 2 - radius,
    0,
    radius,
    -Math.PI / 2,
    Math.PI / 2,
    false
  );

  // 하단 직선
  shape.lineTo(-capsuleWidth / 2 + radius, capsuleHeight / 2);

  return (
    <AnimatePresence>
      {footPrints.map((print) => {
        const posX =
          print.type === 8
            ? print.position[0] - 0.3
            : [5, 6].includes(print.type)
            ? print.position[0] + 0.3
            : print.position[0];

        const posY =
          print.type === 7 ? print.position[1] + 0.4 : print.position[1] + 0.05;

        const posZ =
          print.type === 7 ? print.position[2] + 0.3 : print.position[2] + 0.2;
        return (
          <motion.group
            key={print.key}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
          >
            <mesh
              rotation={[-Math.PI / 2, 0, print.rotationZ]}
              position={[posX, posY, posZ]}
            >
              <shapeGeometry args={[shape]} />
              <meshStandardMaterial color="#855f23" transparent opacity={0.2} />
            </mesh>
            <mesh
              rotation={[-Math.PI / 2, 0, print.rotationZ]}
              position={[
                print.position[0],
                print.position[1] + 0.05,
                print.position[2] - 0.2,
              ]}
            >
              <shapeGeometry args={[shape]} />
              <meshStandardMaterial color="#855f23" transparent opacity={0.2} />
            </mesh>
          </motion.group>
        );
      })}
    </AnimatePresence>
  );
};
