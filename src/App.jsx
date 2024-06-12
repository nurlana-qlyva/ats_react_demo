import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getItemWithExpiration } from './utils/expireToken'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import Dashboard from './_root/pages/dashboard/Dashboard'
import Vehicles from './_root/pages/vehicles/Vehicles'
import DetailUpdate from './_root/pages/vehicles-detail/DetailUpdate'
import KmUpdate from './_root/pages/km-update/KmUpdate'
import Settings from './_root/pages/settings/Settings'
import Yakit from './_root/pages/yakit/Yakit'
import MalzemeTanimlari from './_root/pages/malzeme/MalzemeTanimlari'

const App = () => {
  const [hasToken, setHasToken] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getItemWithExpiration('token')

    if (token) {
      setHasToken(false)
    } else {
      setHasToken(true)
      navigate('/login')
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/araclar" element={<Vehicles />} />
        <Route path="/detay/:id" element={<DetailUpdate />} />
        <Route path="/hizli-km-guncelleme" element={<KmUpdate />} />
        <Route path="/ayarlar" element={<Settings />} />
        <Route path="/yakit-islemleri" element={<Yakit />} />
        <Route path="/malzeme-tanimlari" element={<MalzemeTanimlari />} />
      </Route>
      {hasToken && (
        <Route path="/login" element={<AuthLayout />} />
      )}
    </Routes>
  );
};

export default App
