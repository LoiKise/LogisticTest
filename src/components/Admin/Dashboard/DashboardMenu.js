import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { Tooltip, Zoom } from '@mui/material'
const LOGO = "../assets/img/logo/dark_logo.png"
export default function DashboardMenu(props) {

    const [openUserOpt, setOpenUserOpt] = useState(false)
    const [hideText, setHideText] = useState(false)
    const clickToShowUserOpt = () => {
        if (openUserOpt) setOpenUserOpt(false);
        else setOpenUserOpt(true);
    }

    const menuItems = props.menuItems;
    const openMenu = props.openMenu;
    const openMenuMobile = props.openMenuMobile;
    useEffect(() => {
        setTimeout(() => {
            if (openMenu === false) setHideText(true)
        }, 480)
        if (openMenu === true) setHideText(false)
    }, [setHideText, openMenu])


    return (
        <div
            className={classNames("DashboardMenu flex", {
                DashboardMenu_small: !openMenu,
                DashboardMenu_mobile: !openMenuMobile
            })}>
            <div className="db-menu-overlay"></div>
            <div className="db-menu">
                <div className="db-menu-logo flex" style={{ justifyContent: 'center' }}>
                    <img
                        alt="LogoDB"
                        src={LOGO}
                        height='24px'

                    ></img>
                    {hideText === false
                        &&
                        <div className="flex-center" style={{ height: '24px', marginLeft: '12px' }}>
                            <p className="logo-text">LOGICSTICS</p>
                        </div>
                    }

                </div>
                <div className="menu-line"></div>
                <div
                    className="db-menu-user"
                    onClick={clickToShowUserOpt}
                >
                    <div className="flex-center" style={{ padding: '0 5px' }}>
                        <Tooltip title={props.userInfo?.fullname} placement="right" TransitionComponent={Zoom} disableHoverListener={!hideText}>
                            <div className="db-menu-avt flex-center">
                                <img alt="" src="https://static.wixstatic.com/media/9d895c_475f2a6d48f5479f8ebc1611d366210e~mv2.png/v1/fill/w_240,h_240,al_c,q_85,usm_0.66_1.00_0.01/9d895c_475f2a6d48f5479f8ebc1611d366210e~mv2.webp"></img>
                            </div>
                        </Tooltip>
                        {(hideText === false && props.userInfo) && <p className="db-menu-name" style={{ marginLeft: '26px' }}>
                            {props.userInfo?.fullname}
                        </p>}
                        {hideText === false && openUserOpt === true && <FontAwesomeIcon icon={faAngleUp} style={{ fontSize: '18px' }} />}
                        {hideText === false && openUserOpt === false && <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: '18px' }} />}
                    </div>
                    <div className={openUserOpt ? "db-menu-user-opt closeOpt" : "db-menu-user-opt"}>
                        <Tooltip title={"Đăng xuất"} placement="right" TransitionComponent={Zoom} disableHoverListener={!hideText}>
                            <div
                                className="db-menu-item flex-center"
                                style={{ margin: '0' }}
                                onClick={() => {
                                    localStorage.removeItem('accessToken');
                                    sessionStorage.removeItem('chat-id')
                                    window.location.reload(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '18px' }} className="icon" />
                                <p className="db-menu-name">Đăng xuất</p>
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className="menu-line"></div>
                <div className="db-menu-listitem">
                    {
                        menuItems.map((item, index) => {
                            return (
                                <Tooltip title={item.name} placement="right" TransitionComponent={Zoom} disableHoverListener={!hideText}>

                                    <div
                                        key={index}
                                        className={classNames("db-menu-item flex-center", {
                                            db_menu_active: props.tabId === item.id,
                                        })}
                                        onClick={() => {
                                            props.setTabIdOnClick(item.id);
                                            props.setCloseCreateFunc(false);
                                            props.setCloseEditFunc(false);
                                            if (window.innerWidth <= 1110) {
                                                props.setOpenMenuOnClick()
                                            }
                                        }}
                                    >
                                        {/* //TransitionComponent={Zoom} */}
                                        <FontAwesomeIcon icon={item.icon} style={{ fontSize: '18px' }} className="icon" />
                                        {hideText === false && <p className="db-menu-name">{item.name}</p>}
                                    </div>
                                </Tooltip>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}