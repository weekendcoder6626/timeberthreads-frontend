import { PropsWithChildren } from 'react'
import { isLoggedIn } from '../store/auth'
import { Navigate } from 'react-router-dom'

type Props = {}

export default function AuthGuard({ children }: PropsWithChildren<Props>) {
  return (
    <div>
      { isLoggedIn() ? children : <Navigate to={"/login"} replace/> }
    </div>
  )
}