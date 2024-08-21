import { useStableArray } from "@/utils";
import { useMemo } from "react";
import LightSquare from "../ground/elements/lantern";
import { WallTexture } from "../ground/elements/wall";
import { BeachChair } from "./BeachChair";
import { Bucket } from "./Bucket";
import { Campfire } from "./Campfire";
import { Constellation } from "./Constellation";
import GFence from "./Fence";
import { FlowerBed } from "./FlowerBed";
import { Tent } from "./Tent";
import { Tree } from "./Tree";
import {
  IsInsideHouseAtom,
  IsInsideRooftopAtom,
} from "@/store/InteractionAtom";
import { useRecoilValue } from "recoil";

export default function Rooftop() {
  const isInnerHouse = useRecoilValue(IsInsideHouseAtom);
  const isInnerRooftop = useRecoilValue(IsInsideRooftopAtom);

  const pos1 = useStableArray([-3.3, 10.2, -37.8]);
  const pos2 = useStableArray([-3.3, 10.2, -35.5]);
  const pos3 = useStableArray([-3.3, 10.2, -37.8]);
  const pos4 = useStableArray([-3.3, 10.2, -40.1]);

  const pos5 = useStableArray([-1, 10.65, -35.2]);
  const pos6 = useStableArray([-1.3, 10.65, -37]);
  const pos7 = useStableArray([1.5, 10.65, -40]);
  const pos8 = useStableArray([3, 10.65, -40]);

  const pos9 = useStableArray([-130, -35, -90]);
  const pos10 = useStableArray([-110, -10, -90]);
  const pos11 = useStableArray([-95, -25, -90]);
  const pos12 = useStableArray([-65, -15, -90]);
  const pos13 = useStableArray([-50, -2, -90]);
  const pos14 = useStableArray([-25, 0, -90]);
  const pos15 = useStableArray([-15, -5, -90]);
  const pos16 = useStableArray([-25, -15, -90]);

  const rotation1 = useStableArray([0, Math.PI / 1.2, 0]);
  const rotation2 = useStableArray([0, Math.PI / 2, 0]);
  const rotation3 = useStableArray([0, Math.PI / 2.5, 0]);
  const rotation4 = useStableArray([0, 0.3, 0]);
  const rotation5 = useStableArray([0, Math.PI / 2.1, 0]);
  const rotation6 = useStableArray([0, Math.PI / 1.8, 0]);
  const rotation7 = useStableArray([0, 0, 0]);

  const scale1 = useStableArray([0.007, 0.006, 0.008]);
  const scale2 = useStableArray([0.007, 0.005, 0.005]);

  const Pisces: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [-0.2, -0.2, 0],
      [-0.2, -0.4, 0],
      [0.3, -0.8, 0],
      [0.2, -1.8, 0],
      [0.3, -2.8, 0],
      [0.35, -3.6, 0],
      [0.7, -3.5, 0],
      [1.7, -2.8, 0],
      [2.3, -2.6, 0],
      [4, -2.5, 0],
      [4.8, -2.6, 0],
      [5.25, -2.4, 0],
      [5.75, -2.5, 0],
      [6.2, -2.8, 0],
      [6, -3.2, 0],
      [5.3, -3.2, 0],
      [4.8, -2.6, 0],
    ],
    []
  );
  const Virgo: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [-0.7, -0.8, 0],
      [-1.5, -1.1, 0],
      [-2.5, -2, 0],
      [-1.5, -1.1, 0],
      [-2.1, -0.5, 0],
      [-2.6, 0.5, 0],
      [-2.1, -0.5, 0],
      [-3, -0.8, 0],
      [-3.8, -0.6, 0],
      [-4.9, -0.6, 0],
      [-3.8, -0.6, 0],
      [-3, -0.8, 0],
      [-2.5, -2, 0],
      [-3.7, -2, 0],
      [-3.9, -1.5, 0],
      [-4.7, -1.5, 0],
    ],
    []
  );
  const Libra: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [0.2, -0.4, 0],
      [1.3, -0.5, 0],
      [2.5, -0.1, 0],
      [4.3, -1.6, 0],
      [3.3, -2.8, 0],
      [2.5, -0.1, 0],
      [3.3, -2.8, 0],
      [1, -2.5, 0],
      [0.95, -2.8, 0],
    ],
    []
  );
  const Aries: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [1.5, 0.7, 0],
      [2.5, 0.4, 0],
      [2.8, 0.1, 0],
    ],
    []
  );
  const Sagittarius: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [-0.3, -0.3, 0],
      [-0.2, -0.8, 0],
      [-0.3, -1, 0],
      [-0.4, -1.2, 0],
      [-0.35, -1.5, 0],
      [-0.4, -1.2, 0],
      [-0.3, -1, 0],
      [-0.2, -0.8, 0],
      [0.1, -0.9, 0],
      [0.5, -0.9, 0],
      [0.1, -0.9, 0],
      [-0.2, -0.8, 0],
      [-0.3, -0.3, 0],
      [-0.65, -0.4, 0],
      [-0.95, -0.6, 0],
      [-1, -0.4, 0],
      [-0.8, -0.25, 0],
      [-0.65, -0.4, 0],
      [-0.8, -0.25, 0],
      [-0.9, 0.1, 0],
      [-1.05, 0.2, 0],
      [-1.2, 0.5, 0],
      [-1.05, 0.2, 0],
      [-0.9, 0.1, 0],
      [-0.75, 0.15, 0],
      [-0.9, 0.1, 0],
      [-0.8, -0.25, 0],
      [-1, -0.4, 0],
      [-1.15, -0.15, 0],
      [-1.5, -0.15, 0],
      [-1.9, -0.4, 0],
      [-1.7, -1.6, 0],
      [-1.2, -1.9, 0],
      [-1.7, -1.6, 0],
      [-1.2, -1.5, 0],
    ],
    []
  );
  const Aquarius: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [-0.3, -0.35, 0],
      [-0.6, -0.6, 0],
      [-0.33, -0.8, 0],
      [-0.05, -0.75, 0],
      [-0.33, -0.8, 0],
      [-0.6, -0.6, 0],
      [-0.6, -0.8, 0],
      [-0.72, -0.8, 0],
      [-0.8, -0.9, 0],
      [-0.5, -1.7, 0],
      [-0.4, -1.45, 0],
      [-0.1, -1.45, 0],
      [-0.02, -1.57, 0],
      [0.2, -1.72, 0],
    ],
    []
  );
  const Taurus: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [0.7, -0.4, 0],
      [0.9, -0.6, 0],
      [1.1, -0.75, 0],
      [1.3, -0.65, 0],
      [1.35, -1, 0],
      [1.1, -1.02, 0],
      [0.8, -1, 0],
      [0, -0.65, 0],
      [0.8, -1, 0],
      [1.1, -1.02, 0],
      [1.35, -1, 0],
      [1.8, -1.2, 0],
      [2.2, -1.3, 0],
    ],
    []
  );
  const Gemini: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [0.4, 0.05, 0],
      [0.3, 0.35, 0],
      [0.4, 0.05, 0],
      [0.35, -0.7, 0],
      [0, -1.25, 0],
      [0.4, -2.25, 0],
      [0, -1.25, 0],
      [0.35, -0.7, 0],
      [0.7, -1.3, 0],
      [1, -2.25, 0],
      [0.7, -1.3, 0],
      [0.35, -0.7, 0],
      [0.4, 0.05, 0],
      [0.85, -0.15, 0],
      [1.35, -0.25, 0],
      [1.9, -0.3, 0],
      [1.35, -0.25, 0],
      [1.2, 0.25, 0],
      [1.1, 0.35, 0],
      [1.2, 0.25, 0],
      [1.35, -0.25, 0],
      [1.5, -1.2, 0],
      [1.4, -2.2, 0],
      [1.5, -1.2, 0],
      [1.9, -2.1, 0],
      [2.1, -2.2, 0],
      [2.4, -2.25, 0],
    ],
    []
  );
  return (
    <>
      {/* 바닥 */}
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([10.01, 0.2, 10.01])}
        position={useStableArray([12.5, 10.5, -37.9])}
        color={"#e4e4e4"}
        repeat={1}
        castShadow={false}
        isHidden={isInnerHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([10.2, 0.5, 10])}
        position={useStableArray([0, 9.8, -37.9])}
        color="#e4e4e4"
        castShadow={true}
        repeat={1}
        isHidden={isInnerHouse}
      />
      {/* 계단 */}
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([5.57, 10.15, -37.9])}
        color="#e4e4e4"
        castShadow={false}
        repeat={1}
        isHidden={isInnerHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([6.27, 10.35, -37.9])}
        color="#e4e4e4"
        castShadow={false}
        repeat={1}
        isHidden={isInnerHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([7, 10.495, -37.9])}
        color="#e4e4e4"
        castShadow={false}
        repeat={1}
        isHidden={isInnerHouse}
      />
      {/* 계단 외벽 가리개 */}
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1.5, 0.8, 0.25])}
        position={useStableArray([6.8, 10.03, -33.06])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInnerHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1.2, 0.45, 0.25])}
        position={useStableArray([5.5, 9.85, -33.07])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInnerHouse}
      />

      {isInnerRooftop && (
        <>
          <Constellation pointsPosition={Aquarius} position={pos9} scale={7} />
          <Constellation pointsPosition={Pisces} position={pos10} />
          <Constellation pointsPosition={Aries} position={pos11} scale={3} />
          <Constellation pointsPosition={Taurus} position={pos12} scale={3} />
          <Constellation pointsPosition={Gemini} position={pos13} />
          <Constellation
            pointsPosition={Virgo}
            position={pos14}
            rotation={rotation7}
          />
          <Constellation pointsPosition={Libra} position={pos15} />
          <Constellation
            pointsPosition={Sagittarius}
            position={pos16}
            rotation={rotation7}
            scale={3}
          />
        </>
      )}

      {!isInnerHouse && (
        <>
          <FlowerBed position={pos1} />
          <Tree position={pos2} rotation={rotation1} scale={scale1} />
          <Tree position={pos3} rotation={rotation2} />
          <Tree position={pos4} rotation={rotation3} scale={scale2} />
          <Tent />
          <BeachChair position={pos5} rotation={rotation6} type={1} />
          <BeachChair position={pos6} type={2} rotation={rotation5} />
          <BeachChair position={pos7} rotation={rotation4} type={3} />
          <BeachChair position={pos8} type={4} />
          <Bucket />
          <Campfire />
        </>
      )}
      <WallTexture
        map={"grass"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([7, 0.1, 8])}
        position={useStableArray([1, 10.1, -37.8])}
        color={"#51b756"}
        repeat={1}
        castShadow={true}
        isHidden={isInnerHouse}
      />

      <GFence position={useStableArray([3.7, 9.8, -32.9])} />
      <GFence position={useStableArray([1.2, 9.8, -32.9])} />
      <GFence position={useStableArray([-1.3, 9.8, -32.9])} />
      <GFence position={useStableArray([-3.8, 9.8, -32.9])} />
      <GFence
        position={useStableArray([-4.7, 9.8, -34.1])}
        rotation={useStableArray([0, Math.PI / 2, 0])}
      />
      <GFence
        position={useStableArray([-4.7, 9.8, -36.6])}
        rotation={useStableArray([0, Math.PI / 2, 0])}
      />
      <GFence
        position={useStableArray([-4.7, 9.8, -39.1])}
        rotation={useStableArray([0, Math.PI / 2, 0])}
      />
      <GFence
        position={useStableArray([-4.7, 9.8, -41.6])}
        rotation={useStableArray([0, Math.PI / 2, 0])}
      />
      <GFence position={useStableArray([-3.8, 9.8, -42.5])} />
      <GFence position={useStableArray([-1.3, 9.8, -42.5])} />
      <GFence position={useStableArray([1.2, 9.8, -42.5])} />
      <GFence position={useStableArray([3.8, 9.8, -42.5])} />

      <LightSquare position={useStableArray([2.4, 10.05, -33.3])} />
      <LightSquare position={useStableArray([-0.1, 10.05, -33.3])} />
      <LightSquare position={useStableArray([-2.6, 10.05, -33.3])} />

      <LightSquare position={useStableArray([2.5, 10.05, -42.5])} />
      <LightSquare position={useStableArray([0, 10.05, -42.5])} />
      <LightSquare position={useStableArray([-2.5, 10.05, -42.5])} />

      <rectAreaLight
        args={useStableArray([0xb5e7ff, 0.7, 10, 1.25] as unknown as [
          number,
          number,
          number
        ])}
        position={useStableArray([0, 9.7, -33.07])}
      />
      <rectAreaLight
        args={useStableArray([0xb5e7ff, 0.7, 10, 1.25] as unknown as [
          number,
          number,
          number
        ])}
        position={useStableArray([-4.7, 9.7, -38.07])}
        rotation={useStableArray([0, -Math.PI / 2, 0])}
      />
      <rectAreaLight
        args={useStableArray([0xb5e7ff, 0.7, 10, 1.25] as unknown as [
          number,
          number,
          number
        ])}
        position={useStableArray([0, 9.7, -42.6])}
        rotation={useStableArray([Math.PI, 0, 0])}
      />
    </>
  );
}
