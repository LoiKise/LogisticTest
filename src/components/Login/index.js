import React from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { rules } from "../../helpers/rules";
import { Controller, useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { login, loginSocial } from "../../features/auth/authSlice";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-toastify";

export default function Index() {
  const ICONGG = "/assets/img/icon/Asset 18.png";
  const ICONFB = "/assets/img/icon/Asset 19.png";
  const ICONLOGO = "/assets/img/logo/login_logo.png";

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      sdt: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (data) => {
    const body = {
      phone: data.sdt,
      password: data.password.trim(),
    };
    try {
      const res = await dispatch(login(body));
      unwrapResult(res);
      history.push("/");
      toast.success("Đăng nhập thành công", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: "server",
            message: error.data[key],
          });
        }
      }
    }
  };

  //login gg
  const responseGoogle = async (res) => {
    if (res.error) {
      return;
    }
    const body = {
      user: {
        fullname: `${res.profileObj.familyName} ${res.profileObj.givenName}`,
      },
      accessToken: res.accessToken,
    };
    try {
      const res = await dispatch(loginSocial(body));
      unwrapResult(res);
      // history.push("/");
      toast.success("Đăng nhập thành công", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: "server",
            message: error.data[key],
          });
        }
      }
    }
  };

  //login face
  const responseFacebook = async (res) => {
    if (res.name === undefined && res.accessToken === undefined) {
      return;
    }
    const body = {
      user: { fullname: res.name },
      accessToken: res.accessToken,
    };
    try {
      const res = await dispatch(loginSocial(body));
      unwrapResult(res);
      history.push("/");
      toast.success("Đăng nhập thành công", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: "server",
            message: error.data[key],
          });
        }
      }
    }
  };

  return (
    <div className="login container py-5">
      <div className="row">
        <div className=" col-md-6 col-12 login__form">
          <h3 className="text-center p-3">ĐĂNG NHẬP</h3>
          <div className="login__social">
            <GoogleLogin
              clientId="181812673260-2tcsdhgp7vj2rv65kkv2ap3gb901e3f9.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="
                    login__google
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <img src={ICONGG} alt="icon__google" />
                  <p className="login__google--title font-weight-bold">
                    Đăng nhập với Google
                  </p>
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            <FacebookLogin
              appId="863179767664254"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="
              login__face
              d-flex
              justify-content-center
              align-items-center
            "
                >
                  <img src={ICONFB} alt="icon__face" />
                  <p className="login__face--title font-weight-bold">
                    Đăng nhập với Facebook
                  </p>
                </button>
              )}
            />
          </div>
          <div className="login__input">
            <form action="#" onSubmit={handleSubmit(handleLogin)}>
              <div className="form-group">
                <label htmlFor="form-group-phone" className="font-weight-bold">
                  Số điện thoại
                </label>
                <Controller
                  name="sdt"
                  control={control}
                  rules={rules.phone}
                  render={({ field }) => (
                    <input
                      className="form-control rounded-0"
                      id="form-group-phone"
                      onChange={field.onChange}
                      value={getValues("sdt")}
                    />
                  )}
                />
                <ErrorMessage name="sdt" errors={errors} />
              </div>
              <div className="form-group">
                <label
                  htmlFor="form-group-password"
                  className="font-weight-bold"
                >
                  Mật khẩu
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={rules.password}
                  render={({ field }) => (
                    <input
                      type="password"
                      className="form-control rounded-0"
                      id="form-group-password"
                      onChange={field.onChange}
                      value={getValues("password")}
                    />
                  )}
                />
                <ErrorMessage name="password" errors={errors} />
              </div>
              <div
                className="
                  login__input--submit
                  d-flex
                  justify-content-end
                  align-items-center
                "
              >
                {/* <Link className="forgot-password" to="/#">
                  Quên mật khẩu
                </Link> */}
                <button type="submit" className="submit-form">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
          <p className="not--account">Bạn chưa có tài khoản ?</p>
          <Link to="/register" className="signup__link">
            Đăng kí miễn phí ngay
          </Link>
        </div>
        <div className=" col-md-6 col-12 login__introduce">
          <div className="logo__introduce">
            <img src={ICONLOGO} alt="logo--intro" />
          </div>
          <div className="title__introdce">
            <h3 className="text-center">CHÀO MỪNG</h3>
            <p className="text-justify">
              Chào mừng bạn đến với công
              <span className="font-weight-bold">TK logistic</span> chúng tối.
              Chúng tôi chuyên vận chuyển hàng hóa trong nước và quốc tế bằng cả
              đường biển và đường bộ. Mong rằng quý khách sẽ nhận được trải
              nghiệm tốt nhất khi đến với chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
