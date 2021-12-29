import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { rules } from "../../helpers/rules";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { loginSocial, register } from "../../features/auth/authSlice";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-toastify";

export default function Index() {
  const ICONGG = "/assets/img/icon/Asset 18.png";
  const ICONFB = "/assets/img/icon/Asset 19.png";

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      sdt: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = async (data) => {
    const body = {
      password: data.password.trim(),
      phone: data.sdt,
      fullname: data.name.trim(),
    };

    try {
      const res = await dispatch(register(body));
      unwrapResult(res);
      history.push("/login");
      toast.success("Đăng ký thành công", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("SDT đã tồn tại", {
        position: "top-center",
        autoClose: 3000,
      });
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
    <div className="signup container">
      <div className="row">
        <div className=" col-12 signup__form">
          <h3 className="text-center p-1">ĐĂNG KÝ</h3>
          <div className="signup__social">
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
            <p className="title__social">
              Đăng ký nhanh với Google hoặc Facebook
            </p>
          </div>
          <div className="signup__input">
            <form action="#" onSubmit={handleSubmit(handleRegister)}>
              <div className="form-group">
                <label htmlFor="form-group-name" className="font-weight-bold">
                  Họ và tên
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={rules.fullname}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="name"
                      placeholder="Mời nhập họ và tên"
                      onChange={field.onChange}
                      value={getValues("name")}
                      className="form-control rounded-0"
                      id="form-group-name"
                    />
                  )}
                />
                <ErrorMessage name="name" errors={errors} />
              </div>
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
                      type="text"
                      onChange={field.onChange}
                      placeholder="Mời nhập số điện thoại"
                      value={getValues("sdt")}
                      className="form-control rounded-0"
                      id="form-group-phone"
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
                      onChange={field.onChange}
                      placeholder="Mời nhập mật khẩu"
                      value={getValues("password")}
                      className="form-control rounded-0"
                      id="form-group-password"
                    />
                  )}
                />
                <ErrorMessage name="password" errors={errors} />
              </div>
              <div className="button__submit">
                <button type="submit" className="submit-form">
                  Đăng Ký
                </button>
              </div>
            </form>
          </div>
          <p className="accept--rules">
            Bạn đăng ký đồng nghĩa với bạn đồng ý các{" "}
            <Link to="">điều khoản sử dụng </Link>
            của chúng tôi
          </p>
          <div className="yes--account">
            <span>Bạn đã có tài khoản ? </span>
            <Link to="/login" className="login__link">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
