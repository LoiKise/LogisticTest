import React from "react";
import CategoryTitle from "../Category/CategoryTitle/CategoryTitle";
import MemberItem from "./MemberListItem";
import { useDispatch, useSelector } from 'react-redux';
import { handlePopupCV } from "../../../features/home/homeSlice";

export default function Members() {
  const memberItem = [
    {
      avtar: "./assets/img/imgs/Member/member01.jpg",
      nameMembe: "James",
      position: "Nhà sáng lập",
    },
    {
      avtar: "./assets/img/imgs/Member/member02.jpg",
      nameMembe: "JACK",
      position: "  Giám đốc",
    },
    {
      avtar: "./assets/img/imgs/Member/member03.jpg",
      nameMembe: "Davis",
      position: "Trưởng phòng tài chính",
    },
    {
      avtar: "./assets/img/imgs/Member/member04.jpg",
      nameMembe: "Olivia",
      position: "  Trưởng phòng nhân sự",
    },
  ];
  const loading = useSelector(state => state.home.loadingSend)
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(handlePopupCV(true));
  };
  const IconService = "./assets/img/icon/planes.png";
  return (
    <div>
      <div className="ourmember section-area">
        <div className="container">
          <div className="ourmember__top">
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                <CategoryTitle
                  title="Đội ngũ"
                  content="Đội Ngũ Của Chúng Tôi"
                />
              </div>
            </div>
          </div>
          <div className="ourmember-list">
            <div className="row">
              <MemberItem memberItem={memberItem} />
            </div>
            <div className="section-area__btn">
              <button type="button" onClick={() => handleOpen()} disabled={loading}>
                <img src={IconService} alt="icon" />
                GỬI YÊU CẦU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
