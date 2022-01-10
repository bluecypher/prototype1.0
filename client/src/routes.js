import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import WorkDashboard from './pages/WorkDashboard';
import Products from './pages/Products';
// import Landing from './Landing';
import Blog from './pages/Blog';
import User from './pages/User';
import Customers from './pages/Customers';
import NotFound from './pages/Page404';
import SessionExpired from './pages/SessionExpired';
import AddCalls from './pages/AddCalls';
import WorkUpdate from './pages/WorkUpdate';
import Profile from './pages/Profile';

// ----------------------------------------------------------------------

export default function Router() {
  
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp/> },
        { path: 'work', element: <WorkDashboard />},
        { path: 'user', element: <User /> },
        { path: 'customers', element: <Customers /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'newCalls', element: <AddCalls /> },
        { path: 'profile', element: <Profile /> },
        { path: 'work/:workId', element: <WorkUpdate/>}
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: 'sessionExpired', element: <SessionExpired /> },
        { path: '/', element: <Login /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
