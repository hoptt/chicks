import {
  InteractionCriclePortalBoundingBoxAtom,
  IsInsideHouseDoorAtom,
} from "@/store/InteractionAtom";
import { uniqBy } from "lodash";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Vector3 } from "three";

export function usePortal() {
  const isInsideHouseDoor = useRecoilValue(IsInsideHouseDoorAtom);
  const setInteractionCriclePortalBoundingBox = useSetRecoilState(
    InteractionCriclePortalBoundingBoxAtom
  );

  useEffect(() => {
    const scaledMin = new Vector3(-0.75, 0, -35);
    const scaledMax = new Vector3(1.25, 0, -31);

    setInteractionCriclePortalBoundingBox((prev) =>
      uniqBy(
        [
          ...prev,
          {
            name: "door",
            box: {
              max: scaledMax,
              min: scaledMin,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
        ],
        "name"
      )
    );
  }, []);
  return { isInsideHouseDoor };
}
