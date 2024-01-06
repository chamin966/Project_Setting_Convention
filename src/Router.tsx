import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DevTool from './pages/DevTool';
import Buttons from './pages/Buttons';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/devtool' element={<DevTool />} />
        <Route path='/buttons' element={<Buttons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
