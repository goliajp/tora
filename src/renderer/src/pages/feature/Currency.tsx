import currency from 'currency.js'
import { observer } from 'mobx-react-lite'

const Currency = observer(() => {
  return (
    <>
      <div>{currency('22.32').add('1').format()}</div>
      <div>{currency('123').format({ symbol: '¥' })}</div>
      <div>{currency('123').format({ symbol: '€' })}</div>
    </>
  )
})
export default Currency
