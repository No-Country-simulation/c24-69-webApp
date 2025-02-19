import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/themeContext.tsx'
import NavBar from './layouts/NavBar/index.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
    <nav className='bg-blue-400/70 fixed top-0 left-0 w-full z-30'>
        <NavBar />
    </nav>
    <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
