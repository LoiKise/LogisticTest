
import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardRecruitmentTable'
import GridCellExpand from '../Order/GridCellExpand';
import { datetimeVN } from '../../../../helpers/time';
export default function DashboardRecruitment(props) {

    const [table, setTable] = useState([])

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setTable([
                {
                    headerName: "Ngày tạo", field: 'createdAt', width: 200,
                    valueFormatter: params => datetimeVN(params.row?.createdAt),
                    renderCell: renderCellExpand
                },
                { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                { headerName: "Vị trí ứng tuyển", field: 'position', renderCell: renderCellExpand, width: 200, },
                {
                    headerName: "Tùy chỉnh", field: 'control', width: 150,
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <div className="dashboard-addnew-btn btn btn-outline-warning"
                                    onClick={() => window.open(`${params.row?.cvUrl}`, "_blank")}
                                >
                                    Xem hồ sơ
                                </div>
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
                { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                { headerName: "Vị trí ứng tuyển", field: 'position', renderCell: renderCellExpand, width: 200, },
                {
                    headerName: "Tùy chỉnh", field: 'control', width: 150,
                    renderCell: (params) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <div className="dashboard-addnew-btn btn btn-outline-warning"
                                    onClick={() => window.open(`${params.row?.cvUrl}`, "_blank")}
                                >
                                    Xem hồ sơ
                                </div>
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
                    { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Vị trí ứng tuyển", field: 'position', renderCell: renderCellExpand, width: 200, },
                    {
                        headerName: "Tùy chỉnh", field: 'control', width: 150,
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <div className="dashboard-addnew-btn btn btn-outline-warning"
                                        onClick={() => window.open(`${params.row?.cvUrl}`, "_blank")}
                                    >
                                        Xem hồ sơ
                                    </div>
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
                    { headerName: "Họ và tên", field: 'name', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Số điện thoại", field: 'phone', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Email", field: 'email', renderCell: renderCellExpand, width: 200, },
                    { headerName: "Vị trí ứng tuyển", field: 'position', renderCell: renderCellExpand, width: 200, },
                    {
                        headerName: "Tùy chỉnh", field: 'control', width: 150,
                        renderCell: (params) => {
                            return (
                                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <div className="dashboard-addnew-btn btn btn-outline-warning"
                                        onClick={() => window.open(`${params.row?.cvUrl}`, "_blank")}
                                    >
                                        Xem hồ sơ
                                    </div>
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
                title="Đơn xin việc"
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