import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { pathname } = useLocation();

// console.log(App)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);



  useEffect(() => {
    // Check if a user is stored in localStorage
    const user = localStorage.getItem('user');
    if (!user) {
      // If no user is found, navigate to the sign-in page
      navigate('/signin');
    } else {
      // If a user exists, set isAuthenticated to true
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <DefaultLayout>
      <Routes>
        <Route
          path="/"
          index
          element={
            <>
              <PageTitle title="Dashboard | ETO Admin Panel" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/admin/test"
          element={
            <>
              <PageTitle title="Collage Management Dashboard | LionelAgency - Tailwind CSS Admin Dashboard Template" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | ETO Admin Panel" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | ETO Admin Panel" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | LionelAgency - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | LionelAgency - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | ETO Admin Panel" />
              <Tables />
            </>
          }
        />
        <Route
          path="/duerequest"
          element={
            <>
              <PageTitle title="Due Request | ETO Admin Panel " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | LionelAgency - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | LionelAgency - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | LionelAgency - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
    path="*"
    element={<Navigate to="/" replace />}
  />
        {/* <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | ETO Admin Panel" />
              <SignIn />
            </>
          }
        /> */}
        {/* <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | ETO Admin Panel" />
              <SignUp />
            </>
          }
        /> */}
      </Routes>
    </DefaultLayout>
  ) : (
    <Routes>
      <Route
        path="/signin"
        element={
          <>
            <PageTitle title="Signin | ETO Admin Panel" />
            <SignIn />
          </>
        }
      />
     
    </Routes>
  );
}

export default App;