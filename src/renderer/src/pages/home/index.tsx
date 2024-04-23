import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const Home: React.FC<Props> = () => {
  return (
    <div>
      Home
      <Link to="/about">About</Link>
    </div>
  )
}

export default Home
