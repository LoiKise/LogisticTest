import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
import { useSelector } from 'react-redux';
import DashboardSelectInput from './../Order/DashboardSelectInput';
import { CallBackGetDelivery } from '../../../../features/dashboard/delivery/deliverySlice';
export default function DashboardUserCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const createForm = useRef();
    const dispatch = useDispatch();
    const update = useSelector(state => state.delivery.deliveryUpdate)
    const [sltDriver, setSltDriver] = useState(false);
    const [sltTypeShip, setSltTypeShip] = useState(false);
    const [sltStatus, setSltStatus] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [status, setStatus] = useState([]);
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
        if (update) {
            let state = {
                ...update, driverId: update?.driver?.id,
                disable: update?.statusId === -1 || update?.statusId === 3 ? true : false
            }
            setData(state)
        }
    }, [update])
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
    };
    const handleOpenSltDriver = () => {
        setSltDriver(true);
    };
    const handleOpenSltTypeShip = () => {
        setSltTypeShip(true);
    };
    const handleOpenSltStatus = () => {
        setSltStatus(true);
    };
    const updateDelivery = async (dataFormat) => {
        const data = await requestAPI(`/delivery/update/${dataFormat.id}`, 'PUT', dataFormat)
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
            delete data.driver;
            delete data.saleOrder;
            delete data.status;
            updateDelivery(data).then(res => {
                if (res.data) {
                    dispatch(CallBackGetDelivery());
                    enqueueSnackbar('Cập nhật đơn giao hàng thành công', {
                        persist: false,
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 3000,
                    })
                    props.setCloseEditFunc(false);
                }
            }).catch(err => {
                if (err) {
                    if (err.response?.status === 404) {
                        enqueueSnackbar('Đơn giao hàng không tồn tại, hoặc ai đó đã xóa nó', {
                            persist: false,
                            variant: 'warning',
                            preventDuplicate: true,
                            autoHideDuration: 3000,
                        })
                    } else if (err.response?.status === 400) {
                        enqueueSnackbar('Trạng thái đã tồn tại hoặc tài xế không được đổi khi đang giao hàng', {
                            persist: false,
                            variant: 'warning',
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
                        Thông tin đơn giao hàng
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
                        disable={data?.disable}
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
                        subKey={"name"}
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