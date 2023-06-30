import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import {EnhancedTableToolbar} from "./EnhancedTableToolbar.tsx";
import {EnhancedTableHead, HeadCell} from "./EnhancedTableHead.tsx";
import {getComparator, Order, stableSort} from "../../assets/function/sorting";
import EnhancedTableBody from "./EnhancedTableBody.tsx";
import {useAppDispatch} from "../../store/hook.ts";

export type PostData= {
    id: number
    userName: string
    title: string
    body: string
    favorites: number
}
export type PhotoData ={
    id: number
    favorites: number
    title: string
    userName:string
}
export type TodosData ={
    id: number
    userName: string
    task: string
    completed: number
}
export type Data=PostData|PhotoData|TodosData
export type TypeRow='posts'|'albums'|'todos'

type CustomTable ={
    rows:Data[]
    headCells: HeadCell[]
    typeRow:TypeRow
    removeRows:(data:number[])=>void
}
const CustomTable:FC<CustomTable> = ({rows,headCells,typeRow,removeRows}) => {

    console.log('render')
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
    const [selected, setSelected] = React.useState<number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatch=useAppDispatch()
    //sort
    const handleRequestSort = (
        _: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    // select post
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    //pagination
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //view posts
    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const removeRowHandler =()=>{
        dispatch(removeRows(selected))
        setSelected([])
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar name={typeRow} removeHandler={removeRowHandler} selected={selected}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 360}}
                        size={'small'}
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <EnhancedTableBody
                            typeRow={typeRow}
                            handleClick={handleClick}
                            isSelected={isSelected}
                            visibleRows={visibleRows}
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30, 40, 50, rows.length]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
export default CustomTable