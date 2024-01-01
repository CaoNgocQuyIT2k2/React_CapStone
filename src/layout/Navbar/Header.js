import React, { useState } from "react";
import {
  Breadcrumb,
  Layout,
  Dropdown,
  message,
  Space,
} from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/action/logout";


const Headers = () => {
  const { Header } = Layout;
  const [menuActive, setMenuActive] = useState(false);
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
        <div className="absolute lg:relative top-5 lg:top-0 left-0 w-full lg:w-auto flex justify-center text-teal-800 lg:text-white items-center">
          <Link
            className="font-bold lg:font-normal text-teal-800 lg:text-white"
            to="/login"
          >
            Đăng nhập
          </Link>
          <div className="mx-3">|</div>
          <Link
            className="font-bold lg:font-normal text-teal-800 lg:text-white"
            to="/register"
          >
            Đăng kí
          </Link>
        </div>
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
      <Header className="flex items-center fixed top-0 left-0 w-full z-[500] px-0 text-sm shadow-lg">
        <div className="container flex items-center">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="font-medium text-red-500 text-3xl animate-bounce"
        >
          CyberFlix
        </span>

          <div
            className={`flex flex-col lg:flex-row justify-center items-center lg:justify-normal opacity-1 fixed top-0 left-0 w-[75vw] h-screen z-50 bg-white/95 lg:flex-grow lg:opacity-100 lg:relative lg:w-auto lg:h-auto lg:pointer-events-auto lg:bg-transparent lg:translate-x-0 transition-all duration-400 
                                ${
                                  menuActive
                                    ? "opacity-100 pointer-events-auto translate-x-0"
                                    : "opacity-0 pointer-events-none translate-x-[-100%]"
                                }`}
          >
            <Breadcrumb
              className="mx-auto nav-custom"
              items={[
                {
                  title: (
                    <Link className="asd" to="/">
                      <span className="block text-black font-medium lg:font-normal text-lg lg:text-base lg:text-white mb-4 lg:mr-5 lg:mb-0">
                        Trang chủ
                      </span>
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link className="" to="/lien-he">
                      <span className="block text-black font-medium lg:font-normal text-lg lg:text-base lg:text-white mb-4 lg:mr-5 lg:mb-0">
                        Liên hệ
                      </span>
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link className="" to="/tin-tuc">
                      <span className="block text-black font-medium lg:font-normal text-lg lg:text-base lg:text-white mb-4 lg:mr-5 lg:mb-0">
                        Tin tức
                      </span>
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link className="" to="/dat-ve">
                      <span className="block text-black font-medium lg:font-normal text-lg lg:text-base lg:text-white mb-4 lg:mr-5 lg:mb-0">
                        Đặt vé
                      </span>
                    </Link>
                  ),
                },
              ]}
            />

            {renderMenu()}
          </div>

          <div
            className="inline-flex w-[40px] h-[40px] p-[10px] ml-auto mr-[-15px] text-white lg:hidden"
            onClick={() => {
              setMenuActive(!menuActive);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </div>
        </div>
      </Header>
    </Layout>
  );
};
export default Headers;
