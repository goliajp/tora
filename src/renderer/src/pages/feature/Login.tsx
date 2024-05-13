import { observer } from 'mobx-react-lite'

const Login = observer(() => {
  const signInWithGoogle = async () => {
    // shell.openExternal('https://www.google.com')
    await window.electron.ipcRenderer.invoke(
      'open-external',
      'http://localhost:5174?redirect_uri=electron-tora://login'
    )
  }

  return (
    <div className="mx-auto w-3/5">
      <button onClick={signInWithGoogle} className="mt-20">
        Google login
      </button>
    </div>
  )
})
export default Login
