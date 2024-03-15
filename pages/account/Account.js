import React from 'react'
import Heading from '../elements/Heading'
import Button from '../elements/Button'
import Link from 'next/link'
export default function Account() {
  return (
    <>

      <div className='container mx-auto  account-btn'>
        <div className='flex justify-between items-center pt-12'>
          <Heading text={"Account"} />
          <Button text={"Logout"} design={"font-inter text-base font-medium leading-tight text-center text-black w-52 border border-gray-400 p-4 rounded-full"} />
        </div>
      </div>

      <div className='container mx-auto'>
        <div className='border-b border-gray-200  py-14'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#DCAC81] stroke-current">
                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#DCAC81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="ml-5 booking-manage-box">
                <h1 >My Booking</h1>
                <p>Manage all your bookings here</p>
              </div>
            </div>
            <div className="px-1">
              <Link href="/booking" className="flex items-center border-b-2 border-orange-300 ">
                <p className="text-sm mr-2" style={{ color: '#fdba74' }}>Learn More</p>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.95032 6.364L0.000320435 11.314L1.41432 12.728L7.77832 6.364L1.41432 -3.8147e-06L0.000320435 1.414L4.95032 6.364Z" fill="#DCAC81"/>
</svg>

              </Link> 
            </div>

          </div>
        </div>
        <div className='border-b border-gray-200 py-14'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#DCAC81] stroke-current">
                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#DCAC81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="ml-5 booking-manage-box">
                <h1 >My Profile</h1>
                <p>Manage all your bookings here</p>
              </div>
            </div>
            <div className="px-1">
              <Link href="/profile" className="flex items-center border-b-2 border-orange-300 ">
                <p className="text-sm mr-2" style={{ color: '#fdba74' }}>Learn More</p>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.95032 6.364L0.000320435 11.314L1.41432 12.728L7.77832 6.364L1.41432 -3.8147e-06L0.000320435 1.414L4.95032 6.364Z" fill="#DCAC81"/>
</svg>

              </Link>
            </div>
          </div>
        </div>
        <div className='border-b border-gray-200 py-14'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#DCAC81] stroke-current">
                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#DCAC81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="ml-5 booking-manage-box">
                <h1> Security </h1>
                <p>Manage all your bookings here</p>
              </div>
            </div>
            <div className="px-1">
              <Link href="/security" className="flex items-center border-b-2 border-orange-300  ">
                <p className="text-sm mr-2" style={{ color: '#fdba74' }}>Learn More</p>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.95032 6.364L0.000320435 11.314L1.41432 12.728L7.77832 6.364L1.41432 -3.8147e-06L0.000320435 1.414L4.95032 6.364Z" fill="#DCAC81"/>
</svg>

              </Link>
            </div>

          </div>
        </div>

      </div>
    </>

  )
}
