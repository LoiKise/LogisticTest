import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function NewListItem({ item }) {

    return (
        <>
            <div className="col-md-12 col-lg-4 mb-md-5 mb-sm-5" >
                <Link to='/' className="ourservices-link">
                    <div className="ourservices-item">
                        <img
                            className="ourservices-item__img"
                            src={item.img}
                            alt="ship"
                        />
                        <div className="ourservices-item__content">
                            <div className="ourservices-item__content-overlay"></div>
                            {
                                item?.info ?
                                    <h3 className="newandsale-item__content-header">
                                        {item?.info}
                                    </h3>
                                    :
                                    <h3 className="ourservices-item__content-header">
                                        {item?.title}
                                        <br />
                                        {item?.title1}
                                    </h3>
                            }
                            {item?.iconImg ?
                                <img
                                    src={item?.iconImg}
                                    alt=""
                                    className="ourservices-item__content-icon"
                                /> : null
                            }
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}
