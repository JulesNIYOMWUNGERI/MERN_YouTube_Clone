import React, {useState} from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Videos from './pages/VideoDetails';
import Auth from './pages/Auth';

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <div className='flex'>
      <Sidebar theme={theme} setTheme={setTheme}/>
      <div className={theme ? 'flex-[7] bg-[#181818] text-[#f7f8ff]' : 'flex-[7] bg-white text-[#181818]'}>
        <Navbar theme={theme} />
        <div className={theme ? 'py-[22px] px-[50px] bg-[#181818]' : 'py-[22px] px-[30px] bg-[#f7f8ff]'}>
          <Routes>
            <Route path='/' element={<Home type="random" theme={theme}/>} />
            <Route path='/trends' element={<Home type="trend"/>} />
            <Route path='/subscriptions' element={<Home type="sub"/>} />
            <Route path='/videos/search' element={<Home />} />
            <Route path='/video/:id' element={<Videos />} />
            <Route path='/auth' element={<Auth theme={theme}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
