import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
 
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector