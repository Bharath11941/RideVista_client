import UserNavbar from "../../components/userComponents/UserNavbar";
import UserFooter from "../../components/userComponents/UserFooter";
import SelectedDateLocation from "../../components/userComponents/SelectedDateLocation";
import CarCardList from "../../components/userComponents/CarCardList";

const AllCars = () => {
  return (
    <>
      <UserNavbar />
      <div className=" mx-auto flex mt-5">
        <div className="h-screen w-1/4 hidden shadow-lg md:flex rounded-md mt-5">
          <div className="p-4 w-full">
            <div className="grid gap-2">
              {/* Category Tabs */}
              <h1 className="px-4 py-2  bg-blue-500 font-bold text-white rounded-md">
                Model Type
              </h1>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Premium
              </h5>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Medium
              </h5>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Normal
              </h5>
              {/* Add more category tabs as needed */}
            </div>
            <div className="grid gap-2">
              {/* Category Tabs */}
              <h5
                href="#"
                className="px-4 py-2  bg-blue-500 font-bold text-white rounded-md"
              >
                Fuel Type
              </h5>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Petrol
              </h5>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Diesel
              </h5>
            </div>
            <div className="grid gap-2">
              {/* Category Tabs */}
              <h5
                href="#"
                className="px-4 py-2  bg-blue-500 font-bold text-white rounded-md"
              >
                Transition Type
              </h5>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Automatic
              </h5>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Manual
              </h5>
              <h5
                href="#"
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-300"
              >
                Electric
              </h5>
              {/* Add more category tabs as needed */}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <SelectedDateLocation />
          <div className="container flex items-baseline justify-between pl-4 mb-4">
            <h4 className="text-3xl mt-5 font-bold text-gray-900">
              Available cars
            </h4>

            <select className="select select-bordered w-[100px]">
              <option disabled selected>
                Price
              </option>
              <option>Low - High</option>
              <option>High - low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CarCardList />
          </div>
        </div>
      </div>

      <UserFooter />
    </>
  );
};

export default AllCars;
