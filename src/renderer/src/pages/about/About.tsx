import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const About = observer(() => {
  return (
    <div>
      about
      <Link to="/">Home</Link>
    </div>
  )
})

export default About
