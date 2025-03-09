import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './pages/Home'
import LiveCO2Dashboard from './pages/Emissiointrack';
import Formpage from './pages/Formpage'
import Map from './pages/Map'
import Report from './pages/Report'
import AboutUs from './pages/AboutUs';
import HelpComponent from './pages/Help'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Form' element={<Formpage />} />
        <Route path='/map' element={<Map />} />
        <Route path='/report' element={<Report/>}/>
        <Route path='/aboutus' element={<AboutUs/>}></Route>
        <Route path='/help' element={<HelpComponent/>}></Route>
        <Route path='/livetracker' element={<LiveCO2Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
