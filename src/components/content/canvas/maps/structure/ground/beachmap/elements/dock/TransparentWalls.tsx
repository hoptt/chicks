import { useCompoundBody } from "@react-three/cannon";

export default function TransparentWalls() {
  useCompoundBody(() => ({
    type: "Static",
    shapes: [
      /* 선착장 --  */
      /* 계단 */
      {
        type: "Box",
        position: [13, 0.5, -13.4],
        args: [1.3, 0.25, 1],
      },
      {
        type: "Box",
        position: [13, 0.7, -13.8],
        args: [1.3, 0.25, 1],
      },
      {
        type: "Box",
        position: [13, 0.9, -14.2],
        args: [1.3, 0.25, 1],
      },
      {
        type: "Box",
        position: [13, 1.1, -14.6],
        args: [1.3, 0.25, 1],
      },
      /* 다리 */
      {
        type: "Box",
        position: [13, 1.2, -15.6],
        args: [1.3, 0.25, 2],
      },
      /* 바닥 */
      {
        type: "Box",
        position: [9.875, 1, -23],
        args: [13.25, 1, 12.5],
      },
      /* 집 -- */
      /* 벽 - 앞 */
      {
        type: "Box",
        position: [10, 4.5, -18.6],
        args: [8, 6, 0.2],
      },
      {
        type: "Box",
        position: [5, 5.5, -18.6],
        args: [2, 4, 0.2],
      },
      {
        type: "Box",
        position: [4.5, 2.55, -18.6],
        args: [0.75, 1.75, 0.2],
      },

      /* 벽 - 오른쪽 */
      {
        type: "Box",
        position: [13.9, 4.5, -23.55],
        args: [0.2, 6, 10.1],
      },
      /* 바닥 */
      {
        type: "Box",
        position: [9, 1.55, -23.5],
        args: [10, 0.25, 10],
      },
      /* 엘레베이터 -- */
      {
        type: "Box",
        position: [15.25, 6.58, -26.3],
        args: [2.5, 6.85, 0.25],
      },
      {
        type: "Box",
        position: [16.9, 4.99999, -27.115],
        args: [1, 10, 3],
      },
      {
        type: "Box",
        position: [15.35, 9.9, -27.37],
        args: [2.4, 0.2, 2.4],
      },
      {
        type: "Box",
        position: [15.3, 5, -28.5],
        args: [2.55, 10, 0.25],
      },

      /* 루프탑 -- */
      /* 바닥 */
      {
        type: "Box",
        position: [8.99, 7.4, -23.5],
        args: [10, 0.25, 10.1],
      },
    ],
  }));
  return null;
}
