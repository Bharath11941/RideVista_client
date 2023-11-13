import { useEffect, useState } from "react";
import { partnerBlock, partnerList } from "../../api/adminApi";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 3;
  useEffect(() => {
    setLoading(true);
    partnerList()
      .then((res) => {
        setLoading(false);
        setPartners(res?.data?.partners);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);
  const blockUnblockPartner = async (partnerId, status) => {
    try {
      const res = await partnerBlock(partnerId, status);
      if (res.status === 200) {
        let updatedData = partners.map((partner) => {
          let partnerData = { ...partner };
          if (partnerData._id === partnerId) {
            partnerData.isBlocked = !status;
          }
          return partnerData;
        });
        setPartners(updatedData);
        setActiveModal(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };
  const openModal = (userId) => {
    setActiveModal(userId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  const filteredData = searchInput
    ? partners.filter((partner) =>
        partner.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : partners;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const carsInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-3xl pt-2">Partners List</h1>
              <div className="flex items-center justify-end py-4 bg-white dark:bg-gray-800">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    id="table-search-users"
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for partners"
                  />
                </div>
              </div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Mobile
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reported list
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carsInSinglePage.map((data) => (
                    <tr
                      key={data._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {/* <img
                      className="w-10 h-10 rounded-full"
                      src="/docs/images/people/profile-picture-1.jpg"
                      alt="Jese image"
                    /> */}
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {data.name}
                          </div>
                          <div className="font-normal text-gray-500">
                            {data.email}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{data.mobile}</td>
                      <td className="px-6 py-4">
                        {data.isEmailVerified ? (
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                            Verified
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-700 mr-2" />{" "}
                            Not Verified
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate("/admin/reportedList", { state: data })
                          }
                          className="focus:outline-none w-24 text-white bg-red-700 hover-bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Reported
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {data.isBlocked ? (
                          <button
                            type="button"
                            onClick={() => openModal(data._id)}
                            className="focus:outline-none w-24 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openModal(data._id)}
                            className="focus:outline-none w-24 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Block
                          </button>
                        )}
                        <div
                          id={`popup-modal-${data._id}`}
                          tabIndex={-1}
                          className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${
                            activeModal === data._id ? "" : "hidden"
                          }`}
                        >
                          <div className="relative w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                                data-modal-hide={`popup-modal-${data._id}`}
                                onClick={() => closeModal()}
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                              <div className="p-6 text-center">
                                <svg
                                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                                {data.isBlocked ? (
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to Unblock this{" "}
                                    {data.name}?
                                  </h3>
                                ) : (
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to Block this{" "}
                                    {data.name}?
                                  </h3>
                                )}
                                <button
                                  data-modal-hide={`popup-modal-${data._id}`}
                                  type="button"
                                  onClick={() =>
                                    blockUnblockPartner(
                                      data._id,
                                      data.isBlocked
                                    )
                                  }
                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                >
                                  Yes, I'm sure
                                </button>
                                <button
                                  data-modal-hide={`popup-modal-${data._id}`}
                                  type="button"
                                  onClick={() => closeModal()}
                                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover-text-white dark:hover-bg-gray-600 dark:focus:ring-gray-600"
                                >
                                  No, cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              setCurrentPage={setCurrentPage}
              numbers={numbers}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PartnerList;
