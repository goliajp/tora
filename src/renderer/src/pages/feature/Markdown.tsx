import { observer } from 'mobx-react-lite'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import '../../assets/markdown-body.css'

const Markdown = observer(() => {
  const [content, setContent] = useState(`Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`)

  return (
    <div className="mx-auto flex">
      <textarea
        className="w-1/2 h-screen p-5 text-sm border border-t-0 dark:bg-gray-800 dark:text-white"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <ReactMarkdown
        className="w-1/2 p-4 markdown-body"
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className } = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter PreTag="div" language={match[1]} style={dark}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>{children}</code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
})
export default Markdown
