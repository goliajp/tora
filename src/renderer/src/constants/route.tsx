import Home from '@/renderer/src/pages/home'
import About from '@/renderer/src/pages/about/About'
import { ComponentType } from 'react'
import LongList from '@/renderer/src/pages/perf/LongList'
import TextEdit from '@/renderer/src/pages/perf/TextEdit'

type RouteInfo = {
  path: string
  children?: RouteInfo[]
  component?: ComponentType
  name?: string
}

const route: RouteInfo[] = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/perf',
    children: [
      {
        path: '/perf/long-list',
        component: LongList
      },
      {
        path: '/perf/text-edit',
        component: TextEdit
      }
    ]
  }
]

export default route
