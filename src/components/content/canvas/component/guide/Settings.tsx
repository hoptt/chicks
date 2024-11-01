import { KeyType, setStoreKeyType } from "@/localstorage";
import styled from "styled-components";
export default function Settings() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-xl font-bold text-gray-300">키 설정하기</h1>
        <p className="text-sm text-gray-500 mt-1">
          캐릭터를 움직이기 위한 방향키를 설정해주세요.
        </p>
      </div>
      <ControllerArticle>
        <div className="col-span-1 flex flex-col items-center">
          <input
            type="radio"
            name="icon"
            id="icon1"
            value={"A"}
            onChange={(e) => setStoreKeyType(e.target.value as KeyType)}
            defaultChecked
          />
          <label htmlFor="icon1">
            <h2 className="text-sm mb-2 text-gray-500 text-center">A 타입</h2>
            <Icon className="icon icon1" />
          </label>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <input
            type="radio"
            name="icon"
            id="icon2"
            value={"B"}
            onChange={(e) => setStoreKeyType(e.target.value as KeyType)}
          />
          <label htmlFor="icon2">
            <h2 className="text-sm mb-2 text-gray-500 text-center">B 타입</h2>
            <Icon className="icon icon2" />
          </label>
        </div>
      </ControllerArticle>
      <div className="text-center mx-auto mt-10 text-gray-500 text-sm">
        다시 키 설정을 원하시는 경우 우측 하단의{" "}
        <span className="relative inline-block p-1 bg-stone-800 rounded-full top-1">
          <img alt="클릭" src="/images/settings.webp" width={15} />
        </span>{" "}
        에서 변경하실 수 있습니다
      </div>
    </>
  );
}

const Icon = styled.div`
  width: 225px;
  height: 150px;
  background-image: url("/images/controller4.webp");
  background-size: 450px 150px;
  filter: brightness(0.2);

  &.icon1 {
    background-position: -1% top;
  }

  &.icon2 {
    background-position: 101.5% top;
  }
`;

const ControllerArticle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  label {
    cursor: pointer;
    & > div:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      bottom: -10px;
      left: 0;
      transform: scaleX(0%);
      transition: transform 0.2s;
      background-color: #d3d3d3;
    }
  }
  input[type="radio"] {
    display: none;
    &:checked + label {
      & > div {
        position: relative;
        filter: brightness(0.75);
        transition: all 0.3s;

        &:after {
          transform: scaleX(100%);
        }
      }
      h2 {
        color: white;
      }
    }
  }
`;
