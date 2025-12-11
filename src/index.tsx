import { createRoot } from 'react-dom/client'
import './index.css'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/styles'
import theme from './theme'
import { history } from './redux/store'
import App from './layouts/App'
import AppContextProvider from './context/AppContextProvider'


const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <CssBaseline />
        <App history={history} />
      </AppContextProvider>
    </ThemeProvider>,
  )
}
