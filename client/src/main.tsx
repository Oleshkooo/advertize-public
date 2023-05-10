import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from '@/App'

// ? global styles
import '@/styles/globals.scss'
import { disableConsole } from '@/utils'

// ? font awesome
import('@/assets/icons/fontAwesome/all.min.css')
import('@/assets/icons/fontAwesome/svg-with-js.min.css')

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools()
    disableConsole()
}
