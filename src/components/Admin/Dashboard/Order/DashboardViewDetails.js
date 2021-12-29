import React from 'react'
import { useDispatch } from 'react-redux';
import requestAPI from '../../../../apis';
export default function DashboardViewDetails({ params, getItem }) {
    const dispatch = useDispatch();
    const handleView = async () => {
        await requestAPI(`/delivery/viewdetails/${params.id}`, 'GET')
            .then(res => {
                dispatch(getItem(res.data))

            }).catch({

            })
    };

    return (
        <div
            className="dashboard-addnew-btn btn btn-outline-info"
            onClick={() => handleView()}
        >Xem
        </div>
    );
}
