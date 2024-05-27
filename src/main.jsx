import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { FuelTankProvider } from './context/fuelTankSlice.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FuelTankProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FuelTankProvider>
  </React.StrictMode>,
)
