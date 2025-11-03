import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ProjectsPage from '../pages/ProjectsPage'
import ContactPage from '../pages/ContactPage'
import LoginPage from '../pages/auth/LoginPage'
import Dashboard from '../pages/admin/Dashboard'

const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  return Boolean(window.localStorage.getItem('token'))
}

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'my-panel',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
