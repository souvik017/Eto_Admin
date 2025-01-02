import { useEffect, useState } from "react";
import Profile from "../Modals/Profile";
import { User } from "../../types/user";
import axios from "axios";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const ChatCard = () => {
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [drivers, setDrivers] = useState<User[]>([]);
  const [fetchToggle, setFetchToggle] = useState(false);
  const [loading, setLoading] = useState<string | null>(null); // Track loading state by driver ID

  useEffect(() => {
    const apiUrl = `${BACKEND_URI}/eto/api/v1/driver/newRegistered`;

    axios
      .get(apiUrl)
      .then((response) => {
        setDrivers(response.data.data.drivers);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  }, [fetchToggle]);

  const handleApprove = async (selectedUser: User) => {
    const adminId = "673f5bf5b7f063c029efa349";
    const driverId = selectedUser._id;

    setLoading(driverId); // Set loading for the current driver
    try {
      const response = await new Promise((resolve) => {
        setTimeout(async () => {
          const res = await axios.patch(`${BACKEND_URI}/eto/api/v1/driver/approve`, {
            adminId,
            driverId,
          });
          resolve(res);
        }, 2000); // Simulate 2-second delay
      });

      console.log(`Driver ${selectedUser.name} approved successfully!`, response.data);

      // Remove the approved driver from the state without re-fetching
      setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver._id !== driverId));
    } catch (error) {
      console.error(`Error approving driver ${selectedUser.name}:`, error);
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  const handleReject = (user: User) => {
    console.log(`User ${user.name} rejected`);
    // Add logic for rejection (e.g., API call)
  };

  function handleViewProfile(user: User) {
    setSelectedUserData(user);
    setToggleModal(true);
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Driver Verification
      </h4>

      <div className="space-y-4 px-6">
        {drivers.length > 0 ? (
          drivers.map((user, key) => (
            <div
              className="flex items-center justify-between gap-4 py-2 border-gray-200 dark:border-gray-700"
              key={key}
            >
              {/* User Avatar */}
              <div className="flex items-center gap-4 w-[25%]">
                <img
                  src={user.driver_photo}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h5 className="font-medium text-black dark:text-white">{user.name}</h5>
                </div>
              </div>

              {/* Address and Aadhar Details */}
              <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300 gap-5 items-center text-center w-[50%]">
                <p>{user.phone}</p>
                <p>Aadhar No: {user.aadhar_number}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-[25%] items-end justify-end text-end">
                <button
                  onClick={() => handleViewProfile(user)}
                  className="text-meta-5 px-3"
                >
                  View
                </button>
                <button
                  onClick={() => handleApprove(user)}
                  className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600 flex items-center justify-center"
                  disabled={loading === user._id}
                >
                  {loading === user._id ? (
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-white"></div>
                  ) : (
                    "Approve"
                  )}
                </button>
                <button
                  onClick={() => handleReject(user)}
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No new registered drivers
          </div>
        )}
      </div>

      {toggleModal && selectedUserData && (
        <Profile userData={selectedUserData} closeModal={() => setToggleModal(false)} />
      )}
    </div>
  );
};

export default ChatCard;