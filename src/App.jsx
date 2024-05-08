import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import Dashboard from './_root/pages/dashboard/Dashboard';
import Vehicles from './_root/pages/vehicles/Vehicles';
import VehiclesUpdate from './_root/pages/vehicles-detail/VehiclesUpdate';
import { getItemWithExpiration } from './utils/expireToken';

const AppRouter = () => {
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItemWithExpiration("token");

    if (token) {
      setHasToken(false);
    } else {
      setHasToken(true);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/araclar" element={<Vehicles />} />
        <Route path="/detay/:id" element={<VehiclesUpdate />} />
      
      </Route>
       {hasToken && (
          <Route path="/login" element={<AuthLayout />} />
        )}
    </Routes>
  );
};

export default AppRouter;
