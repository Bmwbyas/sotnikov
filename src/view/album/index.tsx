import {Stack} from '@mui/material';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import {getPhotos} from "../../store/slice/photosSlice";
import Photo from "./Photo.tsx";

const Album = () => {
    const photos = useAppSelector(state => state.photos)
    const {id} = useParams()
    console.log(id)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (id) dispatch(getPhotos(+id))
    }, [])

    return (<Stack direction={"row"} flexWrap={'wrap'} gap={2} sx={{mt: 2}} justifyContent={'space-between'}>
            {photos.map(p => <Photo key={p.id} p={p}/>)}
        </Stack>

    );
};

export default Album;