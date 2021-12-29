import { faBiking } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardDriverTable'
import { EditToolbar } from '../Order/DashboardEditToolBar';
import GridCellExpand from '../Order/GridCellExpand';
import { getDriverUpdate } from '../../../../features/dashboard/driver/driverSlice';
import { datetimeVN } from '../../../../helpers/time';
export default function DashboardUser(props) {

    const [table, setTable] = useState([])

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setTable([
                {
                    headerName: "Ngày tạo", field: 'createdAt', width: 200,
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand
                },
                {
                    headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                    valueFormatter: params => datetimeVN(params.row?.updatedAt),
                    renderCell: renderCellExpand, width: 200
                },
                { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                { headerName: "Tuổi", field: 'age', renderCell: renderCellExpand, width: 200, },
                { headerName: "Chứng minh nhân dân", field: 'idenityCard', renderCell: renderCellExpand, width: 200, },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getDriverUpdate}
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
                    headerName: "Ngày tạo", field: 'createdAt', width: 200,
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand
                },
                {
                    headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                    valueFormatter: params => datetimeVN(params.row?.updatedAt),
                    renderCell: renderCellExpand, width: 200
                },
                { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                { headerName: "Tuổi", field: 'age', renderCell: renderCellExpand, width: 200, },
                { headerName: "Chứng minh nhân dân", field: 'idenityCard', renderCell: renderCellExpand, width: 200, },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getDriverUpdate}
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
                        headerName: "Ngày tạo", field: 'createdAt', width: 200,
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, hide: true
                    },
                    {
                        headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                        valueFormatter: params => datetimeVN(params.row?.updatedAt),
                        renderCell: renderCellExpand, width: 200
                    },
                    { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Tuổi", field: 'age', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Chứng minh nhân dân", field: 'idenityCard', renderCell: renderCellExpand, width: 200, },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getDriverUpdate}
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
                        headerName: "Ngày tạo", field: 'createdAt', width: 200,
                        valueFormatter: params => datetimeVN(params.row?.createdAt),
                        renderCell: renderCellExpand, hide: true
                    },
                    {
                        headerName: "Ngày cập nhật", field: 'updatedAt', hide: true,
                        valueFormatter: params => datetimeVN(params.row?.updatedAt),
                        renderCell: renderCellExpand, width: 200,
                    },
                    { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Tuổi", field: 'age', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Chứng minh nhân dân", field: 'idenityCard', renderCell: renderCellExpand, width: 200, },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getDriverUpdate}
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
                icon={faBiking}
                title="Tài Xế"
                color="pink"
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