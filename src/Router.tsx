import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DevTool from './pages/DevTool';
import Buttons from './pages/Buttons';
import ThemeTest from './pages/ThemeTest';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/devtool' element={<DevTool />} />
        <Route path='/buttons' element={<Buttons />} />
        <Route path='/themeTest' element={<ThemeTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
