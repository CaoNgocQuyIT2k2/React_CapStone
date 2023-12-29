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

  // const contentStyle = {
  //   height: '50%',
  //   width: '50%',
  //   color: '#fff',
  //   textAlign: 'center',
  //   background: '#364d79',
  //   display: 'flex',
  //   justifyContent: 'center',  // Center horizontally
  //   alignItems: 'center',      // Center vertically
  // };

  const imgStyle = {
    width: '100vw',
    height: 'calc(100vh - 128px)',
    objectFit: 'cover',
    objectPosition: 'center bottom',
    margin: 'auto',    // Center the image
  };

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
            <div key={index}>
              <img src={banner.hinhAnh} alt="" style={imgStyle} />
            </div>
          ))}
        </AntCarousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
