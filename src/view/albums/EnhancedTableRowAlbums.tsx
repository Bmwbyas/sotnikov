import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import MyIconButton from "../../components/myIconButton";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import * as React from "react";
import {FC} from "react";
import {useAppDispatch} from "../../store/hook.ts";
import {Data, PhotoData} from "../../components/customTable";
import {changeFavorites, removeAlbum, updateAlbum} from "../../store/slice/albumSlice";
import {Stack} from "@mui/material";
import MyModal from "../../components/myModal";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ModalForm from "../posts/ModalForm.tsx";
import {UpdatePostType} from "../../store/slice/postSlice/types.ts";
import {useNavigate} from "react-router-dom";
import {router} from "../../configs/routerConfig.ts";

type TableRowAlbumType = {
    data: Data
    isItemSelected: boolean | undefined
    handleClick: (_: React.MouseEvent<unknown>, id: number) => void
    labelId: string
}
const EnhancedTableRowAlbum: FC<TableRowAlbumType> = ({handleClick, data, labelId, isItemSelected}) => {

    const row = data as PhotoData
    const dispatch = useAppDispatch()

    const navigate=useNavigate()
    const toggleFavorites = () => {
        dispatch(changeFavorites({id: row.id}))
    }
    const removeAlbumHandler = () => {
        dispatch(removeAlbum([row.id]))
    }
    const updatePostHandler=(data:UpdatePostType)=>{
        const {title,userName}=data
        dispatch(updateAlbum({id:row.id,title, userName}))
    }

    return (
        <TableRow
            tabIndex={-1}
            key={row.id}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    onClick={(event) => handleClick(event, row.id)}
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell align={"center"}>
                {row.id}
            </TableCell>
            <TableCell>{row.userName}</TableCell>
            <TableCell sx={{cursor:'pointer'}} onClick={()=>navigate(`${router.photos}/${row.id}`)}>
                {row.title}
            </TableCell>
            <TableCell>
                <MyIconButton onClick={toggleFavorites}>
                    {row.favorites ? <StarRateIcon/> : <StarOutlineIcon/>}
                </MyIconButton>
            </TableCell>
            <TableCell>
                <Stack direction={'row'} flexWrap={'wrap'}>
                    <MyModal icon={<DeleteIcon/>} onClick={removeAlbumHandler}>
                        <Typography>Вы точно хотите удалить альбом? </Typography>
                    </MyModal>
                    <ModalForm updateData={updatePostHandler} data={row}/>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default EnhancedTableRowAlbum;