import React from 'react'

export default function AboutItem({item}) {
    return (
        <li className="content-text__item" >
            <img
                src={item.img}
                alt=""
                className="content-text__icon"
            />
            <div className="content-text__text">
                <h3 className="content-text__text-header">
                    {item.title}
                </h3>
                <p>
                    {item.content}
                </p>
            </div>
        </li>
    )
}
