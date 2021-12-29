import React from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../ScrollToTop";
import { useDispatch } from 'react-redux';
import { handlePopupCV } from "../../../features/home/homeSlice";
import PopupCV from "../../PopupCV/Index";

export default function Index() {
  const dispatch = useDispatch();
  const openCV = () => {
    dispatch(handlePopupCV(true));
  }
  return (
    <div>
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-list">
            <div className="footer-item">
              <img src="./assets/img/logo/light_logo.png" alt="" />
              <span className="footer-span">
                Chúng tôi có trên 26 năm kinh nghiệm
              </span>
              <span className="footer-span">
                Chúng tôi tự tin sẽ mang đến cho khách hàng dịch vụ nhanh nhất,
                rẻ nhất và an toàn nhất
              </span>
              <span className="footer-span">2021 TKT LOGISTICS</span>
            </div>
            <div className="footer-item">
              <h2>Thông tin liên hệ</h2>
              <div className="footer-item-list">
                <div className="footer-item-list-item">
                  <img src="./assets/img/icon/green_circle_phone.png" alt="" />
                  <div className="footer-item-list-item__content">
                    <span className="footer-phone__title">Hot Line</span>
                    <p>0933 33 77 00</p>
                  </div>
                </div>
                <div className="footer-item-list-item">
                  <img src="./assets/img/icon/red_circle_mail.png" alt="" />
                  <div className="footer-item-list-item__content">
                    <span className="footer-mail__title">Mail</span>
                    <p>tklogistics@gmail.com</p>
                  </div>
                </div>
                <div className="footer-item-list-item">
                  <img src="./assets/img/icon/circle_youtube.png" alt="" />
                  <div className="footer-item-list-item__content">
                    <span className="footer-youtube__title">Youtube</span>
                    <p>tklogistics</p>
                  </div>
                </div>
                <div className="footer-item-list-item">
                  <img src="./assets/img/icon/circle_facebook.png" alt="" />
                  <div className="footer-item-list-item__content">
                    <span className="footer-facebook__title">Facebook</span>
                    <p>Facebook.com/tklogistics</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-item">
              <h2>Tuyển dụng</h2>
              <Link to="/Recruitment"><p className="btn_linkInFooter" >Vị trí đang tuyển dụng </p></Link>
              <p onClick={() => openCV()} className="btn_linkInFooter">Gửi CV ngay</p>
            </div>
            <div className="footer-item">
              <h2>Điều khoản và chính sách</h2>
              <p>Điều khoản & Điều kiện</p>
              <p>Chính sách bảo mật</p>
              <p>Quyền riêng tư</p>
              <p>Các mặt hàng cấm</p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12.52 12.52"
              >
                <g className="cls-1">
                  <path
                    d="M802.68,565.52a6.26,6.26,0,1,1,6.26-6.26A6.27,6.27,0,0,1,802.68,565.52Zm0-11.48a5.22,5.22,0,1,0,5.22,5.22A5.22,5.22,0,0,0,802.68,554Z"
                    transform="translate(-796.42 -553)"
                  />
                  <path
                    d="M802.73,561.44a2.22,2.22,0,0,0,.9-.17,3.11,3.11,0,0,0,.79-.57l.66.67a3,3,0,0,1-2.32,1.06,3.08,3.08,0,0,1-2.26-.88,3,3,0,0,1-.9-2.21,3,3,0,0,1,.92-2.24,3.19,3.19,0,0,1,2.31-.89,3,3,0,0,1,2.33,1l-.64.7a3,3,0,0,0-.81-.57,2.29,2.29,0,0,0-.9-.16,2.13,2.13,0,0,0-1.53.58,2,2,0,0,0-.62,1.51,2.07,2.07,0,0,0,.61,1.53A2,2,0,0,0,802.73,561.44Z"
                    transform="translate(-796.42 -553)"
                  />
                </g>
              </svg>
            </span>
            <span>Coppyright Belong To</span>
            <span>GPT GROUP</span>
          </div>
        </div>
      </footer>
      <PopupCV />
      <div className="link-fixed">
        <ScrollToTop />

      </div>
    </div>
  );
}
