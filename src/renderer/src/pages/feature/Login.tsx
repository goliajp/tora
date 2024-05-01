import { observer } from 'mobx-react-lite'
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import '../../plugins/firebase'

const Login = observer(() => {
  const singInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((rsp) => {
        console.log(rsp, 'rsp')
        // location.href = 'electron-fiddle://' + rsp._tokenResponse.oauthIdToken
      })
      .catch((err) => {
        console.error(err)
        // location.href = '/'
      })
    const userCred = await getRedirectResult(auth)

    console.log(userCred)
  }

  return (
    <div className="mx-auto w-3/5">
      <button onClick={singInWithGoogle}>Google login</button>
    </div>
  )
})
export default Login
