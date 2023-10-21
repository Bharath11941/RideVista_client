import React from 'react'
import AdminNavbar from '../../components/adminComponents/AdminNavbar'
import AdminSidebar from '../../components/adminComponents/AdminSidebar'
import DashBoardBody from '../../components/adminComponents/DashBoardBody'

const AdminDashboard = () => {
  return (
    <>
    <AdminNavbar/>
    <AdminSidebar/>
    <DashBoardBody/>
    </>
  )
}

export default AdminDashboard