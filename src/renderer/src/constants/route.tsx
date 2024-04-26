import Home from '@/renderer/src/pages/home'
import About from '@/renderer/src/pages/about/About'
import { ComponentType } from 'react'
import LongList from '@/renderer/src/pages/perf/LongList'
import TextEdit from '@/renderer/src/pages/perf/TextEdit'
import BigImage from '@/renderer/src/pages/perf/BigImage.tsx'
import MasonryLayout from '@/renderer/src/pages/perf/MasonryLayout.tsx'
import VideoPlayer from '@/renderer/src/pages/perf/VideoPlayer.tsx'
import SvgAnimation from '@/renderer/src/pages/perf/SvgAnimation.tsx'
import CssAnimation from '@/renderer/src/pages/perf/CssAnimation.tsx'
import WebSocket from '@/renderer/src/pages/perf/WebSocket.tsx'

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
      },
      {
        name: '4k视频播放',
        path: '/perf/video-player',
        component: VideoPlayer
      },
      {
        name: 'SVG动画',
        path: '/perf/svg-animation',
        component: SvgAnimation
      },
      {
        name: 'CSS动画',
        path: '/perf/css-animation',
        component: CssAnimation
      },
      {
        name: 'WebSocket',
        path: '/perf/web-socket',
        component: WebSocket
      }
    ]
  }
]

export default route
