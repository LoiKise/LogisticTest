import React from 'react'
import CategoryTitle from '../Category/CategoryTitle/CategoryTitle'
import Categories from '../Category/Cateogires'

export default function News() {

    const newList = [
        {
            img: './assets/img/imgs/Services/Ship.jpg',
            info: ' Từ Ngày 12 Tháng 8 Giảm Giá 20% Tất Cả Các Đơn Hàng Vận ChuyểnTrong Nước',
        },
        {
            img: './assets/img/imgs/Services/containerTruck.jpg',
            info: 'Từ Ngày 12 Tháng 8 Hạn Chế Vận Chuyển Hàng Đông Lạnh',
        },
        {
            img: './assets/img/imgs/Services/plane.jpg',
            info: 'Từ Ngày 12 Tháng 7 Tạm Dừng Hoạt Động Vận Chuyển Hàng Không',
        },
    ]

    return (
        <div className="newandsale section-area">
            <div className="container">
                <div className="newandsale__top">
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <CategoryTitle title='Bảng tin' content='Thông Báo Và Khuyến Mãi' />
                        </div>
                    </div>
                </div>
                <div className="newandsale-list">
                    <div className="row">
                        <Categories List={newList} />
                    </div>
                </div>
            </div>
        </div>
    )
}
