import React, { useEffect, useState } from 'react';
import { https } from '../../services/config.js';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, REMOVE_CART, RESET_CART } from '../../redux/constant/movie.js';
import Cart from './Cart.js';

const Booking = () => {
  const [heThongRap, setHeThongRap] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.movieReducer.cart);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define alphabet here

  useEffect(() => {
    // Sử dụng API để lấy danh sách ghế
    https
      .get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=47416`)
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
        console.log(res.data.content);
        // Thay thế dữ liệu trong initialState bằng dữ liệu từ API
        const newData = res.data.content.danhSachGhe;
        dispatch({
          type: 'SET_DS_GHE', // Tạo action SET_DS_GHE để set dữ liệu mới
          payload: newData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleGheClick = (ghe) => {
    console.log('Clicked Seat:', ghe);
    const isSeatSelected = selectedSeats.some((selectedSeat) => selectedSeat.maGhe === ghe.maGhe);

    if (isSeatSelected) {
      const removeFromCart = (ghe) => ({
        type: REMOVE_CART,
        payload: ghe,
      });

      dispatch(removeFromCart(ghe));

      const updatedSelectedSeats = selectedSeats.filter((selectedSeat) => selectedSeat.maGhe !== ghe.maGhe);
      setSelectedSeats(updatedSelectedSeats);
    } else {
      const updatedSelectedSeats = [...selectedSeats, ghe];
      setSelectedSeats(updatedSelectedSeats);

      const tenGheNgoi = `${alphabet[Math.floor(ghe.stt / 10)]}${ghe.stt % 10 || 10}`;
      dispatch({
        type: ADD_TO_CART,
        payload: {
          selectedSeats: updatedSelectedSeats,
          selectedSeat: { ...ghe, tenGheNgoi },
        },
      });
    }
  };



  const handleRemoveFromCart = (ghe) => {
    dispatch({
      type: REMOVE_CART,
      payload: ghe, // Truyền toàn bộ thông tin của ghế
    });
    console.log("remove cart",ghe);
    const updatedSelectedSeats = selectedSeats.filter((selectedSeat) => selectedSeat.maGhe !== ghe.maGhe);
    setSelectedSeats(updatedSelectedSeats);
  };
  

  const handleThanhToanClick = () => {
    // Gửi action RESET_CART với danh sách các ghế được chọn
    dispatch({
      type: RESET_CART,
    });
    // Reset danh sách ghế được chọn sau khi thêm vào giỏ hàng
    setSelectedSeats([]);
    alert('Bạn đã đặt vé thành công');
  };

  const renderGhe = () => {
    if (heThongRap.danhSachGhe && heThongRap.danhSachGhe.length > 0) {
      const rows = [];
      let currentRow = [];
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
      // Thêm số cột từ 1 đến 10 trên hàng đầu tiên
      for (let col = 1; col <= 10; col++) {
        currentRow.push(
          <div
            key={`col-${col}`}
            className="hang-ghe col-header flex "
            style={{
              marginRight: '26px', // 26px là margin thay vì padding
            }}
          >
            <div className="block ml-1" style={{ width: '30px', height: '30px' }}>{col}</div>
          </div>
        );
      }
  
      rows.push(
        <div
          key="col-header-row"
          className="hang-ghe flex"
          style={{
            marginLeft: '3.3rem', // Đảm bảo không có margin bổ sung ở đầu dòng
          }}
        >
          {currentRow}
        </div>
      );
      currentRow = [];
  
      // Thêm số hàng và chữ cái
      for (let row = 0; row < heThongRap.danhSachGhe.length / 10; row++) {
        // Thêm chữ cái ở cột bên trái với padding
        currentRow.push(
          <div key={`row-header-${row}`} className="hang-ghe row-header ">
            <div className="block" style={{ width: '30px', height: '30px', padding: '4px' }}>{alphabet[row]}</div>
          </div>
        );
  
        // Thêm ghế
        for (let col = 1; col <= 10; col++) {
          const ghe = heThongRap.danhSachGhe[row * 10 + col - 1];
          const buttonClass = ghe.daDat
            ? 'ghe-da-dat'
            : selectedSeats.some((selectedSeat) => selectedSeat.maGhe === ghe.maGhe)
              ? 'ghe-da-chon'
              : 'ghe-chua-dat';
  
          const tenGheNgoi = `${alphabet[row]}${col}`;
          currentRow.push(
            <button
              key={ghe.maGhe}
              className={`ghe ${buttonClass}`}
              disabled={ghe.daDat}
              onClick={() => handleGheClick(ghe)}
            >
              <div className="block">{tenGheNgoi}</div>
            </button>
          );
        }
  
        rows.push(<div key={`row-${row}`} className="hang-ghe flex">{currentRow}</div>);
        currentRow = [];
      }
  
      return rows;
    }
  
    return null;
  };
  


  return (
    <div style={{
      backgroundImage: `url(${require('../../components/img/bg.png')})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'none',
      backgroundSize: 'cover',
    }}
     className="rap-chieu container flex pb-5 pt-5 text-white">
      <div style={{ width: '50%', height: '50%' }}>
        <h1 className='text-center  text-3xl text-yellow-400 font-bold mb-3'>LỊCH CHIẾU PHIM</h1>
        {renderGhe()}
        <div className='flex p-2'>
          <span className='flex'>  <span className='border-orange-400 w-5 h-5  bg-white block m-2'></span> Ghế chưa đặt</span>
          <span className='flex'> <span className='border-orange-400 w-5 h-5  bg-green-500 block m-2'></span> Ghế đang đặt</span>
          <span className='flex'> <span className='border-orange-400 w-5 h-5 bg-slate-500 block m-2'></span> Ghế đang đặt</span>
        </div>
      </div>

      <div>
      <h1 className='text-center  text-3xl text-yellow-400 font-bold mb-4'>DANH SÁCH GHẾ BẠN CHỌN</h1>
      {cart.length > 0 && (
        <Cart cartItem={cart} handleRemoveFromCart={handleRemoveFromCart} handleThanhToanClick={handleThanhToanClick} />
      )}
      </div>
    
    </div>
  );
};

export default Booking;