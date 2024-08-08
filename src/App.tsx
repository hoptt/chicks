import { RecoilRoot } from "recoil";
import Content from "./components/content/Content";
import { ClientSocketControls } from "./components/utilComponents/ClientSocketControls";
import { PortalProvider } from "./components/utilComponents/PortalProvider";

function App() {
  return (
    <RecoilRoot>
      <Content />
      <ClientSocketControls />
      <PortalProvider />
    </RecoilRoot>
  );
}

export default App;
