import { observer } from 'mobx-react-lite'
import { faker } from '@faker-js/faker'
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { Virtuoso } from 'react-virtuoso'

enum ListType {
  NORMAL,
  VIRTUAL
}

const LongList = observer(() => {
  const [listType, setListType] = useState<ListType>(ListType.NORMAL)

  const usernamesArray = useMemo(() => {
    return Array(50000)
      .fill(null)
      .map(() => faker.internet.userName())
  }, [])

  return (
    <div className="w-3/5 mx-auto">
      <div className=" w-2/5 bg-white  py-4 flex flex-col items-center fixed mx-auto inset-x-0 z-[2]">
        <h1 className="text-2xl font-bold">Long List</h1>
        <div className="my-4">list length : {usernamesArray.length}</div>
        <div className="flex justify-center my-2">
          <div
            className={clsx([
              'cursor-pointer mr-4',
              listType === ListType.NORMAL && 'text-blue-500'
            ])}
            onClick={() => setListType(ListType.NORMAL)}
          >
            Normal
          </div>
          <div
            className={clsx(['cursor-pointer', listType === ListType.VIRTUAL && 'text-blue-500'])}
            onClick={() => setListType(ListType.VIRTUAL)}
          >
            Virtual list (Virtuoso)
          </div>
        </div>
      </div>
      <div className="w-full text-center flex flex-col items-center justify-around pt-36">
        {listType === ListType.NORMAL &&
          usernamesArray.map((username, index) => {
            return (
              <div className="w-60 shadow rounded h-10 leading-10 mb-6" key={index}>
                {username}
              </div>
            )
          })}
        {listType === ListType.VIRTUAL && (
          <Virtuoso
            useWindowScroll
            className="w-4/5 justify-center items-center"
            data={usernamesArray}
            itemContent={(_, user) => (
              <div className="w-60 shadow rounded h-10 leading-10 mb-6 mx-auto">{user}</div>
            )}
          />
        )}
      </div>
    </div>
  )
})

export default LongList
