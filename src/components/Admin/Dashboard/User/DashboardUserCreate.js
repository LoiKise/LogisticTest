import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
import DashboardSelectInput from './../Order/DashboardSelectInput';
import { CallBackGetUser } from '../../../../features/dashboard/user/userSlice';
import DashboardTextInput from './../Order/DashboardTextInput';
import { useHistory } from 'react-router';
export default function DashboardUserCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const dispatch = useDispatch();
    const createForm = useRef();
    const [data, setData] = useState({
        email: "",
        password: "",
        fullname: "",
        phone: "",
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
    const createUser = async (dataFormat) => {
        const data = await requestAPI(`/register`, 'POST', dataFormat)
        return data
    }
    const onSubmit = (event) => {
        event.preventDefault()
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const ver_name = /[^a-z0-9]/gi;
        const ver_pass = /^([a-zA-Z0-9]+)$/;
        const ver_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !data.fullname || !data.password || !data.phone || !data.role) {
            enqueueSnackbar('Không được bỏ trống các trường, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (!ver_name.test(data.fullname)) {
            enqueueSnackbar('Vui lòng nhập đẩy đủ họ và tên ( Nguyễn Văn A hoặc Nguyễn A )', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (!vnf_regex.test(data.phone)) {
            enqueueSnackbar('Số điện thoại không hợp lệ vui lòng kiểm tra lại', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (!ver_pass.test(data.password) || data.password.length >= 6) {
            enqueueSnackbar('Mật khẩu vui lòng không được nhỏ hơn 6 ký tự và không chứa ký tự đặc biệt', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (!ver_email.test(data.email)) {
            enqueueSnackbar('Địa chỉ email chưa đúng định dạng, vui lòng kiểm tra lại', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else {
            createUser(data).then(res => {
                if (res.data) {
                    dispatch(CallBackGetUser());
                    enqueueSnackbar('Thêm mới tài khoản thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                    props.setCloseCreateFunc(false);
                }
            }).catch(err => {
                if (err.response?.status === 403 || err.response?.status === 401) {
                    history.push('/dashboard')
                    enqueueSnackbar('Đã phát hiện lỗi truy cập, vui lòng đăng nhập lại', {
                        persist: false,
                        variant: 'error',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
                if (err.response?.status === 400) {
                    enqueueSnackbar('Số điện thoại tài khoản này đã tồn tại, vui lòng nhập lại', {
                        persist: false,
                        variant: 'error',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
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
                            props.setCloseCreateFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm} className="db-form-input">
                    {/* Sender Infomation */}

                    <DashboardTextInput
                        textType={"email"}
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
                        placeholder={"Họ và tên người dùng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"fullname"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Số điện thoại"}
                        placeholder={"Số điện thoại người dùng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"phone"}
                    />
                    <DashboardTextInput
                        textType={"password"}
                        title={"Mật khẩu"}
                        placeholder={"Mật khẩu tài khoản"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"password"}
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
                            Tạo tài khoản
                        </button>
                    </div>


                </form>

            </div>
        </div >

    )
}