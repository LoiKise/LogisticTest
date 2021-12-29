import { faTruck } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardDeliveryTable'
import { EditToolbar } from '../Order/DashboardEditToolBar';
import GridCellExpand from '../Order/GridCellExpand';
import { getOrderView } from '../../../../features/dashboard/order/orderSlice';
import DashboardViewDetails from './../Order/DashboardViewDetails';
import { getDeliveryUpdate } from '../../../../features/dashboard/delivery/deliverySlice';
import { datetimeVN } from '../../../../helpers/time';
import { formatMoney } from './../../../../helpers/money';
export default function DashboardDelivery(props) {

    const [table, setTable] = useState([])

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setTable([
                {
                    headerName: "Mã đơn hàng", field: 'saleOrderId',
                    renderCell: renderCellExpand, width: 150,
                },
                {
                    headerName: "Tên đơn hàng", field: 'orderName',
                    valueFormatter: params => params.row?.saleOrder?.orderName,
                    width: 150, renderCell: renderCellExpand
                },
                {
                    headerName: "Ngày tạo", field: 'createdAt',
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand, width: 150,
                },
                {
                    headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                    valueFormatter: params => datetimeVN(params.row?.updatedAt),
                    renderCell: renderCellExpand, width: 150,
                },
                {
                    headerName: "Số điện thoại người nhận", field: 'phone',
                    valueFormatter: params => params.row?.saleOrder?.receiverPhone,
                    width: 150, renderCell: renderCellExpand
                },
                {
                    headerName: "Địa chỉ người nhận", field: 'address', valueFormatter: params => params.row?.saleOrder?.receiverAddress, width: 150,
                    renderCell: renderCellExpand,
                },
                {
                    headerName: "Tài xế", field: 'driver', valueFormatter: params => params.row?.driver === null ? 'Chưa có' : params.row?.driver?.name, width: 150,
                    renderCell: renderCellExpand,
                },
                { headerName: "Phương thức giao hàng", field: 'typeShip', renderCell: renderCellExpand, width: 150, },
                {
                    headerName: "Phụ thu", field: 'totalPrice', renderCell: renderCellExpand, width: 150,
                    valueFormatter: params => `${formatMoney(params.row?.saleOrder?.totalPrice)}đ`
                },
                {
                    headerName: "Thời gian nhận hàng", field: 'plannedTime', renderCell: renderCellExpand, width: 150,
                    valueFormatter: params => params?.row?.plannedTime ?
                        datetimeVN(params.row?.plannedTime) : 'Chưa bắt đầu giao',
                },
                {
                    headerName: "Tình trạng", field: 'status', width: 150,
                    valueFormatter: params => params?.row?.status?.name,
                    renderCell: renderCellExpand,
                },
                {
                    headerName: "Tùy chỉnh", field: 'control', width: 200,
                    renderCell: (params) => {
                        return (
                            <div className="d-flex align-items-center" style={{ cursor: "pointer", width: '100%', justifyContent: "space-evenly" }}>
                                <DashboardViewDetails
                                    getItem={getOrderView}
                                    params={params.row}
                                />
                                <EditToolbar
                                    getItem={getDeliveryUpdate}
                                    params={params.row}
                                    setOpenEditFunc={props.setOpenEditFunc}
                                />

                            </div>
                        );
                    }
                }
            ])
        } else {
            setTable([
                {
                    headerName: "Mã đơn hàng", field: 'saleOrderId',
                    renderCell: renderCellExpand, width: 150,
                },
                {
                    headerName: "Tên đơn hàng", field: 'orderName',
                    valueFormatter: params => params.row?.saleOrder?.orderName,
                    width: 150, renderCell: renderCellExpand
                },
                {
                    headerName: "Ngày tạo", field: 'createdAt',
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand, width: 150,
                },
                {
                    headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                    valueFormatter: params => datetimeVN(params.row?.updatedAt),
                    renderCell: renderCellExpand, width: 150,
                },
                {
                    headerName: "Số điện thoại người nhận", field: 'phone',
                    valueFormatter: params => params.row?.saleOrder?.receiverPhone,
                    width: 150, renderCell: renderCellExpand
                },
                {
                    headerName: "Địa chỉ người nhận", field: 'address', valueFormatter: params => params.row?.saleOrder?.receiverAddress, width: 150,
                    renderCell: renderCellExpand,
                },
                {
                    headerName: "Tài xế", field: 'driver', valueFormatter: params => params.row?.driver === null ? 'Chưa có' : params.row?.driver?.name, width: 150,
                    renderCell: renderCellExpand,
                },
                { headerName: "Phương thức giao hàng", field: 'typeShip', renderCell: renderCellExpand, width: 150, },
                {
                    headerName: "Phụ thu", field: 'totalPrice', renderCell: renderCellExpand, width: 150,
                    valueFormatter: params => `${formatMoney(params.row?.saleOrder?.totalPrice)}đ`
                },
                {
                    headerName: "Thời gian nhận hàng", field: 'plannedTime', renderCell: renderCellExpand, width: 150,
                    valueFormatter: params => params?.row?.plannedTime ?
                        datetimeVN(params.row?.plannedTime) : 'Chưa bắt đầu giao',
                },
                {
                    headerName: "Tình trạng", field: 'status', width: 150,
                    valueFormatter: params => params?.row?.status?.name,
                    renderCell: renderCellExpand,
                },
                {
                    headerName: "Tùy chỉnh", field: 'control', width: 200,
                    renderCell: (params) => {
                        return (
                            <div className="d-flex align-items-center" style={{ cursor: "pointer", width: '100%', justifyContent: "space-evenly" }}>
                                <DashboardViewDetails
                                    getItem={getOrderView}
                                    params={params.row}
                                />
                                <EditToolbar
                                    getItem={getDeliveryUpdate}
                                    params={params.row}
                                    setOpenEditFunc={props.setOpenEditFunc}
                                />

                            </div>
                        );
                    }
                }
            ])
        }
        function handleResize() {
            if (window.innerWidth <= 600) {
                setTable([
                    {
                        headerName: "Mã đơn hàng", field: 'saleOrderId',
                        renderCell: renderCellExpand, width: 150,
                    },
                    {
                        headerName: "Tên đơn hàng", field: 'orderName',
                        valueFormatter: params => params.row?.saleOrder?.orderName,
                        width: 150, renderCell: renderCellExpand
                    },
                    {
                        headerName: "Ngày tạo", field: 'createdAt',
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, width: 150,
                    },
                    {
                        headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                        valueFormatter: params => datetimeVN(params.row?.updatedAt),
                        renderCell: renderCellExpand, width: 150,
                    },
                    {
                        headerName: "Số điện thoại người nhận", field: 'phone',
                        valueFormatter: params => params.row?.saleOrder?.receiverPhone,
                        width: 150, renderCell: renderCellExpand
                    },
                    {
                        headerName: "Địa chỉ người nhận", field: 'address', valueFormatter: params => params.row?.saleOrder?.receiverAddress, width: 150,
                        renderCell: renderCellExpand,
                    },
                    {
                        headerName: "Tài xế", field: 'driver', valueFormatter: params => params.row?.driver === null ? 'Chưa có' : params.row?.driver?.name, width: 150,
                        renderCell: renderCellExpand,
                    },
                    { headerName: "Phương thức giao hàng", field: 'typeShip', renderCell: renderCellExpand, width: 150, },
                    {
                        headerName: "Phụ thu", field: 'totalPrice', renderCell: renderCellExpand, width: 150,
                        valueFormatter: params => `${formatMoney(params.row?.saleOrder?.totalPrice)}đ`
                    },
                    {
                        headerName: "Thời gian nhận hàng", field: 'plannedTime', renderCell: renderCellExpand, width: 150,
                        valueFormatter: params => params?.row?.plannedTime ?
                            datetimeVN(params.row?.plannedTime) : 'Chưa bắt đầu giao',
                    },
                    {
                        headerName: "Tình trạng", field: 'status', width: 150,
                        valueFormatter: params => params?.row?.status?.name,
                        renderCell: renderCellExpand,
                    },
                    {
                        headerName: "Tùy chỉnh", field: 'control', width: 200,
                        renderCell: (params) => {
                            return (
                                <div className="d-flex align-items-center" style={{ cursor: "pointer", width: '100%', justifyContent: "space-evenly" }}>
                                    <DashboardViewDetails
                                        getItem={getOrderView}
                                        params={params.row}
                                    />
                                    <EditToolbar
                                        getItem={getDeliveryUpdate}
                                        params={params.row}
                                        setOpenEditFunc={props.setOpenEditFunc}
                                    />

                                </div>
                            );
                        }
                    }
                ])
            } else {
                setTable([
                    {
                        headerName: "Mã đơn hàng", field: 'saleOrderId',
                        renderCell: renderCellExpand, width: 150,
                    },
                    {
                        headerName: "Tên đơn hàng", field: 'orderName',
                        valueFormatter: params => params.row?.saleOrder?.orderName,
                        width: 150, renderCell: renderCellExpand
                    },
                    {
                        headerName: "Ngày tạo", field: 'createdAt',
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, width: 150,
                    },
                    {
                        headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                        valueFormatter: params => datetimeVN(params.row?.updatedAt),
                        renderCell: renderCellExpand, width: 150,
                    },
                    {
                        headerName: "Số điện thoại người nhận", field: 'phone',
                        valueFormatter: params => params.row?.saleOrder?.receiverPhone,
                        width: 150, renderCell: renderCellExpand
                    },
                    {
                        headerName: "Địa chỉ người nhận", field: 'address', valueFormatter: params => params.row?.saleOrder?.receiverAddress, width: 150,
                        renderCell: renderCellExpand,
                    },
                    {
                        headerName: "Tài xế", field: 'driver', valueFormatter: params => params.row?.driver === null ? 'Chưa có' : params.row?.driver?.name, width: 150,
                        renderCell: renderCellExpand,
                    },
                    { headerName: "Phương thức giao hàng", field: 'typeShip', renderCell: renderCellExpand, width: 150, },
                    {
                        headerName: "Phụ thu", field: 'totalPrice', renderCell: renderCellExpand, width: 150,
                        valueFormatter: params => `${formatMoney(params.row?.saleOrder?.totalPrice)}đ`
                    },
                    {
                        headerName: "Thời gian nhận hàng", field: 'plannedTime', renderCell: renderCellExpand, width: 150,
                        valueFormatter: params => params?.row?.plannedTime ?
                            datetimeVN(params.row?.plannedTime) : 'Chưa bắt đầu giao',
                    },
                    {
                        headerName: "Tình trạng", field: 'status', width: 150,
                        valueFormatter: params => params?.row?.status?.name,
                        renderCell: renderCellExpand,
                    },
                    {
                        headerName: "Tùy chỉnh", field: 'control', width: 200,
                        renderCell: (params) => {
                            return (
                                <div className="d-flex align-items-center" style={{ cursor: "pointer", width: '100%', justifyContent: "space-evenly" }}>
                                    <DashboardViewDetails
                                        getItem={getOrderView}
                                        params={params.row}
                                    />
                                    <EditToolbar
                                        getItem={getDeliveryUpdate}
                                        params={params.row}
                                        setOpenEditFunc={props.setOpenEditFunc}
                                    />

                                </div>
                            );
                        }
                    }
                ])
            }
        }
        window.addEventListener("resize", handleResize);
        return (() => {
            window.removeEventListener("resize", handleResize);
        })
    }, [props.setOpenEditFunc])
    function renderCellExpand(params) {
        return (
            <GridCellExpand
                value={params.formattedValue ? params.formattedValue.toString() : ''}
                width={params.colDef.computedWidth}
            />
        );
    }

    return (
        <div className="dashboard-product">
            <DashboardProductTable
                icon={faTruck}
                title="Danh sách đơn giao hàng"
                color="darkyellow"
                table={table}
                setOpenCreateFunc={props.setOpenCreateFunc}
                setCloseCreateFunc={props.setCloseCreateFunc}
                setOpenEditFunc={props.setOpenEditFunc}
                setCloseEditFunc={props.setCloseEditFunc}
                isChange={props.isChange}
            />
        </div>
    )
}