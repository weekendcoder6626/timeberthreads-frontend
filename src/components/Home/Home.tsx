import { useAppSelector } from "../../store/hooks"
// import { setUserState } from "../../store/slices/userSlice"

export default function Home() {

  const email = useAppSelector(
    (state) => state.user.email
  )

  const loggedIn = useAppSelector(
    (state) => state.user.loggedIn
  )

  const message = useAppSelector(
    (state) => state.user.message
  )

  // const dispatch = useAppDispatch()

  // // dispatch(setUserState({loading: false}))

  return (
    <div>
      {loggedIn && (
        <div>
          {email}
        </div>
      )}

      {message && (
        <div>
          {message}
        </div>
      )}

      {/* <Button onClick={() => dispatch(login({
        loggedIn: true,
        email: "lol",
        username: "coder"
      }))}>Login</Button> */}
    </div>
  )
}
