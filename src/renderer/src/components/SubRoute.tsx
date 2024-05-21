import { observer } from 'mobx-react-lite'
import { Resizable } from 're-resizable'
import { appStore } from '@/renderer/src/store/app'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const SubRoute = observer(() => {
  const location = useLocation()
  return (
    <Resizable
      className="h-full flex flex-col items-center py-6 left-0 top-0 bg-[#fbf9f8] shadow overflow-hidden"
      defaultSize={{
        width: 140,
        height: '100%'
      }}
      minWidth={140}
      maxWidth={700}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
    >
      <div className="w-full px-2">
        {appStore.routeInfo?.children?.map((item) => {
          return (
            <Link
              key={item.path}
              to={item.redirect || item.path}
              className={clsx([
                'text-[#3d2912] text-xl flex flex-col mb-4 hover:bg-[#e8e2dc] w-full h-[26px] rounded pl-4',
                item.path === location.pathname && 'bg-[#e8e2dc]'
              ])}
            >
              {/*{item.icon && (*/}
              {/*  <item.icon className="group-hover:bg-[rgba(0,0,0,.2)] p-1 text-3xl rounded group-hover:text-4xl h-9 transition-all" />*/}
              {/*)}*/}

              <span className="text-sm mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </Resizable>
  )
})
export default SubRoute
