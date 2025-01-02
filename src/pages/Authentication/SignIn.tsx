import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images//logo/ETO_Logo.png';
import axios from 'axios';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const SignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter Phone, Step 2: Enter OTP
  const [verificationId, setVerificationId] = useState('');
  const [timer, setTimer] = useState(90); // Timer in seconds
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for buttons
  const navigate = useNavigate();


  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setCanResendOtp(true);
    }
  }, [step, timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URI}/eto/api/v1/auth/login`,
        {
          phone: phoneNumber,
          isDriver: false,
          isAdmin: true,
        }
      );

      setLoading(false);

      if (response.data.success && response.data.data.otpdata) {
        console.log('OTP sent successfully');
        setVerificationId(response.data.data.otpdata.verificationId);
        setStep(2);
        setTimer(90); // Reset timer
        setCanResendOtp(false); // Disable resend until timer runs out
      } else {
        setError(response.data.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URI}/eto/api/v1/auth/verifyotp`,
        {
          phone: phoneNumber,
          verificationId: verificationId,
          code: otp,
        }
      );

      setLoading(false);

      if (response.data.success) {
        console.log('OTP verified successfully:', response.data);

        // Store user details and data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data.userDetails));
        localStorage.setItem('data', JSON.stringify(response.data.data));

        // Navigate to home/dashboard
        navigate('/');
      } else {
        setError(response.data.message || 'Failed to verify OTP');
      }
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true); // Show spinner
      setError('');
  
      const response = await axios.post(`${BACKEND_URI}/eto/api/v1/auth/resend_otp`, {
        phone: phoneNumber,
      });
  
      setLoading(false); // Hide spinner
  
      if (response.data.success && response.data.data.otpdata) {
        console.log('OTP resent successfully');
  
        // Update verificationId from the response
        setVerificationId(response.data.data.otpdata.verificationId);
  
        // Reset timer and disable the resend button
        setTimer(90);
        setCanResendOtp(false);
      } else {
        setError(response.data.message || 'Failed to resend OTP');
      }
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while resending OTP');
    }
  };
  
  
  return (
    <>
      <div className="w-[100%] h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center rounded-md border-stroke dark:border-strokedark dark:bg-boxdark border-2 m-2 md:m-5 lg:m-10 2xl:m-20 flex justify-center items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="w-72 h-56" src={Logo} alt="Logo" />
              </Link>
              <p className="2xl:px-20 text-2xl font-bold">
                Welcome to ETO Admin,
              </p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                {step === 1 ? 'Enter Phone Number' : 'Enter OTP'}
              </h2>

              <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
                {step === 1 && (
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                )}

{step === 2 && (
  <>
    <div className="mb-6">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        OTP
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </div>

    {!canResendOtp && (
      <p className="mb-4 text-center text-gray-600">
        Resend OTP in: {timer > 0 ? `${Math.floor(timer / 60)}:${timer % 60}` : '00:00'}
      </p>
    )}

    {timer === 0 && canResendOtp && (
      <div className="mb-4 flex justify-center">
        <button
          type="button"
          onClick={handleResendOtp}
          className="cursor-pointer rounded-lg bg-transparent text-blue-500 hover:underline focus:outline-none transition"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          ) : (
            'Resend OTP'
          )}
        </button>
      </div>
    )}
  </>
)}




                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex justify-center items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      step === 1 ? 'Send OTP' : 'Verify OTP'
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>Design and Developed By DevifAi</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;