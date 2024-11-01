import { InteractionCriclePortalBoundingBoxSelector } from "@/store/InteractionAtom";
import { isDev } from "@/utils";
import { Line } from "@react-three/drei";
import { useRecoilValue } from "recoil";

import { ObjectsAtom } from "@/store/ObjectsAtom";
import { BeachMap } from "./structure/ground/beachmap";
import { Effects } from "./structure/ground/beachmap/elements/effects";
import { getStoreKeyType } from "@/localstorage";
import Guide from "../component/guide";
import BottomInfo from "../../html/bottomInfo";

export default function RootMap() {
  const InteractionCriclePortalBoundingBox = useRecoilValue(
    InteractionCriclePortalBoundingBoxSelector
  );
  const isVisited = getStoreKeyType();
  const objects = useRecoilValue(ObjectsAtom);
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

      {!isVisited && <Guide />}
      <Effects />
      <BottomInfo />
      {objects.length > 0 && <BeachMap />}
    </group>
  );
}
