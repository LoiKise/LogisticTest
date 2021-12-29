import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
import { useSelector } from 'react-redux';
import DashboardTextInput from './../Order/DashboardTextInput';
import { CallBackGetDriver } from '../../../../features/dashboard/driver/driverSlice';
export default function DashboardUserCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const update = useSelector(state => state.driver.driverUpdate)
    const dispatch = useDispatch();
    const createForm = useRef();
    const [data, setData] = useState({
        age: "",
        password: "",
        name: "",
        phone: "",
        idenityCard: "",
    })

    //Handle Event and Request DataBase
    const updateDriver = async (dataFormat) => {
        const data = await requestAPI(`/driver/${dataFormat.id}`, 'PUT', dataFormat)
        return data
    }
    useEffect(() => {
        if (update) {
            setData(update)
        }
    }, [update])
    const onSubmit = (event) => {
        event.preventDefault()

        if (!data.idenityCard || !data.name || !data.age || !data.phone) {
            enqueueSnackbar('Không được bỏ trống các trường, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else {
            updateDriver(data).then(res => {
                if (res.data) {
                    dispatch(CallBackGetDriver());
                    enqueueSnackbar('Cập nhật tài xế thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                    props.setCloseEditFunc(false);
                }
            }).catch(err => {
                if (err) {
                    if (err.response?.status === 400) {
                        if (err.response?.data?.message === 'Invalid Phone number') {
                            enqueueSnackbar('Số điện thoại không hợp lệ', {
                                persist: false,
                                variant: 'warning',
                                preventDuplicate: true,
                                autoHideDuration: 3000,
                            })
                        }
                        else if (err.response?.data?.message === 'Invalid age') {
                            enqueueSnackbar('Yêu cầu tuổi từ 18 -> 60', {
                                persist: false,
                                variant: 'warning',
                                preventDuplicate: true,
                                autoHideDuration: 3000,
                            })
                        } else if (err.response?.data?.message === 'Name is not empty') {
                            enqueueSnackbar('Tên không được bỏ trống', {
                                persist: false,
                                variant: 'warning',
                                preventDuplicate: true,
                                autoHideDuration: 3000,
                            })
                        } else if (err.response?.data?.message === 'Invalid idenityCard') {
                            enqueueSnackbar('Tên không được bỏ trống', {
                                persist: false,
                                variant: 'warning',
                                preventDuplicate: true,
                                autoHideDuration: 3000,
                            })
                        }
                    } else if (err.response?.status === 403 || err.response?.status === 401) {
                        enqueueSnackbar('Phát hiện lỗi truy cập vui lòng đăng nhập lại', {
                            persist: false,
                            variant: 'error',
                            preventDuplicate: true,
                            autoHideDuration: 3000,
                        })
                    }
                }
            })


        }
    }
    return (
        <div className="DashboardProductInfo">
            <div className="create-box">
                <div className="create-box-title flex">
                    <h2 className="create-box-title-text ">
                        Thông tin tài xế
                    </h2>
                    <div
                        className="btn btn-outline-danger"
                        onClick={() => {
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm} className="db-form-input">
                    {/* Sender Infomation */}
                    <DashboardTextInput
                        textType={"text"}
                        title={"Họ và tên"}
                        placeholder={"Họ và tên tài xế"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"name"}
                    />

                    <DashboardTextInput
                        textType={"number"}
                        title={"Tuổi"}
                        placeholder={"Tuổi tài xế"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"age"}
                    />

                    <DashboardTextInput
                        textType={"text"}
                        title={"Số điện thoại"}
                        placeholder={"Số điện thoại tài xế"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"phone"}
                    />
                    <DashboardTextInput
                        textType={"number"}
                        title={"Số chứng minh nhân dân"}
                        placeholder={"Số chứng minh nhân dân tài xế"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"idenityCard"}
                    />
                    <div className="flex-center" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn btn-outline-success">
                            Cập nhật tài xế
                        </button>
                    </div>


                </form>

            </div>
        </div >

    )
}