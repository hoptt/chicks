/*
https://poly.pizza/m/WoXpAJT0oD
Cone by J-Toastie [CC-BY] via Poly Pizza
*/

import { socket } from "@/sockets/clientSocket";
import { IsInsideConeAtom } from "@/store/InteractionAtom";
import { MeAtom, PlayersAtom } from "@/store/PlayersAtom";
import { Html, useCursor, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export function Cone() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Cone.glb");
  const [isHover, setIsHover] = useState(false);
  const me = useRecoilValue(MeAtom);
  const players = useRecoilValue(PlayersAtom);
  const hasCone = players.find((a) => a.id == me?.id)?.cone;
  useCursor(isHover);

  const isInsideCone = useRecoilValue(IsInsideConeAtom);
  const onClick = () => {
    if (isInsideCone) {
      if (hasCone) {
        socket.emit("cone", false);
      } else {
        socket.emit("cone", true);
      }
    }
  };

  useEffect(() => {
    if (!isInsideCone) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === "F") {
        if (isInsideCone) {
          if (hasCone) {
            socket.emit("cone", false);
          } else {
            socket.emit("cone", true);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInsideCone]);
  return (
    <group
      position={[13, 1.8, -26.2]}
      onClick={onClick}
      onPointerEnter={() => {
        if (!isInsideCone) return;
        setIsHover(true);
      }}
      onPointerOut={() => {
        setIsHover(false);
      }}
    >
      <mesh
        geometry={nodes["Cone_Cube-Mesh"].geometry}
        material={materials.Dark_gray}
        scale={0.8}
      />
      {/* <mesh
        geometry={nodes["Cone_Cube-Mesh_1"].geometry}
        material={materials.Black}
      /> */}
      <mesh
        geometry={nodes["Cone_Cube-Mesh_2"].geometry}
        material={materials.Orange}
      />
      <mesh
        geometry={nodes["Cone_Cube-Mesh_3"].geometry}
        material={materials.White}
      />
      {isInsideCone && (
        <Html
          style={{ cursor: "pointer", pointerEvents: "none", width: "25px" }}
        >
          <img
            alt="클릭"
            src="/images/mouse_click.webp"
            style={{ transform: "translate(-50%,-30px)" }}
          />
          <span
            className="shorten__key"
            style={{
              transform: "translate(-50%, -90px)",
            }}
          >
            [ F ]
          </span>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("/models/Cone.glb");
