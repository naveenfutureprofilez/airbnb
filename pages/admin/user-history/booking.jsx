import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";

export default function Booking(props) {
  const { record } = props;
  // console.log("record",record)

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    const response = main.booking(record);
    response
      .then((res) => {
        setLoading(false);
        // console.log("res", res);
        setContent(res?.data?.data?.user_booking_history);
      })
      .catch((error) => {
        setLoaidng(false);
        console.log("error", error);
      });
  }, [record]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : content && content.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="inline-block align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-[1200px] w-full table-auto break-all divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr className="">
                    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      {" "}
                      booking Date
                    </td>
                    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      booking Number{" "}
                    </td>
                    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Check In & Checkout Time{" "}
                    </td>
                    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Amount
                    </td>
                    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Status
                    </td>
                    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Document Image and Type{" "}
                    </td>
                  </tr>
                </thead>
                <tbody className="lg:border-gray-300">
                  {content &&
                    content.map((item, index) => (
                      <tr className="" key={index}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {item?.booking_date}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {item?.booking_number}
                        </td>

                        <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                          {item?.check_in} & {item?.check_out}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {item?.price}
                          <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                            {item?.booking_status}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                            {item?.booking_status}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <Image
                            width={40}
                            height={40}
                            alt="Document"
                            className="inline-flex items-center rounded-full "
                            src={item?.front_url}
                          />
                          <div className="inline-flex items-center rounded-full">
                            {item?.doc_type}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Nodata heading={"Booking Not Found "} />
      )}
    </>
  );
}
