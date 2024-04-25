import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// css
import 'primeflex/primeflex.scss'
import './styles/index.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import { BrowserRouter } from 'react-router-dom'
import { TokenProvider } from './context/TokenContext.tsx'
import DataContextProvider from './_root/pages/araclar/components/add-modal/DataContext.tsx'
import VehicleContextProvider from './_root/pages/araclar/VehicleContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenProvider>
        <DataContextProvider>
          <VehicleContextProvider>
            <App />
          </VehicleContextProvider>
        </DataContextProvider>
      </TokenProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
