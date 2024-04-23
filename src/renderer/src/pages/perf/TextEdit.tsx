import { observer } from 'mobx-react-lite'

// eslint-disable-next-line @typescript-eslint/ban-types

const TextEdit = observer(() => {
  const importTxt = async () => {
    try {
      const fileList = await window.api.showOpenDialog(
        false,
        [{ name: 'Text', extensions: ['txt'] }],
        'Select Text File'
      )

      if (fileList) {
        const fileContent = await window.api.readEntireFile(fileList[0])
        console.log(fileContent)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={'mx-auto'}>
      <div
        className={
          'w-18rem bg-white  py-4 flex flex-col items-center fixed mx-auto left-0 right-0 z-2'
        }
      >
        <h1 className={'text-2xl font-bold'}>Text Edit</h1>
        <button className={'my-4'} onClick={importTxt}>
          import txt
        </button>
      </div>
      <div className={'w-full text-center flex flex-col items-center justify-around pt-36'}>
        <textarea className={'w-15rem shadow rounded h-10 leading-10 mb-6'}></textarea>
      </div>
    </div>
  )
})
export default TextEdit
