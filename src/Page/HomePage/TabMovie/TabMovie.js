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
        // console.log(res);
        setHeThongRap(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const items = heThongRap.map((heThong, index) => {
    return {
      key: index,
      label: <img className="w-16" src={heThong.logo} alt="" />,
      children: (
        <Tabs
          className="h-[calc(560px)]"
          tabPosition="left"
          items={heThong.lstCumRap.map((cumRap) => {
            return {
              key: cumRap.diaChi,
              label: (
                <div className="w-60 text-left">
                  <Tooltip title={cumRap.diaChi}>
                    <p className="overflow-hidden text-ellipsis">{cumRap.tenCumRap}</p>
                  </Tooltip>
                </div>
              ),
              children: (
                <div className="h-[calc(560px)] overflow-y-scroll movies-wrap">
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

  return (
    <div className="container">
      <h2 className="flex items-center justify-center text-center text-2xl font-bold my-10">
        LỊCH CHIẾU PHIM <FaStar className="ml-2 text-yellow-500"/>
      </h2>

      <div className="pb-20 w-full overflow-x-scroll lg:overflow-hidden">
        <div className="pr-5 lg:pr-0 min-w-[1200px] lg:min-w-0">
          <Tabs
              tabPosition="left"
              defaultActiveKey="1"
              items={items}
            />
        </div>
      </div>
    </div>
  );
}
