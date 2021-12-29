import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../Order/CustomPagination';
import CustomNoRowsOverlay from '../Order/CustomNoRowsOverlay';
import CustomToolbar from '../Order/DashboardConfigToolBar';
import { useSelector, useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
import { useSnackbar } from 'notistack';
import DashboardOrderControl from '../Order/DashboardOrderControl';
import { CallBackGetUser } from '../../../../features/dashboard/user/userSlice';
import CustomLoadingOverlay from '../Order/CustomLoadingOverlay';
import DashboardDialogConfirm from '../Order/DashboardDialogConfirm';
import { useHistory } from 'react-router';

export default function DashboardUserTable(props) {
    const update = useSelector(state => state.user.callbackGet)
    const history = useHistory();
    const [user, setUser] = useState([])
    const [constUser, setConstUser] = useState([])
    const [selection, setSelection] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const getUsers = useCallback(async () => {
        const data = await requestAPI('/users/all', 'GET')
            .then(res => {
                if (res) {
                    setUser(res.data?.data)
                    setConstUser(res.data?.data)
                    setIsLoading(false);
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
        getUsers();
    }, [update, getUsers])
    const deleteOnClick = () => {
        if (selection.length > 0) {
            RemoveUser({ idList: selection }).then(res => {
                if (res) {
                    dispatch(CallBackGetUser());
                    enqueueSnackbar('Xóa tài khoản thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
            }).catch(err => console.log(err))
        } else {
            enqueueSnackbar('Vui lòng chọn hóa đơn muốn xóa', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        }
    }
    const RemoveUser = async (list) => {
        const data = await requestAPI(`/user/delete`, 'DELETE', list)
        return data
    }
    const searchOnSubmit = (event) => {
        event.preventDefault()
    }
    const searchOnChange = (event) => {
        const searchInput = event.target.value
        const search = []
        if (searchInput !== '') {
            for (let i in constUser) {
                if ((constUser[i].phone).includes(searchInput)) {
                    search.push(constUser[i])
                }
            }
            setUser(search)
        } else {
            setUser(constUser)
        }

    }

    const handleOpenDialogDelete = () => {
        setOpen(true);
    }
    const handleCloseDialogDelete = () => {
        setOpen(false);
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
                    <DashboardOrderControl
                        addController={props.setOpenCreateFunc}
                        deleteController={deleteOnClick}
                        searchOnChange={searchOnChange}
                        searchController={searchOnSubmit}
                        handleOpenDialogDelete={handleOpenDialogDelete}
                    />
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
                            rows={user}
                            pagination
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onSelectionModelChange={(newSelectionModel) => {
                                setSelection(newSelectionModel)
                            }}
                            checkboxSelection
                        />
                    </div>
                    <DashboardDialogConfirm
                        open={open}
                        handleCloseDialogDelete={handleCloseDialogDelete}
                        handleDelete={deleteOnClick}
                    />

                </div>
            </div>
        </div>
    )
}