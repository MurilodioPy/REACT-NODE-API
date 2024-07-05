import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListEventos from './pages/atividades/lisitevento/listaEventos.jsx'
import EditEventos from './pages/atividades/editevento/editEvento.jsx'
import AddEventos from './pages/atividades/addevento/AddEvento.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/newUser', element: <ProtectedRoute><AddUser /></ProtectedRoute> },
      { path: '/', element: <ProtectedRoute><ListAtividades /></ProtectedRoute> },
      { path: '/edit', element: <ProtectedRoute><EditAtividade /></ProtectedRoute> },
      { path: '/add', element: <ProtectedRoute><AddAtividades /></ProtectedRoute> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={pages}>
      
    </RouterProvider>
  </React.StrictMode>,
)
