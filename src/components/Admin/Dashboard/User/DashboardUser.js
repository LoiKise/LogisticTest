import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardUserTable'
import { EditToolbar } from '../Order/DashboardEditToolBar';
import GridCellExpand from '../Order/GridCellExpand';
import { getUserUpdate } from '../../../../features/dashboard/user/userSlice';
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
                { headerName: "Họ và tên", field: 'fullname', renderCell: renderCellExpand, width: 200, },
                { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                { headerName: "Mật khẩu", field: 'password', renderCell: renderCellExpand, width: 200, },
                { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                {
                    headerName: "Quyền", field: 'role', renderCell: renderCellExpand, width: 200,
                    valueFormatter: params => params.row.role === 'manage' ? 'Quản Lý' :
                        params.row.role === 'user' ? 'Người dùng' : 'Admin'
                },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getUserUpdate}
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
                { headerName: "Họ và tên", field: 'fullname', renderCell: renderCellExpand, width: 200, },
                { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                { headerName: "Mật khẩu", field: 'password', renderCell: renderCellExpand, width: 200, },
                { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                {
                    headerName: "Quyền", field: 'role', renderCell: renderCellExpand, width: 200,
                    valueFormatter: params => params.row.role === 'manage' ? 'Quản Lý' :
                        params.row.role === 'user' ? 'Người dùng' : 'Admin'
                },
                {
                    headerName: "Tùy chỉnh", field: 'control',
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <EditToolbar
                                    getItem={getUserUpdate}
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
                        renderCell: renderCellExpand
                    },
                    { headerName: "Họ và tên", field: 'fullname', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Mật khẩu", field: 'password', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                    {
                        headerName: "Quyền", field: 'role', renderCell: renderCellExpand, width: 200,
                        valueFormatter: params => params.row.role === 'manage' ? 'Quản Lý' :
                            params.row.role === 'user' ? 'Người dùng' : 'Admin'
                    },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getUserUpdate}
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
                    { headerName: "Họ và tên", field: 'fullname', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Mật khẩu", field: 'password', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                    {
                        headerName: "Quyền", field: 'role', renderCell: renderCellExpand, width: 200,
                        valueFormatter: params => params.row.role === 'manage' ? 'Quản Lý' :
                            params.row.role === 'user' ? 'Người dùng' : 'Admin'
                    },
                    {
                        headerName: "Tùy chỉnh", field: 'control',
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <EditToolbar
                                        getItem={getUserUpdate}
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
                icon={faUser}
                title="Tài khoản"
                color="lightgreen"
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