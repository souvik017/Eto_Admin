import { User } from '../../types/user';
import user from "../../images/user/user-01.png"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from '../Modals/Profile';

const TableOne = ({ name, drivers }) => {
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);


  console.log(drivers);

  interface Driver {
    name: string;
    total_complete_rides: number;
    createdAt: string;
    total_earning: number;
    driver_photo: string;
  }
  
  function registerdAt(dateString) {

    let date = new Date(dateString);

    let day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    let year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day} / ${month} / ${year}`;
}

function handleViewProfile(user) {
  setSelectedUserData(user);
  setToggleModal(true);
}
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 border-blue-500 border-2">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
       {name}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Rides
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Registered At
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Earnings
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             See Profile
            </h5>
          </div>
        </div>

        {drivers?.map((user: Driver, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === drivers.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0 w-12 h-12">
                <img src={user.driver_photo} alt="user" className='w-full h-full rounded-3xl' />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {user.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.total_complete_rides}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{registerdAt(user.createdAt)}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.total_earning}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button onClick={() => handleViewProfile(user)} className="text-meta-5">Veiw</button>
            </div>
          </div>
        ))}
      </div>

      {toggleModal && (
          <Profile userData={selectedUserData} closeModal={() => setToggleModal(false)} />
        )}

    </div>
  );
};

export default TableOne;
