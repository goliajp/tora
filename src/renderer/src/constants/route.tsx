import Home from '@/renderer/src/pages/home'
import { ComponentType, FunctionComponent } from 'react'
import LongList from '@/renderer/src/pages/perf/LongList'
import TextEdit from '@/renderer/src/pages/perf/TextEdit'
import BigImage from '@/renderer/src/pages/perf/BigImage.tsx'
import MasonryLayout from '@/renderer/src/pages/perf/MasonryLayout.tsx'
import VideoPlayer from '@/renderer/src/pages/perf/VideoPlayer.tsx'
import SvgAnimation from '@/renderer/src/pages/perf/SvgAnimation.tsx'
import CssAnimation from '@/renderer/src/pages/perf/CssAnimation.tsx'
import Tour from '@/renderer/src/pages/feature/Tour.tsx'
import Login from '@/renderer/src/pages/feature/Login.tsx'
import { AiOutlineHome, AiOutlineReddit, AiOutlineTool } from 'react-icons/ai'
import { IconBaseProps } from 'react-icons'
import Markdown from '@/renderer/src/pages/feature/Markdown.tsx'
import ImageFilter from '@/renderer/src/pages/feature/ImageFilter.tsx'
import DataDashboard from '@/renderer/src/pages/perf/DataDashboard.tsx'
import Notifications from '@/renderer/src/pages/feature/Notifications.tsx'

type IconComponentType = FunctionComponent<IconBaseProps>

export type RouteInfo = {
  path: string
  children?: RouteInfo[]
  component?: ComponentType
  icon?: IconComponentType
  name?: string
  redirect?: string
}

const route: RouteInfo[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
    icon: AiOutlineHome
  },
  // {
  //   name: 'about',
  //   path: '/about',
  //   component: About,
  //   icon: AiOutlineInfoCircle
  // },
  {
    name: 'feature',
    path: '/feature',
    icon: AiOutlineReddit,
    redirect: '/feature/tour',
    children: [
      {
        name: '新手引导',
        path: '/feature/tour',
        component: Tour
      },
      {
        name: '登录',
        path: '/feature/login',
        component: Login
      },
      {
        name: 'Markdown',
        path: '/feature/markdown',
        component: Markdown
      },
      {
        name: '图像滤镜',
        path: '/feature/image-filter',
        component: ImageFilter
      },
      {
        name: '消息通知',
        path: '/feature/notification',
        component: Notifications
      }
    ]
  },
  {
    name: 'perf',
    path: '/perf',
    redirect: '/perf/long-list',
    icon: AiOutlineTool,
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
        name: 'Data Dashboard',
        path: '/perf/web-socket',
        component: DataDashboard
      }
    ]
  }
]

export default route
