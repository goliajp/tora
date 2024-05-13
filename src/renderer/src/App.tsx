import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { LeftRoute } from '@/renderer/src/components/LeftRoute'
import route from '@/renderer/src/constants/route'
import { TourProvider } from '@reactour/tour'
import clsx from 'clsx'
import { appStore } from '@/renderer/src/store/app.ts'
import { observer } from 'mobx-react-lite'
import SubRoute from '@/renderer/src/components/SubRoute.tsx'
import { PerformanceInfo } from './components/PerformanceInfo'

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

const App = observer(() => {
  // const [selected, setSelected] = useState('/')
  {
    return (
      <TourProvider steps={steps}>
        <Router>
          <div className="flex h-full">
            <LeftRoute />
            <SubRoute />
            <div
              className={clsx([
                'w-full overflow-auto relative',
                appStore.themeMode === 'dark' && 'bg-gray-500'
              ])}
            >
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
            <PerformanceInfo />
          </div>
        </Router>
      </TourProvider>
    )
  }
})
export default App
