import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import {Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {FC} from "react";
import {useAppDispatch} from "../../store/hook.ts";
import Typography from "@mui/material/Typography";
import MyModal from "../../components/myModal";
import {Data, TodosData} from "../../components/customTable";
import {UpdatePostType} from "../../store/slice/postSlice/types.ts";
import ModalForm from "../posts/ModalForm.tsx";
import {removeTodos, updateTodos} from "../../store/slice/todosSlice";

type TableRowType = {
    data: Data
    isItemSelected: boolean | undefined
    handleClick: (_: React.MouseEvent<unknown>, id: number) => void
    labelId: string
}
const EnhancedTableRowTodos: FC<TableRowType> = ({handleClick, data, labelId, isItemSelected}) => {

    const dispatch = useAppDispatch()
    const row = data as TodosData

    const removePostHandler = () => {
        dispatch(removeTodos([row.id]))
    }
    const changeCompleted=()=>{
        dispatch(updateTodos({id: row.id,completed:!row.completed}))
    }
    const updateTodosHandler = (data: UpdatePostType) => {
        const {title, userName} = data
        dispatch(updateTodos({id: row.id, title,userName}))
    }
    return (
        <TableRow
            tabIndex={-1}
            key={row.id}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onClick={(event) => handleClick(event, row.id)}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell>
                {row.id}
            </TableCell>
            <TableCell>{row.userName}</TableCell>
            <TableCell sx={{cursor:'pointer'}} onClick={changeCompleted}>
                <Typography sx={{textDecoration:row.completed?'line-through':'none'}}>{row.task} </Typography>
            </TableCell>
            <TableCell >
                {row.completed?'completed':'no completed'}
            </TableCell>
            <TableCell>
                <Stack direction={'row'} flexWrap={'wrap'}>
                    <MyModal icon={<DeleteIcon/>} onClick={removePostHandler}>
                        <Typography>Вы точно хотите удалить пост? </Typography>
                    </MyModal>
                    <ModalForm updateData={updateTodosHandler} data={row}/>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default EnhancedTableRowTodos;