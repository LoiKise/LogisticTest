import React from 'react'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
export default function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton title={"Ẩn/Hiện Cột"} />
            <GridToolbarFilterButton title={"Lọc"} />
            <GridToolbarDensitySelector title={"Hiển thị"} />
            <GridToolbarExport title={"Xuất excel"} csvOptions={{ utf8WithBom: true, fileName: "Danh sách dữ liệu" }} />
        </GridToolbarContainer>
    );
}