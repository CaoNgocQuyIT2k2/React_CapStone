import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layout/HomeLayout';
import HomePage from './Page/HomePage/HomePage';
import Admin from './Page/Admin/Admin';
import DetailPage  from './Page/DetailPage/DetailPage';
import LoginPage  from './Page/Auth/LoginPage/LoginPage';
import Register from './Page/Auth/Register/Register';
import Booking from './Page/Booking/Booking';
import LichChieuPhim from './Page/Admin/SetShowtimes/LichChieuPhim';


function App() {
  return (
    <div className='w-full overflow-x-hidden overflow-y-scroll lg:overflow-y-auto'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout/>}>  
          <Route path="/" element={<HomePage/>} />
          <Route path="/detail/:idPhim" element={<DetailPage />} />
          <Route path="/booking/:idPhim" element={<Booking/>} />
          
          </Route>

          <Route path="admin" element={<Admin />} />
          <Route path="lichChieuPhim/:idPhim" element={<LichChieuPhim />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
