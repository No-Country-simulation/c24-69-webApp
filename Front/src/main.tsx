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
    <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className='flex-grow mt-24'>
          <App />
        </main>
        <Footer /> 
      </div>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
