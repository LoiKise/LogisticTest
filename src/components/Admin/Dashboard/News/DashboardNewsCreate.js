import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
import DashboardTextInput from './../Order/DashboardTextInput';
import { CallBackGetNews } from '../../../../features/dashboard/news/newsSlice.js';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import viLocale from 'date-fns/locale/vi';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
export default function DashboardUserCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const createForm = useRef();
    const [data, setData] = useState({
        expirationDate: "",
        nameJob: "",
        salaryBefore: 0,
        salaryAfter: 0,
        degree: "",
        address: "",
        position: "",
        quantity: 0,
        require: "",
        thumbnails: "",
    })
    //Handle Event and Request DataBase
    const createNews = async (dataFormat) => {
        const data = await requestAPI(`/job`, 'POST', dataFormat)
        return data
    }
    const onSubmit = (event) => {
        event.preventDefault()

        if (!data.nameJob || !data.salaryBefore || !data.salaryAfter || !data.degree || !data.address
            || !data.position || !data.require || !data.thumbnails || !data.expirationDate) {
            enqueueSnackbar('Không được bỏ trống các trường, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (data.salaryBefore < 0) {
            enqueueSnackbar('Mức lương tối thiểu chưa chính xác, vui lòng nhập trong khoảng từ 0đ -> 100.000.000đ', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (data.salaryAfter < 0 || data.salaryAfter < data.salaryBefore) {
            enqueueSnackbar('Mức lương tối đa chưa chính xác, vui lòng nhập trong khoảng từ Mức lương tối thiểu -> 100.000.000đ', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (data.quantity < 1) {
            enqueueSnackbar('Số lượng nhân viên tuyển dụng không được nhỏ hơn 1', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (data.expirationDate < Date.now()) {
            enqueueSnackbar('Hạn cuối nộp hồ sơ không được nhỏ hơn ngày hiện tại ', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else {
            createNews(data).then(res => {
                if (res.data) {
                    dispatch(CallBackGetNews());
                    props.setCloseCreateFunc(false);
                    enqueueSnackbar('Thêm mới tin tuyển dụng thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
            }).catch(() => {
                enqueueSnackbar('Không được bỏ trống các trường, vui lòng kiểm tra lại thông tin vừa nhập', {
                    persist: false,
                    variant: 'warning',
                    preventDuplicate: true,
                    autoHideDuration: 3000,
                })
            })

        }
    }
    return (
        <div className="DashboardProductInfo">
            <div className="create-box">
                <div className="create-box-title flex">
                    <h2 className="create-box-title-text ">
                        Thông tin bài tuyển dụng
                    </h2>
                    <div
                        className="btn btn-outline-danger"
                        onClick={() => {
                            props.setCloseCreateFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm} className="db-form-input">
                    {/* Sender Infomation */}

                    <DashboardTextInput
                        textType={"text"}
                        title={"Tên công việc"}
                        placeholder={"Công việc cần tuyển dụng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"nameJob"}
                    />
                    <DashboardTextInput
                        textType={"number"}
                        title={"Mức lương tối thiểu"}
                        placeholder={"Mức lương thấp nhất"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"salaryBefore"}
                    />
                    <DashboardTextInput
                        textType={"number"}
                        title={"Mức lương tối đa"}
                        placeholder={"Mức lương cao nhất"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"salaryAfter"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Trình độ học vấn"}
                        placeholder={"Bằng cấp, kiến thức yêu cầu"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"degree"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Địa chỉ"}
                        placeholder={"Địa chỉ làm việc"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"address"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Vị trí"}
                        placeholder={"Vị trí tuyển dụng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"position"}
                    />
                    <DashboardTextInput
                        textType={"number"}
                        title={"Số lượng"}
                        placeholder={"Số lượng nhân viên cần tuyển"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"quantity"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Yêu cầu"}
                        placeholder={"Yêu cầu các kỹ năng của nhân viên cần có"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"require"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Mô tả"}
                        placeholder={"Mô tả chi tiết công việc"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"thumbnails"}
                    />

                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Hạn cuối nộp hồ sơ</div>
                        <div className="dashboard-right--input">
                            <LocalizationProvider locale={viLocale} dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    label="Hạn cuối nộp hồ sơ tuyển dụng"
                                    value={data.expirationDate}
                                    onChange={(date) => {
                                        setData({ ...data, expirationDate: date })
                                    }}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        helperText={
                                            data.expirationDate &&
                                            data.expirationDate < Date.now() &&
                                            "Hạn cuối phải lớn hơn ngày hiện tại"} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div className="flex-center" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn btn-outline-success">
                            Tạo Tin Tuyển Dụng
                        </button>
                    </div>


                </form>

            </div>
        </div >

    )
}