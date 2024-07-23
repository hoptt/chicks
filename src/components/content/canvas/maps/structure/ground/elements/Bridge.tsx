import { useCompoundBody } from "@react-three/cannon";
import { Bridge2 } from "./Bridge2";
export default function Bridge() {
  useCompoundBody(() => ({
    type: "Static",
    mass: 0,
    shapes: [
      {
        type: "Cylinder",
        position: [0, -3.9, -17.25],
        rotation: [0, 0, Math.PI / 2],
        args: [5.6, 5.6, 3.5, 32],
      },
      {
        type: "Cylinder",
        position: [-1.5, -1.75, -17.25],
        rotation: [0, 0, Math.PI / 2],
        args: [4, 4, 0.5, 32],
      },
      {
        type: "Cylinder",
        position: [1.5, -1.75, -17.25],
        rotation: [0, 0, Math.PI / 2],
        args: [4, 4, 0.5, 32],
      },
      {
        type: "Box",
        position: [-1.6, 0.95, -14.4],

        args: [0.65, 2, 0.25],
      },
      {
        type: "Box",
        position: [1.65, 0.95, -14.4],

        args: [0.65, 2, 0.25],
      },
      {
        type: "Box",
        position: [-1.6, 0.95, -20.1],

        args: [0.65, 2, 0.25],
      },
      {
        type: "Box",
        position: [1.65, 0.95, -20.1],

        args: [0.65, 2, 0.25],
      },
    ],
  }));

  return (
    <group>
      <cylinderGeometry args={[0.5, 0.5, 10, 32]} />
      <meshStandardMaterial color={0x00ff00} />
      {/* <SmallBridge /> */}
      <Bridge2 />
    </group>
  );
}
