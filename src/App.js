import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layout/HomeLayout';
import HomePage from './Page/HomePage/HomePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout/>}>  
          <Route path="/" element={<HomePage/>} />
          </Route>
          {/* <Route path="/login" element={<LoginPage/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
