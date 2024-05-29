import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { FuelTankProvider } from './context/fuelTankSlice.jsx'
import { PlakaProvider } from './context/plakaSlice.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FuelTankProvider>
      <PlakaProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlakaProvider>
    </FuelTankProvider>
  </React.StrictMode>,
)
