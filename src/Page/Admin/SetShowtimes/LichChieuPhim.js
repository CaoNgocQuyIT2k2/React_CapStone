import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Select, DatePicker, message } from 'antd';
import { TOKEN, https } from '../../../services/config';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const LichChieuPhim = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [detail, setDetail] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [phim, setPhim] = useState([]);
  const [maHeThongRap, setMaHeThongRap] = useState(null);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  let { idPhim } = useParams();

  useEffect(() => {
    https
      .get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`)
      .then((res) => {
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.error("Error fetching system schedules:", err);
      });
  }, []);

  useEffect(() => {
    if (maHeThongRap !== null) {
      https
        .get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
        .then((res) => {
          setCumRap(res.data.content);
        })
        .catch((err) => {
          console.error("Error fetching cinema cluster:", err);
        });
    }
  }, [maHeThongRap]);

  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idPhim}`)
      .then((res) => {
        setPhim(res.data.content);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
      });
  }, []);

  const onFinish = (values) => {
    const { dateTime, giaVe, cumRap } = values;
  
    // Format the dateTime (moment object) to the required format
    const ngayChieuGioChieu = dateTime.format('DD/MM/YYYY HH:mm:ss');
  
    const requestData = {
      maPhim: +idPhim,
      ngayChieuGioChieu,
      maRap: cumRap,
      giaVe,
    };
  
    https
      .post(`/api/QuanLyDatVe/TaoLichChieu`, requestData)
      .then((res) => {
        console.log('Lịch chiếu đã được tạo.');
        message.success("Lịch chiếu đã được tạo");
      })
      .catch((err) => {
        console.log('Error creating lịch chiếu:', err);
        message.error("Lỗi tạo lịch chiếu");
      });
  };
  


  const handleHeThongRapChange = (value) => {
    setMaHeThongRap(value);
  };

  return (
    <div>
      <div className='font-bold text-xl text-blue-400 p-2'>
        <Link to='/admin'>
          <ArrowLeftOutlined /> BACK
        </Link>
      </div>
      <div className='flex items-center mt-5'>
        <div className='pl-10 w-1/3'>
          <h1 className='text-2xl font-bold pb-3'>Tạo lịch chiếu - {phim.tenPhim}</h1>
          <img
            style={{
              width: '70%',
              height: '70%',
            }}
            src={phim.hinhAnh}
            alt=""
          />
        </div>
        <div className='w-2/3 mt-5 font-medium'>
          <Form
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 13,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
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
            <Form.Item label="Cụm rạp" name="cumRap">
              <Select>
                {cumRap.map((cumRaps) => (
                  <Select.Option key={cumRaps.maCumRap} value={cumRaps.maCumRap}>
                    {cumRaps.tenCumRap}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Ngày chiếu giờ chiếu" name="dateTime">
              <DatePicker className='setDate' showTime format="YYYY-MM-DD HH:mm" placeholder="Chọn thời gian" />
            </Form.Item>
            <Form.Item label="Giá vé" name="giaVe">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Chức năng">
              <Button htmlType="submit">
                Tạo lịch chiếu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LichChieuPhim;
