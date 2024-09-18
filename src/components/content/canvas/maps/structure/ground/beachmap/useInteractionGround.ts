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
    const scaledMin = new Vector3(6.5, 1.6, -4.5);
    const scaledMax = new Vector3(10.5, 2.5, -1);

    const scaledMin2 = new Vector3(5, 1.5, -20);
    const scaledMax2 = new Vector3(7, 2.5, -17);

    const scaledMin3 = new Vector3(4, 1.5, -28.5);
    const scaledMax3 = new Vector3(13.75, 7.9, -18.5);

    const scaledMin4 = new Vector3(14, 1.5, -26.2);
    const scaledMax4 = new Vector3(16.5, 2.5, -24);

    const scaledMin5 = new Vector3(12, 7.5, -28.5);
    const scaledMax5 = new Vector3(14, 8.5, -26);

    const scaledMin6 = new Vector3(14, 1.5, -28.5);
    const scaledMax6 = new Vector3(16.2, 9.5, -26);

    const scaledMin7 = new Vector3(7.5, 2, -22);
    const scaledMax7 = new Vector3(12, 3, -19);

    const scaledMin8 = new Vector3(-10, 2, 1);
    const scaledMax8 = new Vector3(-7.5, 3, 3.5);

    const scaledMin9 = new Vector3(-2.5, 2, 3);
    const scaledMax9 = new Vector3(0, 4, 4.5);

    const scaledMin10 = new Vector3(12, 2, -26.7);
    const scaledMax10 = new Vector3(13.3, 4, -25);

    setInteractionCriclePortalBoundingBox((prev) =>
      uniqBy(
        [
          ...prev,
          {
            name: "innerBeachRug",
            box: {
              max: scaledMax,
              min: scaledMin,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "frontdoor",
            box: {
              max: scaledMax2,
              min: scaledMin2,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerHouse",
            box: {
              max: scaledMax3,
              min: scaledMin3,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "elevatorIndoordoor",
            box: {
              max: scaledMax4,
              min: scaledMin4,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "elevatorRooftopdoor",
            box: {
              max: scaledMax5,
              min: scaledMin5,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "elevator",
            box: {
              max: scaledMax6,
              min: scaledMin6,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerCouch",
            box: {
              max: scaledMax7,
              min: scaledMin7,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerSourceList",
            box: {
              max: scaledMax8,
              min: scaledMin8,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerHowToPlay",
            box: {
              max: scaledMax9,
              min: scaledMin9,
            },
            position: [0, 0, 0],
            isMatrixUpdated: true,
          },
          {
            name: "innerCone",
            box: {
              max: scaledMax10,
              min: scaledMin10,
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
