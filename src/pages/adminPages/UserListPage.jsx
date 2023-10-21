import AdminNavbar from '../../components/adminComponents/AdminNavbar'
import AdminSidebar from '../../components/adminComponents/AdminSidebar'
import React from 'react'
import UserList from '../../components/adminComponents/UserList'

const UserListPage = () => {
  return (
    <>
    <AdminNavbar/>
    <AdminSidebar/>
    <UserList/>
    </>
  )
}

export default UserListPage