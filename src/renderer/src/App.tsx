import { ReactElement } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { LeftRoute } from '@/renderer/src/components/LeftRoute'
import route from '@/renderer/src/constants/route'
import { PerformanceInfo } from '@/renderer/src/components/PerformanceInfo'
import { TourProvider } from '@reactour/tour'

const steps = [
  {
    selector: '.first-step',
    content: 'This is my first Step'
  },
  {
    selector: '.second-step',
    content: 'This is my second Step'
  }
]

function App(): ReactElement {
  return (
    <TourProvider steps={steps}>
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
    </TourProvider>
  )
}

export default App
