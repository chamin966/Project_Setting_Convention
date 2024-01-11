import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DevTool from './pages/DevTool';
import Buttons from './pages/Buttons';
import ThemeTest from './pages/ThemeTest';
import VariableTest from './pages/VariableTest';
import CRUDTest from './pages/CRUDTest';
import DemoPage from './pages/DemoPage';
import DnDTest from './pages/DnDTest';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devtool" element={<DevTool />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/themeTest" element={<ThemeTest />} />
        <Route path="variablesTest" element={<VariableTest />} />
        <Route path="/crudTest" element={<CRUDTest />} />
        <Route path="/dndTest" element={<DnDTest />} />
        <Route path="/demoTest" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
