import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardNewsTable'
import { EditToolbar } from '../Order/DashboardEditToolBar';
import GridCellExpand from '../Order/GridCellExpand';
import { getNewsUpdate } from '../../../../features/dashboard/news/newsSlice.js';
import { datetimeVN, dateVN } from '../../../../helpers/time';
import { formatMoney } from './../../../../helpers/money';
export default function DashboardNews(props) {

    const [table, setTable] = useState([])

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setTable([
                {
                    headerName: "Ngày tạo", field: 'createdAt',
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand, width: 200
                },
                {
                    headerName: "Hạn cuối", field: 'expirationDate',
                    valueFormatter: params => dateVN(params.row?.expirationDate),
                    renderCell: renderCellExpand, width: 200
                },
                {
                    headerName: "Ngày Cập nhật", field: 'updatedAt', hide: true,
                    valueFormatter: params => params?.row?.updatedAt ? datetimeVN(params.row?.updatedAt) : 'Chưa cập nhật',
                    renderCell: renderCellExpand, width: 200
                },
                { headerName: "Tên Công Việc", field: 'nameJob', renderCell: renderCellExpand, width: 200 },
                {
                    headerName: "Mức Lương", field: 'salary',
                    valueFormatter: params => ` ${formatMoney(params?.row?.salaryBefore, '.')}đ - ${formatMoney(params?.row?.salaryAfter)}đ `,
                    renderCell: renderCellExpand, width: 200
                },
                { headerName: "Địa Chỉ", field: 'address', renderCell: renderCellExpand, width: 200 },
                { headerName: "Trình Độ", field: 'degree', renderCell: renderCellExpand, width: 100 },
                { headerName: "Ví trí tuyển dụng", field: 'position', renderCell: renderCellExpand, width: 200 },
                { headerName: "Số lượng", field: 'quantity', renderCell: renderCellExpand, width: 100 },
                { headerName: "Yêu cầu kỹ năng", field: 'require', renderCell: renderCellExpand, width: 200 },
                { headerName: "Mô tả", field: 'thumbnails', renderCell: renderCellExpand, width: 200 },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getNewsUpdate}
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
                    headerName: "Ngày tạo", field: 'createdAt',
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand, width: 200
                },
                {
                    headerName: "Hạn cuối", field: 'expirationDate',
                    valueFormatter: params => dateVN(params.row?.expirationDate),
                    renderCell: renderCellExpand, width: 200
                },
                {
                    headerName: "Ngày Cập nhật", field: 'updatedAt', hide: true,
                    valueFormatter: params => params?.row?.updatedAt ? datetimeVN(params.row?.updatedAt) : 'Chưa cập nhật',
                    renderCell: renderCellExpand, width: 200
                },
                { headerName: "Tên Công Việc", field: 'nameJob', renderCell: renderCellExpand, width: 200 },
                {
                    headerName: "Mức Lương", field: 'salary',
                    valueFormatter: params => ` ${formatMoney(params?.row?.salaryBefore)}đ - ${formatMoney(params?.row?.salaryAfter)}đ `,
                    renderCell: renderCellExpand, width: 200
                },
                { headerName: "Địa Chỉ", field: 'address', renderCell: renderCellExpand, width: 200 },
                { headerName: "Trình Độ", field: 'degree', renderCell: renderCellExpand, width: 100 },
                { headerName: "Ví trí tuyển dụng", field: 'position', renderCell: renderCellExpand, width: 200 },
                { headerName: "Số lượng", field: 'quantity', renderCell: renderCellExpand, width: 100 },
                { headerName: "Yêu cầu kỹ năng", field: 'require', renderCell: renderCellExpand, width: 200 },
                { headerName: "Mô tả", field: 'thumbnails', renderCell: renderCellExpand, width: 200 },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getNewsUpdate}
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
                        headerName: "Ngày tạo", field: 'createdAt',
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, width: 200
                    },
                    {
                        headerName: "Hạn cuối", field: 'expirationDate',
                        valueFormatter: params => dateVN(params.row?.expirationDate),
                        renderCell: renderCellExpand, width: 200
                    },
                    {
                        headerName: "Ngày Cập nhật", field: 'updatedAt', hide: true,
                        valueFormatter: params => params?.row?.updatedAt ? datetimeVN(params.row?.updatedAt) : 'Chưa cập nhật',
                        renderCell: renderCellExpand, width: 200
                    },
                    { headerName: "Tên Công Việc", field: 'nameJob', renderCell: renderCellExpand, width: 200 },
                    {
                        headerName: "Mức Lương", field: 'salary',
                        valueFormatter: params => ` ${formatMoney(params?.row?.salaryBefore)}đ - ${formatMoney(params?.row?.salaryAfter)}đ `,
                        renderCell: renderCellExpand, width: 200
                    },
                    { headerName: "Địa Chỉ", field: 'address', renderCell: renderCellExpand, width: 200 },
                    { headerName: "Trình Độ", field: 'degree', renderCell: renderCellExpand, width: 100 },
                    { headerName: "Ví trí tuyển dụng", field: 'position', renderCell: renderCellExpand, width: 200 },
                    { headerName: "Số lượng", field: 'quantity', renderCell: renderCellExpand, width: 100 },
                    { headerName: "Yêu cầu kỹ năng", field: 'require', renderCell: renderCellExpand, width: 200 },
                    { headerName: "Mô tả", field: 'thumbnails', renderCell: renderCellExpand, width: 200 },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getNewsUpdate}
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
                        headerName: "Ngày tạo", field: 'createdAt',
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, width: 200
                    },
                    {
                        headerName: "Hạn cuối", field: 'expirationDate',
                        valueFormatter: params => dateVN(params.row?.expirationDate),
                        renderCell: renderCellExpand, width: 200
                    },
                    {
                        headerName: "Ngày Cập nhật", field: 'updatedAt', hide: true,
                        valueFormatter: params => params?.row?.updatedAt ? datetimeVN(params.row?.updatedAt) : 'Chưa cập nhật',
                        renderCell: renderCellExpand, width: 200
                    },
                    { headerName: "Tên Công Việc", field: 'nameJob', renderCell: renderCellExpand, width: 200 },
                    {
                        headerName: "Mức Lương", field: 'salary',
                        valueFormatter: params => ` ${formatMoney(params?.row?.salaryBefore)}đ - ${formatMoney(params?.row?.salaryAfter)}đ `,
                        renderCell: renderCellExpand, width: 200
                    },
                    { headerName: "Địa Chỉ", field: 'address', renderCell: renderCellExpand, width: 200 },
                    { headerName: "Trình Độ", field: 'degree', renderCell: renderCellExpand, width: 100 },
                    { headerName: "Ví trí tuyển dụng", field: 'position', renderCell: renderCellExpand, width: 200 },
                    { headerName: "Số lượng", field: 'quantity', renderCell: renderCellExpand, width: 100 },
                    { headerName: "Yêu cầu kỹ năng", field: 'require', renderCell: renderCellExpand, width: 200 },
                    { headerName: "Mô tả", field: 'thumbnails', renderCell: renderCellExpand, width: 200 },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getNewsUpdate}
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
                icon={faNewspaper}
                title="Tin Tuyển Dụng"
                color="darkblue"
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