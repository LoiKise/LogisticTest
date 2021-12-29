
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons'

const CustomNoRowsOverlay = () => {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            paddingTop: '56px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <FontAwesomeIcon icon={faDatabase} style={{ fontSize: '40px', margin: '10px' }} />
            <div style={{ fontSize: '14px', fontWeight: '500', letterSpacing: '.5px' }}>Chưa có dữ liệu</div>
        </div>
    );
}
export default CustomNoRowsOverlay;