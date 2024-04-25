import Home from '@/renderer/src/pages/home'
import About from '@/renderer/src/pages/about/About'
import { ComponentType } from 'react'
import LongList from '@/renderer/src/pages/perf/LongList'
import TextEdit from '@/renderer/src/pages/perf/TextEdit'
import BigImage from '@/renderer/src/pages/perf/BigImage.tsx'
import MasonryLayout from '@/renderer/src/pages/perf/MasonryLayout.tsx'

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
        name: '长列表',
        path: '/perf/long-list',
        component: LongList
      },
      {
        name: '文本编辑',
        path: '/perf/text-edit',
        component: TextEdit
      },
      {
        name: '大图片加载',
        path: '/perf/big-image',
        component: BigImage
      },
      {
        name: '瀑布流布局',
        path: '/perf/masonry-layout',
        component: MasonryLayout
      }
    ]
  }
]

export default route
