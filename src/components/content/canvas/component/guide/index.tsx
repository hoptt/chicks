import { Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import Settings from "./Settings";
import Content from "@/components/content/html/howtoplay/Content";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { getStoreKeyType, setStoreKeyType } from "@/localstorage";

export default function Guide() {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const getKeyType = getStoreKeyType();
  const onStepHandler = () => {
    if (step == 0) {
      setStep((prev) => prev + 1);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const onStartHandler = () => {
    if (portalRef.current) document.body.removeChild(portalRef.current);
    if (!getKeyType) setStoreKeyType("A");
  };

  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "guide";
    portalRef.current.style.position = "fixed";
    portalRef.current.style.top = "0";
    portalRef.current.style.left = "0";
    portalRef.current.style.width = "100%";
    portalRef.current.style.height = "100%";
    portalRef.current!.style.zIndex = "1";

    document.body.appendChild(portalRef.current);
  }, []);

  useEffect(() => {
    if (step == 1) setIsAnimationPlaying(true);
  }, [step]);

  return (
    <Html
      wrapperClass="wrapper__initial"
      className="sub__initial"
      transform={false}
      portal={{ current: portalRef.current as HTMLElement }}
    >
      <Container>
        <AnimatePresence>
          {step == 0 && (
            <motion.section
              key={step}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Settings />
            </motion.section>
          )}
          {step == 1 && (
            <motion.section
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => {
                setIsAnimationPlaying(false);
              }}
            >
              <div className="mb-10">
                <h1 className="text-xl font-bold text-gray-300">플레이 방법</h1>
                <p className="text-sm text-gray-500 mt-1">
                  안 보면 손해! 플레이 필수 가이드!
                </p>
              </div>
              <Content />
            </motion.section>
          )}
        </AnimatePresence>
        <div className="flex items-end">
          {step == 1 && (
            <button
              type="button"
              onClick={onStepHandler}
              className="text-gray-500 hover:text-gray-300"
            >
              이전
            </button>
          )}
          <button
            type="button"
            disabled={isAnimationPlaying}
            onClick={step == 1 ? onStartHandler : onStepHandler}
            className="ms-auto border bg-black opacity-50 hover:opacity-80 border-gray-500  text-gray-500 hover:border-gray-300 hover:text-gray-200 font-semibold rounded-md px-7 py-2 transition"
          >
            {step == 1 ? "플레이하기" : "다음"}
          </button>
        </div>
      </Container>
    </Html>
  );
}

const Container = styled.main`
  width: 100%;
  height: 100%;
  max-width: 768px;
  height: 450px;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 1.25rem;
  border-radius: 0.25rem;
  color: white;
`;
