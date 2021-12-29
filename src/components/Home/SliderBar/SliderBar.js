
import React from 'react'
import ButtonCustom from '../../../utils/Buttons/ButtonCustom'


export default function SliderBar() {
    const IconService = "./assets/img/icon/planes.png"
    return (
        <div className='slider'>
            <div className="header__slogan">
                <p className="header__slogan-text">
                    THƯƠNG HIỆU<br />
                    <span>LOGISTICS</span> <br />HÀNG ĐẦU VIỆT NAM
                </p>
                <img
                    src="./assets/img/icon/package.png"
                    alt=""
                    className="header__slogan-icon"
                />
            </div>
            <div className="header__button">
                <ButtonCustom name="Tra Cứu" linkIcon={IconService} isTransparent={2} link="/Search" />
                <ButtonCustom name="Dịch Vụ" linkIcon={IconService} isTransparent={1} link="/Service" />
            </div>
        </div>

    )
}
