import React from "react";
// import ButtonCustom from '../../../utils/Buttons/ButtonCustom'
import CategoryTitle from "../Category/CategoryTitle/CategoryTitle";
import Categories from "../Category/Cateogires";

export default function Service() {
  const ServiceList = [
    {
      img: "./assets/img/imgs/Services/Ship.jpg",
      title: " Vận Tải ",
      title1: "Đường Biển",
      iconImg: "./assets/img/icon/black_right_circle_arrow.png",
    },
    {
      img: "./assets/img/imgs/Services/containerTruck.jpg",
      title: "  Vận Tải ",
      title1: "Đường Bộ",
      iconImg: "./assets/img/icon/black_right_circle_arrow.png",
    },
    {
      img: "./assets/img/imgs/Services/plane.jpg",
      title: "  Vận Tải ",
      title1: "Đường Hàng Không",
      iconImg: "./assets/img/icon/black_right_circle_arrow.png",
    },
  ];

  return (
    <div className="ourservices section-area">
      <div className="container">
        <div className="ourservices__top">
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <CategoryTitle title="Dịch vụ" content="Dịch Vụ Của Chúng Tôi" />
            </div>
          </div>
        </div>
        <div className="ourservices-list">
          <div className="row">
            <Categories List={ServiceList} />
          </div>
        </div>
      </div>
    </div>
  );
}
