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
      <area className='body-background' />
    <nav className='nav-section'>
        <NavBar />
    </nav>
    <main className="mt-24">
      <App />
    </main>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
