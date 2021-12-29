import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { CallBackGetOrder } from '../../../../features/dashboard/order/orderSlice';
import requestAPI from '../../../../apis';
import DashboardTextInput from './DashboardTextInput';
import DashboardSelectInput from './DashboardSelectInput';
export default function DashboardOrderCreate(props) {
    const { enqueueSnackbar } = useSnackbar();
    const createForm = useRef();
    const dispatch = useDispatch();
    const [province, setProvince] = useState([])
    const [customerTypeList] = useState([
        {
            name: "Khách Mối"
        },
        {
            name: "Khách Vãng Lai"
        }
    ])
    const [paymentList, setPaymentList] = useState([])
    const [unitList, setUnitList] = useState([])
    const [table, setTable] = useState([])
    const [products, setProducts] = useState([])


    const [orderType] = useState([
        {
            id: 1,
            name: 'Hàng lô',
            symbox: 'HL'
        },
        {
            id: 2,
            name: 'Hàng kiện',
            symbox: 'HK'
        }
    ])
    const [data, setData] = useState({
        customerType: '',
        customerName: '',
        customerAddress: '',
        customerProvince: '',
        customerDistrict: '',
        customerPhone: '',
        receiverAddress: "",
        receiverName: "",
        receiverPhone: "",
        receiverProvince: '',
        receiverDistrict: '',
        orderName: '',
        orderType: null,
        categories: { id: null, name: '' },
        unit_id: null,
        payment_id: "",
        driver_id: null,
        isFreeShip: false,
        notes: '',
        paymentMethod: {
            codePayment: "",
            id: 1,
            namePayment: ""
        },
        quantity: 1,
        totalPrice: 0,
        unit: {
            id: 2,
            name: 'Thùng'
        },
        products: []
    })

    //Custom Selection
    const [sltTypeCustomer, setSltTypeCustomer] = useState(false);
    const [sltProvinceCustomer, setSltProvinceCustomer] = useState(false);
    const [sltDistrictCustomer, setSltDistrictCustomer] = useState(false);
    const [sltProvinceReceiver, setSltProvinceReceiver] = useState(false);
    const [sltDistrictReceiver, setSltDistrictReceiver] = useState(false);
    const [sltOrderType, setSltOrderType] = useState(false);
    const [sltUnit, setSltUnit] = useState(false);
    const [sltPayment, setSltPayment] = useState(false);


    const handleClose = () => {
        setSltTypeCustomer(false);
        setSltProvinceCustomer(false);
        setSltDistrictCustomer(false);
        setSltProvinceReceiver(false);
        setSltDistrictReceiver(false);
        setSltOrderType(false);
        setSltUnit(false);
        setSltPayment(false);
    };
    const handleOpenSltTypeCustomer = () => {
        setSltTypeCustomer(true);
    };
    const handleOpenSltProvinceCustomer = () => {
        setSltProvinceCustomer(true);
    };
    const handleOpenSltDistrictCustomer = () => {
        setSltDistrictCustomer(true);
    };
    const handleOpenSltProvinceReceiver = () => {
        setSltProvinceReceiver(true);
    };
    const handleOpenSltDistrictReceiver = () => {
        setSltDistrictReceiver(true);
    };
    const handleOpenSltOrderType = () => {
        setSltOrderType(true);
    };
    const handleOpenSltUnit = () => {
        setSltUnit(true);
    };
    const handleOpenSltPayment = () => {
        setSltPayment(true);
    };

    //Handle Event and Request DataBase

    useEffect(() => {
        getProvince();
        getUnit();
        getPayment();
    }, [])
    const getUnit = async () => {
        const data = await requestAPI('/unit', 'GET')
            .then(res => {
                if (res) {
                    setUnitList(res.data?.data)
                    setTable([
                        { title: "STT", field: 'id', render: rowData => rowData?.tableData?.id + 1, editable: 'never' },
                        { title: "Sản Phẩm", field: 'name' },
                        { title: "Số lượng", field: 'quantity' },
                        {
                            title: "Đơn vị", field: 'unit',
                            lookup: res.data?.data?.reduce((item, cur, i) => {
                                item[cur.id] = cur.name;
                                return item;
                            }, {}) // { 1: 'KG', 2: 'Cái', 3: 'Thùng' }

                        }])
                }
            })
            .catch(err => console.log(err))
        return data
    }
    const getPayment = async () => {
        const data = await requestAPI('/payment', 'GET')
            .then(res => {
                if (res) {
                    setPaymentList(res.data?.data)
                }
            })
            .catch(err => console.log(err))
        return data
    }
    const getProvince = async () => {
        const data = await requestAPI('/city', 'GET')
            .then(res => {
                if (res) {
                    setProvince(res.data?.data)
                }
            })
            .catch(err => console.log(err))
        return data
    }
    const createOrders = async (dataFormat) => {

        const data = await requestAPI('/order', 'POST', dataFormat)
        return data
    }
    const onSubmit = (event) => {
        event.preventDefault()
        let dataFormat = { ...data, products }
        let validatePhone = /^(((0))[0-9]{9})$/g;
        let validatePhone1 = /^(((0))[0-9]{9})$/g;

        if (!dataFormat.customerType) {
            enqueueSnackbar('Phân loại khách không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })

        } else if (products.length <= 0) {
            enqueueSnackbar('Hàng hóa không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (validatePhone.test(`${dataFormat.customerPhone}`) === false || validatePhone1.test(`${dataFormat.receiverPhone}`) === false) {
            enqueueSnackbar('Số điện thoại sai định dạng hoặc không tồn tại, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })

        } else if (dataFormat?.customerProvince?.length <= 0 || dataFormat?.receiverProvince?.length <= 0) {
            enqueueSnackbar('Tỉnh/Thành Phố không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (dataFormat?.customerDistrict?.length <= 0 || dataFormat?.receiverDistrict?.length <= 0) {
            enqueueSnackbar('Quận/Huyện không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'warning',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (!dataFormat.orderType) {
            enqueueSnackbar('Loại hàng hóa không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (isNaN(dataFormat.quantity) || dataFormat.quantity < 1) {
            enqueueSnackbar('Số lượng phải là số và lớn hơn 0, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (isNaN(dataFormat.totalPrice) || dataFormat.totalPrice < 0) {
            enqueueSnackbar('Số tiền phải là số, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (!dataFormat.unit_id) {
            enqueueSnackbar('Đơn vị tính không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (!dataFormat.payment_id) {
            enqueueSnackbar('Phương thức thanh toán không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        } else if (products.length <= 0) {
            enqueueSnackbar('Hàng hóa không được bỏ trống, vui lòng kiểm tra lại thông tin vừa nhập', {
                persist: false,
                variant: 'error',
                preventDuplicate: true,
                autoHideDuration: 3000,
            })
        }
        else {
            dataFormat.customerAddress = dataFormat.customerAddress + ', ' + dataFormat.customerDistrict + ', ' + dataFormat.customerProvinceName
            dataFormat.receiverAddress = dataFormat.receiverAddress + ', ' + dataFormat.receiverDistrict + ', ' + dataFormat.receiverProvinceName
            dataFormat.quantity = parseInt(dataFormat.quantity, 10)
            createOrders(dataFormat).then(res => {
                if (res.data) {
                    dispatch(CallBackGetOrder());
                    enqueueSnackbar('Thêm đơn hàng thành công', {
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
                        Thông tin đơn hàng
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
                        title={"Phân loại khách hàng"}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltTypeCustomer}
                        handleOpenSlt={handleOpenSltTypeCustomer}
                        subTitle={"Chọn khách :"}
                        listSelect={customerTypeList}
                        objectKey={"customerType"}
                        objectNameKey={null}
                    />

                    <DashboardTextInput
                        textType={"text"}
                        title={"Khách hàng gửi"}
                        placeholder={"Họ và tên người gửi hàng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"customerName"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Số điện thoại ( Người gửi hàng )"}
                        placeholder={"Số điện thoại người gửi hàng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"customerPhone"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Địa chỉ cụ thể ( Người gửi hàng )"}
                        placeholder={"Địa chỉ cụ thể người gửi hàng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"customerAddress"}
                    />
                    <DashboardSelectInput
                        title={"Tỉnh/Thành Phố ( Người gửi hàng ) "}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltProvinceCustomer}
                        handleOpenSlt={handleOpenSltProvinceCustomer}
                        subTitle={"Chọn tỉnh/thành phố :"}
                        listSelect={province}
                        objectKey={"customerProvince"}
                        objectNameKey={"customerProvinceName"}
                    />
                    <DashboardSelectInput
                        title={"Quận/Huyện ( Người gửi hàng ) "}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltDistrictCustomer}
                        handleOpenSlt={handleOpenSltDistrictCustomer}
                        subTitle={"Chọn quận/huyện :"}
                        listSelect={data.customerProvince && province?.find(el => el.id === data.customerProvince)?.districts}
                        objectKey={"customerDistrict"}
                        objectNameKey={null}
                    />
                    {/* Receiver Infomation */}

                    <DashboardTextInput
                        textType={"text"}
                        title={"Khách hàng nhận"}
                        placeholder={"Họ và tên người nhận hàng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"receiverName"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Số điện thoại ( Người nhận hàng )"}
                        placeholder={"Số điện thoại người nhận hàng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"receiverPhone"}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Địa chỉ cụ thể ( Người nhận hàng )"}
                        placeholder={"Địa chỉ cụ thể người nhận hàng"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"receiverAddress"}
                    />
                    <DashboardSelectInput
                        title={"Tỉnh/Thành Phố ( Người nhận hàng ) "}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltProvinceReceiver}
                        handleOpenSlt={handleOpenSltProvinceReceiver}
                        subTitle={"Chọn tỉnh/thành phố :"}
                        listSelect={province}
                        objectKey={"receiverProvince"}
                        objectNameKey={"receiverProvinceName"}
                    />
                    <DashboardSelectInput
                        title={"Quận/Huyện ( Người nhận hàng ) "}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltDistrictReceiver}
                        handleOpenSlt={handleOpenSltDistrictReceiver}
                        subTitle={"Chọn quận/huyện :"}
                        listSelect={data.receiverProvince && province?.find(el => el.id === data.receiverProvince)?.districts}
                        objectKey={"receiverDistrict"}
                        objectNameKey={null}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Tên hàng hóa"}
                        placeholder={"Thực phẩm, bánh kẹo, nước ngọt,..."}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"orderName"}
                    />
                    <DashboardSelectInput
                        title={"Loại hàng hóa "}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltOrderType}
                        handleOpenSlt={handleOpenSltOrderType}
                        subTitle={"Chọn loại hàng khi đóng gói :"}
                        listSelect={orderType}
                        objectKey={"orderType"}
                        objectNameKey={null}
                    />
                    <DashboardTextInput
                        textType={"number"}
                        title={"Số lượng"}
                        placeholder={"Tổng số lượng sau khi đóng gói"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"quantity"}
                    />
                    <DashboardSelectInput
                        title={"Đơn vị tính "}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltUnit}
                        handleOpenSlt={handleOpenSltUnit}
                        subTitle={"Chọn đơn vị tính :"}
                        listSelect={unitList}
                        objectKey={"unit_id"}
                        objectNameKey={null}
                    />
                    <DashboardTextInput
                        textType={"number"}
                        title={"Thành tiền"}
                        placeholder={"Tổng số tiền phụ thu"}
                        isRequire={true}
                        data={data}
                        setData={setData}
                        objectKey={"totalPrice"}
                    />
                    <DashboardSelectInput
                        title={"Phương thức thanh toán"}
                        data={data}
                        setData={setData}
                        handleClose={handleClose}
                        sltOpen={sltPayment}
                        handleOpenSlt={handleOpenSltPayment}
                        subTitle={"Chọn phương thức thanh toán :"}
                        listSelect={paymentList}
                        objectKey={"payment_id"}
                        objectNameKey={null}
                    />
                    <DashboardTextInput
                        textType={"text"}
                        title={"Ghi chú"}
                        placeholder={"Ghi chú đơn hàng"}
                        isRequire={false}
                        data={data}
                        setData={setData}
                        objectKey={"notes"}
                    />
                    <MaterialTable
                        title="Danh sách hàng hóa"
                        data={products}
                        columns={table}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        options={{
                            search: true,
                            selection: true,
                            actionsColumnIndex: -1,
                            addRowPosition: "first",
                            exportButton: true,
                        }}
                        localization={{
                            pagination: {
                                labelDisplayedRows: '{from}-{to} trong {count}',
                                labelRowsSelect: 'sản phẩm',
                                previousTooltip: 'Trang trước',
                                firstTooltip: 'Trang đầu',
                                nextTooltip: 'Trang kế',
                                lastTooltip: 'Trang cuối'
                            },
                            toolbar: {
                                nRowsSelected: '{0} hàng đang được chọn',
                                exportTitle: 'Tải xuống',
                                searchTooltip: 'Tìm kiếm'
                            },
                            header: {
                                actions: 'Thao tác'
                            },
                            body: {
                                emptyDataSourceMessage: 'Chưa có sản phẩm',
                                filterRow: {
                                    filterTooltip: 'Lọc'
                                },
                                addTooltip: 'Thêm',
                                editTooltip: 'Sửa',
                                deleteTooltip: 'Xóa',
                            }
                        }}
                        actions={[{
                            tooltip: 'Xóa tất cả lựa chọn',
                            icon: 'delete',
                            onClick: (evt, data) => new Promise((resolve, reject) => {
                                const updatedRows = [...products]
                                let state = updatedRows.filter(item => !data.includes(item))
                                setTimeout(() => {
                                    setProducts(state)
                                    resolve()
                                }, 1000)

                            })
                        }]}
                        editable={{
                            onRowAdd: newRow => new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (newRow.quantity && newRow.name && newRow.unit) {
                                        if (isNaN(newRow.quantity) || newRow.quantity < 1) {
                                            enqueueSnackbar('Số lượng vui lòng nhập số lớn hơn 0', {
                                                persist: false,
                                                variant: 'error',
                                                preventDuplicate: true,
                                                autoHideDuration: 3000,
                                            })
                                            reject();
                                        } else {

                                            setProducts([...products, newRow])
                                            resolve()

                                        }
                                    } else {
                                        enqueueSnackbar('Trường của sản phẩm không thể bỏ trống', {
                                            persist: false,
                                            variant: 'error',
                                            preventDuplicate: true,
                                            autoHideDuration: 3000,
                                        })
                                        reject();
                                    }
                                }, 1000)

                            }),
                            onRowDelete: selectedRow => new Promise((resolve, reject) => {
                                const index = selectedRow.tableData.id;
                                const updatedRows = [...products]
                                updatedRows.splice(index, 1)
                                setTimeout(() => {
                                    setProducts(updatedRows)
                                    resolve()
                                }, 1000)
                            }),
                            onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                                if (updatedRow.quantity && updatedRow.name && updatedRow.unit) {
                                    if (isNaN(updatedRow.quantity) || updatedRow.quantity < 1) {
                                        enqueueSnackbar('Số lượng vui lòng nhập số lớn hơn 0', {
                                            persist: false,
                                            variant: 'error',
                                            preventDuplicate: true,
                                            autoHideDuration: 3000,
                                        })
                                        reject();
                                    } else {
                                        const index = oldRow.tableData.id;
                                        const updatedRows = [...products]
                                        updatedRows[index] = updatedRow
                                        setTimeout(() => {
                                            setProducts(updatedRows)
                                            resolve()
                                        }, 1000)
                                    }
                                } else {
                                    enqueueSnackbar('Trường của sản phẩm không thể bỏ trống', {
                                        persist: false,
                                        variant: 'error',
                                        preventDuplicate: true,
                                        autoHideDuration: 3000,
                                    })
                                    reject();
                                }

                            })
                        }}
                    />
                    <div className="flex-center" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn btn-outline-success">
                            Tạo đơn hàng
                        </button>
                    </div>


                </form>
            </div>
        </div >

    )
}