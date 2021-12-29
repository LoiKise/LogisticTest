import React from 'react'
import AboutItem from './AboutItem'

export default function AboutListItem({aboutListItem}) {

    const renderAboutListItem = () => {
        return aboutListItem.map((item, index) => {
            return  <AboutItem item={item} key={index}/>
        })
    }

    return (
        <>
            {renderAboutListItem()}
        </>
    )
}
