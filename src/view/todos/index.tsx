import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import CustomTable, {Data} from "../../components/customTable";
import {HeadCell} from "../../components/customTable/EnhancedTableHead.tsx";
import {useEffect} from "react";
import {getTodos, removeTodos} from "../../store/slice/todosSlice";
function createData(
    id: number,
    userName: string,
    task: string,
    completed: number,
): Data {

    return {
        id, userName, task,completed
    };
}
const headCells:  HeadCell[] = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'userId',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: false,
        label: 'userName',
    },
    {
        id: 'task',
        numeric: false,
        disablePadding: false,
        label: 'task',
    },
    {
        id: 'completed',
        numeric: false,
        disablePadding: false,
        label: 'completed ',
    },
    {
        id: 'botton',
        numeric: false,
        disablePadding: false,
        label: ' ',
    },
];


const Todos = () => {
    const users = useAppSelector(state => state.users)
    const todos=useAppSelector(state => state.todos)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getTodos())
    },[])


    const rows = todos.map(p => {
        const user = users.find(u => u.id === p.userId)
        let userName:string
        if(user){userName=user.name as string}
        else {userName="no name"}
        return createData(p.id, userName, p.title, p.completed?1:0  )
    })

    return (
        <CustomTable removeRows={removeTodos} rows={rows} headCells={headCells} typeRow={"todos"}/>
    );
}
export default Todos