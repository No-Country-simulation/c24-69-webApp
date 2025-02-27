import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/themeContext.tsx'
import App from './App.tsx'
import Footer from './layouts/Footer/index.tsx'
import NavBar from './layouts/NavBar/index.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <area className='body-background' />
        <NavBar />
    <main className="flex-grow min-h-screen mt-24">
      <App />
    </main>
    <Footer/>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
