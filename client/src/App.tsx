import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useAppSelector } from './store/TypedHooks';
import {
  Route,
  Routes,
  // Navigate,
} from "react-router-dom"
import Login from './pages/user/Login';
import Home from './pages/Home';
import ViewInventory from './pages/inventory/ViewInventory';

function App() {

  const user = useAppSelector(state => state.userState)
  console.log("UESE :", user);


  return (
    <>
      <Routes>
        <Route path="/" element={user.email ? <Home /> : <Login />} />
        <Route path="/inventory/view" element={user.email ? <ViewInventory /> : <Login />} />
      </Routes>
      {/* <Login></Login> */}
    </>
  )
}

export default App
