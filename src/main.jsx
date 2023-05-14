import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddUser from './components/AddUser.jsx';
import AllUsers from './components/AllUsers.jsx';
import EditUser from './components/EditUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <AllUsers></AllUsers>,
        loader: () => fetch('http://localhost:5000/users')
      },
      {
        path: 'add-user',
        element: <AddUser></AddUser>
      },
      {
        path: 'edit-user/:id',
        element: <EditUser></EditUser>,
        loader: ({params}) => fetch(`http://localhost:5000/user/${params.id}`)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
