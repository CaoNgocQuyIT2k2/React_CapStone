// Thực hiện việc thêm một chuyên mục

import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message } from 'antd';
import { https } from '../../../services/config';
import { useSelector } from 'react-redux';

const AddCategory = ({  articleName, fetchArticleDetail }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    // Set the categoryName when the articleName changes
    setCategoryName(articleName);
  }, [articleName]);

  const showModalHandler = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handlAddCategory = async () => {
    try {
      if (!user.user_id) {
        console.error("User information is missing");
        return;
      }

      const response = await https.post(`/api/category/add?user_id=${user.user_id}`, {
        name: categoryName,
      });

      const addedCategory = response.data || [];
      console.log("🚀 ~ response.data:", response.data);
      message.success("Thêm chuyên mục thành công");
      fetchArticleDetail();
      setOpen(false);
    } catch (error) {
      console.error("Error adding category:", error.response);
      message.error("Thêm chuyên mục thất bại");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModalHandler} className='bg-green-500 text-white mb-3'>
        Thêm phim
      </Button>
      <AntModal
        visible={open}
        title="Thêm mới chuyên mục"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Trở về
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handlAddCategory} >
            Đồng ý
          </Button>,
        ]}
      >
        <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
      </AntModal>
    </>
  );
};

export default AddCategory;
