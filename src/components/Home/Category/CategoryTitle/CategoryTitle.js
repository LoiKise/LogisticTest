
import React from 'react'

export default function CategoryTitle({ title, content }) {
    return (
        <div className="section__top">
            <span>{title}</span>
            <h2 className="section__top-header">
                {content}
            </h2>
        </div>
    )
}
