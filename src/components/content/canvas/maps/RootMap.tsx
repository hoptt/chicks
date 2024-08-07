import { useRecoilValue } from "recoil";
import GroundElements from "./structure/ground";
import { InteractionCriclePortalBoundingBoxSelector } from "@/store/InteractionAtom";
import { Line } from "@react-three/drei";
import { isDev } from "@/utils";

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
                points={corner.corners.map((c) => [c.x, 0.1, c.z])}
              />
            );
          })}
        </>
      )}

      <GroundElements />
    </group>
  );
}
