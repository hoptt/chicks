import { InteractionCriclePortalBoundingBoxSelector } from "@/store/InteractionAtom";
import { isDev } from "@/utils";
import { Line } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import GroundElements from "./structure/ground";

export default function RootMap() {
  const InteractionCriclePortalBoundingBox = useRecoilValue(
    InteractionCriclePortalBoundingBoxSelector
  );

  return (
    <group>
      {isDev && (
        <>
          {InteractionCriclePortalBoundingBox?.map((corner) => {
            return (
              <Line
                key={corner.name}
                color="red"
                points={corner.corners.map((c) => [c.x, 2, c.z])}
              />
            );
          })}
        </>
      )}
      {/* <Effects /> */}
      <GroundElements />
    </group>
  );
}
