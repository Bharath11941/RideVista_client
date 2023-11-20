import AdminNavbar from '../../components/adminComponents/AdminNavbar'
import AdminSidebar from '../../components/adminComponents/AdminSidebar'
import React from 'react'
import UserList from '../../components/adminComponents/UserList'

const UserListPage = () => {
  return (
    <>
    <AdminNavbar/>
    <div className="mx-auto flex mt-5">
    <AdminSidebar/>
    <UserList/>
    </div>
    </>
  )
}

export default UserListPage