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
import TimeZone from '@/renderer/src/pages/feature/TimeZone.tsx'
import Currency from '@/renderer/src/pages/feature/Currency.tsx'
import Ffmpeg from '@/renderer/src/pages/feature/Ffmpeg.tsx'
import ScreensShot from '@/renderer/src/pages/feature/ScreensShot.tsx'
import Grpc from '@/renderer/src/pages/feature/Grpc.tsx'

type IconComponentType = FunctionComponent<IconBaseProps>

export type RouteInfo = {
  path: string
  children?: RouteInfo[]
  component?: ComponentType
  icon?: IconComponentType
  name?: string
  redirect?: string
  markdown?: string
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
        component: Tour,
        markdown: `
当第一次更新到最新版本的时候，会触发引导提示
`
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
        component: ImageFilter,
        markdown: `
使用 wasm 需要在 meta 加上 wasm-unsafe-eval
`
      },
      {
        name: '消息通知',
        path: '/feature/notification',
        component: Notifications
      },
      {
        name: '时区切换',
        path: '/feature/timezone',
        component: TimeZone
      },
      {
        name: '货币切换',
        path: '/feature/currency',
        component: Currency
      },
      {
        name: 'ffmpeg',
        path: '/feature/ffmpeg',
        component: Ffmpeg,
        markdown: `
利用 postMessage 传递数据
        `
      },
      {
        name: '屏幕截图',
        path: '/feature/screenshot',
        component: ScreensShot,
        markdown: ` 
使用了 <a href="https://github.com/nashaofu/screenshots?tab=readme-ov-file#electron-screenshots" target="_blank">electron-screenshots</a>
        `
      },
      {
        name: 'grpc',
        path: '/feature/grpc',
        component: Grpc
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
        component: BigImage,
        markdown: `
        
超过 250MB 可能会导致图片加载失败/n
使用 blob 格式需要在 index.html 文件里的 meta 加上 img-src * data: blob:

        `
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
