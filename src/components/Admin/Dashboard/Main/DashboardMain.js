import React, { useEffect, useState } from 'react'
import { faFileInvoice, faMoneyBillWave, faTshirt, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import DashboardTotalCount from './DashboardTotalCount'
import DashboardTopFive from './DashboardTopFive'
import requestAPI from '../../../../apis';

export default function DashboardMain() {

    const [countOrder, setCountOrder] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [topCustomer, setTopCusomer] = useState([]);
    const [countOrderStorage, setCountOrderStorage] = useState([]);
    const [countOrderShipped, setCountOrderShipped] = useState([]);
    const [topOrderSales, setTopOrderSales] = useState([]);

    useEffect(() => {
        requestAPI('/orders', 'GET').then(res => {
            if (res) {
                setCountOrder(res.data?.total)
                let total = 0;
                res.data?.data?.map(item => total += item.totalPrice)
                setTotalIncome(total)
            }
        })
        requestAPI(`/survey/status/1`, 'GET').then(res => {
            setCountOrderStorage(res.data?.total)
        })
        requestAPI('/survey/status/3', 'GET').then(res => {
            setCountOrderShipped(res.data?.total)
        })
        requestAPI('/survey/totalprice', 'GET').then(res => {
            setTopOrderSales(res.data)
        })
        requestAPI('/survey/phone', 'GET').then(res => {
            setTopCusomer(res.data)
        })
    }, [])

    const totalCount = [
        {
            id: 1,
            title: "Đơn Hàng",
            count: countOrder,
            percent: 30,
            isDecrease: false,
            color: "darkpurple",
            icon: faFileInvoice
        },
        {
            id: 2,
            title: "Lưu Kho",
            count: countOrderStorage,
            percent: 10,
            isDecrease: true,
            color: "darkred",
            icon: faShoppingBag
        },
        {
            id: 3,
            title: "Tổng Doanh Thu",
            count: `${totalIncome?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
            percent: 20,
            isDecrease: false,
            color: "darkblue",
            icon: faMoneyBillWave
        },
        {
            id: 4,
            title: "Đã giao",
            count: countOrderShipped,
            percent: 19,
            isDecrease: true,
            color: "lightblue",
            icon: faUser
        },
    ]

    return (
        <div className="dashboard-main">
            <div className="row flex">
                {totalCount.map((item, index) => {
                    return (
                        <DashboardTotalCount
                            key={index}
                            item={item}
                        />
                    )
                })}
            </div>

            <div className="row flex">
                <DashboardTopFive
                    icon={faUser}
                    title="TOP khách hàng"
                    color="lightblue"
                    data={topCustomer}
                    table={[
                        {
                            title: 'Số điện thoại'
                        },
                        {
                            title: 'Tổng đơn hàng'
                        },
                    ]}
                />
                <DashboardTopFive
                    icon={faTshirt}
                    title="TOP 5 đơn hàng lớn"
                    color="pink"
                    data={topOrderSales}
                    table={[
                        {
                            title: 'Tên Đơn'
                        },
                        {
                            title: 'Tổng'
                        },
                    ]}
                />
            </div>

        </div>
    )
}