import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next'
import i18n from './utils/i18n.js'
import { FuelTankProvider } from './context/fuelTankSlice.jsx'
import { PlakaProvider } from './context/plakaSlice.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
        <FuelTankProvider>
          <PlakaProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PlakaProvider>
        </FuelTankProvider>
    </I18nextProvider>
  </React.StrictMode>,
)
