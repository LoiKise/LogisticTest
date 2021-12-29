import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Index = () =>  {

    const [isVisiable, setIsVisiable] = useState(false)

    const toggleVisibility = () => {
        if(window.pageYOffset > 300){
            setIsVisiable(true)
        } else {
            setIsVisiable(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };

    }, [])

    return (
        <Link className="scroll-btn" onClick={scrollToTop} to="#.">
            {
                isVisiable 
                ? 
                    <img
                    src="../assets/img/icon/gradient_top_circle_arrow.png"
                    alt="scrool to top"
                    />
                :
                <div></div>
            }
        </Link>
    )
}

export default Index;