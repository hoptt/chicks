import { IsInsideFoyerAtom } from "@/store/InteractionAtom";
import { useStableArray } from "@/utils";
import { useRecoilValue } from "recoil";
import { WallTexture } from "../../ground/elements/wall";

export default function Stair() {
  const isInsideFoyer = useRecoilValue(IsInsideFoyerAtom);
  return (
    <>
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([8.85, 4.35, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([8.5, 4.6, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([8.15, 4.85, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([7.8, 5.1, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([7.45, 5.35, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([7.1, 5.6, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([6.75, 5.85, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([6.4, 6.1, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([6.05, 6.35, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([5.7, 6.6, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([5.35, 6.85, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([2, 0.75, 0.25])}
        position={useStableArray([5, 7.1, -41.4])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
    </>
  );
}
