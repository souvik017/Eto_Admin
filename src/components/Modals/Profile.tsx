import React from 'react';
import { MdClose } from 'react-icons/md';
import { User } from '../../types/user';
// Define the props for the Profile component


interface ProfileProps {
  userData: any; // Assuming User is your type
  closeModal: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userData, closeModal }) => {
  if (!userData) return null; // Handle case where userData is null


  function registerdAt(dateString) {

    let date = new Date(dateString);

    let day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    let year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day} / ${month} / ${year}`;
}


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
      {/* Modal background */}
      <div className="absolute inset-0 backdrop-blur-lg border-4"></div>

      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800  p-8 shadow-lg w-full max-w-2xl h-[85vh] overflow-y-auto z-10 mt-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-black dark:text-gray-500">Driver Profile</h2>
        <button
            onClick={closeModal}
            className="text-black dark:text-gray-800 hover:text-red-500 dark:hover:text-red-500"
            aria-label="Close Modal"
        >
            <MdClose size={24} />
        </button>
    </div>
        
        <img
          src={userData.driver_photo}
          alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300 dark:border-gray-600"
        />
       
        <div className="grid grid-cols-2 gap-4 gap-x-6 text-black dark:text-gray-800 py-8">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Village:</strong> {userData.village}</p>
          <p><strong>Police Station:</strong> {userData.police_station}</p>
          <p><strong>Landmark:</strong> {userData.landmark}</p>
          <p><strong>Post Office:</strong> {userData.post_office}</p>
          <p><strong>District:</strong> {userData.district}</p>
          <p><strong>Pin Code:</strong> {userData.pin_code}</p>
          <p><strong>Aadhar Number:</strong> {userData.aadhar_number}</p>
          <p><strong>License Number:</strong> {userData.license_number}</p>
          <p><strong>Total Rides:</strong> {userData.total_complete_rides}</p>
          <p><strong>Total Earnings:</strong> {userData.total_earning}</p>
          <p><strong>Registered At:</strong> { registerdAt(userData.createdAt)}</p>
        </div>

        {/* Aadhar Front and Back */}
        <h3 className="text-lg font-bold mt-4 text-black dark:text-gray-800 mb-4">Aadhar Photos :</h3>
        <div className="flex justify-start gap-6">
          <img src={userData.aadhar_front_photo} alt="Aadhar Front" className="w-24 h-24 rounded-lg border" />
          <img src={userData.aadhar_back_photo} alt="Aadhar Back" className="w-24 h-24 rounded-lg border" />
        </div>

        {/* Car Photos */}
        <h3 className="text-lg font-bold mt-4 text-black dark:text-gray-800 mb-4">Car Photos :</h3>
        <div className="flex justify-start gap-6">
          {userData.car_photo.map((photo, index) => (
            <img key={index} src={photo} alt={`Car ${index + 1}`} className="w-24 h-24 rounded-lg border" loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;


