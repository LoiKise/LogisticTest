import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function DashboardSelectInput({
    title, data, setData, handleClose, sltOpen, disable,
    handleOpenSlt, subTitle, listSelect, objectKey, objectNameKey }) {
    console.log({ data });
    return (
        <div className="create-box-row flex">
            <div className="dashboard-left flex">{title}<span style={{ color: "red" }}>*</span></div>
            <div className="dashboard-right">
                <Select
                    className="MUI-customBorder"
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={sltOpen}
                    onClose={handleClose}
                    onOpen={handleOpenSlt}
                    value={data[objectKey] || ""}
                    disabled={disable || false}
                    onChange={(event, params) => {
                        objectNameKey ?
                            setData({
                                ...data,
                                [objectKey]: params?.props?.value,
                                [objectNameKey]: params?.props?.name
                            })
                            : setData({
                                ...data,
                                [objectKey]: params?.props?.value,
                            })
                    }}
                >
                    <MenuItem value={null} selected>
                        <em style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>{subTitle}</em>
                    </MenuItem>
                    {listSelect && listSelect.length > 0 && listSelect?.map((item, index) => {
                        let value = ""
                        if (item.id) {
                            if (objectKey === "customerDistrict" || objectKey === "receiverDistrict") {
                                value = item.name
                            } else {
                                value = item.id
                            }
                        } else {
                            value = item.name
                        }
                        return <MenuItem key={index} value={value} name={item.name || item.cityName || item.namePayment || item.id}>
                            {item.name || item.cityName || item.namePayment || item.id}
                        </MenuItem>
                    })}
                </Select>
            </div>
        </div >
    )
}
