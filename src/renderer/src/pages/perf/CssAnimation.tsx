import { observer } from 'mobx-react-lite'

const CssAnimation = observer(() => {
  return (
    <div className="mx-auto h-lvh bg-black color-change">
      <div className="w-3/5 mx-auto justify-center flex pt-12 flex-wrap space-y-20">
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-spin" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-spin" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-spin" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-spin" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-bounce" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-bounce" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-bounce" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-bounce" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-ping" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-ping" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-ping" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-ping" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-pulse" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-pulse" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-pulse" alt="logo" />
        <img src="https://cdn.golia.jp/logo-icon.png" className="animate-pulse" alt="logo" />
      </div>
      <img
        className="flying-img absolute w-[1000px]"
        src="https://cdn.golia.jp/draw/underwear.png"
        alt="underwear"
      />
    </div>
  )
})
export default CssAnimation
