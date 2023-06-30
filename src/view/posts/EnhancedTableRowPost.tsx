import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import {Accordion, AccordionDetails, AccordionSummary, Stack} from "@mui/material";
import MyIconButton from "../../components/myIconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MyButton from "../../components/myButton";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import * as React from "react";
import {FC} from "react";
import {changeFavorites, removePost, updatePost} from "../../store/slice/postSlice";
import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import Typography from "@mui/material/Typography";
import {getComments} from "../../store/slice/comentsSlice";
import Comments from "./Comments.tsx";
import List from "@mui/material/List";
import ModalForm from "./ModalForm.tsx";
import MyModal from "../../components/myModal";
import {Data, PostData} from "../../components/customTable";
import {UpdatePostType} from "../../store/slice/postSlice/types.ts";

type TableRowType = {
    data: Data
    isItemSelected: boolean | undefined
    handleClick: (_: React.MouseEvent<unknown>, id: number) => void
    labelId: string
}
const EnhancedTableRowPost: FC<TableRowType> = ({handleClick, data, labelId, isItemSelected}) => {

    const row = data as PostData
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const comments = useAppSelector(state => state.comments[row.id])


    const dispatch = useAppDispatch()
    const toggleFavorites = () => {
        dispatch(changeFavorites({id: row.id}))
    }
    const removePostHandler = () => {
        dispatch(removePost([row.id]))
    }

    const toggleComments = () => {
        setExpanded(!expanded)
        if (!expanded) {
            dispatch(getComments(row.id))
        }
    };

    const updatePostHandler = (data: UpdatePostType) => {
        const {title, userName, body} = data
        dispatch(updatePost({id: row.id, body, title, userName}))
    }
    return (
        <TableRow
            tabIndex={-1}
            key={row.id}
            sx={{cursor: 'pointer'}}
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
            <TableCell>{row.title}</TableCell>
            <TableCell>
                <Stack direction={'row'}>
                    <Accordion expanded={expanded}>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack>
                                <Typography component={'p'}>{row.body}</Typography>
                                <MyButton name={'Comments'} variant={expanded ? "outlined" : "text"}
                                          onClick={toggleComments}/>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            Comments
                            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                                {comments.map((c) => <Comments comment={c} key={c.id}/>)}
                            </List>
                        </AccordionDetails>
                    </Accordion>

                </Stack>
            </TableCell>
            <TableCell>


                <MyIconButton onClick={toggleFavorites}>
                    {row.favorites ? <StarRateIcon/> : <StarOutlineIcon/>}
                </MyIconButton>

            </TableCell>
            <TableCell>
                <Stack direction={'row'} flexWrap={'wrap'}>
                    <MyModal icon={<DeleteIcon/>} onClick={removePostHandler}>
                        <Typography>Вы точно хотите удалить пост? </Typography>
                    </MyModal>
                    <ModalForm updateData={updatePostHandler} data={row}/>
                </Stack>
            </TableCell>


        </TableRow>
    );
};

export default EnhancedTableRowPost;