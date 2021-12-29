import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderNavItem from "./HeaderNavItem";
import classname from "classname";
import { Nav, Navbar } from "react-bootstrap";
import { logout } from "../../../features/auth/authSlice";
import useAuthenticated from "../../../helpers/useAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Index({ isHome }) {
  const authenticated = useAuthenticated();
  const name = useSelector((state) => state.auth.profile.fullname);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công", {
      position: "top-center",
      autoClose: 3000,
    });
  };
  const headerItem = [
    {
      name: "TRANG CHỦ",
      link: "/",
    },
    {
      name: "GIỚI THIỆU",
      link: "/About",
    },
    {
      name: "DỊCH VỤ",
      link: "/Service",
    },
    {
      name: "TRA CỨU",
      link: "/Search",
    },
    {
      name: "TUYỂN DỤNG",
      link: "/Recruitment",
    },
    {
      name: "LIÊN HỆ",
      link: "/Contact",
    },
    {
      name: "Admin",
      link: "/Dashboard"
    }
  ];

  //event change color navbar
  const [colorChange, setColorchange] = useState(false);

  useEffect(() => {
    const changeNavbarColor = () => {
      if (isHome === true) {
        if (window.scrollY >= 80) {
          setColorchange(true);
        } else {
          setColorchange(false);
        }
      }
    };
    window.addEventListener("scroll", changeNavbarColor);
  }, [isHome]);

  return (
    <div className={classname("header", { "header--home": isHome === true })}>
      <Navbar
        expand="lg"
        className={colorChange ? "colorChange" : "header__nav"}
      >
        <Navbar.Brand>
          <Link to="/">
            <img
              src="../assets/img/logo/dark_logo.png"
              alt="this is logo"
              className="header__logo"
            />
          </Link>
        </Navbar.Brand>
        <div className="container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <ul className="header__nav-list">
                <HeaderNavItem headerItem={headerItem} />
                <li className="header__nav-item header__authenWrapper">
                  {authenticated && (
                    <div className="account">
                      <Link to="">
                        <div class="account-personal">
                          <img src="../assets/img/icon/user_img.png" alt="" />
                        </div>
                      </Link>
                      <span className="account-name">{name}</span>
                      <div class="account-menu">
                        <img src="../assets/img/icon/bars.png" alt="" />
                        <div className="account-menu__list">
                          <Link to="/UserInfor" className="account-menu__item">
                            Tài khoản của tôi
                          </Link>
                          <Link
                            onClick={handleLogout}
                            to=""
                            className="account-menu__item"
                          >
                            Đăng xuất
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {!authenticated && (
                    <div className="header__authenWrapper">
                      <Link to="/login" className="header__authen--login">
                        ĐĂNG NHẬP
                      </Link>
                      <Link to="/register" className="header__authen--signup">
                        ĐĂNG KÝ
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}
