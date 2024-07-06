import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/protected/ProtectedRoute.jsx'
import Login from './pages/usuarios/login/Login.jsx'
import AddUser from './pages/usuarios/addUser/AddUser.jsx'
import ListAtividades from './pages/atividades/listAtividade/ListAtividades.jsx'
import EditAtividade from './pages/atividades/editatividade/EditAtividade.jsx'
import AddAtividades from './pages/atividades/addatividade/AddAtividade.jsx'
import ListCategoria from './pages/categorias/listcategoria/ListCategoria.jsx'
import AddCategoria from './pages/categorias/addcategoria/AddCategoria.jsx'
import EditCategoria from './pages/categorias/editcategoria/EditCategoria.jsx'

const pages = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/newUser', element: <AddUser /> },
      { path: '/', element: <ProtectedRoute><ListAtividades /></ProtectedRoute> },
      { path: '/editAtividade/:id', element: <ProtectedRoute><EditAtividade /></ProtectedRoute> },
      { path: '/addAtividade', element: <ProtectedRoute><AddAtividades /></ProtectedRoute> },
      { path: '/categorias', element: <ProtectedRoute><ListCategoria /></ProtectedRoute> },
      { path: '/addCategoria', element: <ProtectedRoute><AddCategoria /></ProtectedRoute> },
      { path: '/editCategoria/:id', element: <ProtectedRoute><EditCategoria /></ProtectedRoute> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={pages}>
      
    </RouterProvider>
  </React.StrictMode>,
)
