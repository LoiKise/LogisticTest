import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
import { useSelector } from 'react-redux';
import DashboardSelectInput from './../Order/DashboardSelectInput';
import { CallBackGetUser } from '../../../../features/dashboard/user/userSlice';
import DashboardTextInput from './../Order/DashboardTextInput';
export default function DashboardUserCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const createForm = useRef();
    const dispatch = useDispatch();
    const update = useSelector(state => state.user.userUpdate)
    const [data, setData] = useState({
        email: "",
        password: "",
        fullname: "",
        phone: "",
        imgUrl: null,
        role: "",
    })

    //Custom Selection
    const [roleList] = useState([
        {
            id: "admin",
            name: "ADMIN",
        },
        {
            id: "manage",
            name: "Quản Lí",
        },
        {
            id: "user",
            name: "Người dùng"
        }
    ])
    const [sltRole, setSltRole] = useState(false);

    const handleClose = () => {
        setSltRole(false);
    };
    const handleOpenSltRole = () => {
        setSltRole(true);
    };
    //Handle Event and Request DataBase

    useEffect(() => {
        if (update) {
            setData(update)
        }
    }, [update])
    const updateUser = async (dataFormat) => {
        const data = await requestAPI(`/user/${dataFormat.id}`, 'PUT', dataFormat)
        return data
    }
    const onSubmit = (event) => {
        event.preventDefault()
        console.log({ data });

        if (!data.email || !data.fullname || !data.password || !data.phone || !data.role) {
            enqueueSnackbar('Không được bỏ trống các trường, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else {
            updateUser(data).then(res => {
                if (res.data) {
                    dispatch(CallBackGetUser());
                    enqueueSnackbar('Cập nhật tài khoản thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                    props.setCloseEditFunc(false);
                }
            }).catch(err => {
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
                        Thông tin tài khoản
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
                        title={"Email"}
                        placeholder={"Địa chỉ Email"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"email"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Họ và tên"}
                        placeholder={"Họ và tên tài khoản"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"fullname"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Số điện thoại"}
                        placeholder={"Số điện thoại tài khoản"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"phone"}
                    />
                    <DashboardSelectInput
                        title={"Quyền sử dụng"}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltRole}
                        handleOpenSlt={handleOpenSltRole}
                        subTitle={"Chọn quyền cho tài khoản :"}
                        listSelect={roleList}
                        objectKey={"role"}
                        objectNameKey={null}
                    />
                    <div className="flex-center" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn btn-outline-success">
                            Cập nhật tài khoản
                        </button>
                    </div>


                </form>

            </div>
        </div >

    )
}