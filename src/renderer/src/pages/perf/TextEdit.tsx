import { observer } from 'mobx-react-lite'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types

const TextEdit = observer(() => {
  const [text, setText] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const importTxt = async () => {
    try {
      const fileList = await window.electron.ipcRenderer.invoke(
        'show-open-dialog',
        false,
        [{ name: 'Text', extensions: ['txt'] }],
        'Select Text File'
      )

      if (fileList) {
        const fileContent = await window.electron.ipcRenderer.invoke(
          'read-entire-file',
          fileList[0],
          'utf-8'
        )
        setText(fileContent.toString())
      }
    } catch (e) {
      console.error(e)
    }
  }

  const save = async () => {
    const filePath = await window.electron.ipcRenderer.invoke(
      'save-file',
      text,
      [{ name: 'text', extensions: ['txt'] }],
      'Save Text File'
    )
    console.log(filePath, 'filePath')
  }

  return (
    <div>
      <div className="w-72 bg-white py-4 flex flex-col items-center mx-auto inset-x-0 z-[2]">
        <button className="my-4" onClick={importTxt}>
          import txt
        </button>
      </div>
      {isEdit && <div className="text-red-500 text-center">isEditing...</div>}
      <div className="w-full text-center flex flex-col items-center justify-around pt-10">
        <textarea
          className="w-full shadow rounded h-96 p-2"
          disabled={!isEdit}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      {(text || isEdit) && (
        <div className="w-full text-center flex justify-end  items-center pt-4">
          <button className="mr-4" onClick={() => setIsEdit(!isEdit)}>
            edit
          </button>
          <button onClick={save}>save</button>
        </div>
      )}
    </div>
  )
})
export default TextEdit
