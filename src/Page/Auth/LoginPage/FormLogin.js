import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { https } from "../../../services/config.js";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SET_INFO } from "../../../redux/constant/user";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../../redux/action/loginAction";

const FormLogin = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  // const onFinishV2 = (values) => {
  //   https
  //     .post("/api/QuanLyNguoiDung/DangNhap", values)
  //     .then((res) => {
  //       //chuyển hướng về trang chủ
  //       navigate("/");
  //       // đảy data xuống localStorage để khi user load trang thì thông tin đăng nhập vẫn còn
  //       let dataJson = JSON.stringify(res.data.content);
  //       localStorage.setItem("USER_INFO", dataJson);
  //       message.success("login thành công");
  //       //đẩy thông tin user lên redux
  //       dispatch({
  //         type: SET_INFO,
  //         payload: res.data.content,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       message.error("Đã có lỗi xảy ra");
  //     });
  //   console.log("Success:", values);
  // };
  const onFinish = (values) => {
    dispatch(loginAction(values, navigate));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="form_login">
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 400,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-1/2"
    >
      <i class="fa fa-lock icon"></i>
      <h2 style={{ fontSize: "30px", fontWeight: "400", color: "white" }}>
        Đăng Nhập
      </h2>
      <br />
      <Form.Item
        label="Username"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Tài khoản không được bỏ trống",
          },
        ]}
        style={{
          backgroundColor: "white",
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Mật khẩu không được bỏ trống",
          },
        ]}
        style={{
          backgroundColor: "white",
        }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          className="bg-black -600 hover:text-white hover:border-transparent"
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
};
export default FormLogin;

// account: 13123 Test@13000
