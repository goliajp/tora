import { observer } from 'mobx-react-lite'

const Login = observer(() => {
  const signInWithGoogle = async () => {
    await window.electron.ipcRenderer.invoke(
      'open-external',
      'http://localhost:5174?type=google&redirect_uri=electron-tora://login'
    )
  }

  const signInWithGithub = async () => {
    await window.electron.ipcRenderer.invoke(
      'open-external',
      'http://localhost:5174?type=github&redirect_uri=electron-tora://login'
    )
  }

  const signInWithApple = async () => {
    await window.electron.ipcRenderer.invoke(
      'open-external',
      'http://localhost:5174?type=apple&redirect_uri=electron-tora://login'
    )
  }

  return (
    <div>
      <button onClick={signInWithGoogle} className="mt-4">
        Google login
      </button>
      <button onClick={signInWithGithub} className="mt-4">
        Github login
      </button>
      <button onClick={signInWithApple} className="mt-4">
        Apple login
      </button>
    </div>
  )
})
export default Login
