import { RecoilRoot } from "recoil";
import Content from "./components/content/Content";
import { ClientSocketControls } from "./components/utilComponents/ClientSocketControls";

function App() {
  return (
    <RecoilRoot>
      <Content />
      <ClientSocketControls />
    </RecoilRoot>
  );
}

export default App;
