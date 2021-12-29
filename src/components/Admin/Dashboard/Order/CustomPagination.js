
import { useGridSlotComponentProps } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';



const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();
    return (
        <Pagination
            style={{ display: 'flex' }}
            color="primary"
            count={state.pagination.pageCount}
            page={state.pagination.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}
export default CustomPagination