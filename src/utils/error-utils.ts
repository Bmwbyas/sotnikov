import {appSetError, appSetStatus} from "../store/slice/appSlice";

export const handleServerAppError = (dispatch: any, data: any) => {
    if (data.messages.length) {
        dispatch(appSetError({error: data.messages[0]}))
    } else {
        dispatch(appSetError({error: 'some error occurred'}))
    }
    dispatch(appSetStatus({status: "failed"}))
}

export const handleServerNetworkError = (dispatch: any, error: { message: string }) => {
    dispatch(appSetStatus({status: "failed"}))
    dispatch(appSetError({error: error.message ? error.message : "some error occurred"}))
}
