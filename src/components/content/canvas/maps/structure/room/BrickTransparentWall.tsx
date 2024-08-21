import { useCompoundBody } from "@react-three/cannon";

export const BrickTransparentWall = () => {
  useCompoundBody(() => ({
    shapes: [
      {
        type: "Box",
        position: [-5.3, 2.5, -29],
        args: [6.5, 3.5, 0.5],
      },
      {
        type: "Box",
        position: [4, 2.5, -29],
        args: [4, 3.5, 0.5],
      },
      {
        type: "Box",
        position: [-5.3, 2.5, -31],
        args: [0.5, 3.5, 4.5],
      },
    ],
  }));

  return <></>;
};
