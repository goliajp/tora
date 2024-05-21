import './assets/eric-meyer.css'
import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './locales/i18n'
import './plugins/firebase'
import './assets/markdown-body.css'
import { entry } from '@/renderer/src/entry.ts'
import Convert from '@/renderer/src/components/Convert.tsx'

entry()

if (document.getElementById('root')) {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

if (document.getElementById('convert')) {
  ReactDOM.createRoot(document.getElementById('convert') as HTMLElement).render(<Convert />)
}
