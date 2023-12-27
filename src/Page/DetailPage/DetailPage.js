import React, { useEffect, useState } from "react";

import { https } from "../../services/config.js";
import { useParams } from "react-router-dom";
import { Rate } from "antd";

export default function DetailPage() {
  const [detail, setDetail] = useState({});
  // useParams lấy tham số từ url
  let { idPhim } = useParams();
  console.log(" 😂 ~ DetailPage ~ idPhim:", idPhim);

  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idPhim}`)
      .then((res) => {
        console.log(res);
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log(" 😂 ~ .then ~ err:", err);
      });
  }, []);
  return (
    <div className="container flex items-center detail">
      <img src={detail.hinhAnh} className="w-96" alt="" />
      <div className="text-center space-y-10 flex-grow">
        <h2 className="text-5xl text-white-600 font-bold animate-pulse">
          {detail.tenPhim}
        </h2>
        <Rate
          style={{ fontSize: 40, color: "red" }}
          allowHalf
          count={10}
          value={detail.danhGia}
        />
        <h2>
          <button className="btn-btn-theme">Chi tiết</button>
        </h2>
      </div>
    </div>
  );
}
