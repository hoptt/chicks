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
    const scaledMax = new Vector3(17, 9.5, -33);

    const scaledMin2 = new Vector3(-4.5, 3, -42.5);
    const scaledMax2 = new Vector3(4.5, 7, -33);

    const scaledMin3 = new Vector3(-4.5, 8, -34.5);
    const scaledMax3 = new Vector3(4.5, 9.5, -33);

    const scaledMin4 = new Vector3(-5, 10, -43);
    const scaledMax4 = new Vector3(17, 13, -33);

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
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerFoyer",
            box: {
              max: scaledMax2,
              min: scaledMin2,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerAtticSide",
            box: {
              max: scaledMax3,
              min: scaledMin3,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerRooftop",
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

  return { isInnerHouse };
}
