
export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  total_earning: number;
  isActive: boolean;
  isApproved: boolean;
  current_location: {
    type: string;
    coordinates: [number, number];
  };
  driver_photo: string;
  car_photo: string[];
  total_complete_rides: number;
  aadhar_number: string;
  district: string;
  pin_code: string;
  createdAt: string;
};
