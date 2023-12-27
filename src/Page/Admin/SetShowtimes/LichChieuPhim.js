import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Select, DatePicker } from 'antd';
import { https } from '../../../services/config';

const LichChieuPhim = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [detail, setDetail] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [maHeThongRap, setMaHeThongRap] = useState(null); // Thêm state cho maHeThongRap

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    https
      .get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`)
      .then((res) => {
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log(" 😂 ~ .then ~ err:", err);
      });
  }, []);

  useEffect(() => {
    // Kiểm tra xem maHeThongRap có giá trị không trước khi gọi API
    if (maHeThongRap !== null) {
      https
        .get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
        .then((res) => {
          setCumRap(res.data.content);
        })
        .catch((err) => {
          console.log(" 😂 ~ .then ~ err:", err);
        });
    }
  }, [maHeThongRap]); // Sử dụng useEffect này để theo dõi sự thay đổi của maHeThongRap

  const handleHeThongRapChange = (value) => {
    setMaHeThongRap(value); // Cập nhật giá trị maHeThongRap khi người dùng chọn
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Hệ thống rạp" name="maHeThongRap">
        <Select onChange={handleHeThongRapChange}>
          {detail.map((item) => (
            <Select.Option key={item.maHeThongRap} value={item.maHeThongRap}>
              {item.tenHeThongRap}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Cụm rạp">
        <Select>
          {cumRap.map((cumRaps, index) => (
            <Select.Option key={cumRaps.maCumRap} value={cumRaps.maCumRap}>
              {cumRaps.tenCumRap}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Thời gian chiếu" name="dateTime">
        <DatePicker showTime format="YYYY-MM-DD HH:mm" placeholder="Chọn thời gian" />
      </Form.Item>
      <Form.Item label="Giá vé" name="giaVe">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Chức năng">
        <Button>Tạo lịch chiếu</Button>
      </Form.Item>
    </Form>
  );
};

export default LichChieuPhim;
