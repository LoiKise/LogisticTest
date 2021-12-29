import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
import DashboardSelectInput from './../Order/DashboardSelectInput';
import { CallBackGetDelivery } from '../../../../features/dashboard/delivery/deliverySlice';
export default function DashboardUserCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const createForm = useRef();
    const dispatch = useDispatch();
    const [sltDriver, setSltDriver] = useState(false);
    const [sltTypeShip, setSltTypeShip] = useState(false);
    const [sltStatus, setSltStatus] = useState(false);
    const [sltOrder, setSltOrder] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [status, setStatus] = useState([]);
    const [order, setOrder] = useState([]);
    const [typeShip] = useState([
        {
            // id: "FAST",
            name: 'giao hàng nhanh'
        },
        {
            // id: "STANDARD",
            name: 'giao hàng tiêu chuẩn'
        },
    ]);
    const [data, setData] = useState({
        statusId: 0,
        saleOrderId: 0,
        typeShip: "",
        driverId: 0
    })
    //Handle Event and Request DataBase

    useEffect(() => {
        getDrivers();
        getStatus();
        getOrder();
    }, [])
    const getDrivers = async () => {
        const data = await requestAPI('/drivers/all', 'GET')
            .then(res => {
                if (res) {
                    setDrivers(res.data?.data)
                }
            })
            .catch(err => console.log(err))
        return data
    }
    const getOrder = async () => {
        const data = await requestAPI('/orders', 'GET')
            .then(res => {
                if (res) {
                    setOrder(res.data?.data)
                }
            })
            .catch(err => console.log(err))
        return data
    }
    const getStatus = async () => {
        const data = await requestAPI('/status', 'GET')
            .then(res => {
                if (res) {
                    setStatus(res.data)
                }
            })
            .catch(err => console.log(err))
        return data
    }
    const handleClose = () => {
        setSltDriver(false);
        setSltTypeShip(false);
        setSltStatus(false);
        setSltOrder(false);
    };
    const handleOpenSltDriver = () => {
        setSltDriver(true);
    };
    const handleOpenSltOrder = () => {
        setSltOrder(true);
    };
    const handleOpenSltTypeShip = () => {
        setSltTypeShip(true);
    };
    const handleOpenSltStatus = () => {
        setSltStatus(true);
    };
    const updateDelivery = async (dataFormat) => {
        const data = await requestAPI('/delivery', 'POST', dataFormat)
        return data
    }
    const onSubmit = (event) => {
        event.preventDefault()

        if (!data.statusId || !data.typeShip || !data.saleOrderId || !data.driverId) {
            enqueueSnackbar('Không được bỏ trống các trường, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else {
            updateDelivery(data).then(res => {
                if (res.data) {
                    dispatch(CallBackGetDelivery());
                    enqueueSnackbar('Tạo đơn giao hàng thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                    props.setCloseCreateFunc(false);
                }
            })

        }
    }
    return (
        <div className="DashboardProductInfo">
            <div className="create-box">
                <div className="create-box-title flex">
                    <h2 className="create-box-title-text ">
                        Thông tin đơn giao hàng
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

                    <DashboardSelectInput
                        title={"Đơn hàng"}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltOrder}
                        handleOpenSlt={handleOpenSltOrder}
                        subTitle={"Chọn đơn hàng cần giao :"}
                        listSelect={order}
                        objectKey={"saleOrderId"}
                        objectNameKey={null}
                    />
                    <DashboardSelectInput
                        title={"Tình trạng đơn hàng"}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltStatus}
                        handleOpenSlt={handleOpenSltStatus}
                        subTitle={"Chọn tình trạng :"}
                        listSelect={status}
                        objectKey={"statusId"}
                        objectNameKey={null}
                    />
                    <DashboardSelectInput
                        title={"Tài xế"}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltDriver}
                        handleOpenSlt={handleOpenSltDriver}
                        subTitle={"Chọn tài xế :"}
                        listSelect={drivers}
                        objectKey={"driverId"}
                        objectNameKey={null}
                    />
                    <DashboardSelectInput
                        title={"Hình thức giao hàng"}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltTypeShip}
                        handleOpenSlt={handleOpenSltTypeShip}
                        subTitle={"Chọn hình thức :"}
                        listSelect={typeShip}
                        objectKey={"typeShip"}
                        objectNameKey={null}
                    />
                    <div className="flex-center" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn btn-outline-success">
                            Cập nhật đơn giao hàng
                        </button>
                    </div>


                </form>

            </div>
        </div >

    )
}