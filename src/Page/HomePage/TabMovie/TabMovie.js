import React, { useEffect, useState } from "react";
import { https } from "../../../services/config.js";
import { Tabs, Tooltip } from "antd";
import ItemMovie from "./ItemMovie.js";
import { FaStar } from "react-icons/fa6";

export default function TabMovie() {
  const [heThongRap, setHeThongRap] = useState([]);
  useEffect(() => {
    https
      .get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`)
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChange = (key) => {
    console.log(key);
  };
  const items = heThongRap.map((heThong, index) => {
    return {
      key: index,
      label: <img className="w-16" src={heThong.logo} alt="" />,
      children: (
        <Tabs
          style={{
            height: 600,
          }}
          tabPosition="left"
          items={heThong.lstCumRap.map((cumRap) => {
            return {
              key: cumRap.diaChi,
              label: (
                <div className="w-60 truncate text-left">
                  <Tooltip title={cumRap.diaChi}>
                    <p>{cumRap.tenCumRap}</p>
                  </Tooltip>
                </div>
              ),
              children: (
                <div
                  style={{
                    height: 600,
                  }}
                  className="space-y-5 overflow-y-scroll"
                >
                  {cumRap.danhSachPhim.map((phim) => {
                    return <ItemMovie data={phim} key={phim.maPhim} />;
                  })}
                </div>
              ),
            };
          })}
        />
      ),
    };
  });
  console.log(items);
  return (
    <div>
      <div style={{
        fontSize:"2rem",
        marginBottom: "1rem",
        marginTop: "2rem"
      }}>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px', paddingTop: '6px' }}><FaStar size={23} className="mr-2 text-yellow-500" />
        Lịch chiếu phim <FaStar size={23} className="ml-2 text-yellow-500"/>
      </span>
 
      </div>

    <div style={{
      width: '70%',
      paddingBottom:"8rem"
    }} className="container" >
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
    </div>
  );
}
