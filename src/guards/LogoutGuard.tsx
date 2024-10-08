import { PropsWithChildren } from 'react'
import { isLoggedIn } from '../store/auth'
import { Navigate } from 'react-router-dom'

type Props = {}

export default function LogoutGuard({ children }: PropsWithChildren<Props>) {
  return (
    <>
      { !isLoggedIn() ? children : <Navigate to={"/home"} replace/> }
    </>
  )
}