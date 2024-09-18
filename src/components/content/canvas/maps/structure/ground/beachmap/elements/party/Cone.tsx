/*
https://poly.pizza/m/WoXpAJT0oD
Cone by J-Toastie [CC-BY] via Poly Pizza
*/

import { socket } from "@/sockets/clientSocket";
import { IsInsideConeAtom } from "@/store/InteractionAtom";
import { Html, useCursor, useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export function Cone() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Cone.glb");
  const [isHover, setIsHover] = useState(false);
  useCursor(isHover);

  const isInsideCone = useRecoilValue(IsInsideConeAtom);
  const onClick = () => {
    if (isInsideCone) socket.emit("cone", true);
  };
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
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("/models/Cone.glb");
