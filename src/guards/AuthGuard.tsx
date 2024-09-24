import { PropsWithChildren, useEffect } from 'react'
import { isLoggedIn } from '../store/auth'
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function AuthGuard({ children }: PropsWithChildren<Props>) {

  const navigate = useNavigate();

  useEffect(() => {

    if(!isLoggedIn()) navigate("/auth")

  }, [])  

  return (
    <>
      { children }
    </>
  )
}