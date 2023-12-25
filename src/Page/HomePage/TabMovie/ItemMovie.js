import moment from "moment/moment";
import React from "react";

export default function ItemMovie({ data }) {
  return (
    <div className="flex space-x-5">
      <img className="w-32 h-48 object-cover" src={data.hinhAnh} alt="" />
      <div>
        <h2 className="text-2xl">{data.tenPhim}</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.lstLichChieuTheoPhim.slice(0,15).map((lichChieu) => {
            return (
              <span
                className="text-red-600 font-medium border border-red-600 rounded"
                key={lichChieu.maLichChieu}
              >
                {moment(lichChieu.ngayChieuGioChieu).format('MMMM Do, h:mm')}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
