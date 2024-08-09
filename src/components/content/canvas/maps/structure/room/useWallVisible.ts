import {
  InteractionCriclePortalBoundingBoxAtom,
  IsInsideHouseAtom,
} from "@/store/InteractionAtom";
import { uniqBy } from "lodash";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Vector3 } from "three";

export function useWallVisible() {
  const isInnerHouse = useRecoilValue(IsInsideHouseAtom);
  const setInteractionCriclePortalBoundingBox = useSetRecoilState(
    InteractionCriclePortalBoundingBoxAtom
  );

  useEffect(() => {
    const scaledMin = new Vector3(-5, 0, -43);
    const scaledMax = new Vector3(17, 0, -33);
    setInteractionCriclePortalBoundingBox((prev) =>
      uniqBy(
        [
          ...prev,
          {
            name: "innerHouse",
            box: {
              max: scaledMax,
              min: scaledMin,
            },
            position: [0, 2, -38],
            isMatrixUpdated: true,
          },
        ],
        "name"
      )
    );
  }, []);

  return { isInnerHouse };
}
