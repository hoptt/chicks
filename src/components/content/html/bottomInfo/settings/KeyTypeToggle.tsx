import { getStoreKeyType, KeyType, setStoreKeyType } from "@/localstorage";
import { useState } from "react";
import styled, { css } from "styled-components";

export default function KeyTypeToggle() {
  const [status, setStatus] = useState(getStoreKeyType());

  return (
    <div className="mb-1">
      <span className="text-xs text-gray-300 font-bold">키 세팅</span>
      <ControllerType $value={status}>
        <div
          className="col-span-1 flex flex-col items-center px-1"
          data-type={"A"}
        >
          <input
            type="radio"
            name="icon"
            id="icon1"
            value={"A"}
            onChange={(e) => {
              setStoreKeyType(e.target.value as KeyType);
              setStatus(e.target.value);
            }}
          />
          <label htmlFor="icon1">
            <h2 className="text-sm text-center">A 타입</h2>
          </label>
        </div>
        <div
          className="col-span-1 flex flex-col items-center px-1"
          data-type={"B"}
        >
          <input
            type="radio"
            name="icon"
            id="icon2"
            value={"B"}
            onChange={(e) => {
              setStoreKeyType(e.target.value as KeyType);
              setStatus(e.target.value);
            }}
          />
          <label htmlFor="icon2">
            <h2 className="text-sm text-center">B 타입</h2>
          </label>
        </div>
      </ControllerType>
    </div>
  );
}

const ControllerType = styled.div<{ $value: string }>`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 5px;
  background-color: #9ca3af;

  input[type="radio"] {
    display: none;
  }
  label {
    cursor: pointer;
  }
  h2 {
    font-size: 0.75rem;
    color: white;
  }

  & [data-type="A"] {
    ${(props) =>
      props.$value == "A"
        ? css`
            background-color: #4b5563;
          `
        : css`
            h2 {
              color: #4b5563;
            }
          `};
  }
  & [data-type="B"] {
    ${(props) =>
      props.$value == "B"
        ? css`
            background-color: #4b5563;
          `
        : css`
            h2 {
              color: #4b5563;
            }
          `};
  }
`;
