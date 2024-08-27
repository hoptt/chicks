import { useCompoundBody } from "@react-three/cannon";

export default function TransparentWalls() {
  useCompoundBody(() => ({
    type: "Static",
    shapes: [
      /* 소파 */
      { type: "Box", position: [10, 2.1, -19.2], args: [4.25, 0.75, 1] },
      /* 커피테이블 */
      { type: "Box", position: [13, 2.1, -19], args: [2, 0.75, 0.75] },
      /* 둥근 테이블 */
      {
        type: "Cylinder",
        position: [10.5, 2.1, -23],
        args: [0.6, 0.6, 1],
      },
      /* 벽 수납장 */
      {
        type: "Box",
        position: [10.5, 3.7, -27.5],
        args: [6.5, 4, 0.75],
      },
    ],
  }));
  return null;
}
