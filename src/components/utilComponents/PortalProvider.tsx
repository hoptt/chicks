import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";

const Portal: React.FC<PropsWithChildren> = ({ children }) => {
  const portalRoot = document.querySelector("#toast")!;
  if (portalRoot) {
    return createPortal(children, portalRoot);
  } else {
    return <></>;
  }
};

export const PortalProvider = () => {
  return (
    <Portal>
      <Toaster />
    </Portal>
  );
};
