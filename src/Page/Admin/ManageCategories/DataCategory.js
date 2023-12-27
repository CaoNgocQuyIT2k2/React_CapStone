import React, { useEffect, useState } from 'react';
import { https } from '../../../services/config.js';
import { Button, Table, Tag, message } from 'antd';
import AddCategory from './AddCategory.js';
import EditCategory from './EditCategory.js';
import { Link, useParams } from 'react-router-dom';
import { CarryOutOutlined, DeleteOutlined } from '@ant-design/icons';

export default function DataCategory({ setIsButtonClicked, isButtonClicked }) {
  const [detail, setDetail] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  let { idPhim } = useParams();

  const fetchArticleDetail = async () => {
    try {
      const response = await https.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`);
      const categories = response.data.content || [];
      console.log("🚀 ~ response.data:", response.data.content);
      setDetail(categories);
    } catch (error) {
      console.error("Error fetching article detail:", error);
    }
  };

  useEffect(() => {
    fetchArticleDetail();
  }, []);

  const showModal = (categories) => {
    setSelectedCategoryId(categories.maPhim);
  };

  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (hinhAnh) => {
        return <img style={{
          width: '80px',
          height: '80px',
        }} src={hinhAnh} alt="" />;
      },
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, categories) => (
        <div className='flex'>
          <EditCategory
            showModal={showModal}
            articleName={categories.tenPhim}
            categoriesId={categories.maPhim}
            fetchArticleDetail={fetchArticleDetail}
          />
          <Button onClick={() => handleDelete(categories.maPhim)} className='text-red-500 border-0 text-lg'>
            <DeleteOutlined />
          </Button>
          <Button onClick={() => setIsButtonClicked(true)} className='text-green-500 border-0 text-lg'>
            <CarryOutOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (maPhim) => {
    https
      .delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
      .then((res) => {
        message.success("Xóa thành công");
        console.log("🚀 ~ res:", res);
        fetchArticleDetail();
      })
      .catch((err) => {
        message.error("Xóa thất bại");
        message.error(err.response.data);
      });
  };

  return (
    <div>
      <AddCategory fetchArticleDetail={fetchArticleDetail} />
      <Table className='font-medium' columns={columns} dataSource={detail} />
    </div>
  );
}
