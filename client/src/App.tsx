import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useAppSelector } from './store/TypedHooks';
import {
  Route,
  Routes,
  // Navigate,
} from "react-router-dom"
import Login from './pages/user/Login';

function App() {

  const user = useAppSelector(state => state.userState)
  console.log("UESE :", user);


  return (
    <>
      <Routes>
        <Route path="/" element={user.email ? <></> : <Login />} />
      </Routes>
      {/* <Login></Login> */}
    </>
  )
}

export default App
