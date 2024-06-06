import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import Image from 'next/image'
import toast from "react-hot-toast";
import axios from "axios";
import Amenities from "./Amenities";
import HouseRules from "./HouseRules";
import CancelPolicy from "./CancelPolicy";
import { IoMdArrowRoundBack } from "react-icons/io";
import { House, Add } from "iconsax-react";
import { MdPhonelinkLock } from "react-icons/md";
import { MdOutlineKeyboardAlt } from "react-icons/md";
import { RiDoorLockBoxLine } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import {
  MdOutlineFreeBreakfast,
} from "react-icons/md";
import {
  FaBuilding,
  FaHome,
  FaWarehouse,
  FaDoorOpen,
  FaHotel,
  FaBed,
  FaCouch,
} from "react-icons/fa";
import Guest from "./Guest";
const propertyTypes = [
  { value: "flat", label: "Flat & Apartment" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "farm", label: "Farm" },
  { value: "breakfast", label: "Bed & Breakfast" },
];
export default function Property(props) {

  const { isEdit, p, onClose, fetchProperties, stepdata, useExistingImages } = props;
  const {
    uuid,
    location,
    discount_offer,
    properties_type,
    name,
    no_of_pet_allowed,
    price,
    description,
    bedrooms, beds,
    safety_amenity, standout_amenity,
    property_rule, step_completed,
    guests, pet_fee, extra_guest_fee, flexible_check_in, check_in,
    bathrooms, cleaning_fee,
    amenities, check_out,
    property_image, status, quite_hours_in_time,
    quite_hours_out_time, custom_link
  } = p ? p : {};

  const [Bathrooms, setBathrooms] = useState(bathrooms || 0.5);
  const [pets, setPets] = useState(no_of_pet_allowed || 1);
  const [selectedAmenity, setSelectedAmenity] = useState(amenities ? stringToArray(amenities) : []);
  const [Amenity, setAmenity] = useState(safety_amenity ? stringToArray(safety_amenity) : []);
  const [standoutAmenity, setstandoutAmenity] = useState(standout_amenity ? stringToArray(standout_amenity) : []);
  const [longTermPolicy, setLongTermPolicy] = useState(property_rule?.long_term_policy || null);
  const [selectedPolicy, setSelectedPolicy] = useState(property_rule?.standard_policy || null);
  const [showFlexible, setShowFlexible] = useState(true);
  const [showFirm, setShowFirm] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(property_rule?.pet_allowed || 0);
  const [eventsAllowed, setEventsAllowed] = useState(property_rule?.events_allowed || 0);
  const [smokingAllowed, setSmokingAllowed] = useState(property_rule?.smoking_allowed || 0);
  const [quietHours, setQuietHours] = useState(property_rule?.quiet_hours_allowed || 0);
  const [PhotographyAllowed, setPhotographyAllowed] = useState(property_rule?.photography_allowed || 0);
  const [images, setImages] = useState([]);
  const [dragId, setDragId] = useState("");
  const [typeHere, setTypeHere] = useState("entire_place");
  const [checkinStart, setCheckinStart] = useState(check_in || "00:00");
  const [checkinquet, setCheckinquiet] = useState(quite_hours_in_time || "00:00");
  const [checkoutquet, setCheckoutquiet] = useState(quite_hours_out_time || "00:00");
  const [checkinEnd, setCheckinEnd] = useState(flexible_check_in || "flexible");
  const [checkout, setCheckout] = useState(check_out || "00:00");
  const [Guests, setGuests] = useState(guests || 1);
  const [Beds, setBeds] = useState(beds || 1);
  const [Bedrooms, setBedrooms] = useState(bedrooms || 1);

  const [selectedMethod, setSelectedMethod] = useState("smartlock");
  const [checkdescrtion, setcheckdescrtion] = useState("");
  console.log("checkdescrtion",checkdescrtion)

  const options = [
    {
      item: "smartlock",
      data: "Guests will use a code or app to open a wifi-connected lock.",
      icon: <MdPhonelinkLock size={24} />,
    },
    {
      item: "keypad",
      data: "Guests will use the code you provide to open an electronic lock.",
      icon: <MdOutlineKeyboardAlt size={24} />,
    },
    {
      item: "lockbox",
      data: "Guests will use a code you provide to open a small safe that has a key inside.",
      icon: <RiDoorLockBoxLine size={24} />,
    },
    {
      item: "staff",
      data: "Someone will be available 24 hours a day to let guests in.",
      icon: <GrUserWorker size={24} />,
    },
  ];

  console.log("selectedMethod",selectedMethod)
  const handleFileChange = async (e) => {
    let files = Array.from(e?.target?.files);
    setImages([...images, ...files]);
  };

  const removeImage = (f) => {
    const filteredImages = images.filter((file) => file !== f);
    setImages(filteredImages);
  };

  const moveImageToFront = (index) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages?.splice(index, 1);
    updatedImages?.unshift(movedImage);
    setImages(updatedImages);
  };

  const moveImageBackward = (index) => {
    if (index < images?.length - 1) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index + 1]] = [
        updatedImages[index + 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };

  const moveImageForward = (index) => {
    if (index > 0) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index - 1]] = [
        updatedImages[index - 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };

  const handleAction = (action, index) => {
    if (action === "remove") removeImage(images[index]);
    if (action === "makeCover") moveImageToFront(index);
    if (action === "moveForward") moveImageForward(index);
    if (action === "moveBackward") moveImageBackward(index);
  };

  const handleDrag = (ev) => {
    setDragId(ev?.currentTarget?.id);
  };

  const handleOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = images?.find((image) => image.name === dragId);
    const dropImage = images?.find(
      (image) => image.name === ev.currentTarget.id
    );
    const dragIndex = images?.indexOf(dragImage);
    const dropIndex = images?.indexOf(dropImage);
    const updatedImages = [...images];
    updatedImages?.splice(dragIndex, 1);
    updatedImages?.splice(dropIndex, 0, dragImage);
    setImages(updatedImages);
  };

  const router = useRouter();
  const [step, setStep] = useState(step_completed === 9 ? 0 : step_completed || 0);
  const [Loading, setLoading] = useState(false);
  const [PType, setPType] = useState(properties_type || "flat");
  const lstring = location ? (location.replace('/\\"/g', '"')) : null;
  const l = (lstring);

  const [address, setAddress] = useState({
    street_address: l && l.street_address ? l.street_address : "",
    flat_house: l && l.flat_house ? l.flat_house : "",
    district: l && l.district ? l.district : "",
    nearby: l && l.nearby ? l.nearby : "",
    city: l && l.city ? l.city : "",
    state: l && l.state ? l.state : "",
    pin: l && l.pin ? l.pin : "",
    location: l && l.location ? l.location : "",
    latitude: l && l.latitude ? l.latitude : "",
    longitude: l && l.longitude ? l.longitude : "",
  });

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const [item, setItem] = useState({
    name: name || "",
    about: description || "",
    price: price || "",
    propertytype: PType || "",
    pets: no_of_pet_allowed || "1",
    free_cancel_time: "",
    cleaning: cleaning_fee || "",
    pet: pet_fee || "",
    extra_guest: extra_guest_fee || "",
    Direction: property_rule?.direction || "",
    housemanual: property_rule?.house_manuals || "",
    wifi: property_rule?.wifiusername || '',
    additonalrule: property_rule?.additional_rules || "",
    wifiPassword: property_rule?.wifiPassword || '',
    discount: discount_offer || "",
    customLink: custom_link || ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  function stringToArray(inputString) {
    return inputString.split(",");
  }

  const [selectedOption, setSelectedOption] = useState(status || 1);


  const handleOptionChange = (event) => {
    const option = parseInt(event.target.value, 10);
    setSelectedOption(selectedOption === option ? "" : option);
  };


  const prevStep = () => setStep((prev) => prev - 1);

  const nextStep = async () => {
    // if (step === 0 && PType == '') {
    //   toast.error("Please choose a property type which one you want to list.");
    // }
    // if (step === 1 && (item?.name === "" || item?.price === "" || item?.about === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (step === 1 && (!item?.about || item?.about?.trim()?.length === 0 || item?.about?.length < 100)) {
    //   toast.error("Property description is too short. Description should be a minimum of 100 words.");
    //   return false;
    // }
    // if (step === 2 && (
    //   address?.pin === "" || address?.pin?.length < 5 ||
    //   address?.state === "" ||
    //   address?.city === "" ||
    //   address?.street_address === "" ||
    //   address?.district === "")) {
    //   toast.error(`Incomplete address. Please enter complete address.`);
    //   return false;
    // }
    // if (step === 3 && (Guests === "" || bedrooms === "" || pets === "" || Bathrooms === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (step == 4 && selectedAmenity && Amenity && standoutAmenity && (selectedAmenity.length + Amenity.length + standoutAmenity.length < 4)) {
    //   toast.error("Please choose at least 4 amenities.");
    //   return false;
    // }


    // if (!isEdit && step === 5 && images?.length < 5) {
    //   toast.error("Please select at least five images.");
    //   return false;
    // }
    // if (isEdit && step === 5 && images?.length + imageproperty?.length < 5) {
    //   toast.error("Please select at least five images.");
    //   return false;
    // }
    // if (step === 6 && (checkout === " " || checkinStart === " " || selectedOption === "" || checkinEnd === "" || item?.cleaning === "" || item?.extra_guest === "" || item?.pet === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (step === 7 && (longTermPolicy === null && selectedPolicy === null)) {
    //   toast.error(`At least one field is required.`);
    //   return false;
    // }

    // if (step === 8 && (item?.additonalrule === "" || petsAllowed === " " || smokingAllowed === " " || eventsAllowed === "" || quietHours === "" || PhotographyAllowed === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }


    setStep((prev) => prev + 1);
  };
  const [locationupdate, setLocationupdate] = useState([]);
  const getNavigator = () => {
    if (typeof navigator !== "undefined") {
      return navigator;
    } else {
      console.error("navigator is not available");
      return null;
    }
  };

  const fetchLocationData = async () => {
    setLoading(true);
    const navigatorObj = getNavigator();

    if (navigatorObj && navigatorObj.geolocation) {
      navigatorObj.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            let locationData;
            if (!isEdit) {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              locationData = response.data;
            } else {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${address?.latitude}&lon=${address?.longitude}&format=json`
              );
              locationData = response.data;
              setLocationupdate(locationData?.address);
            }
            setCoordinates({
              lat: latitude.toString(),
              long: longitude.toString(),
            })
            setAddress({
              location: locationData.display_name,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              street_address:
                locationData?.address?.road || locationupdate?.road,
              district:
                locationData?.address?.state_district ||
                locationupdate?.state_district,
              nearby: locationData?.address?.suburb || locationupdate?.suburb,
              city: locationData?.address?.city || locationupdate?.city,
              state: locationData?.address?.state || locationupdate?.state,
              pin: locationData?.address?.postcode || locationupdate?.postcode,
            });
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log("Error fetching data:", error);
          }
        },
        () => {
          setLoading(false);
          console.log("Geolocation failed");
        }
      );
    }
  };




  const fetchLocation = async () => {
    const formattedAddress = `${address.street_address}, ${address.nearby}, ${address.district}, ${address.city}, ${address.state}, ${address.pin}`;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formattedAddress
        )}&key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58`
      );
      const { results } = response.data;
      if (results && results.length > 0) {
        setAddress({
          ...address,
          location: results[0]?.formatted_address,
          latitude: results[0]?.geometry?.location?.lat,
          longitude: results[0]?.geometry?.location?.lng,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const [imageproperty, setImagesproperty] = useState(property_image);

  const deletePropertyImage = (recordUUID, itemUUID) => {
    const main = new Listing();
    main
      .propertyImagedelete(recordUUID, itemUUID)
      .then((response) => {
        toast.success(response.data.message);
        setImagesproperty(
          imageproperty.filter((item) => item.uuid !== itemUUID)
        );
        property_image.filter((item) => item.uuid !== itemUUID);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

const baseurl = "https://quant-stay.vercel.app/property/"
const fulllink = baseurl+item?.customLink

console.log("fulllink",fulllink)
  async function handleSubmit(e) {
    if (step === 9 && (item?.Direction === "" || item?.wifi === " " || item?.wifiPassword === " " || item?.housemanual === " ")) {
      toast.error(`All fields are required.`);
      return false;
    }
    e.preventDefault();

    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("type", typeHere);
    formData.append("properties_type", PType);
    formData.append("name", item?.name);
    formData.append("no_of_pet_allowed", pets);
    formData.append("description", item?.about);
    formData.append("price", item?.price);
    formData.append("bedrooms", Bedrooms);
    formData.append("bathrooms", Bathrooms);
    formData.append("guests", Guests);
    formData.append("beds", Beds);
    formData.append("custom_link", item?.customLink);
    formData.append("address", JSON.stringify(address));
    formData.append("amenities", selectedAmenity);
    formData.append("standout_amenity", standoutAmenity);
    formData.append("safety_amenity", Amenity);
    formData.append("cleaning_fee", item?.cleaning);
    formData.append("extra_guest_fee", item?.extra_guest);
    formData.append("pet_fee", item?.pet);
    formData.append("flexible_check_in", checkinEnd);
    formData.append("check_in", checkinStart);
    formData.append("check_out", checkout);
    formData.append("status", selectedOption);
    formData.append("step_completed", step);
    formData.append("standard_policy", selectedPolicy);
    formData.append("wifi_username", item?.wifi);
    formData.append("wifi_password", item?.wifiPassword);
    formData.append("long_term_policy", longTermPolicy);
    formData.append("house_manuals", item?.housemanual);
    formData.append("pet_allowed", petsAllowed);
    formData.append("events_allowed", eventsAllowed);
    formData.append("direction", item?.Direction);
    formData.append("smoking_allowed", smokingAllowed);
    formData.append("quiet_hours_allowed", quietHours);
    formData.append("photography_allowed", PhotographyAllowed);
    formData.append("additional_rules", item?.additonalrule);
    formData.append("quite_hours_in_time", checkinquet);
    formData.append("quite_hours_out_time", checkoutquet);
    images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    const response = isEdit && !stepdata
      ? main.propertyedit(uuid, formData)
      : main.addproperty(formData);
    response
      .then((res) => {
        if (res?.data?.status) {
          if (isEdit && !stepdata) {
            // onClose();
            toast.success(res.data.message);
            fetchProperties && fetchProperties();
            router.push("/admin/property");

          } else {
            router.push("/admin/property");
            toast.success(res.data.message);
          }
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  const DropdownMenu = ({ index, isFirst, isLast }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleActionClick = (action) => {
      handleAction(action, index);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-white text-xl text-black rounded-lg px-3 py-1 mx-1 mt-1 shadow-lg"
        >
          :
        </button>
        {isOpen && (
          <ul className="absolute text-sm right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <li
              className="cursor-pointer px-2 py-2 hover:bg-gray-200"
              onClick={() => handleActionClick("remove")}
            >
              Remove
            </li>
            {!isFirst && (
              <>
                <li
                  className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                  onClick={() => handleActionClick("makeCover")}
                >
                  Make Cover
                </li>
                <li
                  className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                  onClick={() => handleActionClick("moveForward")}
                >
                  Move Forward
                </li>
              </>
            )}
            {!isLast && (
              <li
                className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                onClick={() => handleActionClick("moveBackward")}
              >
                Move Backward
              </li>
            )}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => { }, [images]);

  // if (stepdata) {
  //   setImages([...images, imageproperty]);
  // }

  return (
    <>
      <style>{`
      .ammenties-checked-lists input:checked+ label { background: #006fc7;color:#fff;}
      // .property-type:checked + label { color :#000 !important;border-color:#000 !important;}
      // .property-type:checked + label h2 { color :#000 !important;border-color:#000 !important;}
    `}</style>
      {isEdit && !stepdata ? (
        <> </>
      ) : (
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {Loading ? "Processing..." : "Save/Exit"}
          </button>
        </div>
      )}
      <div class="max-w-4xl w-full space-y-8 m-auto w-full px-2 ">
        <div
          className={`${step === 0 ? "" : "display-none"
            } max-w-[100%] m-auto table w-full`}
        >
          {/* <h2 className="text-3xl text-center font-bold mb-8" >Which type of perty you want to list ?</h2>
    <div className="grid grid-cols-3 gap-4 m-auto table  " >
     <div className="" >
           <div onClick={(e)=>setTypeHere("single_room")} className={`${typeHere === "single_room" ? "bg-gray-500" : ''} block propety-type-wrap cursor-pointer p-4 border rounded-xl`} >
 
             <House size="52" color="#dedede" /> 
             <h2 className="text-xl mt-4 font-normal text-gray-400" >Single Room</h2>
           </div>
       </div>
     <div className="" >
           <label onClick={(e)=>setTypeHere("entire_place")}
           className={`${typeHere === "entire_place" ? "bg-gray-500" : ''} block propety-type-wrap cursor-pointer p-4 border rounded-xl`} >
             <House size="52" color="#dedede" /> 
             <h2 className="text-xl mt-4 font-normal text-gray-400" >Entire Place</h2>
           </label>
       </div>
    </div> */}

          {/* {typeHere === "entire_place" ?  <> */}
          <h2 className="text-3xl text-center mt-4 font-bold mb-8">
            Which of these best describes your place?
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {propertyTypes &&
              propertyTypes.map((p, i) => (
                <div key={i} className="">
                  <div
                    onClick={() => setPType(p?.value)}
                    className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${p?.value === PType ? "bg-slate-100 border-slate-700 text-slate-700" : ""
                      }`}
                  >
                    {p.value === "flat" && (
                      <FaBuilding
                        style={{ color: "black", fontSize: "40px" }}
                      />
                    )}
                    {p.value === "house" && (
                      <FaHome
                        style={{ color: "black", fontSize: "40px" }}
                      />
                    )}
                    {p.value === "unique_space" && <House size={40} />}
                    {p.value === "guest_house" && (
                      <FaDoorOpen
                        style={{ color: "black", fontSize: "40px" }}
                      />
                    )}
                    {p.value === "hotel" && (
                      <FaHotel
                        style={{ color: "black", fontSize: "40px" }}
                      />
                    )}
                    {p.value === "single_room" && (
                      <FaBed style={{ color: "black", fontSize: "40px" }} />
                    )}
                    {p.value === "boutique_hotel" && (
                      <FaCouch
                        style={{ color: "black", fontSize: "40px" }}
                      />
                    )}
                    {p.value === "breakfast" && (
                      <MdOutlineFreeBreakfast size={40} />
                    )}
                    {p.value === "farm" && <FaWarehouse size={40} />}
                    <h2
                      className={`text-xl mt-4 font-normal ${p.value === PType
                        ? "text-gray-600"
                        : "text-gray-400"
                        }`}
                    >
                      {p.label}
                    </h2>
                  </div>
                </div>
              ))}
          </div>

          {/* </> : '' } */}
        </div>
      </div>




      <div className={`w-full  flex items-center justify-center px-6 py-8 `}>
        <div className="max-w-4xl w-full space-y-8 w-full ">
          <div className={`pages-wrapper  ${uuid ? " max-w-[100%]" : ""} m-auto `} >
            <div className="p-8 rounded-2xl border ">
              <div className={`${step === 1 ? "" : "display-none"
                } max-w-[100%] m-auto table w-full`}
              >
                <h2 className="text-3xl text-center font-bold mb-8">
                  Describes your place?
                </h2>
                <div className="mt-4">
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Property Name"
                    id="name"
                    className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                    value={item?.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative mt-4 text-sm font-medium text-gray-700">
                  <input
                    required
                    type="number"
                    name="price"
                    placeholder="Property Price Per Night"
                    id="name"
                    className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                    value={item?.price}
                    onChange={handleInputChange}
                  />
                  <div className="mt-4">
                    <textarea
                      required
                      id="about"
                      name="about"
                      minCol={"5"}
                      minRow={"5"}
                      value={item?.about}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                      placeholder="Tell more about your property..."
                    />
                    <div className="flex flex-wrap justify-between">
                      <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                        {item?.about ? (
                          <span>{item?.about.length}/100 characters</span>
                        ) : (
                          <span>0/100 characters</span>
                        )}
                      </label>
                      <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                        Minimum 100 words.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${step === 2 ? "" : "display-none"}`}>

                <h2 className="text-3xl text-center font-bold mb-2">
                  Where's your place located?
                </h2>
                <p className="text-normal text-center text-gray-500 mb-8">
                  Your address is only shared with guests after they’ve made a
                  reservation.
                </p>
                <div className="table w-full m-auto  space-y-4 text-center">
                  <p>{address?.location}</p>
                  <div class="w-full mt-4">
                    <button
                      className="btn sort w-full"
                      onClick={fetchLocationData}
                    >
                      {Loading ? "...." : "Use Current Location"}
                    </button>
                  </div>
                  <div class="flex items-center justify-center space-x-4">
                    <div class="font-semibold text-gray-400 py-3 text-center">
                      OR
                    </div>
                  </div>
                  <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                    <input
                      value={address.flat_house}
                      name="flat_house"
                      onChange={handleAddress}
                      type="text"
                      placeholder="Flat, house, etc. (if applicable)"
                      className="w-full border border-gray-300 rounded-0 border-t-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                    />
                    <input
                      onBlur={fetchLocation}
                      value={address.street_address}
                      name="street_address"
                      onChange={handleAddress}
                      type="text"
                      placeholder="Street Address"
                      className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                    />
                    <input
                      onBlur={fetchLocation}
                      value={address.nearby}
                      name="nearby"
                      onChange={handleAddress}
                      type="text"
                      placeholder="Nearby Landmark (if applicable)"
                      className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                    />
                    <input
                      onBlur={fetchLocation}
                      value={address.district}
                      name="district"
                      onChange={handleAddress}
                      type="text"
                      placeholder="District/Locality"
                      className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                    />
                    <input
                      onBlur={fetchLocation}
                      value={address.city}
                      name="city"
                      onChange={handleAddress}
                      type="text"
                      placeholder="City/Town"
                      className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                    />
                    <input
                      onBlur={fetchLocation}
                      value={address.state}
                      name="state"
                      onChange={handleAddress}
                      type="text"
                      placeholder="State"
                      className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                    />
                    <input
                      onBlur={fetchLocation}
                      value={address.pin}
                      name="pin"
                      onChange={handleAddress}
                      type="text"
                      placeholder="PIN Code"
                      className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl text-center font-bold mb-2 mt-8 capitalize">
                    Show your specific location
                  </h2>
                  <p className="text-normal text-center text-gray-500 mb-8 mt-4">
                    Make it clear to guests where your place is located. We'll
                    only share your address after they've made a reservation
                  </p>

                  <div>
                    <iframe
                      src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
                        ` ${address?.location}`
                      )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                      width="100%"
                      height="450"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>

                  </div>
                </div>
              </div>
              <div className={`${step === 3 ? "" : "display-none"}`}>
                <Guest Guests={Guests} setGuests={setGuests}
                  Beds={Beds} setBeds={setBeds}
                  Bedrooms={Bedrooms} setBedrooms={setBedrooms} Bathrooms={Bathrooms} setBathrooms={setBathrooms} pets={pets} setPets={setPets}
                />
              </div>
              <div className={`${step === 4 ? "" : "display-none"}`}>
                <Amenities selectedAmenity={selectedAmenity} standoutAmenity={standoutAmenity} Amenity={Amenity} setAmenity={setAmenity} setstandoutAmenity={setstandoutAmenity} setSelectedAmenity={setSelectedAmenity} />
              </div>
              <div className={`${step === 5 ? "" : "display-none"
                } max-w-[600px] m-auto`}
              >
                <h2 className="text-3xl text-center font-bold mb-2">
                  Add some photos of your{" "}
                  {PType ? PType.replace("_", " ") : "house"}
                </h2>
                <p className="text-normal text-center text-gray-500 mb-8">
                  You'll need 5 photos to get started. You can add more or make
                  changes later.
                </p>

                <div className={"max-w-[600px] m-auto"}>
                  <div className="flex items-center justify-center w-full mt-5 mb-4 justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Add size="100" color="#ccc" />
                        <p className="mb-2 text-lg text-gray-500 text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-normal text-gray-500 text-gray-400">
                          Choose at least 5 images
                        </p>
                        <p className="text-normal text-gray-500 text-gray-400">
                          (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                        onChange={handleFileChange}
                        name="images"
                        required
                        multiple
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
                    {isEdit && useExistingImages ? (
                      images &&
                      images.map((file, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(file)}
                            width={200}
                            height={200}
                            alt={`Preview ${index}`}
                            className="image-preview h-full object-cover border min-h-[150px] max-h-[200px] w-full max-w-full rounded-lg"
                            onLoad={() => URL.revokeObjectURL(file)}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(file)}
                            className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    ) : (
                      images &&
                      images.map((file, index) => (
                        <div
                          key={index}
                          id={file.name}
                          draggable
                          onDragStart={handleDrag}
                          onDragOver={handleOver}
                          onDrop={handleDrop}
                          className="relative"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            width={200}
                            height={200}
                            alt={`Preview ${index}`}
                            className="image-preview h-full object-cover border min-h-[150px] max-h-[200px] w-full max-w-full rounded-lg"
                            onLoad={() => URL.revokeObjectURL(file)}
                          />
                          {index === 0 && (
                            <div className="absolute left-2 top-2 bg-white p-2 rounded shadow">
                              <p className="text-xs text-gray-700">Cover Photo</p>
                            </div>
                          )}
                          <div className="absolute right-2 top-2">
                            <DropdownMenu
                              index={index}
                              isFirst={index === 0}
                              isLast={index === images.length - 1}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 gap-4  mt-16 ">
                  {isEdit && useExistingImages
                    ? imageproperty?.map((item, index) => (
                      <div key={index} className="relative isedits">
                        <Image
                          className="image-preview object-cover border min-h-[150px] max-h-[200px] h-full w-full max-w-full rounded-lg"
                          src={item?.image_url || ""}
                          width={200}
                          height={200}
                          alt={`Preview ${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => deletePropertyImage(uuid, item?.uuid)}
                          className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                    : ""}

                </div>
              </div>
              <div className={`${step === 6 ? "" : "display-none"}`}>
                <div className="max-w-[100%] m-auto w-full mt-10">
                  <h2 className="text-2xl font-bold mb-4">
                    Please enter the following details
                  </h2>
                  <div className="flex justify-between mt-4 text-sm font-medium text-gray-700 space-x-4">
                    <div className="flex flex-col w-1/3">
                      <label>Cleaning Fees</label>
                      <input
                        required
                        type="number"
                        name="cleaning"
                        placeholder="Cleaning Fees Per Day"
                        id="cleaning"
                        className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                        value={item?.cleaning}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col w-1/3">
                      <label>Pet Fees</label>
                      <input
                        type="number"
                        name="pet"
                        placeholder="Pet Fees"
                        id="pet"
                        className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                        value={item?.pet}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col w-1/3">
                      <label>Extra Guest Fees (Per Guest)</label>
                      <input
                        required
                        type="number"
                        name="extra_guest"
                        placeholder="Extra Guest Fees"
                        id="guest"
                        className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                        value={item?.extra_guest}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="max-w-[100%] m-auto w-full mt-10 ">
                  <h2 className="text-2xl font-bold mb-4">Check-in & checkout times</h2>
                  <div className="flex justify-between mb-4 space-x-4">
                    <div className="w-2/3">
                      <label className="block mb-2 font-semibold">Check-in window</label>
                      <div className="flex justify-between space-x-4">
                        <div className="w-1/2 relative">
                          <label className="absolute -top-1 left-1 text-xs text-gray-500">
                            Start time
                          </label>
                          <select
                            value={checkinStart}
                            onChange={(e) => setCheckinStart(e.target.value)}
                            className="block w-full px-3 py-3 border bg-white rounded-xl shadow-sm sm:text-sm mt-3"
                          >
                            <option value="00:00:00">12:00 AM</option>
                            <option value="01:00:00">1:00 AM</option>
                            <option value="02:00:00">2:00 AM</option>
                            <option value="03:00:00">3:00 AM</option>
                            <option value="04:00:00">4:00 AM</option>
                            <option value="05:00:00">5:00 AM</option>
                            <option value="06:00:00">6:00 AM</option>
                            <option value="07:00:00">7:00 AM</option>
                            <option value="08:00:00">8:00 AM</option>
                            <option value="09:00:00">9:00 AM</option>
                            <option value="10:00:00">10:00 AM</option>
                            <option value="11:00:00">11:00 AM</option>
                            <option value="12:00:00">12:00 PM</option>
                            <option value="13:00:00">1:00 PM</option>
                            <option value="14:00:00">2:00 PM</option>
                            <option value="14:00:00">2:00 PM</option>
                            <option value="15:00:00">3:00 PM</option>
                            <option value="16:00:00">4:00 PM</option>
                            <option value="17:00:00">5:00 PM</option>
                            <option value="18:00:00">6:00 PM</option>
                            <option value="19:00:00">7:00 PM</option>
                            <option value="20:00:00">8:00 PM</option>
                            <option value="21:00:00">9:00 PM</option>
                            <option value="22:00:00">10:00 PM</option>
                            <option value="23:00:00">11:00 PM</option>
                          </select>
                        </div>
                        <div className="w-1/2 relative">
                          <label className="absolute -top-1 left-1 text-xs text-gray-500">
                            End time
                          </label>
                          <select
                            value={checkinEnd}
                            onChange={(e) => setCheckinEnd(e.target.value)}
                            className="block w-full px-3 py-3 border  bg-white rounded-xl shadow-sm sm:text-sm mt-3"
                          >
                            <option value="flexible">Flexible</option>
                            <option value="00:00">12:00 AM</option>
                            <option value="01:00">1:00 AM</option>
                            <option value="02:00">2:00 AM</option>
                            <option value="03:00">3:00 AM</option>
                            <option value="04:00">4:00 AM</option>
                            <option value="05:00">5:00 AM</option>
                            <option value="06:00">6:00 AM</option>
                            <option value="07:00">7:00 AM</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="21:00">9:00 PM</option>
                            <option value="22:00">10:00 PM</option>
                            <option value="23:00">11:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <label className="block mb-2 font-semibold">Checkout time</label>
                      <select
                        value={checkout}
                        onChange={(e) => setCheckout(e.target.value)}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-xl shadow-sm sm:text-sm mt-5"
                      >
                        <option value="00:00:00">12:00 AM</option>
                        <option value="01:00:00">1:00 AM</option>
                        <option value="02:00:00">2:00 AM</option>
                        <option value="03:00:00">3:00 AM</option>
                        <option value="04:00:00">4:00 AM</option>
                        <option value="05:00:00">5:00 AM</option>
                        <option value="06:00:00">6:00 AM</option>
                        <option value="07:00:00">7:00 AM</option>
                        <option value="08:00:00">8:00 AM</option>
                        <option value="09:00:00">9:00 AM</option>
                        <option value="10:00:00">10:00 AM</option>
                        <option value="11:00:00">11:00 AM</option>
                        <option value="12:00:00">12:00 PM</option>
                        <option value="13:00:00">1:00 PM</option>
                        <option value="14:00:00">2:00 PM</option>
                        <option value="14:00:00">2:00 PM</option>
                        <option value="15:00:00">3:00 PM</option>
                        <option value="16:00:00">4:00 PM</option>
                        <option value="17:00:00">5:00 PM</option>
                        <option value="18:00:00">6:00 PM</option>
                        <option value="19:00:00">7:00 PM</option>
                        <option value="20:00:00">8:00 PM</option>
                        <option value="21:00:00">9:00 PM</option>
                        <option value="22:00:00">10:00 PM</option>
                        <option value="23:00:00">11:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="max-w-[100%] m-auto w-full mt-10">
                  <h2 className="text-2xl font-bold mb-4 capitalize">Please select an option</h2>
                  <div className="flex items-center space-x-4 mb-8">
                    <label className="flex items-center space-x-2 text-xl font-normal   ">
                      <input
                        type="radio"
                        value={1}
                        checked={selectedOption === 1}
                        onChange={handleOptionChange}
                        className="form-radio"
                      />
                      <span className="">List Property</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xl font-normal">
                      <input
                        type="radio"
                        value={0}
                        checked={selectedOption === 0}
                        onChange={handleOptionChange}
                        className="form-radio "
                      />
                      <span>Unlist Property</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className={`${step === 7 ? "" : "display-none"}`}>
                <CancelPolicy showFirm={showFirm} setShowFirm={setShowFirm} setShowFlexible={setShowFlexible} selectedPolicy={selectedPolicy} setSelectedPolicy={setSelectedPolicy} showFlexible={showFlexible} longTermPolicy={longTermPolicy} setLongTermPolicy={setLongTermPolicy} />
              </div>
              <div className={`${step === 8 ? "" : "display-none"}`}>
                <HouseRules petsAllowed={petsAllowed} setPetsAllowed={setPetsAllowed} quietHours={quietHours}
                  pets={pets} setPets={setPets}
                  checkinTime={checkinquet} setCheckinTime={setCheckinquiet} checkoutTime={checkoutquet} setCheckoutTime={setCheckoutquiet}
                  setEventsAllowed={setEventsAllowed} setQuietHours={setQuietHours} eventsAllowed={eventsAllowed} PhotographyAllowed={PhotographyAllowed} setPhotographyAllowed={setPhotographyAllowed} smokingAllowed={smokingAllowed} setSmokingAllowed={setSmokingAllowed} />
                <div className="flex flex-col  py-4">
                  <label htmlFor="directions" className="block font-medium text-gray-700">
                    Additonal Rules
                  </label>
                  <textarea
                    id="directions"
                    name="additonalrule"
                    rows={5}
                    className="shadow-sm p-4 w-4/5 mt-1 block w-full sm:text-sm border rounded-xl"
                    placeholder="Enter directions here..."
                    value={item?.additonalrule}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={`${step === 9 ? "" : "display-none"
                } max-w-[100%] m-auto table w-full `}>

                <div className="flex flex-col mb-2">
                  <label htmlFor="directions" className="block font-medium text-gray-700">
                    Directions
                  </label>
                  <textarea
                    id="directions"
                    name="Direction"
                    rows={5}
                    className="shadow-sm p-4 w-4/5 mt-1 block w-full sm:text-sm border rounded-xl"
                    placeholder="Enter directions here..."
                    value={item?.Direction}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="directions" className="block font-medium text-gray-700">
                    House Manual
                  </label>
                  <textarea
                    id="manual"
                    name="housemanual"
                    rows={5}
                    className="shadow-sm p-4 w-full mt-1 block sm:text-sm border rounded-xl"
                    placeholder="Enter some instructions for your guest..."
                    value={item?.housemanual}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col  ">
                  <h1 className="capitalize text-lg font-bold my-4">Please enter your wifi details</h1>
                  <label htmlFor="directions" className="block font-medium text-gray-700 my-2">
                    Wifi Name
                  </label>
                  <input
                    id="wifi"
                    name="wifi"
                    type="text"
                    className="shadow-sm p-4 w-full mt-1 block sm:text-sm border rounded-xl"
                    placeholder="Enter your wifi name..."
                    value={item?.wifi}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="directions" className="block font-medium text-gray-700 my-2">
                    Wifi Password
                  </label>
                  <input
                    id="wifiPassword"
                    name="wifiPassword"
                    type="password"
                    className="shadow-sm p-4 w-full mt-1 block sm:text-sm border rounded-xl"
                    placeholder="Enter your wifi Password here..."
                    value={item?.wifiPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>


              <div className={`${step === 10 ? "" : "display-none"
                } max-w-[100%] m-auto table w-full `}>

                <div className="flex flex-col mb-2">
                  <label htmlFor="customLink" className="block font-medium text-gray-700">
                    Custom Link
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-0 h-full pl-4 flex items-center text-gray-500">
                      {baseurl +item.customLink }
                    </span>
                    <textarea
                      id="customLink"
                      name="customLink"
                      rows={5}
                      className="shadow-sm p-4 pl-[10rem] w-4/5 mt-1 block sm:text-sm border rounded-xl"
                      placeholder="Enter your custom link here"
                      value={ item.customLink}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {baseurl.length + item.customLink.length}/{100}
                  </div>

                </div>
                <div className="flex flex-col mb-2">
                  <div className="flex flex-col md:flex-row min-h-screen p-4">
                    {/* Left Panel */}
                    <div className="md:w-2/3 px-16 flex flex-col mt-4">
                      <div className="flex space-x-4 items-center">
                        <IoMdArrowRoundBack size={24} />
                        <h2 className="text-3xl font-bold">Select a check-in method</h2>
                      </div>
                      <div className="space-y-8 mt-8 w-full">
                        {options && options.map((item, index) => (
                          <div
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer ${selectedMethod === item?.item ? "border-black" : "border-gray-300"
                              }`}
                            onClick={() => setSelectedMethod(item?.item)}
                          >
                            {item?.icon}
                            <span className="my-4 text-xl font-semibold capitalize">
                              {item?.item}
                            </span>
                            <p className="text-gray-500" onClick={()=>{setcheckdescrtion(item?.data)}}>
                              {item?.data}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel */}
                    <div className="md:w-2/3 p-4">
                      <h2 className="text-2xl font-bold mb-4 capitalize">
                        Add {selectedMethod} details
                      </h2>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="10"
                        placeholder={`Add any important details for getting inside your place. This info will be shared with guests 24-48 hours before check-in.`}
                      />
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-gray-500">Shared 48 hours before check-in</p>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  ">
              
                </div>
              </div>

              <div className="pt-6 flex justify-between max-w-[500px] table m-auto">
                {step == 0 ? (
                  <> </>
                ) : (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex mx-2 justify-center py-3 px-8 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}

                {step < 10 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex mx-2 justify-center py-3 px-8 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-white bg-violet-700 hover:bg-blue-700 "
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex mx-2 justify-center py-3 px-8 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-white bg-violet-700 hover:bg-blue-700 "
                  >
                    {Loading ? "processing.. " : "Submit"}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
