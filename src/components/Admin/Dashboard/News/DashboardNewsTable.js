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
import { CallBackGetNews } from '../../../../features/dashboard/news/newsSlice.js';
import CustomLoadingOverlay from '../Order/CustomLoadingOverlay';
import DashboardDialogConfirm from '../Order/DashboardDialogConfirm';
import { useHistory } from 'react-router';

export default function DashboardNewsTable(props) {
    const update = useSelector(state => state.news.callbackGet)
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [news, setNews] = useState([])
    const [constNews, setConstNews] = useState([])
    const [selection, setSelection] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
    const getNews = useCallback(
        async () => {
            const data = await requestAPI('/jobs/all', 'GET')
                .then(res => {
                    if (res) {
                        setNews(res.data?.data)
                        setConstNews(res.data?.data)
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
        }, [enqueueSnackbar, history])
    useEffect(() => {
        setIsLoading(true)
        getNews();
    }, [update, getNews])

    const deleteOnClick = () => {
        if (selection.length > 0) {
            RemoveNews({ idList: selection }).then(res => {
                if (res) {
                    dispatch(CallBackGetNews());
                    enqueueSnackbar('Xóa tin tuyển dụng thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
            }).catch(err => console.log(err))
        } else {
            enqueueSnackbar('Vui lòng chọn tin tuyển dụng muốn xóa', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        }
    }
    const RemoveNews = async (list) => {
        const data = await requestAPI(`/job/delete`, 'DELETE', list)
        return data
    }
    const searchOnSubmit = (event) => {
        event.preventDefault()
    }
    const searchOnChange = (event) => {
        const searchInput = event.target.value
        const search = []
        if (searchInput !== '') {
            for (let i in constNews) {
                if ((constNews[i].nameJob?.toLowerCase()).includes(searchInput?.toLowerCase())) {
                    search.push(constNews[i])
                }
            }
            setNews(search)
        } else {
            setNews(constNews)
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
                        placeholderSearch={"Tìm kiếm theo tên công việc"}
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
                            rows={news}
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