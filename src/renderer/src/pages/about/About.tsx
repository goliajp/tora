import { Link } from 'react-router-dom'
import { counterStore } from '@/renderer/src/store/counter'
import { observer } from 'mobx-react-lite'

const About = observer(() => {
  return (
    <div>
      about
      <Link to={'/'}>Home</Link>
      <div>{counterStore.count}</div>
      <button onClick={() => counterStore.decrement()}>-</button>
      <button onClick={() => counterStore.increment()}>+</button>
    </div>
  )
})

export default About
