import { createContext, useState } from "react";
import DemoTest from "../components/DemoTest";

export const blockContext = createContext(null);

const DemoPage = () => {
  const [blocks, setBlocks] = useState(null);
  return (
    <blockContext.Provider value={{ blocks, setBlocks }}>
      <DemoTest />
    </blockContext.Provider>
  );
};

export default DemoPage;
