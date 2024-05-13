import { makeAutoObservable } from 'mobx'
import route, { RouteInfo } from '@/renderer/src/constants/route.tsx'

type AppStoreType = {
  themeMode: 'light' | 'dark'
  routeInfo: RouteInfo
  setThemeMode: (themeMode: 'light' | 'dark') => void
  setRouteInfo: (routeInfo: RouteInfo) => void
}
export const appStore = makeAutoObservable<AppStoreType>({
  themeMode: 'light',
  routeInfo: route[0],
  setThemeMode(themeMode: 'light' | 'dark') {
    this.themeMode = themeMode
  },
  setRouteInfo(routeInfo: RouteInfo) {
    this.routeInfo = routeInfo
  }
})
