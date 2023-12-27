import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { Table } from 'react-bootstrap';

const Cart = ({ cartItem, handleRemoveFromCart, handleThanhToanClick }) => {
  const getTotalPrice = () => {
    return cartItem.reduce((total, item) => total + item.giaVe, 0);
  };

  return (
    <div className="h-full w-full ">
      <div className='text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-lg text-black font-black bg-white">

              <th>
                <div className="font-normal leading-none opacity-70">Tên Ghế</div>
              </th>
              <th>
                <div className="font-normal leading-none opacity-70">Giá</div>
              </th>
              <th>
                <div className="font-normal leading-none opacity-70">Xóa</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItem.map(({ tenGheNgoi, giaVe, maGhe }, index) => {
              const isLast = index === cartItem.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr style={{
                  color: 'white',
                }} key={tenGheNgoi} className={classes}>
                  <td>
                    <div className="font-normal">{tenGheNgoi}</div>
                  </td>
                  <td>
                    <div className="font-normal">{giaVe}</div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemoveFromCart({ maGhe })}
                      className="bg-red-500 text-white p-1"
                    >
                      <CloseOutlined />
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* Total row */}
            <tr className="p-4 border-b border-blue-gray-50 text-white">
              <td colSpan="2">
                <div className="font-bold">Tổng Tiền</div>
              </td>
              <td>
                <div className="font-bold">{getTotalPrice()}</div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* Include the handleThanhToanClick function in the button */}
      <div >
        <button className='text-right text-xl  font-bold text-white p-2 bg-yellow-500' onClick={() => handleThanhToanClick(cartItem)}>Thanh Toán</button>
      </div>
    </div>
  );
};

export default Cart;
