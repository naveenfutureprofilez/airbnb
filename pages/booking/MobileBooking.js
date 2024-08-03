import React from 'react';
import BookingImg from "../../public/images/booking_list_img.png";
import Image from "next/image";
import { formatMultiPrice } from '../../hooks/ValueData';
import DateComponent from "../elements/DateFormat.jsx";
import Link from "next/link";



export default function MobileBooking({ listings }) {
  console.log("listings", listings)
  return (
    <>
      {
      
      
      listings?.map((item, index) => (
        <div className="pb-[30px]">
          {/* <h2 className="text-[17px] text-[#787069] font-normal uppercase tracking-[-0.06em] leading-[14.56px] mb-[15px]">
            <DateComponent item={item?.createdAt} />
          </h2> */}
          <div className="space-y-[10px]">
            <div className="border-[1px] border-[#0000001a] rounded-[10px] ">
              <div className="p-[10px]">
                <div className="flex flex-wrap items-center justify-between border-b-[1px] border-[#0000001a] pb-[15px] mb-[15px]">
                  <div className="flex items-center">
                    <img
                      src={item?.booking_property?.
                        property_image ? item?.booking_property?.
                          property_image[0]?.image_url : BookingImg}
                      alt="BookingImg"
                      className="w-[56px] h-[56px] object-cover rounded-[6px] mr-[10px]"
                    />
                    <div className="">
                      <h3 className="text-[15px] font-normal leading-[18.38px] text-[#3F2A17] mb-[5px]">
                        <Link href={`/property/${item?.booking_property?.uuid}`}>
                          {item?.booking_property?.name}
                        </Link>
                      </h3>
                      <p className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A]">
                        {item?.booking_number}
                        { }
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <h3 className="text-[15px] font-normal leading-[18.38px] text-[#3F2A17] mb-[5px]">
                      {formatMultiPrice(item?.price)}
                    </h3>
                    <p className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A]">
                      INR
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-1/2 border-r-[1px] border-[#0000001a] flex items-center">
                    <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">

                      <DateComponent item=
                        {item?.check_in} />
                    </span>
                  </div>
                  <div className="w-1/2 text-end flex justify-end items-center">
                    <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">
                      <DateComponent item=
                        {item?.check_out} />

                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </>
  );
}
