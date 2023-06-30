import {useAppSelector} from "../../store/hook.ts";
import CustomTable, {Data} from "../../components/customTable";
import {HeadCell} from "../../components/customTable/EnhancedTableHead.tsx";
import {removePost} from "../../store/slice/postSlice";
import {useEffect} from "react";
import {saveInLocalStorage} from "../../localstorage";


function createData(
    id: number,
    userName: string,
    title: string,
    body: string,
    favorites: number
): Data {

    return {
        id, userName, title, body, favorites
    };
}
const headCells:  HeadCell[] = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'postId',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: false,
        label: 'userName',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'title',
    },
    {
        id: 'body',
        numeric: false,
        disablePadding: false,
        label: 'post',
    },
    {
        id: 'favorites',
        numeric: false,
        disablePadding: false,
        label: 'favorites',
    },
    {
        id: 'buttons',
        numeric: false,
        disablePadding: false,
        label: '',
    },


];


const Posts = () => {
    const posts = useAppSelector(state => state.posts)
    const users = useAppSelector(state => state.users)

    useEffect(()=>{return saveInLocalStorage({posts,users})},[])

    const rows = posts.map(p => {
        const user = users.find(u => u.id === p.userId)

        let userName:string
        if(user){userName=user.name as string}
        else {userName="no name"}

        return createData(p.id, userName, p.title, p.body, p.favorites ? 1 : 0)
    })

    return (
        <CustomTable removeRows={removePost} rows={rows} headCells={headCells} typeRow={'posts'}/>
    );
}
export default Posts