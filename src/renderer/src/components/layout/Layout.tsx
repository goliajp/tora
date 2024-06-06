import { observer } from 'mobx-react-lite'
import { LeftRoute } from '@/renderer/src/components/LeftRoute.tsx'
import SubRoute from '@/renderer/src/components/SubRoute.tsx'
import PageLayout from '@/renderer/src/components/layout/PageLayout.tsx'
import { PerformanceInfo } from '@/renderer/src/components/PerformanceInfo.tsx'
import { useLocation } from 'react-router-dom'
import { appStore } from '@/renderer/src/store/app.ts'
import route from '@/renderer/src/constants/route.tsx'
import Header from '@/renderer/src/components/Header.tsx'

const Layout = observer(() => {
  //刚进入页面时，将当前页面加入到 RouteInfo 中
  const location = useLocation()

  useEffect(() => {
    // console.log(location)
    const path = location.pathname
    const parts = path.split('/')
    const result = `/${parts[1]}`

    appStore.setRouteInfo(route.find((item) => result === item.path) || route[0])
  }, [location])

  return (
    <div className="h-full">
      <Header />
      <div className="flex h-[calc(100%-2.5rem)]">
        {appStore.routeInfo && (
          <>
            <LeftRoute />
            <SubRoute />
            <PageLayout />
            <PerformanceInfo />
          </>
        )}
      </div>
    </div>
  )
})
export default Layout
