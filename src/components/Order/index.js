import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import CategoryTitle from "../Home/Category/CategoryTitle/CategoryTitle";
import requestAPI from "../../apis";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { rules } from "../../helpers/rules";
import ErrorMessage from "../../components/ErrorMessage/index";
import axios from "axios";

export default function Index() {
  const IconService = "./assets/img/icon/planes.png";
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [boroughList, setBoroughList] = useState([]);
  const [typeProductList, setTypeProductlist] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      borough: "",
      city: "",
      district: "",
      typeProduct: "",
      weight: "",
      fastShip: false,
      hangdonglanh: false,
      devo: false,
    },
  });
  const handleValue = async (data) => {
    let note = "";
    let fastShip = false;
    const address = `${data.address}, ${data.borough}, ${
      data.district.split("-")[1]
    }, ${data.city.split("-")[1]}.`;
    if (data.devo && data.devo !== undefined) {
      note += "Dễ vỡ,";
    }
    if (data.hangdonglanh && data.hangdonglanh !== undefined) {
      note += " Hàng đông lạnh";
    }
    if (data.fastShip) {
      fastShip = true;
    }

    const body = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      address: address,
      typeProduct: data.typeProduct,
      weight: Number(data.weight),
      fastShip: fastShip,
      note: note,
    };
    try {
      const res = await requestAPI("/request", "POST", body)
        .then(() => {
          reset();
          toast.success("Đặt hàng thành công", {
            position: "top-center",
            autoClose: 3000,
          });
        })
        .catch((err) =>
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 3000,
          })
        );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCity = async () => {
      const res = await axios.get("https://provinces.open-api.vn/api/p/");
      setCityList(res.data);
      const res1 = await requestAPI("/categories", "GET");
      setTypeProductlist(res1.data.data);
    };
    getCity();
  }, []);

  const changeCity = async (e) => {
    const code = e.target.value.split("-");
    const res = await axios.get(
      `https://provinces.open-api.vn/api/p/${code[0]}?depth=2`
    );
    setDistrictList([]);
    setBoroughList([]);
    setDistrictList(res.data.districts);
  };

  const changeDistrict = async (e) => {
    const code = e.target.value.split("-");
    const res = await axios.get(
      `https://provinces.open-api.vn/api/d/${code[0]}?depth=2`
    );
    setBoroughList([]);
    setBoroughList(res.data.wards);
  };

  return (
    <div className="container">
      <div className="ordernow__top">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <CategoryTitle title="Đặt hàng" content="Đặt hàng ngay" />
          </div>
        </div>
      </div>
      <form
        action="#"
        onSubmit={handleSubmit(handleValue)}
        className="ordernow-form"
      >
        <div className="ordernow-form__userinfor">
          <div className="row">
            <div className="col-md-4">
              <div className="ordernow-form__userinfor-item">
                <Controller
                  name="fullname"
                  control={control}
                  rules={rules.fullname}
                  render={({ field }) => (
                    <input
                      name="fullname"
                      className="ordernow-form__username"
                      onChange={field.onChange}
                      placeholder="Họ và Tên"
                      value={getValues("fullname")}
                    />
                  )}
                />
                <img
                  src="./assets/img/icon/tomato_user.png"
                  className="ordernow-form__icon"
                  alt=""
                />
              </div>
              <ErrorMessage name="fullname" errors={errors} color />
            </div>
            <div className="col-md-4">
              <div className="ordernow-form__userinfor-item">
                <Controller
                  name="phone"
                  control={control}
                  rules={rules.phone}
                  render={({ field }) => (
                    <input
                      name="phone"
                      onChange={field.onChange}
                      className="ordernow-form__userphone"
                      placeholder="Số Điện Thoại"
                      value={getValues("phone")}
                    />
                  )}
                />
                <img
                  src="./assets/img/icon/tomato_phone.png"
                  className="ordernow-form__icon"
                  alt=""
                />
              </div>
              <ErrorMessage name="phone" errors={errors} color />
            </div>
            <div className="col-md-4">
              <div className="ordernow-form__userinfor-item">
                <Controller
                  name="email"
                  control={control}
                  rules={rules.email}
                  render={({ field }) => (
                    <input
                      name="email"
                      onChange={field.onChange}
                      className="ordernow-form__useremail"
                      placeholder="Email"
                      value={getValues("email")}
                    />
                  )}
                />
                <img
                  src="./assets/img/icon/tomato_email.png"
                  className="ordernow-form__icon"
                  alt=""
                />
              </div>
              <ErrorMessage name="email" errors={errors} color />
            </div>
          </div>
        </div>

        <div className="ordernow-form__deliverylocation">
          <h3 className="ordernow-form__deliverylocation-header">
            Điểm Giao Hàng
          </h3>
          <div className="row">
            <div className="col-md-3">
              <div className="ordernow-form__deliverylocation-item">
                <Controller
                  name="city"
                  control={control}
                  rules={rules.batbuoc}
                  onChange={changeCity}
                  render={({ field }) => (
                    <select
                      name="city"
                      className="ordernow-form__deliverylocation-itemm"
                      onChange={(e) => {
                        field.onChange(e);
                        changeCity(e);
                      }}
                      value={getValues("city")}
                    >
                      <option hidden value="">
                        Tỉnh / Thành Phố
                      </option>
                      {cityList.map((city, index) => (
                        <option key={index} value={`${city.code}-${city.name}`}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <img
                  src="./assets/img/icon/tomato_down_arrow.png"
                  className="ordernow-form__iconn"
                  alt=""
                />
              </div>
              <ErrorMessage name="city" errors={errors} color />
            </div>
            <div className="col-md-3">
              <div className="ordernow-form__deliverylocation-item">
                <Controller
                  name="district"
                  rules={rules.batbuoc}
                  control={control}
                  render={({ field }) => (
                    <select
                      name="district"
                      className="ordernow-form__deliverylocation-itemm"
                      onChange={(e) => {
                        field.onChange(e);
                        changeDistrict(e);
                      }}
                      value={getValues("district")}
                    >
                      <option hidden value="">
                        Huyện / Quận
                      </option>
                      {districtList.map((district, index) => (
                        <option
                          key={index}
                          value={`${district.code}-${district.name}`}
                        >
                          {district.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <img
                  src="./assets/img/icon/tomato_down_arrow.png"
                  className="ordernow-form__iconn"
                  alt=""
                />
              </div>
              <ErrorMessage name="district" errors={errors} color />
            </div>
            <div className="col-md-3">
              <div className="ordernow-form__deliverylocation-item">
                <Controller
                  name="borough"
                  rules={rules.batbuoc}
                  control={control}
                  render={({ field }) => (
                    <select
                      name="borough"
                      className="ordernow-form__deliverylocation-itemm"
                      onChange={field.onChange}
                      value={getValues("borough")}
                    >
                      <option hidden value="">
                        Xã / Phường
                      </option>
                      {boroughList.map((borough, index) => (
                        <option key={index} value={borough.name}>
                          {borough.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <img
                  src="./assets/img/icon/tomato_down_arrow.png"
                  className="ordernow-form__iconn"
                  alt=""
                />
              </div>
              <ErrorMessage name="borough" errors={errors} color />
            </div>
            <div className="col-md-3">
              <div className="ordernow-form__deliverylocation-item">
                <Controller
                  name="address"
                  rules={rules.batbuoc}
                  control={control}
                  render={({ field }) => (
                    <input
                      name="address"
                      onChange={field.onChange}
                      className="ordernow-form__province"
                      placeholder="Địa Chỉ"
                      value={getValues("address")}
                    />
                  )}
                />
              </div>
              <ErrorMessage name="address" errors={errors} color />
            </div>
          </div>
        </div>
        <div className="ordernow-form__about">
          <div className="row">
            <div className="col-md-3">
              <div className="ordernow-form__about-item">
                <Controller
                  name="typeProduct"
                  control={control}
                  rules={rules.batbuoc}
                  render={({ field }) => (
                    <select
                      name="typeProduct"
                      className="ordernow-form__deliverylocation-itemm"
                      onChange={field.onChange}
                      value={getValues("typeProduct")}
                    >
                      <option hidden value="">
                        Loại Hàng
                      </option>
                      {typeProductList.map((type, index) => (
                        <option key={index} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <img
                  src="./assets/img/icon/tomato_down_arrow.png"
                  className="ordernow-form__iconn"
                  alt=""
                />
              </div>
              <ErrorMessage name="typeProduct" errors={errors} color />
            </div>
            <div className="col-md-3">
              <div className="ordernow-form__about-item">
                <Controller
                  name="weight"
                  control={control}
                  rules={rules.weight}
                  render={({ field }) => (
                    <input
                      name="weight"
                      onChange={field.onChange}
                      className="ordernow-form__weight"
                      placeholder="Cân Nặng"
                      value={getValues("weight")}
                    />
                  )}
                />
              </div>
              <ErrorMessage name="weight" errors={errors} color />
            </div>
            <div className="col-md-6">
              <div className="ordernow-form__about-check">
                <ul className="form__about-checklist">
                  <li className="form__about-checkitem">
                    <Controller
                      name="fastShip"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          name="fastShip"
                          onChange={field.onChange}
                          checked={getValues("fastShip")}
                        />
                      )}
                    />

                    <span>Chuyển phát nhanh</span>
                  </li>
                  <li className="form__about-checkitem">
                    <Controller
                      name="devo"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          name="devo"
                          onChange={field.onChange}
                          checked={getValues("devo")}
                        />
                      )}
                    />
                    <span>Dễ vỡ</span>
                  </li>
                  <li className="form__about-checkitem">
                    <Controller
                      name="hangdonglanh"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          name="hangdonglanh"
                          onChange={field.onChange}
                          checked={getValues("hangdonglanh")}
                        />
                      )}
                    />
                    <span>Hàng đông lạnh</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="section-area__btn">
          <button type="submit">
            GỬI YÊU CẦU
            <img className="section-area__img" src={IconService} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}
