import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { https } from "../../services/config.js";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);

  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09")
      .then((res) => {
        setMovieArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Calculate the number of empty placeholders needed
  const emptyPlaceholders = 6 - (movieArr.length % 6);

  return (
    <div>
      <div style={{
        fontSize:"2rem",
        marginBottom: "1rem"
      }}>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px', paddingTop: '6px' }}><FaStar size={23} className="mr-2" />
        PHIM ĐANG CHIẾU <FaStar size={23} className="ml-2"/>
      </span>
 
      </div>
      <div style={{ width: "70%" }} className="grid grid-cols-6 gap-3 container">
        {movieArr.map((item, index) => (
          <Card
            key={index}
            className="movie-card"
            hoverable
            style={{
              width: "100%",
              height: "350px",
            }}
            cover={<img style={{ height: "250px" }} alt="example" src={item.hinhAnh} />}
          >
            <Meta className="pb-2" title={item.tenPhim} />
            <Button className="flex">Xem chi tiết</Button>
          </Card>
        ))}

        {/* Empty placeholders to fill the row */}
        {[...Array(emptyPlaceholders)].map((_, index) => (
          <div key={index} className="w-1/6" />
        ))}
      </div>
    </div>
  );
}
