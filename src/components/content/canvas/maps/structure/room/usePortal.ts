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
    const scaledMax = new Vector3(1.25, 4.5, -31);

    const scaledMin2 = new Vector3(16, 4, -38.5);
    const scaledMax2 = new Vector3(17.7, 6, -37);

    const scaledMin3 = new Vector3(16, 11, -38.5);
    const scaledMax3 = new Vector3(17.7, 12.5, -37);

    const scaledMin4 = new Vector3(17.7, 4, -38.85);
    const scaledMax4 = new Vector3(19.5, 13, -37);

    setInteractionCriclePortalBoundingBox((prev) =>
      uniqBy(
        [
          ...prev,
          {
            name: "frontdoor",
            box: {
              max: scaledMax,
              min: scaledMin,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "elevatorIndoordoor",
            box: {
              max: scaledMax2,
              min: scaledMin2,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "elevatorRooftopdoor",
            box: {
              max: scaledMax3,
              min: scaledMin3,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "elevator",
            box: {
              max: scaledMax4,
              min: scaledMin4,
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
