import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import {AppDispatchType, AppRootStateType} from "./index.ts";



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector