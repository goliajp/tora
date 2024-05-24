import { observer } from 'mobx-react-lite'

const ScreensShot = observer(() => {
  const screenshot = () => {
    window.electron.ipcRenderer.invoke('screenshot')
  }
  return (
    <div>
      <button className="m-8" onClick={screenshot}>
        点击截图
      </button>
    </div>
  )
})
export default ScreensShot
