import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getItemWithExpiration } from './utils/expireToken'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import Dashboard from './_root/pages/dashboard/Dashboard'
import Vehicles from './_root/pages/vehicles-control/vehicles/Vehicles'
import DetailUpdate from './_root/pages/vehicles-control/vehicle-detail/DetailUpdate'
import Yakit from './_root/pages/vehicles-control/yakit/Yakit'
import Suruculer from './_root/pages/sistem-tanimlari/surucu/SurucuTanim'
import YakitGirisFisleri from './_root/pages/yakit-yonetim/giris-fis/YakitGirisFisleri'




import KmUpdate from './_root/pages/km-update/KmUpdate'
import Settings from './_root/pages/settings/Settings'
import MalzemeTanimlari from './_root/pages/malzeme/MalzemeTanimlari'
import GirisFisleri from './_root/pages/giris-fisleri/GirisFisleri'
import CikisFisleri from './_root/pages/cikis-fisleri/CikisFisleri'
import Hareketler from './_root/pages/hareketler/Hareketler'
import MarkaList from './_root/pages/sistem-tanimlari/marka-model/MarkaList'
import Sehirler from './_root/pages/sistem-tanimlari/sehirler/Sehirler'
import Guzergah from './_root/pages/sistem-tanimlari/guzergah/Guzergah'
import IsKartlari from './_root/pages/sistem-tanimlari/is-kartlari/IsKartlari'
import LastikTanim from './_root/pages/sistem-tanimlari/lastik-tanim/LastikTanim'
import CezaTanim from './_root/pages/sistem-tanimlari/ceza-tanim/CezaTanim'
import ServisTanim from './_root/pages/sistem-tanimlari/servis-tanim/ServisTanim'
import FirmaTanim from './_root/pages/sistem-tanimlari/firma-tanim/FirmaTanim'
import PersonelTanim from './_root/pages/sistem-tanimlari/personel-tanim/PersonelTanim'
import Transferler from './_root/pages/transferler/Transferler'
import YakitTanimlar from './_root/pages/yakit-yonetim/yakit-tanim/YakitTanimlar'
import YakitCikisFisleri from './_root/pages/yakit-yonetim/cikis-fis/YakitCikisFisleri'



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
        <Route path="/giris-fisleri" element={<GirisFisleri />} />
        <Route path="/cikis-fisleri" element={<CikisFisleri />} />
        <Route path="/hareketler" element={<Hareketler />} />
        <Route path="/arac-marka-ve-model" element={<MarkaList />} />
        <Route path="/sehir-tanimlari" element={<Sehirler />} />
        <Route path="/guzergah-tanimlari" element={<Guzergah />} />
        <Route path="/is-kartlari" element={<IsKartlari />} />
        <Route path="/lastik-tanimlari" element={<LastikTanim />} />
        <Route path="/ceza-tanimlari" element={<CezaTanim />} />
        <Route path="/servis-tanimlari" element={<ServisTanim />} />
        <Route path="/firma-tanimlari" element={<FirmaTanim />} />
        <Route path="/personel-tanimlari" element={<PersonelTanim />} />
        <Route path="/transferler" element={<Transferler />} />
        <Route path="/surucu-tanimlari" element={<Suruculer />} />
        <Route path="/yakit-tanimlari" element={<YakitTanimlar />} />
        <Route path="/yakit-giris-fisleri" element={<YakitGirisFisleri />} />
        <Route path="/yakit-cikis-fisleri" element={<YakitCikisFisleri />} />

      </Route>
      {hasToken && (
        <Route path="/login" element={<AuthLayout />} />
      )}
    </Routes>
  );
};

export default App
