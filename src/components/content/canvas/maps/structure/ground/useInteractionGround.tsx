import { InteractionCriclePortalBoundingBoxAtom } from "@/store/InteractionAtom";
import { uniqBy } from "lodash";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Vector3 } from "three";

export function useInteractionGround() {
  const setInteractionCriclePortalBoundingBox = useSetRecoilState(
    InteractionCriclePortalBoundingBoxAtom
  );
  useEffect(() => {
    const scaledMin = new Vector3(-2, 1, -29.5);
    const scaledMax = new Vector3(2, 4, -28.5);
    setInteractionCriclePortalBoundingBox((prev) =>
      uniqBy(
        [
          ...prev,
          {
            name: "innerShowHouse",
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
}
