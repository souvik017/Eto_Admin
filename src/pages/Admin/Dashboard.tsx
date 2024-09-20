import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from './ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import TableThree from './TableThree';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total College" total="$3.456K" rate="0.43%" levelUp>
          <svg  className="fill-primary dark:fill-white"
            width="44"
            height="25"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
              <path fill="currentcolor" d="M7.5 1L0 4.5l2 .9v1.7c-.6.2-1 .8-1 1.4s.4 1.2 1 1.4v.1l-.9 2.1C.8 13 1 14 2.5 14s1.7-1 1.4-1.9L3 10c.6-.3 1-.8 1-1.5s-.4-1.2-1-1.4V5.9L7.5 8L15 4.5zm4.4 6.5l-4.5 2L5 8.4v.1c0 .7-.3 1.3-.8 1.8l.6 1.4v.1c.1.4.2.8.1 1.2c.7.3 1.5.5 2.5.5c3.3 0 4.5-2 4.5-3z"/>
            </svg>
        </CardDataStats>
        <CardDataStats title="Total Revenue" total="$45,2K" rate="4.35%" levelUp>
    
          <svg 
          className="fill-primary dark:fill-white"
          xmlns="http://www.w3.org/2000/svg" 
          width="3em" 
          height="2em" 
          viewBox="0 0 48 48">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <path d="m16.517 14.344l7.705-4.8l10.274 8.688v12.566l-5.967 4.836V23.817zm9.541-5.086L31.9 5.646l10.46 7.293l-6.433 4.926m.277 10.748l6.296-5.14m-6.296 2.479l6.296-5.14m-6.296 2.48l6.296-5.14m-6.296 2.48l6.296-5.14"/>
            <path d="m35.314 14.172l2.723-2.077l-1.865-1.247l-1.498 1.131M5.5 31.954l13.543 10.4l7.423-5.91"/>
            <path d="m5.5 29.285l13.543 10.4l7.423-5.91"/><path d="m5.604 26.616l13.543 10.401l7.423-5.91"/>
            <path d="m5.59 23.948l13.542 10.4l7.423-5.91m-6.32-4.688c-.226 1.027-1.694 1.554-3.278 1.175h0c-1.584-.378-2.685-1.517-2.459-2.545c.226-1.027 1.694-1.553 3.278-1.175s2.685 1.518 2.459 2.545"/>
            <path d="m15.051 15.826l-9.295 5.595l13.331 10.117l7.64-6.015"/>
          </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Unpaid Subscription" total="2.450" rate="2.59%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
              fill=""
            />
            <path
              d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Paid Subscription" total="3.456" rate="0.95%" levelDown>
          
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="3em" 
          height="2em" 
          viewBox="0 0 14 14">
            <path fill="currentColor" fill-rule="evenodd" d="M10.213 2.538A5.499 5.499 0 0 0 1.595 8.01a.75.75 0 0 1-1.474.277a6.999 6.999 0 0 1 11.163-6.821l.612-.612a.5.5 0 0 1 .854.353V3.5a.5.5 0 0 1-.5.5H9.957a.5.5 0 0 1-.353-.853zm2.791 2.577a.75.75 0 0 1 .876.598a6.999 6.999 0 0 1-11.164 6.821l-.612.613a.5.5 0 0 1-.854-.354V10.5a.5.5 0 0 1 .5-.5h2.293a.5.5 0 0 1 .354.854l-.61.609a5.499 5.499 0 0 0 8.618-5.472a.75.75 0 0 1 .6-.876ZM7.627 3.657a.75.75 0 0 0-1.5 0V4a1.704 1.704 0 0 0-.085 3.346l1.26.275a.32.32 0 0 1-.068.63H6.52a.32.32 0 0 1-.3-.212a.75.75 0 0 0-1.415.5a1.82 1.82 0 0 0 1.321 1.17v.362a.75.75 0 0 0 1.5 0v-.362a1.82 1.82 0 0 0-.005-3.553l-1.26-.276a.204.204 0 0 1 .044-.403h.828a.32.32 0 0 1 .3.212a.75.75 0 0 0 1.415-.5a1.82 1.82 0 0 0-1.322-1.17v-.36Z" clip-rule="evenodd"/>
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree />
        <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          {/* <TableOne /> */}
          <TableThree/>
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default Dashboard;
