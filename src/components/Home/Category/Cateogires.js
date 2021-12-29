import React from 'react'
import Category from './Category'

export default function Categories({ List }) {


    return List.map((item, index) => {
        return (
            <Category item={item} key={index} />
        )
    })

}

