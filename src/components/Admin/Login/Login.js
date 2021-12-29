import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import requestAPI from '../../../apis'
import { useSnackbar } from 'notistack';
const bg = "https://ktkdqt.ftu.edu.vn/wp-content/uploads/2018/04/tsxnk800.460.jpg"
const LOGO = "../assets/img/logo/dark_logo.png"
function Login(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const handleOnSubmit = (event) => {
        event.preventDefault();
        requestAPI('/admin/dashboard', 'POST', { phone, password })
            .then(res => {
                if (res) {
                    localStorage.setItem('accessToken', res.data.token);
                    enqueueSnackbar('Đăng nhập thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                    props.history.push('/admin/dashboard')

                }
            }).catch(err => {
                if (err) {
                    if (err.response?.status === 403) {
                        enqueueSnackbar('Bạn không đủ quyền truy cập vào địa chỉ này', {
                            persist: false,
                            variant: 'error',
                            preventDuplicate: true,
                            autoHideDuration: 3000,
                        })
                    } else if (err.response?.status === 400) {
                        enqueueSnackbar('Mật khẩu chưa chính xác', {
                            persist: false,
                            variant: 'error',
                            preventDuplicate: true,
                            autoHideDuration: 3000,
                        })
                    } else if (err.response?.status === 404) {
                        enqueueSnackbar('Không tồn tại tài khoản này', {
                            persist: false,
                            variant: 'error',
                            preventDuplicate: true,
                            autoHideDuration: 3000,
                        })
                    }
                }
            })
    }



    return (
        <div className="Login">
            <img className="login-bg" src={bg} alt="pic_logigisc"></img>
            <div className="login-overlay flex-center">
                <div className="login-box flex">
                    <div className="login-left flex-center flex-col">
                        <img src={LOGO} alt="logo" width="50%"></img>
                        <div className="login-title">Đăng nhập vào trang quản lý</div>
                        <form className="admin-login-form flex-col" onSubmit={handleOnSubmit}>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                value={phone}
                                onChange={(event) => {
                                    setPhone(event.target.value)
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                            <button type="submit" className="btn btn-info">Đăng nhập</button>
                        </form>
                    </div>
                    <div className="login-right">
                        <div className="animation-overlay"></div>
                        <img src={bg} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login)