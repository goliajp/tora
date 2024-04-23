import { observer } from 'mobx-react-lite'
import { faker } from '@faker-js/faker'

const usernamesArray = Array(100000)
  .fill(null)
  .map(() => faker.internet.userName())

const LongList = observer(() => {
  return (
    <div className={'w-80% mx-auto text-center flex flex-wrap justify-around'}>
      <h1 className={'w-full text-2xl font-bold my-4'}>Long List</h1>
      {usernamesArray.map((username, index) => {
        return (
          <div className={'w-15rem shadow rounded h-10 leading-10 mb-6'} key={index}>
            {username}
          </div>
        )
      })}
    </div>
  )
})

export default LongList
