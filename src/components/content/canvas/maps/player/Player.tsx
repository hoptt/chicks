import { IPlayer } from "@/types";
import { Html } from "@react-three/drei";
import { Fragment } from "react/jsx-runtime";
import styled, { keyframes } from "styled-components";
import Chatting from "./Chatting";
import Child from "./Child";
import Egg from "./Egg";
import { FootPrints } from "./FootPrints";
import { usePlayer } from "./hooks/usePlayer";
import { PlayerCone } from "../structure/ground/beachmap/elements/party/PlayerCone";

export default function Player({ player }: { player: IPlayer }) {
  const {
    isPlayerMe,
    chatRef,
    chat,
    chatMessage,
    nicknameRef,
    coneRef,
    cylinderRef,
    nodes,
    materials,
    memoizedPosition,
    cylinderPositionRef,
    nicknameToggle,
    footprints,
  } = usePlayer(player);

  return (
    <>
      {nicknameToggle && (
        <group ref={nicknameRef}>
          <Html>
            <div
              style={{
                transform: "translateX(-50%)",
                fontSize: ".85rem",
                whiteSpace: "pre",
                fontWeight: "bold",
                background: "#8e6300",
                padding: ".15rem .35rem",
                borderRadius: ".25rem",
                lineHeight: "17px",
                color: "white",
              }}
            >
              {player.name}
            </div>
          </Html>

          {player.keyEvt.Z && (
            <Html style={{ transform: "translate(-15px,-17px)" }}>
              <LayingAnimation />
            </Html>
          )}
        </group>
      )}

      <FootPrints footPrints={footprints} />

      <group ref={chatRef}>
        <Html>
          <Chatting
            chat={chat}
            chatMessage={chatMessage}
            isPlayerMe={isPlayerMe}
            keyEvt={player.keyEvt}
          />
        </Html>
      </group>

      {player.cone && (
        <group ref={coneRef}>
          <PlayerCone />
        </group>
      )}

      <group ref={cylinderRef as any}>
        <group position={memoizedPosition} rotation-y={Math.PI / 4}>
          <group name="Root_Scene">
            <group name="RootNode">
              <group
                name="AnimalArmature"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              >
                <primitive object={nodes.Body} />
                <primitive object={nodes.Root} />
              </group>
              <skinnedMesh
                castShadow
                name="Chicken"
                geometry={nodes.Chicken.geometry}
                material={materials.AtlasMaterial}
                skeleton={nodes.Chicken.skeleton}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
            </group>
          </group>
        </group>
      </group>
      {player.chick.map((chi, idx) => (
        <Fragment key={chi.id}>
          {!chi.isEgg ? (
            <Child
              info={chi}
              idx={idx}
              cylinderPosition={cylinderPositionRef.current}
            />
          ) : (
            <Egg info={chi} position={player.position} />
          )}
        </Fragment>
      ))}
    </>
  );
}

const move = keyframes`
  0%{
    
    width:0%;
  }
  25%{
    width:25%;
  }
  50%{
    width:50%;
    
  }
  75%{
    
    width:75%;
  }
  100%{
    width:100%;
  }
`;

const wobble = keyframes`
0%{
  transform: rotate(-15deg);
  }
  25%{
    transform: rotate(-7.5deg);
  }
  50%{
    transform: rotate(0deg);
  }
  75%{
    transform: rotate(7.5deg);
  }
  100%{
    transform: rotate(15deg);
  }
`;

const LayingAnimation = styled.div`
  position: relative;
  border: 0.5px solid #c9c9c9ff;
  border-radius: 0.15rem;
  width: 30px;
  height: 8px;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    height: 100%;
    background-color: white;
    animation: ${move} 3s;
  }
  &:after {
    content: "";
    position: absolute;
    top: -15px;
    left: 0;
    background-color: white;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    width: 8px;
    height: 10px;
    transform-origin: center 60%;
    animation: ${wobble} 0.5s infinite alternate
      cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
`;
