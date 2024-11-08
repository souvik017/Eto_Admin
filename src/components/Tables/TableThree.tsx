import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import axios from 'axios';



const TableThree = () => {

  const [drivers, setDrivers] = useState<User[]>([]);


  useEffect(() => {
    const apiUrl = 'http://localhost:8000/eto/api/v1/driver'; 

  
    axios.get(apiUrl)
      .then(response => {
        setDrivers(response.data.data);

      })
      .catch(error => {
        console.error('Error fetching drivers:', error);
      });
  }, []);

  function getStatusMessage(status) {
    if (status === true) {
      return <p className="text-success ">See Details</p>;
    } else {
      return <p className="text-danger">Not Available</p>;
    }
  }

  function booleanToString(condition: boolean): string {
    return condition ? "True" : "False";
}

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
            {drivers.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                  {/* <p className="text-sm">${packageItem.price}</p> */}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button className="text-black dark:text-meta-5 px-4 py-2">
                   View
                  </button>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.isActive === true
                        ? 'bg-success text-success'
                        : 'bg-warning text-danger'
                    }`}
                  >
                    {booleanToString(packageItem.isActive)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 text-center pl-2">
                    <p className='cursor-pointer'>
                    {getStatusMessage(packageItem.isActive)}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
