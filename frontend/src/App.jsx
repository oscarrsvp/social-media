import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { restoreUser } from './store/sessionSlice';
import LandingPage from './components/LandingPage/LandingPage';
import SignupForm from './components/SignupForm/SignupForm';
import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Homepage/Homepage';
import UserPage from './components/UserPage/UserPage';
import Sidebar from './components/Sidebar/Sidebar';
import ExplorePage from './components/ExplorePage/ExplorePage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="feedContainer">
        <Sidebar />
        {isLoaded && <Outlet />}
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/homepage',
        element: <Homepage />,
      },
      {
        path: '/signup',
        element: <SignupForm />,
      },
      {
        path: '/user/:userId',
        element: <UserPage />,
      },
      {
        path: '/explore',
        element: <ExplorePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
