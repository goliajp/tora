import { ReactElement } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { LeftRoute } from '@/renderer/src/components/LeftRoute'
import route from '@/renderer/src/constants/route'
import { PerformanceInfo } from '@/renderer/src/components/PerformanceInfo'

function App(): ReactElement {
  return (
    <div>
      <Router>
        <LeftRoute />

        <Routes>
          {route.map((item, index) => {
            return (
              <Route path={item.path} element={item.component && <item.component />} key={index}>
                {/* 同时渲染子路由 */}
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
        <PerformanceInfo />
      </Router>
    </div>
  )
}

export default App
