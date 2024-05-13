import route from '@/renderer/src/constants/route'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../../resources/icon.png'
import { AiOutlineMoon, AiOutlineSun, AiOutlineTranslation } from 'react-icons/ai'
import { appStore } from '../store/app.ts'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import clsx from 'clsx'

export const LeftRoute = observer(() => {
  const { t, i18n } = useTranslation()
  const [isShowMenu, setIsShowMenu] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex-col flex justify-between items-center h-full min-w-[130px] py-8 bg-[#d69db8] bg-gradient-to-b from-[#ddc9b8]">
      <div>
        {/*logo */}
        <div className="mb-4 flex justify-center">
          <img src={logo} alt="" />
        </div>

        {route.map((item, index) => {
          //有name就取name，没有就取path，去掉第一个字符
          return (
            <div key={index} className="mb-2 relative group w-full text-center">
              <Link
                to={item.redirect || item.path}
                onClick={() => appStore.setRouteInfo(item)}
                className="text-[#3d2912] text-xl flex flex-col items-center mb-4"
              >
                {item.icon && (
                  <item.icon className="group-hover:bg-[rgba(0,0,0,.2)] p-1 text-3xl rounded group-hover:text-4xl h-9 transition-all" />
                )}
                <span className="text-sm pt-1">
                  {t(`menu.${item.name}`) ?? item.path.substring(1)}
                </span>
              </Link>
            </div>
          )
        })}
      </div>
      <div>
        <AiOutlineTranslation
          className="hover:bg-[rgba(0,0,0,.2)] p-1 text-3xl rounded size-9 transition-all text-white cursor-pointer"
          onClick={async () => {
            await i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')
          }}
        />
        <div
          onClick={async () => {
            const res = await window.electron.ipcRenderer.invoke('dark-mode:toggle')
            appStore.setThemeMode(res ? 'dark' : 'light')
          }}
        >
          {appStore.themeMode === 'light' && (
            <AiOutlineMoon className="hover:bg-[rgba(0,0,0,.2)] p-1 text-3xl rounded size-9 transition-all text-white cursor-pointer mt-4" />
          )}
          {appStore.themeMode === 'dark' && (
            <AiOutlineSun className="hover:bg-[rgba(0,0,0,.2)] p-1 text-3xl rounded size-9 transition-all text-white cursor-pointer mt-4" />
          )}
        </div>
        {/* avatar */}
        <div className="size-9 mt-4 relative">
          <div
            className="cursor-pointer hover:bg-[rgba(0,0,0,.2)] p-1 rounded"
            onClick={() => setIsShowMenu(!isShowMenu)}
          >
            <img src="https://cdn.golia.jp/draw/cleaner.png" alt="" />
            <div className="size-2 bg-green-500 rounded-full absolute right-2 bottom-2"></div>
          </div>
          <div
            className={clsx([
              'absolute bg-[#f8f8f8] border border-solid left-10 bottom-0 shadow rounded w-28 flex-col text-center py-4 z-10',
              !isShowMenu && 'hidden'
            ])}
          >
            <div
              className="text-sm pb-4 border-b border-solid cursor-pointer"
              onClick={() => {
                navigate('/')
                appStore.setRouteInfo(route[0])
                setIsShowMenu(false)
              }}
            >
              首页
            </div>
            <div className="text-sm pt-4">修改个人资料</div>
          </div>
        </div>
      </div>
    </div>
  )
})
