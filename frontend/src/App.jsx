import { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { restoreUser } from './store/sessionSlice';
import { Modal, ModalProvider } from './context/Modal';
import LandingPage from './components/LandingPage/LandingPage';
import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Homepage/Homepage';
import UserPage from './components/UserPage/UserPage';
import Sidebar from './components/Sidebar/Sidebar';
import ExplorePage from './components/ExplorePage/ExplorePage';
import AppBar from './components/AppBar/AppBar';

export const MobileContext = createContext();

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        <div className="feedContainer">
          <Sidebar />
          <Modal />
          {isLoaded && <Outlet />}
        </div>
        {isMobile && <AppBar />}
      </ModalProvider>
    </MobileContext.Provider>
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
