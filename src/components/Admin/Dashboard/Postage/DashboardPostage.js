import React, { useState, useEffect, useCallback } from 'react'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Button, CircularProgress, Input } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import requestAPI from '../../../../apis';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import CustomNoRowsOverlay from '../Order/CustomNoRowsOverlay';
import { Box } from '@mui/system';
import { CLOUDINARY_FOLDER, CLOUDINARY_URL } from './../../../../utils/constant';
const DashboardPostage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [displayImage, setDisplayImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true)
    // Get Image 
    const getPostage = useCallback(
        async () => {
            const data = await requestAPI('/pricelist', 'GET')
                .then(res => {
                    if (res) {
                        setDisplayImage(res.data[0]?.priceList)
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
        getPostage();
    }, [getPostage])

    // Upload Image Post
    const handleChangeImage = async (e) => {
        setLoading(true);
        const files = e.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', CLOUDINARY_FOLDER)
        console.log({ data });
        axios.post(CLOUDINARY_URL, data)
            .then(res => {
                setLoading(false);
                setStatus(false);
                console.log({ url: res.data.url });
                setDisplayImage(res.data.url)
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                // setImgLoading(false);
            })

    };
    const uploadPostage = () => {
        requestAPI('/pricelist', 'POST', { priceList: displayImage })
            .then(res => {
                if (res) {
                    setStatus(true);
                    setLoading(false);
                    enqueueSnackbar('Cập nhật bảng giá thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
            })
            .catch(err => {
                setLoading(false);
                if (err.response?.status === 403 || err.response?.status === 401) {
                    history.push('/dashboard')
                    enqueueSnackbar('Đã phát hiện lỗi truy cập, vui lòng đăng nhập lại', {
                        persist: false,
                        variant: 'error',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
                if (err.response?.status === 500) {
                    enqueueSnackbar('Hình ảnh không hợp lệ', {
                        persist: false,
                        variant: 'error',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                }
            })
    }
    return (
        <div className="topfive flex-col dashboard-product" style={{ width: '100%' }}>
            <div className={`headerbox flex-center pink`} style={{ margin: '0 30px' }}>
                <FontAwesomeIcon icon={faMoneyBill} className="icon" />
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Bảng giá</p>
                </div>
                <div className="topfive-content flex-col flex-center">
                    <div className="dashboard-addnew-search pb-3">
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file"
                                onChange={handleChangeImage}
                                style={{ display: 'none' }} />
                            <Button variant="contained" component="span">
                                Tải bảng giá mới
                            </Button>
                        </label>
                        <Button
                            disabled={status}
                            variant="contained"
                            component="span"
                            className="ml-2"
                            color="success"
                            onClick={() => uploadPostage()}>
                            Cập nhật
                        </Button>
                    </div>
                    <div style={{ width: '460px', height: '460px' }} className="flex-center">
                        {
                            !loading ?
                                displayImage ?
                                    <div className="dashboard-upload-image" style={{ backgroundImage: `url(${displayImage})` }} /> :
                                    <CustomNoRowsOverlay />
                                :
                                <Box>
                                    <CircularProgress />
                                </Box>
                        }
                    </div>


                </div>
            </div>
        </div>
    )
}
export default DashboardPostage;