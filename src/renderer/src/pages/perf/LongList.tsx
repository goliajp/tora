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
    return Array(10000)
      .fill(null)
      .map(() => faker.internet.userName())
  }, [])

  return (
    <div className="mx-auto overflow-hidden h-full">
      <div className="py-4 flex flex-col items-center mx-auto inset-x-0 z-[2]">
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

      {/* list start */}
      <div className="w-full text-center flex flex-col items-center justify-around pt-10 overflow-y-auto h-[76%]">
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
            className="w-4/5 justify-center items-center mb-20"
            data={usernamesArray}
            itemContent={(index, user) => (
              <div className="w-60 shadow rounded h-10 leading-10 mb-6 mx-auto" key={index}>
                {user}
              </div>
            )}
          />
        )}
      </div>
    </div>
  )
})

export default LongList
