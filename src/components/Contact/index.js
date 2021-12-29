import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { rules } from "../../helpers/rules";
import ErrorMessage from "../ErrorMessage";
import { contact } from "../../features/contact/contactSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import requestAPI from "../../apis/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
//
export default function Index() {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      title: "",
      text: "",
    },
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const PostContactAPI = async (dataContact) => {
    const data = await requestAPI(`/contact`, "POST", dataContact);
    return data;
  };
  const handleContact = async (data) => {
    const body = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      title: data.title,
      text: data.text,
    };

    if (
      !data.fullname ||
      !data.email ||
      !data.phone ||
      !data.title ||
      !data.text
    ) {
      console.log("Error");
    } else {
      console.log({ data });
      PostContactAPI(data)
        .then((res) => {
          if (res.data) {
            reset();
            toast.success("THÊM LIÊN HỆ THÀNH CÔNG", {
              position: "top-right",
              autoClose: 5000,
            });
          }
        })
        .catch((err) => {
          toast.error(
            "THÊM LIÊN HỆ THẤT BẠI, SỐ ĐIỆN THOẠI PHẢI BẮT ĐẦU BẰNG 03, 05, 07, 08, 09",
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
        });
    }

    try {
      const res = await dispatch(contact(body));
      unwrapResult(res);
      history.push("/");
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
    <div id="section__contact" className="contact section-area">
      <div className="container">
        <div className="contact__top">
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <div className="section__top">
                <span>Liên hệ</span>
                <h2 className="section__top-header">Liên hệ với chúng tôi</h2>
                {/* <div class="section__top-note">
      Vận chuyển hàng hóa trong nước và quốc tế
    </div>   */}
              </div>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit(handleContact)}>
          <div className="row">
            <div className="col-md-4">
              <ul className="content-text__list">
                <li className="content-text__item">
                  <img
                    src="./assets/img/icon/tomato_circle_phone.png"
                    alt=""
                    className="content-text__icon"
                  />
                  <div className="content-text__text">
                    <h3 className="content-text__text-header">Hot Line</h3>
                    <p>0933 33 77 00</p>
                  </div>
                </li>
                <li className="content-text__item">
                  <img
                    src="./assets/img/icon/tomato_circle_email.png"
                    alt=""
                    className="content-text__icon"
                  />
                  <div className="content-text__text">
                    <h3 className="content-text__text-header">Mail</h3>
                    <p>tklogistics@gmail.com</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="contact-form__userinfor">
                    <Controller
                      name="fullname"
                      control={control}
                      rules={rules.fullname}
                      render={({ field }) => (
                        <input
                          name="fullname"
                          type="text"
                          placeholder="Họ và Tên"
                          onChange={field.onChange}
                          value={getValues("fullname")}
                        />
                      )}
                    />
                    <img
                      src="./assets/img/icon/tomato_user.png"
                      alt=""
                      className="contact-form__icon"
                    />
                    <ErrorMessage name="fullname" errors={errors} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form__userinfor">
                    <Controller
                      name="email"
                      control={control}
                      rules={rules.email}
                      render={({ field }) => (
                        <input
                          name="email"
                          placeholder="Email"
                          onChange={field.onChange}
                          value={getValues("email")}
                        />
                      )}
                    />
                    <img
                      src="./assets/img/icon/tomato_email.png"
                      alt=""
                      className="contact-form__icon"
                    />
                    <ErrorMessage name="email" errors={errors} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form__userinfor">
                    <Controller
                      name="phone"
                      control={control}
                      rules={rules.phone}
                      render={({ field }) => (
                        <input
                          name="phone"
                          placeholder="Số điện thoại"
                          onChange={field.onChange}
                          value={getValues("phone")}
                        />
                      )}
                    />
                    <img
                      src="./assets/img/icon/tomato_phone.png"
                      alt=""
                      className="contact-form__icon"
                    />
                    <ErrorMessage name="phone" errors={errors} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form__userinfor">
                    <Controller
                      name="title"
                      control={control}
                      rules={rules.title}
                      render={({ field }) => (
                        <input
                          name="title"
                          placeholder="Tiêu đề"
                          onChange={field.onChange}
                          value={getValues("title")}
                        />
                      )}
                    />
                    <img
                      src="./assets/img/icon/tomato_input.png"
                      alt=""
                      className="contact-form__icon"
                    />
                    <ErrorMessage name="title" errors={errors} />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="contact-form__userinfor contact-form__userinfor-input">
                    <Controller
                      name="text"
                      control={control}
                      rules={rules.text}
                      render={({ field }) => (
                        <textarea
                          name="text"
                          placeholder="Nhập tin nhắn"
                          className="contact-form__userinfor__input"
                          onChange={field.onChange}
                          value={getValues("text")}
                        />
                      )}
                    />
                    <img
                      src="./assets/img/icon/tomato_input.png"
                      alt=""
                      className="contact-form__icon"
                    />
                    <ErrorMessage name="text" errors={errors} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-area__btn">
            <button>
              Gửi yêu cầu
              <img
                src="./assets/img/icon/planes.png"
                alt=""
                className="section-area__btn-icon"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
