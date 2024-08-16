import { useStableArray } from "@/utils";
import LightSquare from "../ground/elements/lantern";
import { WallTexture } from "../ground/elements/wall";
import GFence from "./Fence";
import { FlowerBed } from "./FlowerBed";
import { Tree } from "./Tree";
import { useWallVisible } from "./useWallVisible";

export default function Rooftop() {
  const { isInnerHouse } = useWallVisible();

  const pos1 = useStableArray([-3.3, 10.2, -37.8]);
  const pos2 = useStableArray([-3.3, 10.2, -35.5]);
  const pos3 = useStableArray([-3.3, 10.2, -37.8]);
  const pos4 = useStableArray([-3.3, 10.2, -40.1]);

  const rotation1 = useStableArray([0, Math.PI / 1.2, 0]);
  const rotation2 = useStableArray([0, Math.PI / 2, 0]);
  const rotation3 = useStableArray([0, Math.PI / 2.5, 0]);

  const scale1 = useStableArray([0.007, 0.006, 0.008]);
  const scale2 = useStableArray([0.007, 0.005, 0.005]);
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

      {!isInnerHouse && (
        <>
          <FlowerBed position={pos1} />
          <Tree position={pos2} rotation={rotation1} scale={scale1} />
          <Tree position={pos3} rotation={rotation2} />
          <Tree position={pos4} rotation={rotation3} scale={scale2} />
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
