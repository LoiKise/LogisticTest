import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardSupportTable'
import GridCellExpand from '../Order/GridCellExpand';
import { datetimeVN } from '../../../../helpers/time';
export default function DashboardSupport(props) {

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
                { headerName: "Tiêu đề", field: 'title', width: 200, renderCell: renderCellExpand },
                { headerName: "Nội dung", field: 'text', width: 250, renderCell: renderCellExpand },

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
                { headerName: "Tiêu đề", field: 'title', width: 200, renderCell: renderCellExpand },
                { headerName: "Nội dung", field: 'text', width: 250, renderCell: renderCellExpand },

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
                    { headerName: "Tiêu đề", field: 'title', width: 200, renderCell: renderCellExpand },
                    { headerName: "Nội dung", field: 'text', width: 250, renderCell: renderCellExpand },

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
                    { headerName: "Tiêu đề", field: 'title', width: 200, renderCell: renderCellExpand },
                    { headerName: "Nội dung", field: 'text', width: 250, renderCell: renderCellExpand },

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
                icon={faUser}
                title="Danh Sách Thư Hỗ Trợ"
                color="orange"
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