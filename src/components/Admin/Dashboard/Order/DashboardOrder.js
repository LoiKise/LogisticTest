import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardOrderTable'
import { EditToolbar } from './DashboardEditToolBar';
import GridCellExpand from './GridCellExpand';
import { getOrderUpdate, } from '../../../../features/dashboard/order/orderSlice';
import { datetimeVN } from '../../../../helpers/time';
export default function DashboardOrder(props) {

    const [table, setTable] = useState([])

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setTable([
                { headerName: "Mã Đơn", field: 'id', renderCell: renderCellExpand, width: 150 },
                {
                    headerName: "Ngày tạo", field: 'createdAt',
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand, width: 150
                },
                { headerName: "Phân loại khách", field: 'customerType', renderCell: renderCellExpand, width: 150 },
                { headerName: "Khách hàng gửi", field: 'customerName', renderCell: renderCellExpand, width: 150 },
                { headerName: "Phân loại", field: 'customerType', hide: true, renderCell: renderCellExpand, width: 150 },
                { headerName: "Số điện thoại gửi hàng", field: 'customerPhone', renderCell: renderCellExpand, width: 150 },
                { headerName: "Địa chỉ gửi hàng", field: 'customerAddress', hide: true, renderCell: renderCellExpand, width: 150 },
                { headerName: "Khách hàng nhận", field: 'receiverName', renderCell: renderCellExpand, width: 150 },
                { headerName: "Số điện thoại nhận hàng", field: 'receiverPhone', renderCell: renderCellExpand, width: 150 },
                { headerName: "Địa chỉ nhận hàng", field: 'receiverAddress', renderCell: renderCellExpand, width: 150, hide: true },
                {
                    headerName: "Tài Xế", field: 'driver', hide: true,
                    valueFormatter: params => params.row?.driver?.name,
                    renderCell: renderCellExpand, width: 150
                },
                {
                    headerName: "Loại Hàng", field: 'orderType', hide: true, valueFormatter: params => params.row?.categories?.name,
                    renderCell: renderCellExpand, width: 150
                },
                { headerName: "Số lượng", field: 'quantity', disableClickEventBubbling: true },
                {
                    headerName: "Đơn vị", field: 'unit', valueFormatter: params => params.row?.unit?.name,
                },
                {
                    headerName: "Tổng tiền", field: 'totalPrice', width: 120,
                    valueFormatter: params => `${params.row?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
                    disableClickEventBubbling: true
                },
                {
                    headerName: "Trạng thái", field: 'status',
                    valueFormatter: params => params?.row?.deliveryOrders?.length > 0 && params?.row?.deliveryOrders?.at(-1).status?.name,
                    renderCell: renderCellExpand, width: 150
                },
                { headerName: "Ghi chú", field: 'notes', renderCell: renderCellExpand, width: 150 },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getOrderUpdate}
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
                { headerName: "Mã Đơn", field: 'id', renderCell: renderCellExpand, width: 150 },
                {
                    headerName: "Ngày tạo", field: 'createdAt',
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand, width: 150
                },
                { headerName: "Phân loại khách", field: 'customerType', renderCell: renderCellExpand, width: 150 },
                { headerName: "Khách hàng gửi", field: 'customerName', renderCell: renderCellExpand, width: 150 },
                { headerName: "Phân loại", field: 'customerType', hide: true, renderCell: renderCellExpand, width: 150 },
                { headerName: "Số điện thoại gửi hàng", field: 'customerPhone', renderCell: renderCellExpand, width: 150 },
                { headerName: "Địa chỉ gửi hàng", field: 'customerAddress', hide: true, renderCell: renderCellExpand, width: 150 },
                { headerName: "Khách hàng nhận", field: 'receiverName', renderCell: renderCellExpand, width: 150 },
                { headerName: "Số điện thoại nhận hàng", field: 'receiverPhone', renderCell: renderCellExpand, width: 150 },
                { headerName: "Địa chỉ nhận hàng", field: 'receiverAddress', renderCell: renderCellExpand, width: 150, hide: true },
                {
                    headerName: "Tài Xế", field: 'driver', hide: true,
                    valueFormatter: params => params.row?.driver?.name,
                    renderCell: renderCellExpand, width: 150
                },
                {
                    headerName: "Loại Hàng", field: 'orderType', hide: true, valueFormatter: params => params.row?.categories?.name,
                    renderCell: renderCellExpand, width: 150
                },
                { headerName: "Số lượng", field: 'quantity', disableClickEventBubbling: true },
                {
                    headerName: "Đơn vị", field: 'unit', valueFormatter: params => params.row?.unit?.name,
                },
                {
                    headerName: "Tổng tiền", field: 'totalPrice', width: 120,
                    valueFormatter: params => `${params.row?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
                    disableClickEventBubbling: true
                },
                {
                    headerName: "Trạng thái", field: 'status',
                    valueFormatter: params => params?.row?.deliveryOrders?.length > 0 && params?.row?.deliveryOrders?.at(-1).status?.name,
                    renderCell: renderCellExpand, width: 150
                },
                { headerName: "Ghi chú", field: 'notes', renderCell: renderCellExpand, width: 150 },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getOrderUpdate}
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
                    { headerName: "Mã Đơn", field: 'id', renderCell: renderCellExpand, width: 150 },
                    {
                        headerName: "Ngày tạo", field: 'createdAt',
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, width: 150
                    },
                    { headerName: "Phân loại khách", field: 'customerType', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Khách hàng gửi", field: 'customerName', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Phân loại", field: 'customerType', hide: true, renderCell: renderCellExpand, width: 150 },
                    { headerName: "Số điện thoại gửi hàng", field: 'customerPhone', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Địa chỉ gửi hàng", field: 'customerAddress', hide: true, renderCell: renderCellExpand, width: 150 },
                    { headerName: "Khách hàng nhận", field: 'receiverName', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Số điện thoại nhận hàng", field: 'receiverPhone', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Địa chỉ nhận hàng", field: 'receiverAddress', renderCell: renderCellExpand, width: 150, hide: true },
                    {
                        headerName: "Tài Xế", field: 'driver', hide: true,
                        valueFormatter: params => params.row?.driver?.name,
                        renderCell: renderCellExpand, width: 150
                    },
                    {
                        headerName: "Loại Hàng", field: 'orderType', hide: true, valueFormatter: params => params.row?.categories?.name,
                        renderCell: renderCellExpand, width: 150
                    },
                    { headerName: "Số lượng", field: 'quantity', disableClickEventBubbling: true },
                    {
                        headerName: "Đơn vị", field: 'unit', valueFormatter: params => params.row?.unit?.name,
                    },
                    {
                        headerName: "Tổng tiền", field: 'totalPrice', width: 120,
                        valueFormatter: params => `${params.row?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
                        disableClickEventBubbling: true
                    },
                    {
                        headerName: "Trạng thái", field: 'status',
                        valueFormatter: params => params?.row?.deliveryOrders?.length > 0 && params?.row?.deliveryOrders?.at(-1).status?.name,
                        renderCell: renderCellExpand, width: 150
                    },
                    { headerName: "Ghi chú", field: 'notes', renderCell: renderCellExpand, width: 150 },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getOrderUpdate}
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
                    { headerName: "Mã Đơn", field: 'id', renderCell: renderCellExpand, width: 150 },
                    {
                        headerName: "Ngày tạo", field: 'createdAt',
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, width: 150
                    },
                    { headerName: "Phân loại khách", field: 'customerType', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Khách hàng gửi", field: 'customerName', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Phân loại", field: 'customerType', hide: true, renderCell: renderCellExpand, width: 150 },
                    { headerName: "Số điện thoại gửi hàng", field: 'customerPhone', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Địa chỉ gửi hàng", field: 'customerAddress', hide: true, renderCell: renderCellExpand, width: 150 },
                    { headerName: "Khách hàng nhận", field: 'receiverName', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Số điện thoại nhận hàng", field: 'receiverPhone', renderCell: renderCellExpand, width: 150 },
                    { headerName: "Địa chỉ nhận hàng", field: 'receiverAddress', renderCell: renderCellExpand, width: 150, hide: true },
                    {
                        headerName: "Tài Xế", field: 'driver', hide: true,
                        valueFormatter: params => params.row?.driver?.name,
                        renderCell: renderCellExpand, width: 150
                    },
                    {
                        headerName: "Loại Hàng", field: 'orderType', hide: true, valueFormatter: params => params.row?.categories?.name,
                        renderCell: renderCellExpand, width: 150
                    },
                    { headerName: "Số lượng", field: 'quantity', disableClickEventBubbling: true },
                    {
                        headerName: "Đơn vị", field: 'unit', valueFormatter: params => params.row?.unit?.name,
                    },
                    {
                        headerName: "Tổng tiền", field: 'totalPrice', width: 120,
                        valueFormatter: params => `${params.row?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
                        disableClickEventBubbling: true
                    },
                    {
                        headerName: "Trạng thái", field: 'status',
                        valueFormatter: params => params?.row?.deliveryOrders?.length > 0 && params?.row?.deliveryOrders?.at(-1).status?.name,
                        renderCell: renderCellExpand, width: 150
                    },
                    { headerName: "Ghi chú", field: 'notes', renderCell: renderCellExpand, width: 150 },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getOrderUpdate}
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
                icon={faFileInvoice}
                title="Đơn hàng"
                color="darkpurple"
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