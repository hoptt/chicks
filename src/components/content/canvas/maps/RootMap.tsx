import { InteractionCriclePortalBoundingBoxSelector } from "@/store/InteractionAtom";
import { isDev } from "@/utils";
import { Line } from "@react-three/drei";
import { useRecoilValue } from "recoil";

import { BeachMap } from "./structure/ground/beachmap";
import { Effects } from "./structure/ground/beachmap/elements/effects";

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
      <Effects />
      <BeachMap />
    </group>
  );
}
