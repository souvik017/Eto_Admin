
import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import axios from 'axios';

const 
TableTwo = () => {
 
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
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Search Driver
          </h4>
  
          {/* <select
            className=" px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-2 focus:border-transparent dark:bg-gray-800 dark:text-black"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          >
          
            <option value="">All Drivers</option>
            {productData.map((product, key) => (
              <option key={key} value={product.name}>
                {product.name}
              </option>
            ))}
          </select> */}
        </div>
{/*   
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 border-red-500 border-2">
          <div className="col-span-2 flex items-center border-red-500 border-2">
            <p className="font-medium">Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">ID Card</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Total Km</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Total Earning</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Total Ride</p>
          </div>
        </div> */}

<div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 items-center justify-between">
  <div className="col-span-2 flex items-center ">
    <p className="font-medium">Name</p>
  </div>
  <div className="col-span-3 hidden sm:flex justify-center items-center ">
    <p className="font-medium">ID Card</p>
  </div>
  <div className="col-span-1 flex justify-center items-center">
    <p className="font-medium">Total Km</p>
  </div>
  <div className="col-span-1 flex justify-center items-center">
    <p className="font-medium">Total Earning</p>
  </div>
  <div className="col-span-1 flex justify-center items-center">
    <p className="font-medium">Total Ride</p>
  </div>
</div>

  
        {drivers.map((user, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 items-center justify-between"
            key={key}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className=" w-12 h-12 rounded-md">
                  <img src={user.driver_photo}  alt="user" className='w-full h-full rounded-3xl' />
                </div>
                <p className="text-sm text-black dark:text-white text-center">
                  {user.name}
                </p>
              </div>
            </div>
            <div className="col-span-3 hidden items-center sm:flex justify-center ">
              <button className="text-meta-5">View</button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-sm text-black dark:text-white">
                {user.TotalKm}
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-sm text-black dark:text-white">{user.total_earning}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-sm text-meta-3">{user.total_complete_rides}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default TableTwo;
