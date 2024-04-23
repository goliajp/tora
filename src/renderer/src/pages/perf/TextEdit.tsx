import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

// eslint-disable-next-line @typescript-eslint/ban-types

const TextEdit = observer(() => {
  return (
    <div>
      LongList
      <Link to="/about">LongList</Link>
    </div>
  )
})

export default TextEdit
