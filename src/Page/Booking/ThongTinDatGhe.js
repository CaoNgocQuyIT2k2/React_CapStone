import React, { Component } from "react";
import { connect } from "react-redux";

 class ThongTinDatGhe extends Component {
   
  renderListCart(carts){
    return carts.map(({soGhe, gia, hang})=>{
      return <tr className="text-white font-weight-bold">
        <td>{soGhe}</td>
        <td>{gia}</td>
        <td><button onClick={()=>{this.props.removeCart({soGhe, hang})}} className="btn btn-danger">X</button></td>
      </tr>
    })
  }

  tinhTien(carts){
    return  carts.reduce((acc , curr )=>{
      return acc + curr.gia;
    },0)
  }

  render() {
    const {carts}= this.props;

    return (
      <div>
        <h1 className="text-warning text-center font-weight-bold font">
          {" "}
          DANH SÁCH GHẾ BẠN CHỌN{" "}
        </h1>
        <div className="item">
          <div className="trangThaiGhe"></div>
          <h3 className="text-white text"> Ghế đã đặt</h3>
        </div>
        <div className="item">
          <div className="trangThaiGhe2"></div>
          <h3 className="text-white text"> Ghế đang chọn</h3>
        </div>
        <div className="item">
          <div className="trangThaiGhe3 "></div>
          <h3 className="text-white text"> Ghế chưa đặt</h3>
        </div>

        <table class="table">
    <thead>
      <tr>
        <th>Số Ghế</th>
        <th>Giá</th>
        <th>Huỷ</th>
      </tr>
    </thead>
    <tbody className="text-white font-weight-bold">
      {this.renderListCart(carts)}
      <tr>
        <td>TỔNG TIỀN</td>
        <td>Số tiền: {this.tinhTien(carts)}</td>
        <td><button onClick={this.props.thanhToan} className="btn btn-warning">Thanh Toán</button></td>
      </tr>
    </tbody>
  </table>
      </div>
    );
  }
}
let mapStateToProps=(state)=>{
  return{
    carts:  state.movieReducer.cart
  }
}
let mapDispatchToProps=(dispatch)=>{
  return{
    removeCart: (payload)=>{
      dispatch({type: 'REMOVE_CART', payload})
      
    },
  thanhToan : ()=>{
    dispatch({type : 'THANH_TOAN'})
  }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ThongTinDatGhe);