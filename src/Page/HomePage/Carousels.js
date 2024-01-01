import React, { useEffect, useState } from "react";
import { https } from "../../services/config.js";
import { Carousel as AntCarousel } from "antd";

export default function Carousels() {
  const [heThongRap, setHeThongRap] = useState([]);
  
  useEffect(() => {
    https
      .get(`api/QuanLyPhim/LayDanhSachBanner`)
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {heThongRap.length > 0 ? (
        <AntCarousel
          className="carousel-wrap"
          // autoplay
          infinite
          autoplaySpeed={2000}
        >
          {heThongRap.map((banner, index) => (
            <div key={index} className="pt-16 lg:pt-0">
              <img 
                className="w-full bg-black object-contain object-center-bottom m-auto h-[calc(70vh-8rem)] lg:h-[calc(100vh-8rem)]"
                src={banner.hinhAnh} alt="" />
            </div>
          ))}
        </AntCarousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
