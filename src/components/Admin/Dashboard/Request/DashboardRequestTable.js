import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../Order/CustomPagination';
import CustomNoRowsOverlay from '../Order/CustomNoRowsOverlay';
import CustomToolbar from '../Order/DashboardConfigToolBar';
import requestAPI from '../../../../apis';
import CustomLoadingOverlay from '../Order/CustomLoadingOverlay';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

export default function DashboardRequestTable(props) {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [request, setRequest] = useState([])
    const [constRequest, setConstRequest] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getRequests = useCallback(async () => {
        const data = await requestAPI('/requests/all', 'GET')
            .then(res => {
                if (res) {
                    setRequest(res.data?.data)
                    setConstRequest(res.data?.data)
                    setIsLoading(false)
                }
            })
            .catch(err => {
                if (err) {
                    if (err.response.status === 403 || err.response.status === 401) {
                        history.push('/dashboard')
                        enqueueSnackbar('Đã phát hiện lỗi truy cập, vui lòng đăng nhập lại', {
                            persist: false,
                            variant: 'error',
                            preventDuplicate: true,
                            autoHideDuration: 3000,
                        })
                    }
                }
            })
        return data
    }, [history, enqueueSnackbar])
    useEffect(() => {
        setIsLoading(true)
        getRequests();
    }, [getRequests])

    const searchOnSubmit = (event) => {
        event.preventDefault()
    }
    const searchOnChange = (event) => {
        const searchInput = event.target.value
        const search = []
        if (searchInput !== '') {
            for (let i in constRequest) {
                if ((constRequest[i].phone).includes(searchInput)) {
                    search.push(constRequest[i])
                }
            }
            setRequest(search)
        } else {
            setRequest(constRequest)
        }

    }


    return (
        <div className="topfive flex-col" style={{ width: '100%' }}>
            <div className={`headerbox flex-center ${props.color}`}>
                <FontAwesomeIcon icon={props.icon} className="icon" />
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>{props.title}</p>
                </div>
                <div className="topfive-content flex-col">
                    <div className="dashboard-addnew-search pb-3">
                        <form onSubmit={searchOnSubmit}>
                            <input type="text" placeholder="Tìm kiếm theo số điện thoại"
                                onChange={searchOnChange}
                            ></input>
                        </form>
                    </div>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            components={{
                                Toolbar: CustomToolbar,
                                Pagination: CustomPagination,
                                NoRowsOverlay: CustomNoRowsOverlay,
                                LoadingOverlay: CustomLoadingOverlay
                            }}
                            loading={isLoading}
                            columns={props.table}
                            rows={request}
                            pagination
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}