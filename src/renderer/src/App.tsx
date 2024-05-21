import { HashRouter as Router } from 'react-router-dom'
import { TourProvider } from '@reactour/tour'
import { observer } from 'mobx-react-lite'
import Layout from '@/renderer/src/components/layout/Layout.tsx'

// tour steps
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
  return (
    <TourProvider steps={steps}>
      <Router>
        <Layout />
      </Router>
    </TourProvider>
  )
})
export default App
