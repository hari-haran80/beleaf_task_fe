import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/Home Page/HomePage';
import HomeLayout from '../../layout/HomeLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;