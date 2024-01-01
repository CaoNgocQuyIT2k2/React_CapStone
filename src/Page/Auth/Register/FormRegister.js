import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { https } from "../../../services/config.js";

export default function FormRegister() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleSubmit = (e) => {

    const payload = {
      taiKhoan: e.username,
      matKhau: e.password,
      email: e.username,
      soDt: "string",
      maNhom: "GP01",
      hoTen: "string",
    };
    https
      .post("/api/QuanLyNguoiDung/DangKy", payload)
      .then((res) => {
        console.log(res.data);
        navigate("/login")
        message.success("Đăng ký thành công")
      })
      .catch((err) => {
        console.log(err);
        message.error("Đăng ký thất bại")
      });
  };
  return (
    <div className="register grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form
        onFinish={handleSubmit}
        className="container register_container"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: "100%", // Chỉnh kích thước cho màn hình nhỏ
          padding: "10px",
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <i class="fa fa-lock icon"></i>
        <h2 style={{fontSize: "30px", fontWeight:"400", color:"white", marginLeft: 230}}>Đăng Ký</h2>
        {/* //------------------------------ */}
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            className="input"
            placeholder="User name"
            style={{ width: "150%", margin: "20px 0 ", height: "70px" }}
          />
        </Form.Item>
        {/* //------------------------------ */}
        <Form.Item
          label=""
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            className="input"
            placeholder="Email"
            style={{ width: "150%", margin: "20px 0", height: "70px" }}
          />
        </Form.Item>
        {/* //------------------------------ */}
        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            className="input !bg-transparent"
            placeholder="Password"
            style={{ width: "150%", margin: "20px 0", height: "70px" }}
          />
        </Form.Item>
        {/* //------------------------------ */}
        <Form.Item
          label=""
          name="retypePassword"
          rules={[
            {
              required: true,
              message: "Please input your Enter the password!",
            },
          ]}
        >
          <Input.Password
            className="input"
            placeholder="Enter the password"
            
            style={{
              width: "150%",
              margin: "20px 0",
              height: "70px",
            }}
          />
        </Form.Item>
        {/* //------------------------------ //submit */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="dashed"
            className="btn-theme text-4xl"
            htmlType="submit"
            style={{
              marginLeft: "5px",
              padding: "33px ",
              display: "flex",
              alignItems: "center",
              color: "white",
              backgroundColor: "#221d1d7f",
              borderRadius: "10px",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
