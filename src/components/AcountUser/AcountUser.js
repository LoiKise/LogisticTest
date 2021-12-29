import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import requestAPI from "../../apis";
import { updateInfo } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { ACCESS_TOKEN } from "../../utils/constant";
import Loading from "./Loading";

export default function AcountUser() {
  const statusSocial = useSelector((state) => state.auth.statusSocial);
  const profile = useSelector((state) => state.auth.profile);
  // const password = useSelector((state) => state.auth.profile.password);
  const id = useSelector((state) => state.auth.profile.id);
  const [update, setUpdate] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [fullname, setFullname] = useState(profile.fullname);
  const [phone, setPhone] = useState(profile.phone);
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const [hasOrder, setHasOrder] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const toggleUpdate = () => {
    setUpdate(true);
  };

  const toogleChangePass = () => {
    setChangePass(true);
  };

  const tooglePopup = (id) => {
    setOrder(orders.filter((order) => order.id === id));
    setOpenPopup(true);
  };

  const tooglePopupClose = () => {
    setOpenPopup(false);
  };

  const cancelUpdate = () => {
    setUpdate(false);
    setChangePass(false);
    history.push("/UserInfor");
  };

  //Update profile
  const updateProfile = async (data) => {
    const body = {
      email: null,
      fullname: fullname,
      phone: phone,
      imgUrl: null,
    };

    try {
      if (fullname.length <= 0) {
        toast.error("TÊN KHÔNG ĐƯỢC ĐỂ TRỐNG", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        const res = await requestAPI(`/user/${id}`, "PUT", body);
        await dispatch(updateInfo(body));
        unwrapResult(res);
        setUpdate(false);
        toast.success("CẬP NHẬT THÀNH CÔNG", {
          position: "top-right",
          autoClose: 5000,
        });
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Lấy danh sách lịch sử đơn hàng
  useEffect(() => {
    const getOrderUser = async () => {
      if (!ACCESS_TOKEN()) {
        history.push("/login");
      } else {
        const res = await requestAPI(`/order/user/${id}`, "GET", id);
        console.log(res);
        setOrders(res.data.listOrder);
        setLoading(false);
        res.data === "User have no order"
          ? setHasOrder(false)
          : setHasOrder(true);
      }
    };
    getOrderUser();
    setLoading(true);
  }, [id, history]);

  //Thay đổi mật khẩu
  const changePassword = async (data) => {
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      if (newPassword.length < 6 || newPassword.length > 160) {
        toast.error("MẬT KHẨU CÓ ĐỘ DÀI TỪ 6 - 160 KÝ TỰ", {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (oldPassword === newPassword) {
        toast.error("MẬT KHẨU MỚI KHÔNG ĐƯỢC TRÙNG MẬT KHẨU CŨ", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        const res = await requestAPI(
          `/user/changepassword/${id}`,
          "POST",
          body
        );
        //const resUpdate = await dispatch(changePass(body));
        //unwrapResult(res);
        setChangePass(false);
        toast.success("THAY ĐỔI MẬT KHẨU THÀNH CÔNG", {
          position: "top-right",
          autoClose: 5000,
        });
        setNewPassword("");
        setOldPassword("");
        return res;
      }
    } catch (error) {
      console.log(error);
      toast.error("MẬT KHẨU CŨ KHÔNG ĐÚNG", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="background">
      <div className="personal">
        <div className="row row-personal">
          <div className="col-md-4 col-12 personal--left text-center">
            <div className="personal--title">Thông tin người dùng</div>
            <div className="personal--infor">
              <img
                src="../assets/img/icon/user_img.png"
                alt=""
                className="avatar mb-3"
              />
              {!update && (
                <p className="infor--name font-weight-bold">
                  {profile.fullname}
                </p>
              )}
              {update && (
                <div className="row row-personal">
                  <p className="infor--phone p-2 col-md-3 text-position">
                    Tên :
                  </p>
                  <input
                    className="form-input form-control col-md-7"
                    name="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
              )}
              {!update && !statusSocial && (
                <div className="d-flex justify-content-center align-items-center">
                  <p className="infor--phone p-2">Số điện thoại :</p>
                  <p className="font-weight-bold">{profile.phone}</p>
                </div>
              )}
              {update && (
                <div className="row row-personal">
                  <p className="infor--phone p-2 col-md-3 text-position">
                    Số điện thoại :
                  </p>
                  <input
                    className="form-input form-control col-md-7"
                    name="phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly
                  />
                </div>
              )}
              {!update && !statusSocial && !changePass && (
                <button
                  type="submit"
                  className="button btn-success"
                  onClick={toggleUpdate}
                >
                  Cập nhật thông tin
                </button>
              )}
              {update && (
                <div>
                  <button
                    type="submit"
                    className="button btn-success"
                    onClick={updateProfile}
                  >
                    Cập nhật
                  </button>
                  <button
                    type="submit"
                    className="button btn-danger"
                    onClick={cancelUpdate}
                  >
                    Hủy
                  </button>
                </div>
              )}
              {!changePass && !statusSocial && !update && (
                <div>
                  {/* <p className="infor--password p-2">Mật khẩu: <span className="font-weight-bold">************</span></p> */}
                  <button
                    type="submit"
                    className="button btn-info"
                    onClick={toogleChangePass}
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              )}
              {changePass && (
                <div>
                  <div className="row row-personal">
                    <p className="col-md-4 text-position">Mật khẩu cũ :</p>
                    <input
                      className="form-input form-control col-md-7"
                      name="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="row row-personal">
                    <p className="col-md-4 text-position">Mật khẩu mới :</p>
                    <input
                      className="form-input form-control col-md-7"
                      name="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="button btn-success"
                    onClick={changePassword}
                  >
                    Đổi mật khẩu
                  </button>
                  <button
                    type="submit"
                    className="button btn-danger"
                    onClick={cancelUpdate}
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-7 col-12 personal--right">
            <div className="order--title">Lịch sử đơn hàng</div>
            {loading && !statusSocial && <Loading />}
            {statusSocial && (
              <h1 style={{ textAlign: "center" }}>
                Bạn cần đăng kí bằng tài khoản số điện thoại để sử dụng dịch vụ
                này
              </h1>
            )}
            {!hasOrder && !statusSocial && !loading && (
              <h1 style={{ textAlign: "center" }}>
                Hiện tại bạn không có đơn hàng nào
              </h1>
            )}
            {hasOrder &&
              !statusSocial &&
              !loading &&
              orders.map((item) => {
                return (
                  <div className="order--details">
                    <img
                      src="./assets/img/icon/box.png"
                      alt=""
                      class="order--logo"
                    />
                    <div className="order-content">
                      <p className="font-weight-bold">Mã đơn : {item.id}</p>
                      <p className="font-weight-bold">
                        Tiêu đề : {item.orderName}
                      </p>
                    </div>
                    <button
                      className="order--seen button btn-success"
                      onClick={(id) => tooglePopup(item.id)}
                    >
                      XEM CHI TIẾT
                    </button>
                    {openPopup &&
                      order.map((item) => {
                        return (
                          <div className="popup-box">
                            <div className="box">
                              <span
                                className="close-icon"
                                onClick={tooglePopupClose}
                              >
                                x
                              </span>
                              <div>
                                <table className="table">
                                  <thead className="thead-light">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="font-weight-bold"
                                      >
                                        Mã đơn
                                      </th>
                                      <th
                                        scope="col"
                                        className="font-weight-bold"
                                      >
                                        Tiêu đề
                                      </th>
                                      <th
                                        scope="col"
                                        className="font-weight-bold"
                                      >
                                        Loại khách
                                      </th>
                                      <th
                                        scope="col"
                                        className="font-weight-bold"
                                      >
                                        Số lượng
                                      </th>
                                      <th
                                        scope="col"
                                        className="font-weight-bold"
                                      >
                                        Giá
                                      </th>
                                      <th
                                        scope="col"
                                        className="font-weight-bold"
                                      >
                                        Ghi chú
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{item.id}</td>
                                      <td>{item.orderName}</td>
                                      <td>{item.customerType}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.totalPrice}</td>
                                      <td>{item.notes}</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="row row-personal">
                                  <div className="col-md-6">
                                    <table className="table">
                                      <thead className="thead-light">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="font-weight-bold"
                                          >
                                            NGƯỜI GỬI
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            {item.customerName}
                                            <br />
                                            {item.customerAddress}
                                            <br />
                                            {item.customerPhone}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="col-md-6">
                                    <table className="table">
                                      <thead className="thead-light">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="font-weight-bold"
                                          >
                                            NGƯỜI NHẬN
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            {item.receiverName}
                                            <br />
                                            {item.receiverAddress}
                                            <br />
                                            {item.receiverPhone}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
