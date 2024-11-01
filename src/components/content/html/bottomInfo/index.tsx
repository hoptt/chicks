import { MAXIMUM_PLAYERS } from "@/consts";
import { nicknameToggleAtom, PlayersAtom } from "@/store/PlayersAtom";
import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { PiUsersFill } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import NickNameToggle from "./settings/NickNameToggle";
import KeyTypeToggle from "./settings/KeyTypeToggle";
import clsx from "clsx";

export default function BottomInfo() {
  const players = useRecoilValue(PlayersAtom);
  const [nicknameToggle, setNicknameToggle] =
    useRecoilState(nicknameToggleAtom);
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // portal
  const portalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // 포털 DOM 노드 생성
    portalRef.current = document.createElement("div");
    portalRef.current.id = "settings";
    portalRef.current.style.position = "fixed";
    portalRef.current.style.bottom = "0";
    portalRef.current.style.left = "0";
    portalRef.current.style.width = "100%";
    portalRef.current.style.height = "5%";
    portalRef.current.style.zIndex = "1";

    document.body.appendChild(portalRef.current);

    return () => {
      // 컴포넌트 언마운트 시 포털 DOM 노드 제거
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  const onToggleNickname = () => {
    setNicknameToggle((prev) => !prev);
  };

  useEffect(() => {
    // 외부 클릭 시 닫히도록
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Html
      wrapperClass="wrapper__initial"
      className="sub__initial"
      portal={{ current: portalRef.current as HTMLElement }}
    >
      <div className="flex h-full justify-between items-end p-2">
        <span className="text-xs">© 2024 CHICKSFLY ALL RIGHTS RESERVED</span>
        <div className="flex items-center">
          <div className="relative" ref={containerRef}>
            <div
              className={clsx(
                "p-1 bg-stone-700 rounded-full hover:bg-stone-900 cursor-pointer",
                show && "bg-stone-900"
              )}
              onClick={() => setShow((prev) => !prev)}
            >
              <img alt="클릭" src="/images/settings.webp" width={15} />
            </div>
            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 3,
                    transition: {
                      duration: 0.1,
                    },
                  }}
                  className="absolute -top-[105px] right-0 w-[120px] h-auto p-3 bg-gray-800 rounded-lg shadow-lg"
                >
                  <motion.nav>
                    <motion.ul>
                      <motion.li>
                        <NickNameToggle
                          nicknameToggle={nicknameToggle}
                          onToggleNickname={onToggleNickname}
                        />
                      </motion.li>
                      <motion.li>
                        <KeyTypeToggle />
                      </motion.li>
                    </motion.ul>
                  </motion.nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-end ms-2">
            <PiUsersFill size={20} />

            <div
              style={{
                marginLeft: "1rem",
                fontSize: "15px",
                letterSpacing: "2px",
                fontWeight: 600,
              }}
            >
              {players.length}/{MAXIMUM_PLAYERS}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
