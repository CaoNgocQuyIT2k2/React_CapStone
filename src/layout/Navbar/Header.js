import React from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Dropdown,
  message,
  Space,
} from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/action/logout";
const { Header, Content, Footer } = Layout;

const Headers = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  //useNavigate dùng để điều hướng trang và không gây reload

  //lấy dữ liệu từ redux về
  //useSelector ~ mapStateToProps
  let user = useSelector((state) => state.userReducer.user);
  let renderMenu = () => {
    if (user) {
      return (
        <>
          <div className="text-white">
            <Space wrap>
              <Dropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<UserOutlined style={{ color: "white" }} />}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "none",
                }}
                onClick={handleMenuClick}
              >
                <div className="text-white">{user.hoTen}</div>
              </Dropdown.Button>
            </Space>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="text-white">
            <Link to="/login">Đăng nhập</Link>
          </div>
          <div className="text-white pl-2 pr-2">|</div>
          <div className="text-white">
            <Link to="/register">Đăng kí</Link>
          </div>
        </>
      );
    }
  };

  const handleMenuClick = (e) => {
    console.log("click", e);
    if (e.key === "1") {
      window.location.href = "/admin";
    }
    // Check if the key is '2' (Log out)
    if (e.key === "2") {
      window.location.reload();
      message.success("Đăng xuất thành công");
      // Perform the logout action
      window.location.href = "/";
      // Clear data user and reset state userReducer
      localStorage.removeItem("USER_INFO");
      dispatch(logoutUser());
      return;
    }
  };

  const items = [
    { label: "Admin", key: "1", icon: <UserOutlined /> },
    { label: "Log out", key: "2", icon: <LogoutOutlined /> },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#121121"
        }}
      >
        <span
          onClick={() => {
            navigate("/");
          }}
          className="font-medium text-red-500 text-3xl animate-bounce"
        >
          CyberFlix
        </span>

        <Breadcrumb
          style={{
            flex: 1,
            minWidth: 0,
            color: "white",
          }}
          items={[
            {
              title: (
                <Link style={{ color: "white" }} to="/">
                  Trang chủ
                </Link>
              ),
            },
            {
              title: (
                <a href="" style={{ color: "white" }}>
                  Liên hệ
                </a>
              ),
            },
            {
              title: (
                <a href="" style={{ color: "white" }}>
                  Tin tức
                </a>
              ),
            },
            {
              title: (
                <a href="" style={{ color: "white" }}>
                  Đặt vé
                </a>
              ),
            },
          ]}
        />

        {renderMenu()}
      </Header>
    </Layout>
  );
};
export default Headers;
