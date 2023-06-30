import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {FC} from "react";
import {Grid} from "@mui/material";
import {IComment} from "../../store/slice/comentsSlice/types.ts";

type Comments = {
    comment: IComment
}

const Comments: FC<Comments> = ({comment}) => {
    return (

        <>
            <Divider variant="fullWidth" component="li"/>
            <ListItem alignItems="flex-start">

                <ListItemText
                    primary={
                        <>
                            <Grid>
                                <Typography variant={'h6'} component={'span'}>name: </Typography>{comment.name}
                            </Grid>
                            <Grid>
                                <Typography component={'span'}>email: </Typography>{comment.email}
                            </Grid>
                        </>
                    }
                    secondary={
                        <>
                            <Typography
                                sx={{display: 'inline', fontSize:12}}
                                component="span"
                                variant="body2"
                                color="text.primary"

                            >
                                {comment.body}
                            </Typography>

                        </>
                    }
                />
            </ListItem>
        </>
    );
}
export default Comments