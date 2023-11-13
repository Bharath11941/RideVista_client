
const ReportedList = ({data}) => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-3xl pt-2 mb-5">Reported list</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Reported by
              </th>
              <th scope="col" className="px-6 py-3">
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {data.report && data.report.length > 0 ? (
              data.report.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-xl font-bold text-black ">{item.reportedBy.name}</td>
                  <td className="px-6 py-4 text-sm text-red-800 ">{item.reason}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-900 dark:text-white"
                >
                  No Reports
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportedList;
