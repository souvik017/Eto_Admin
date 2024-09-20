import { User } from '../../types/user';
import user from "../../images/user/user-01.png"

const brandData: User[] = [
  {
    img: user,
    name: 'Ramesh',
    totalRide: 9,
    regiteredAt: '9/10/2024',
    totalEarning: 990,
  },
  {
    img: user,
    name: 'Ramesh',
    totalRide: 9,
    regiteredAt: '9/10/2024',
    totalEarning: 990,
  },
  {
    img: user,
    name: 'Ramesh',
    totalRide: 9,
    regiteredAt: '9/10/2024',
    totalEarning: 990,
  },
  {
    img: user,
    name: 'Ramesh',
    totalRide: 9,
    regiteredAt: '9/10/2024',
    totalEarning: 990,
  },
  {
    img: user,
    name: 'Ramesh',
    totalRide: 9,
    regiteredAt: '9/10/2024',
    totalEarning: 990,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
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

        {brandData.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0 w-12 h-12">
                <img src={user.img} alt="user" className='w-full h-full' />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {user.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.totalRide}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.regiteredAt}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.totalEarning}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button className="text-meta-5">Veiw</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
