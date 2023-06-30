
import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import CustomTable, {Data} from "../../components/customTable";
import {HeadCell} from "../../components/customTable/EnhancedTableHead.tsx";
import {useEffect} from "react";
import {getAlbums, removeAlbum} from "../../store/slice/albumSlice";
import {saveInLocalStorage} from "../../localstorage";



function createData(
    id: number,
    userName: string,
    title: string,
    favorites:number
): Data {

    return {
        id, userName, title,favorites
    };
}
const headCells:  HeadCell[] = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'Album id',
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
        label: 'name',
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


const Albums = () => {
    const albums = useAppSelector(state => state.albums)
    const users = useAppSelector(state => state.users)
    const dispatch=useAppDispatch()

    useEffect(()=>{
            dispatch(getAlbums())
        return saveInLocalStorage({albums})
        }
    ,[])
    const rows = albums.map(almum => {
        const user = users.find(u => u.id === almum.userId)

        let userName:string
        if(user){userName=user.name as string}
        else {userName="no name"}

        return createData(almum.id, userName, almum.title, almum.favorites? 1 : 0)
    })

    return (
        <CustomTable removeRows={removeAlbum} rows={rows} headCells={headCells} typeRow={'albums'}/>
    );
}
export default Albums