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
import ViewCustomers from './pages/customer/ViewCustomers';
import ViewSalesRecord from './pages/sales/ViewSalesRecord';
import SalesReport from './pages/sales/SalesReport';
import ItemsReport from './pages/inventory/ItemsReport';

function App() {

  const user = useAppSelector(state => state.userState)
  console.log("UESE :", user);


  return (
    <>
      <Routes>
        <Route path="/" element={user.email ? <Home /> : <Login />} />
        <Route path="/inventory/view" element={user.email ? <ViewInventory /> : <Login />} />
        <Route path="/inventory/customers" element={user.email ? <ViewCustomers /> : <Login />} />
        <Route path="/inventory/sales-records" element={user.email ? <ViewSalesRecord /> : <Login />} />
        <Route path="/inventory/sales-reports" element={user.email ? <SalesReport /> : <Login />} />
        <Route path="/inventory/reports" element={user.email ? <ItemsReport /> : <Login />} />
      </Routes>
      {/* <Login></Login> */}
    </>
  )
}

export default App
