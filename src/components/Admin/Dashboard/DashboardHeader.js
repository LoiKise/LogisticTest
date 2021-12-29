import React, { useState } from 'react'
import { faBell, faEllipsisV, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DashboardHeader(props) {

    const [openNotice] = useState(null)
    const [notice] = useState(null)
    const [unreadedNotice] = useState(0)

    const openMenuOnClick = () => {
        props.setOpenMenuOnClick()
    }

    return (
        <div className="dashboard-header flex">
            <div className="flex-center">
                <div className="menu-opt flex-center"
                    onClick={openMenuOnClick}>
                    {props.openMenu && <FontAwesomeIcon icon={faEllipsisV} />}
                    {props.openMenu === false && <FontAwesomeIcon icon={faListUl} />}
                </div>
                <p>{props.itemName}</p>
            </div>
            <div className="flex-center menu-search-container">
                <form className="menu-search flex">
                    <input type="text" placeholder="Search..." className="menu-search-input"></input>
                    <div className="flex-center">
                        <FontAwesomeIcon icon={faSearch} className="icon" />
                    </div>
                </form>
                <div
                    className="menu-notice noselect"
                >
                    <FontAwesomeIcon icon={faBell} style={{ pointerEvents: 'none' }} className="icon" />
                    {unreadedNotice > 0 &&
                        <div className="notice-count">{unreadedNotice}</div>
                    }
                    {openNotice &&
                        <div className="notice-box">
                            {notice &&
                                notice.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="notice-item"
                                        >
                                            {item.noticeContent}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}