
import * as React from 'react';
import { useDispatch } from 'react-redux';
export function EditToolbar({ setOpenEditFunc, params, getItem }) {
    const dispatch = useDispatch();
    const handleEdit = () => {
        setOpenEditFunc();
        dispatch(getItem(params))
    };

    return (
        <div
            className="dashboard-addnew-btn btn btn-outline-warning"
            onClick={() => handleEdit()}
        >Sửa</div>
    );
}
