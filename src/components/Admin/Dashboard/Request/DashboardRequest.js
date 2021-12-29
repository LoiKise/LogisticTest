import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardRequestTable'
import GridCellExpand from '../Order/GridCellExpand';
import { datetimeVN } from '../../../../helpers/time';
export default function DashboardRequest(props) {

    const [table, setTable] = useState([])

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setTable([
                {
                    headerName: "Ngày tạo", field: 'createdAt', width: 150,
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand
                },
                { headerName: "Số điện thoại", field: 'phone', width: 100, renderCell: renderCellExpand },
                { headerName: "Họ và tên", field: 'fullname', width: 200, renderCell: renderCellExpand },
                { headerName: "Email", field: 'email', width: 200, renderCell: renderCellExpand },
                { headerName: "Địa chỉ", field: 'address', width: 200, renderCell: renderCellExpand },
                { headerName: "Loại Hàng", field: 'typeProduct', width: 200, renderCell: renderCellExpand },
                { headerName: "Cân Nặng", field: 'weight', width: 200, renderCell: renderCellExpand },
                {
                    headerName: "Giao Hàng Nhanh", field: 'fastShip', width: 200,
                    valueFormatter: params => params?.row?.fastShip ? 'Có' : 'Không',
                    renderCell: renderCellExpand
                },
                { headerName: "Ghi Chú", field: 'note', width: 200, renderCell: renderCellExpand },

            ])
        } else {
            setTable([
                {
                    headerName: "Ngày tạo", field: 'createdAt', width: 150,
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand
                },
                { headerName: "Số điện thoại", field: 'phone', width: 100, renderCell: renderCellExpand },
                { headerName: "Họ và tên", field: 'fullname', width: 200, renderCell: renderCellExpand },
                { headerName: "Email", field: 'email', width: 200, renderCell: renderCellExpand },
                { headerName: "Địa chỉ", field: 'address', width: 200, renderCell: renderCellExpand },
                { headerName: "Loại Hàng", field: 'typeProduct', width: 200, renderCell: renderCellExpand },
                { headerName: "Cân Nặng", field: 'weight', width: 200, renderCell: renderCellExpand },
                {
                    headerName: "Giao Hàng Nhanh", field: 'fastShip', width: 200,
                    valueFormatter: params => params?.row?.fastShip ? 'Có' : 'Không',
                    renderCell: renderCellExpand
                },
                { headerName: "Ghi Chú", field: 'note', width: 200, renderCell: renderCellExpand },

            ])
        }
        function handleResize() {
            if (window.innerWidth <= 600) {
                setTable([
                    {
                        headerName: "Ngày tạo", field: 'createdAt', width: 150,
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand
                    },
                    { headerName: "Số điện thoại", field: 'phone', width: 100, renderCell: renderCellExpand },
                    { headerName: "Họ và tên", field: 'fullname', width: 200, renderCell: renderCellExpand },
                    { headerName: "Email", field: 'email', width: 200, renderCell: renderCellExpand },
                    { headerName: "Địa chỉ", field: 'address', width: 200, renderCell: renderCellExpand },
                    { headerName: "Loại Hàng", field: 'typeProduct', width: 200, renderCell: renderCellExpand },
                    { headerName: "Cân Nặng", field: 'weight', width: 200, renderCell: renderCellExpand },
                    {
                        headerName: "Giao Hàng Nhanh", field: 'fastShip', width: 200,
                        valueFormatter: params => params?.row?.fastShip ? 'Có' : 'Không',
                        renderCell: renderCellExpand
                    },
                    { headerName: "Ghi Chú", field: 'note', width: 200, renderCell: renderCellExpand },

                ])
            } else {
                setTable([
                    {
                        headerName: "Ngày tạo", field: 'createdAt', width: 150,
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand
                    },
                    { headerName: "Số điện thoại", field: 'phone', width: 100, renderCell: renderCellExpand },
                    { headerName: "Họ và tên", field: 'fullname', width: 200, renderCell: renderCellExpand },
                    { headerName: "Email", field: 'email', width: 200, renderCell: renderCellExpand },
                    { headerName: "Địa chỉ", field: 'address', width: 200, renderCell: renderCellExpand },
                    { headerName: "Loại Hàng", field: 'typeProduct', width: 200, renderCell: renderCellExpand },
                    { headerName: "Cân Nặng", field: 'weight', width: 200, renderCell: renderCellExpand },
                    {
                        headerName: "Giao Hàng Nhanh", field: 'fastShip', width: 200,
                        valueFormatter: params => params?.row?.fastShip ? 'Có' : 'Không',
                        renderCell: renderCellExpand
                    },
                    { headerName: "Ghi Chú", field: 'note', width: 200, renderCell: renderCellExpand },

                ])
            }
        }
        window.addEventListener("resize", handleResize);
        return (() => {
            window.removeEventListener("resize", handleResize);
        })
    }, [])
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
                icon={faShoppingBag}
                title="Danh Sách Yêu Cầu Giao Hàng"
                color="darkred"
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