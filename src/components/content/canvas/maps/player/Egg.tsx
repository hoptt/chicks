import { IChick } from "@/types";
import { useEgg } from "./hooks/useEgg";
import { Html } from "@react-three/drei";
import styled, { keyframes } from "styled-components";
import { TbClockHour8 } from "react-icons/tb";
type Props = {
  info: IChick;
  position: [number, number, number];
};
export default function Egg({
  info: { position: eggPosition, isEgg },
  position,
}: Props) {
  const { memoizedPosition, isAnimationOver, eggRef, eggnodes, materials } =
    useEgg(eggPosition, position);

  return (
    <>
      <group
        ref={eggRef}
        scale={0.0025}
        position={memoizedPosition}
        rotation-y={Math.PI / 4}
      >
        {isEgg && (
          <Html>
            <Hourglass $isAnimationOver={isAnimationOver}>
              <TbClockHour8 />
            </Hourglass>
          </Html>
        )}
        <mesh
          geometry={eggnodes.Uncracked_Egg.geometry}
          material={materials.Mat}
          castShadow
        />
      </group>
    </>
  );
}

const rotate = keyframes`
0%{
  transform: rotate(0deg);
}
25%{
  transform: rotate(90deg);
}
50%{
  transform: rotate(180deg);
}
75%{
  transform: rotate(270deg);
}
100%{
  transform: rotate(360deg);
}
`;

const Hourglass = styled.div<{ $isAnimationOver: boolean }>`
  opacity: ${(props) => (props.$isAnimationOver ? 1 : 0)};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0px 0px 0px 1px black;
  width: 17px;
  height: 17px;
  padding: 1px;
  top: -25px;
  left: 0px;
  border-radius: 50%;
  background-color: #8cd7fa;
  animation: ${rotate} 3s 1.2s;
  transition: opacity 1s;
`;
