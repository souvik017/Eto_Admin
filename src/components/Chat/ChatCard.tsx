import { Link } from 'react-router-dom';
import { Chat } from '../../types/chat';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';

const userData: Array<{
  avatar: string;
  name: string;
  address: string;
  aadharNumber: string;
}> = [
  {
    avatar: UserOne,
    name: 'Devid Heilo',
    address: '23, College Street, Kolkata, West Bengal, 700073',
    aadharNumber: '1234-5678-9012',
  },
  {
    avatar: UserTwo,
    name: 'Henry Fisher',
    address: '12, Rabindra Sarani, Howrah, West Bengal, 711101',
    aadharNumber: '2345-6789-0123',
  },
  {
    avatar: UserThree,
    name: 'Jhon Doe',
    address: '10, Station Road, Kharagpur, West Bengal, 721301',
    aadharNumber: '3456-7890-1234',
  },
  {
    avatar: UserFour,
    name: 'Jane Doe',
    address: '22, Kalighat Road, Kolkata, West Bengal, 700026',
    aadharNumber: '4567-8901-2345',
  },
  {
    avatar: UserFive,
    name: 'Emily Brown',
    address: 'B-17, Steel Township, Durgapur, West Bengal, 713205',
    aadharNumber: '5678-9012-3456',
  },
];

const ChatCard = () => {
  // Function to handle approval
  const handleApprove = (name: string) => {
    console.log(`User ${name} approved`);
    // Add logic for approval (e.g., API call)
  };

  // Function to handle rejection
  const handleReject = (name: string) => {
    console.log(`User ${name} rejected`);
    // Add logic for rejection (e.g., API call)
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Driver Verification
      </h4>

      <div className="space-y-4 px-6">
        {userData.map((user, key) => (
          <div
            className="flex items-center justify-between gap-4 py-2 border-gray-200 dark:border-gray-700"
            key={key}
          >
            {/* User Avatar */}
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {user.name}
                </h5>
              </div>
            </div>

            {/* Address and Aadhar Details */}
            <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300 gap-5 items-center">
              <p>{user.address}</p>
              <p>Aadhar No: {user.aadharNumber}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(user.name)}
                className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(user.name)}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;