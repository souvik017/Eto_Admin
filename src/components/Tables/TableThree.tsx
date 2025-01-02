import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import axios from 'axios';
import MapComponent from '../Modals/Map';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const TableThree = () => {
  const [drivers, setDrivers] = useState<User[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const apiUrl = `${BACKEND_URI}/eto/api/v1/driver`;

    axios
      .get(apiUrl)
      .then((response) => {
        setDrivers(response.data.data.drivers);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  const booleanToString = (condition: boolean): string => {
    return condition ? "Online" : "Offline";
  };

  const getStatusMessage = (status: boolean) => {
    return status ? (
      <p className="text-success">See Details</p>
    ) : (
      <p className="text-danger">Not Available</p>
    );
  };

  const handleViewLocation = (coordinates: [number, number]) => {
    setCurrentPosition(coordinates);
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
    setCurrentPosition(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Location
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Current Ride
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers?.map((driver, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {driver.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button
                    className="text-black dark:text-meta-5 px-4 py-2"
                    onClick={() =>
                      handleViewLocation(driver.current_location.coordinates)
                    }
                  >
                    View
                  </button>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      driver.isActive
                        ? "bg-success text-success"
                        : "bg-warning text-danger"
                    }`}
                  >
                    {booleanToString(driver.isActive)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 text-center pl-2">
                    <p className="cursor-pointer">{getStatusMessage(driver.isActive)}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Map Modal */}
      {showMap && currentPosition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded shadow-md w-[90%] h-[70vh]">
            <MapComponent position={currentPosition} />
            <button
              onClick={closeMap}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableThree;