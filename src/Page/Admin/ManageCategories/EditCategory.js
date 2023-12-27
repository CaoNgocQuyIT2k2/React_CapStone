// Thực hiện việc chỉnh sửa chuyên mục

import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message } from 'antd';
import { https } from '../../../services/config';
import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

const EditCategory = ({ showModal, articleName, categoriesId,fetchArticleDetail }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  let user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    // Set the categoryName when the articleName changes
    setCategoryName(articleName);
  }, [articleName]);


  const showModalHandler = () => {
    showModal({ categories_id: categoriesId, name: articleName });
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
  console.log("🚀 ~ user.user.id:", user.user_id)

  console.log("🚀 ~ categoriesId:", categoriesId)
  const handlEditCategory = async () => {
    try {
      if ( !user.user_id) {
        console.error("User information is missing");
        return;
      }
  
      const response = await https.post(`/api/category/update?categories_id=${categoriesId}&user_id=${user.user_id}`, {
        name: categoryName,
      });
      
      const updatedCategory = response.data || [];
      console.log("🚀 ~ response.data:", response.data);
      message.success("Cập nhật chuyên mục thành công");
      fetchArticleDetail()
      setOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("Cập nhật chuyên mục thất bại");
    }
  };

  return (
    <>
      <Button onClick={showModalHandler} className='text-yellow-500 border-0 text-lg'>
      <EditOutlined />
      </Button>
      <AntModal
        visible={open}
        title="Chỉnh sửa tên chuyên mục"
        onOk={handlEditCategory}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Trở về
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handlEditCategory} >
            Chỉnh sửa
          </Button>,
        ]}
      >
        <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
      </AntModal>
    </>
  );
};

export default EditCategory;