import { createRoot } from 'react-dom/client'
import './index.css'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/styles'
import theme from './theme'
import { history } from './redux/store'
import App from './layouts/App'


const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <App history={history} />
    </ThemeProvider>,
  )
}
