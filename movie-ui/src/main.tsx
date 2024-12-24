import { createRoot } from 'react-dom/client'
import "@radix-ui/themes/styles.css"
import { Theme } from '@radix-ui/themes'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Theme>
    <App />
  </Theme>
)
