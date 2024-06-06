import { makeAutoObservable } from 'mobx'
import { RouteInfo } from '@/renderer/src/constants/route.tsx'

type AppStoreType = {
  themeMode: 'light' | 'dark'
  routeInfo: RouteInfo | undefined //外层的路由
  isShowSearch: boolean
  setIsShowSearch: (isShowSearch: boolean) => void
  setThemeMode: (themeMode: 'light' | 'dark') => void
  setRouteInfo: (routeInfo: RouteInfo) => void
}
export const appStore = makeAutoObservable<AppStoreType>({
  themeMode: 'light',
  routeInfo: undefined,
  isShowSearch: false,
  setThemeMode(themeMode: 'light' | 'dark') {
    this.themeMode = themeMode
  },
  setRouteInfo(routeInfo: RouteInfo) {
    this.routeInfo = routeInfo
  },
  setIsShowSearch(isShowSearch) {
    this.isShowSearch = isShowSearch
  }
})
