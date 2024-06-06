import { observer } from 'mobx-react-lite'
import clsx from 'clsx'
import { appStore } from '@/renderer/src/store/app.ts'
import { Route, Routes, useLocation } from 'react-router-dom'
import route, { RouteInfo } from '@/renderer/src/constants/route.tsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const PageLayout = observer(() => {
  // const currentRoute = {}
  const [currentRoute, setCurrentRoute] = useState<RouteInfo | undefined>()
  const location = useLocation()

  useEffect(() => {
    setCurrentRoute(appStore.routeInfo?.children?.find((item) => item.path === location.pathname))
  }, [location])

  const [isShowDocument, setIsShowDocument] = useState(false)

  return (
    <div
      className="w-full h-auto relative"
      style={{
        boxShadow: '0 4px #0000000d,0 0 20px #0000001a'
      }}
    >
      <div
        className={clsx([
          'size-full relative flex',
          appStore.themeMode === 'dark' && 'bg-gray-500'
        ])}
      >
        {/* content */}
        <div
          className={clsx([
            'h-full px-5 flex flex-col transition-all  min-w-[200px]',
            isShowDocument ? 'w-1/2 border-r border-solid' : 'w-full border-none'
          ])}
        >
          <header className="border-b border-solid h-16 flex items-center justify-between flex-wrap">
            <h1 className="font-bold">{currentRoute?.name}</h1>
            <button onClick={() => setIsShowDocument(!isShowDocument)}>
              {isShowDocument ? '关闭' : '打开'}文档
            </button>
          </header>
          <div className="h-[calc(100%-4rem)] overflow-auto my-4  relative">
            <Routes>
              {route.map((item, index) => {
                return (
                  <Route
                    path={item.path}
                    element={item.component && <item.component />}
                    key={index}
                  >
                    {item.children &&
                      item.children.map((childRoute, index) => (
                        <Route
                          path={childRoute.path}
                          element={childRoute.component && <childRoute.component />}
                          key={index}
                        />
                      ))}
                  </Route>
                )
              })}
            </Routes>
          </div>
          {/*<footer>footer</footer>*/}
        </div>

        {/* markdown */}
        <div
          className={clsx(['h-full overflow-hidden', isShowDocument ? 'w-1/2 p-4' : 'w-0 py-4'])}
        >
          <ReactMarkdown
            className={clsx(['markdown-body', !isShowDocument && 'whitespace-nowrap'])}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code(props) {
                const { children, className } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter PreTag="div" language={match[1]} style={dark}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className}>{children}</code>
                )
              }
            }}
          >
            {currentRoute?.markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
})
export default PageLayout
