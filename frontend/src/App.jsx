import React from 'react'
import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'
import EmployeeList from './components/EmployeeList'
import CreateEmployee from "./components/CreateEmployee"
import EditEmployee from "./components/EditEmployee"

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/homepage" element={<Dashboard/>}/>
          <Route path="/employee-list" element={<EmployeeList/>}/>
          <Route path="/create-employee" element={<CreateEmployee/>}/>
          <Route path="/edit-employee/:id" element={<EditEmployee/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
