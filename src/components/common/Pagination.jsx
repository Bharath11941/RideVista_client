import React from 'react'

const Pagination = ({currentPage,setCurrentPage,totalPages,numbers}) => {
  

  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changePage(num) {
    setCurrentPage(num);
  }
  return (
    <div>
      <nav aria-label="Page navigation example" className="mt-4 ml-24 xl:ml-96">
            <ul className="inline-flex -space-x-px">
              <li>
                <a
                  className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={prevPage}
                >
                  Prev
                </a>
              </li>
              {numbers.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      onClick={() => changePage(item)}
                      className={
                        currentPage == item
                          ? "px-3 py-2 leading-tight text-gray-500 bg-blue-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={nextPage}
                >
                  next
                </a>
              </li>
            </ul>
          </nav>
    </div>
  )
}

export default Pagination