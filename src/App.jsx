import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <nav className='bg-emerald-400 py-4'>
        <h1 className='text-3xl font-semibold text-center'><Link>User Management System</Link></h1>
      </nav>
      <Outlet></Outlet>
    </>
  )
}

export default App
