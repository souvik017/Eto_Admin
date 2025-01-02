import axios from 'axios';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';



interface ProfileProps {
    dueRequest: any;  // Assuming 'dueRequest' is the prop being passed down
    closeModal: () => void;
    handleApprove: (requestId: string) => void;  // Function to handle approval
    handleReject: (requestId: string) => void;   // Function to handle rejection
  }

  const DeuRequest: React.FC<ProfileProps> = ({ dueRequest, closeModal, handleApprove, handleReject }) => {
    const [isApproveModalOpen, setApproveModalOpen] = useState(false);
    const [notes, setNotes] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [paymentImage, setPaymentImage] = useState<File | null>(null);
  
    if (!dueRequest) return null; // Handle case where dueRequest is null or undefined
  
    const registerdAt = (dateString: string) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day} / ${month} / ${year}`;  // Use backticks for template literals
    };
    
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setPaymentImage(event.target.files[0]);
      }
    };
  
    const handleApproveSubmit = async () => {
      try {
        // Prepare the data to be sent in the PATCH request
        const approveData: any = {
          status: 'approved',
          note: notes,  // Notes from the modal input
          paymentMethod: paymentMethod,  // Selected payment method
        };
    
        if (paymentImage) {
          // If there is a payment image, upload it to Cloudinary
          const formData = new FormData();
          formData.append('file', paymentImage);
          formData.append('upload_preset', 'EtoAdmin_payemntPhotoUpload');  // Cloudinary preset
          formData.append('cloud_name', 'dswrynlti');  // Cloudinary cloud name
    
          const cloudinaryResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dswrynlti/image/upload',
            formData
          );
    
          // Get the image URL from Cloudinary response
          const paymentImageUrl = cloudinaryResponse.data.secure_url;
          console.log(paymentImageUrl)
          // Attach the image URL to the request data
          approveData.paymentPhoto = paymentImageUrl;
        } else {
          // If no image is uploaded, set paymentPhoto to null
          approveData.paymentPhoto = null;
          alert("error in uploading image")
        }
    ``
        // Now send the data to update the dueRequest status
        const updateResponse = await axios.patch(
          `http://localhost:8000/eto/api/v1/dueRequest/updateDueRequestStatus/${dueRequest._id}`,
          approveData
        );
    
        if (updateResponse.data.success) {
          console.log('Due Request Status Updated:', updateResponse.data);
          handleApprove(dueRequest._id);  // Proceed with the approve handler
          setApproveModalOpen(false);  // Close the modal after success
        } else {
          console.error('Failed to update due request status:', updateResponse.data.message);
          console.log(updateResponse.data.message)
          setApproveModalOpen(false) 
        }
      } catch (error) {
        console.error('Error submitting approval:', error)
        setApproveModalOpen(false);
        alert(error.message);
        // Handle error here, maybe show a message to the user
      }
    };

    

    const renderRides = () => {
      if (!dueRequest.rides || dueRequest.rides.length === 0) return <p>No rides available.</p>;
  
      return (
        <div>
          <h3 className="text-lg font-bold mt-4 text-black dark:text-gray-500 mb-4">Rides:</h3>
          {dueRequest.rides.map((ride: any, index: number) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <div className="flex flex-col text-black">
                <p><strong>Ride ID:</strong> {ride.rideId}</p>
                <p><strong>Total Price:</strong> ₹{ride.total_price}</p>
                <p><strong>Driver Profit:</strong> ₹{ride.driver_profit}</p>
                <p><strong>Admin Profit:</strong> ₹{ride.admin_profit}</p>
                <p><strong>Payment Mode:</strong> {ride.payment_mode}</p>
              </div>
            </div>
          ))}
        </div>
      );
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
        {/* Modal background */}
        <div className="absolute inset-0 backdrop-blur-lg border-4"></div>
  
        {/* Modal content */}
        <div className="relative bg-white dark:bg-gray-800 p-8 shadow-lg w-full max-w-2xl h-[85vh] overflow-y-auto z-10 mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-black dark:text-gray-500">Due Request Details</h2>
            <button
              onClick={closeModal}
              className="text-black dark:text-gray-800 hover:text-red-500 dark:hover:text-red-500"
              aria-label="Close Modal"
            >
              <MdClose size={24} />
            </button>
          </div>
  
          {/* Driver Details */}
          <div className="flex items-center mb-4">
            <img
              src={dueRequest.driver.photo}
              alt="Driver"
              className="w-16 h-16 rounded-full border-4 border-gray-300 dark:border-gray-600 mr-4"
            />
            <div className="flex flex-col">
              <p><strong>Name:</strong> {dueRequest.driver.name}</p>
              <p><strong>Phone:</strong> {dueRequest.driver.phone}</p>
            </div>
          </div>
  
          {/* Request Information */}
          <div className="grid grid-cols-2 gap-4 gap-x-6 text-black dark:text-gray-800 py-8">
            <p><strong>Requested At:</strong> {registerdAt(dueRequest.requestedAt)}</p>
            <p><strong>Status:</strong> {dueRequest.status}</p>
            <p><strong>Due Amount:</strong> ₹{dueRequest.dueAmount}</p>
            <p><strong>Payment Method:</strong> {dueRequest.paymentMethod}</p>
            <p><strong>Notes:</strong> {dueRequest.notes}</p>
          </div>
  
          {/* Payment Photo */}
          {dueRequest.paymentPhoto && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-black dark:text-gray-800 mb-4">Payment Photo:</h3>
              <img
                src={dueRequest.paymentPhoto}
                alt="Payment Proof"
                className="w-full max-w-sm rounded-lg border"
              />
            </div>
          )}
  
          {/* Rides Section */}
          {renderRides()}
  
          {/* Approve / Reject Buttons */}
          <div className="mt-6 flex justify-center gap-6">
            <button
              onClick={() => setApproveModalOpen(true)} // Open the approve modal
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(dueRequest._id)} // Pass dueRequest ID to the reject handler
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
  
        {/* Approve Modal */}
        {isApproveModalOpen && (
          <div className="fixed inset-0 z-99 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-black dark:text-gray-500">Approve Request</h3>
                <button
                  onClick={() => setApproveModalOpen(false)}
                  className="text-black dark:text-gray-800 hover:text-red-500"
                  aria-label="Close Modal"
                >
                  <MdClose size={24} />
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes..."
                className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 text-black"
              ></textarea>
              <div className="mb-4">
                <label className="mr-4 text-black">
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="mr-2"
                  />
                  Online
                </label>
                <label className=" text-black">
                  <input
                    type="radio"
                    value="offline"
                    checked={paymentMethod === "offline"}
                    onChange={() => setPaymentMethod("offline")}
                    className="mr-2"
                  />
                  Offline
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/jpeg"
                  onChange={handleImageUpload}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setApproveModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-grey-900 hover:text-black"
                >
                  Close
                </button>
                <button
                  onClick={handleApproveSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default DeuRequest;