import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminLogout } from "../../reduxStore/slices/adminSlice";


const AdminNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const  {admin}  = useSelector((state) => state.adminReducer);
  const handleLogout = async () => {
    localStorage.removeItem('adminToken')
    dispatch(adminLogout())
    toast.success("Logout successfully")
    navigate('/admin')
  }
 
  return (
    <nav className="bg-white border-b-2 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

      <Link className="flex items-center">
          <img
            src="/images/depositphotos_268023142-stock-illustration-vector-logo-for-car-rental.jpg" 
            alt="Logo"
            className="w-50 h-10 mr-2 object-cover"
          />
          
        </Link>

        <div className="flex items-center md:order-2">
          <div className="relative" onClick={toggleDropdown}>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen &&
              (
                <div
                  className="absolute z-50 right-0 mt-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {admin}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
          </div>   
        </div>
      </div>
  
    </nav>
    )
}

export default AdminNavbar