import { observer } from 'mobx-react-lite'
import { CSSProperties, ReactElement, useEffect, useState } from 'react'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineQuestionCircle,
  AiOutlineSearch
} from 'react-icons/ai'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

const Header = observer(() => {
  const location = useLocation()
  const [historyInfo, setHistoryInfo] = useState(window.history)
  const [isShowInput, setIsShowInput] = useState(false)
  useEffect(() => {
    setHistoryInfo(window.history)
  }, [location])

  return (
    <div
      className="h-10 w-full bg-[#d69db8] bg-gradient-to-r from-[#ddc9b8] flex items-center"
      style={
        {
          WebkitAppRegion: 'drag',
          WebkitUserSelect: 'none'
        } as CSSProperties
      }
    >
      <div className="flex ml-[120px]">
        <AiOutlineArrowLeft
          className={clsx([
            'hover-button text-2xl no-drag',
            !historyInfo.state.idx && 'text-gray-500 hover:bg-transparent cursor-default',
            historyInfo.state.idx && 'hover-button'
          ])}
          onClick={() => {
            window.history.back()
          }}
        />
        <AiOutlineArrowRight
          className={clsx([
            'hover-button text-2xl ml-4 no-drag',
            historyInfo.state.idx + 1 === historyInfo.length &&
              'text-gray-500 hover:bg-transparent cursor-default',
            historyInfo.state.idx + 1 !== historyInfo.length && 'hover-button'
          ])}
          onClick={() => {
            window.history.forward()
          }}
        />
      </div>
      <HeaderSearchButton onClick={() => setIsShowInput(true)} />
      <div className="mr-4 absolute right-0">
        <AiOutlineQuestionCircle className="hover-button text-2xl no-drag" />
      </div>
      {isShowInput && (
        <div className="absolute inset-x-0 mx-auto flex justify-center top-1 z-40 no-drag">
          <HeaderSearchInput isShowInput={isShowInput} onBlur={() => setIsShowInput(false)} />
        </div>
      )}
    </div>
  )
})

export default Header

export const HeaderSearchButton = ({ onClick }: { onClick: () => void }): ReactElement => {
  return (
    <div
      onClick={onClick}
      style={
        {
          WebkitAppRegion: 'no-drag'
        } as CSSProperties
      }
      className="min-w-[100px] mx-auto absolute inset-x-0 cursor-pointer bg-[#a58282] h-7 w-1/5 text-sm leading-7 pl-3 rounded z-10 flex items-center"
    >
      <AiOutlineSearch />
      <span className="pl-1">搜索</span>
    </div>
  )
}

export const HeaderSearchInput = ({
  onBlur,
  isShowInput
}: {
  onBlur: () => void
  isShowInput: boolean
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isShowInput) {
      inputRef.current?.focus()
    }
  }, [isShowInput])
  return (
    <div className="bg-white border border-solid h-10 w-2/5 text-sm leading-7 pl-3 rounded z-10 flex items-center">
      <input
        ref={inputRef}
        onBlur={onBlur}
        type="text"
        className="h-7 w-full text-sm leading-7 pl-3 rounded z-10 flex items-center outline-0"
      />
    </div>
  )
}
