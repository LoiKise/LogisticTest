import React from 'react'
import { TextField } from '@material-ui/core';

export default function DashboardTextInput({ title, placeholder, isRequire, data, setData, objectKey, textType }) {
    return (
        <div className="create-box-row flex">
            <div className="dashboard-left flex">{title} {isRequire ? <span style={{ color: "red" }}>*</span> : null}</div>
            <div className="dashboard-right--input">
                <TextField
                    error={isRequire && (data[objectKey]?.length < 1 || data[objectKey] < 0) ? true : false}
                    type={textType}
                    id="outlined-totalPrice"
                    label={placeholder}
                    variant="outlined"
                    color="primary"
                    value={data[objectKey] || ""}
                    onChange={(event) => {
                        setData({ ...data, [objectKey]: event.target.value })
                    }}
                    required={isRequire}
                />
            </div>
        </div>
    )
}
