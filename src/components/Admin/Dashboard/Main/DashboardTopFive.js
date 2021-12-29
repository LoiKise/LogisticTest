import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DashboardTopFive({ data, title, color, icon, table }) {
    return (
        <div className="topfive flex-col">
            <div className={`headerbox flex-center ${color}`}>
                <FontAwesomeIcon icon={icon} className="icon" />
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>{title}</p>
                </div>
                <div className="topfive-content flex">
                    <div className="topfive-list">
                        <div className="top-location-div topfive-div flex">
                            {
                                table && table?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="topfive-header">{item.title}</div>
                                    )
                                })
                            }
                        </div>
                        {data && data.length > 0 && data?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="top-location-div topfive-div flex"
                                >
                                    <div style={{ width: '80%', textAlign: 'left' }} className="top-user flex">
                                        <p className="top-user-name">{item.orderName || item.order_customerPhone}</p>
                                    </div>
                                    <div style={{ width: '80px', textAlign: 'center' }}>{item.count || item.totalPrice}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}