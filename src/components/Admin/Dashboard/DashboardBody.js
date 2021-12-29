import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardMain from './Main/DashboardMain';
import classNames from 'classnames'
import DashboardDriver from './Driver/DashboardDriver';
import DashboardNews from './News/DashboardNews';
import DashboardDriverEdit from './Driver/DashboardDriverEdit';
import DashboardDriverCreate from './Driver/DashboardDriverCreate';
import DashboardNewsCreate from './News/DashboardNewsCreate';
import DashboardNewsEdit from './News/DashboardNewsEdit';
import DashboardUser from './User/DashboardUser';
import DashboardUserCreate from './User/DashboardUserCreate';
import DashboardUserEdit from './User/DashboardUserEdit';
import DashboardOrder from './Order/DashboardOrder';
import DashboardOrderEdit from './Order/DashboardOrderEdit';
import DashboardOrderCreate from './Order/DashboardOrderCreate';
import DashboardSupport from './Support/DashboardSupport';
import DashboardRequest from './Request/DashboardRequest';
import DashboardDeliveryCreate from './Delivery/DashboardDeliveryCreate';
import DashboardDeliveryEdit from './Delivery/DashboardDeliveryEdit';
import DashboardDelivery from './Delivery/DashboardDelivery';
import DashboardPostage from './Postage/DashboardPostage';
import DashboardRecruitment from './Recruitment/DashboardRecruitment';

export default function DashboardBody(props) {

    const tabId = props.tabId;
    const [toast, setToast] = useState(false)
    const [isChange, setIsChange] = useState(false)
    const [Driver] = useState({})
    const [news] = useState({})
    const [user] = useState({})
    const [order] = useState({})
    const [email] = useState([])

    const setToastFunc = (bool) => {
        setIsChange(true)
        setTimeout(() => {
            setIsChange(false)
        }, 100)
        setToast(true)
        setTimeout(() => {
            setToast(false)
        }, 3000)
    }

    const openMenuMobile = props.openMenuMobile;

    return (
        <div
            className={classNames("DashboardBody ", {
                DashboardBody_small: !props.openMenu
            })}>
            {
                !openMenuMobile &&
                <div
                    className="DashboardBody-closemenu"
                    onClick={props.setOpenMenuOnClick}
                ></div>
            }
            {(props.openCreate && tabId === "2") &&
                <DashboardOrderCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            }
            {(props.openEdit && tabId === "2") &&
                <DashboardOrderEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    order={order}
                />
            }

            {(props.openCreate && tabId === "3") &&
                <DashboardDeliveryCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            }
            {(props.openEdit && tabId === "3") &&
                <DashboardDeliveryEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    email={email}
                />
            }
            {(props.openCreate && tabId === "4") &&
                <DashboardDriverCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            }
            {(props.openEdit && tabId === "4") &&
                <DashboardDriverEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    Driver={Driver}
                />
            }
            {(props.openCreate && tabId === "5") &&
                <DashboardNewsCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            }
            {(props.openEdit && tabId === "5") &&
                <DashboardNewsEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    news={news}
                />
            }
            {(props.openCreate && tabId === "6") &&
                <DashboardUserCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            }
            {(props.openEdit && tabId === "6") &&
                <DashboardUserEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    user={user}
                />
            }
            <DashboardHeader
                itemName={props.menuItems[tabId - 1].name}
                setOpenMenuOnClick={props.setOpenMenuOnClick}
                openMenu={props.openMenu}
                orderNotice={props.orderNotice}
            />
            {
                tabId === "1" && <DashboardMain />
            }
            {/* {
                tabId === "2" && <DashboardInbox />
            } */}
            {
                tabId === "2" &&
                <DashboardOrder
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "3" &&
                <DashboardDelivery
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "4" &&
                <DashboardDriver
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "5" &&
                <DashboardNews
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "6" &&
                <DashboardUser
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "7" &&
                <DashboardRequest
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "8" &&
                <DashboardSupport
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "9" &&
                <DashboardPostage />
            }
            {
                tabId === "10" &&
                <DashboardRecruitment />
            }


        </div>
    )
}