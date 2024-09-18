import { MAXIMUM_PLAYERS } from "@/consts";
import { nicknameToggleAtom, PlayersAtom } from "@/store/PlayersAtom";
import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { PiUsersFill } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Settings() {
  const players = useRecoilValue(PlayersAtom);
  const [nicknameToggle, setNicknameToggle] =
    useRecoilState(nicknameToggleAtom);
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
  // display: flex;
  // align-items: center;
  // background-color: #7f7f7f;
  // margin-left: auto;
  // border-radius: 0.5rem;
  // padding: 0.5rem 1rem;
  return (
    <Html
      wrapperClass="wrapper__initial"
      className="sub__initial"
      portal={{ current: portalRef.current as HTMLElement }}
    >
      <div className="flex h-full justify-between items-end p-2">
        <span className="text-xs">© 2024 CHICKSFLY ALL RIGHTS RESERVED</span>
        <div className="flex items-center">
          <span
            className="text-xs cursor-pointer me-3"
            onClick={() => setNicknameToggle((prev) => !prev)}
          >
            닉네임 {nicknameToggle ? "ON" : "OFF"}
          </span>
          <div className="flex items-end">
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
