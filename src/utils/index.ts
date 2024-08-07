export const isValidText = (text: string) => {
  return Boolean(text && text.trim() !== "" && text.length <= 6);
};

export const isDev = import.meta.env.VITE_RUN === "dev";

import { useEffect } from "react";

export const useBodyClass = (isHover: boolean, className: string) => {
  useEffect(() => {
    const bodyClassList = window?.document.body.classList;
    if (isHover) {
      bodyClassList.add(className);
    } else {
      bodyClassList.remove(className);
    }

    return () => {
      bodyClassList.remove(className);
    };
  }, [isHover, className]);
};
