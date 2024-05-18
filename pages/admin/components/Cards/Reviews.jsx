import { Add, Calendar2, NoteText, TickCircle } from "iconsax-react";
import Link from "next/link";
import Listing from "../../api/Listing";
import { useEffect, useState } from "react";
import Avatar1 from "../assets/avatars/avatar1.png";

import Image from "next/image";
import Dateformat from "../../hook/Dateformat";
import StartRating from "../../../elements/StartRating";
import { formatMultiPrice } from "../../../../hooks/ValueData";

function Reviews() {
  const [record, setRecord] = useState("");
  const [ratingCount, SetRatingCount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = new Listing();
    main
      .Top3rating()
      .then((r) => {
        setRecord(r?.data?.data);
        SetRatingCount(r?.data?.rating_count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="border bg-lightBorderColor h-[40vh] w-full p-3 rounded-2xl "></div>
      ) : (
        <div className="border text-gray-500 w-full  p-3 rounded-2xl">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm gap-2">
              <NoteText size={18} />
              <p className="text-gray-800 font-medium">
                User Reviews({ratingCount})
              </p>
            </div>
            <Link
              href="/admin/review"
              className="border px-2 py-1 rounded-lg text-xs"
            >
              See all
            </Link>
          </div>

          <hr className="bg-gray-400 my-4" />

          {/* content */}
          <div className="space-y-3">
            {/* note 1 */}
            {/* <div className='flex items-start gap-3 w-full'>
                    <div className='w-full space-y-1'>
                        <p className='text-sm text-black font-medium'>Landing page</p>
                        <p className='text-xs'>Search for inspiration to create landing page for AI startup.</p>
                        <div className='flex justify-between items-end'>
                            <div className='space-x-2 font-medium'>
                                <button className='text-xxs px-2 py-0.5 rounded-full bg-white-100 text-black'>Today</button>
                                <button className='text-xxs px-2 py-0.5 rounded-full bg-white-100 text-black'>To-do</button>
                            </div>
                            <p className='flex items-center gap-1 text-xxs text-black'>
                                <Calendar2 size={12} />
                                26 Oct
                            </p>
                        </div>
                    </div>
                </div> */}

            {/* <hr className='bg-gray-400' /> */}

            {/* note 2 */}
            {record &&
              record?.map((item) => (
                <>
                  <div className="flex items-start gap-3 w-full opacity-70 ">
                    {/* <button className='w-4 shrink-0 mt-1 h-4 border-2 border-gray-300 rounded-full' /> */}
                    <Image
                      src={item?.rating_user?.image_url ||   "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                      alt="property Quant-stay"
                      height={30}
                      width={30}
                    />
                    <div className="w-full space-y-1">
                      <p className="text-sm text-black font-medium capitalize">
                        {item?.rating_user?.name}
                      </p>
                      <p className="text-xs text-black leading-relaxed capitalize">
                        {item?.get_property_review?.name}
                        {" - "}
                        {formatMultiPrice(item?.get_property_review?.price)}
                      </p>
                      <p className="text-xs text-black line-limit leading-relaxed">
                        {item?.review_text}
                      </p>
                      <div className="flex justify-between items-end">
                        <div className="space-x-2 font-medium">
                          {/* <button className="text-xxs px-2 py-0.5 rounded-full bg-white-100 text-black">
                        Today
                      </button> */}
                          <div className="flex text-xs px-2 py-0.5 rounded-full bg-white-100 text-black">
                            <StartRating
                              value={parseFloat(
                                item && item?.rating && item?.rating?.toFixed(2)
                              )}
                            />
                          </div>
                        </div>
                        <p className="flex items-center gap-1 text-xs text-black">
                          <Calendar2 size={12} />
                          {/* <Dateformat item={item?.updated_at} /> */}
                          {item?.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="bg-gray-400" />
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
