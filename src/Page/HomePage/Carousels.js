import React, { useEffect, useState } from "react";
import { https } from "../../services/config.js";
import { Carousel as AntCarousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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

  const contentStyle = {
    height: '50%',
    width: '50%',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    display: 'flex',
    justifyContent: 'center',  // Center horizontally
    alignItems: 'center',      // Center vertically
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const imgStyle = {
    width: '75%',
    height: '30%',
    margin: 'auto',    // Center the image
  };

  return (
    <div>
      {heThongRap.length > 0 ? (
        <AntCarousel
          autoplay
          infinite
          autoplaySpeed={2000}
        >
          {heThongRap.map((banner, index) => (
            <div key={index} style={contentStyle}>
              <h3>
                <img src={banner.hinhAnh} alt="" style={imgStyle} />
              </h3>
            </div>
          ))}
        </AntCarousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
