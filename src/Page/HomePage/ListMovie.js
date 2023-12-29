import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { https } from "../../services/config.js";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);

  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09")
      .then((res) => {
        setMovieArr(res.data.content);
        console.log("res.data.content",res.data.content)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Calculate the number of empty placeholders needed
  const emptyPlaceholders = 6 - (movieArr.length % 6);

  return (
    <div className="container">
      <h2 className="flex items-center justify-center text-center text-2xl font-bold mb-4">
        PHIM ĐANG CHIẾU <FaStar className="ml-2 text-yellow-500"/>
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {movieArr.map((item, index) => (
          <Card
            key={index}
            className="movie-card"
            hoverable
            cover={
              <div className="relative before:content-[''] before:block before:pt-[calc(100%*3/2)]">
                <img className="absolute top-0 left-0 w-full h-full object-cover" alt="example" src={item.hinhAnh} />
              </div>
            }
          >
            <Meta className="pb-2" title={item.tenPhim} />
          
            <Button className="flex"><Link to={`/detail/${item.maPhim}`}>Xem chi tiết</Link></Button>
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
