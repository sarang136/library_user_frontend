
import React, { useEffect, useState } from "react";
import { FaBookOpen, FaChair, FaFile, FaMoneyBillWave, FaPen, FaRegCopy, FaTicketAlt } from "react-icons/fa";
import { TbCreditCardFilled } from "react-icons/tb";
import { RiFileCopyFill } from "react-icons/ri";
import { MdAccessTime, MdBook, MdCheckCircle, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import WeeklyStatsGraph from "../components/WeeklyStatsGraph";
import { useMyActiveBookingsQuery } from "../redux/api/seatApi";
import { useGetCouponsQuery, useRedeemCouponMutation } from "../redux/api/CouponApi";
import axios from "axios";

const DashboardBody = () => {
  const { data: Active, isLoading, isError } = useMyActiveBookingsQuery()
  const activeBooking = Active?.ActiveBookings?.[0] || null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const { data: couponData, refetch } = useGetCouponsQuery();
  const [allocatedData, setAllocatedData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // const [Error, setError] = useState();

  console.log(couponData)
  // Map coupons safely
  const apiCoupons = couponData?.coupens?.map(item => ({
    _id: item._id,
    title: item.description
  })) || [];
  console.log(apiCoupons);

  useEffect(() => { setAllocatedData(couponData?.AllocatedCoupens) }, [couponData])
  console.log(allocatedData)

  const allocatedDataOnly = allocatedData?.filter(dat => dat?.status === "allocated")
  console.log(allocatedDataOnly)

  const [redeemCoupon] = useRedeemCouponMutation()


 const handleRedeem = async (coupenId) => {
  try {
    setLoadingId(coupenId);

    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/redeem/${coupenId}`,
      {},
      { withCredentials: true }
    );

    alert("Coupon redeemed successfully!");
    await refetch();
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.message || "Something went wrong!");
  } finally {
    setLoadingId(null);
  }
};


  // console.log(Error)

  const handleRedeemClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleDropdownFocus = () => setIsDropdownOpen(true);
  const handleDropdownBlur = () => setIsDropdownOpen(false);

  return (
    <div className="p-5 rounded-xl bg-gray-50 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left Subsection: Profile + Seat Info */}
            <div className="flex-1">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {/* Skeleton Header */}
                  <div className="flex items-center gap-3 animate-pulse">
                    <div className="w-12 h-16 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Skeleton Details */}
                  <div className="flex items-center gap-6 mt-4 animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-blue-200 rounded-xl"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full">
                        <div className="flex flex-col gap-1 w-full">
                          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mt-3 sm:mt-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isError ? (
                <div className="p-4 text-red-500 font-Outfit">
                  Something went wrong while loading your seat info!
                </div>
              ) : !activeBooking ? (
                <div className="p-4 text-gray-500 font-Outfit">
                  No active bookings found.
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src="/3.png"
                      alt="profile"
                      className="w-12 h-16 rounded-full"
                    />
                    <h2 className="text-xl font-Outfit">
                      Welcome Back,{" "}
                      <span className="text-blue-600 font-Outfit">{activeBooking.name} !!!!!!</span>
                    </h2>
                  </div>

                  <div className="flex items-center gap-6 mt-2 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <MdOutlineAirlineSeatReclineNormal className="text-blue-500 bg-blue-200 rounded-xl p-1 w-12 h-12" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-28 text-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs font-Outfit">Your Seat</span>
                          <p className="font-bold">
                            Floor {activeBooking.seatNo ? "1" : "-"} - Seat {activeBooking.seatNo || "-"}
                          </p>
                        </div>
                        <span className="text-green-600 font-Outfit text-lg mt-3">
                          Valid Till - {activeBooking.expiryDate
                            ? new Date(activeBooking.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            {/* Right Subsection: Timer */}
            <div className="flex flex-col items-center gap-2">
              <p className="font-outfit text-2xl">00 : 00 : 00</p>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-Outfit">Attendance Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="bg-green-50 p-4 rounded-xl flex flex-col">
                <div className="flex items-center gap-3">
                  <MdAccessTime className="text-white bg-green-600 rounded-md p-2 text-5xl" />
                  <div>
                    <p className="text-sm text-gray-600 font-Outfit">Today's Study Time</p>
                    <h3 className="text-lg font-bold font-Outfit">1 hour 2 mins</h3>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-blue-50 p-4 rounded-xl flex flex-col">
                <div className="flex items-center gap-3">
                  <FaBookOpen className="text-white bg-blue-600 rounded-lg p-2 text-5xl" />
                  <div>
                    <p className="text-sm text-gray-600 font-Outfit">This Month</p>
                    <h3 className="text-lg font-Outfit">62 Hours</h3>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-yellow-50 p-4 rounded-xl flex flex-col">
                <div className="flex items-center gap-3">
                  <FaFile className="text-white bg-yellow-400 rounded-md p-2 text-5xl" />
                  <div className="w-full">
                    <p className="text-sm text-gray-600 font-Outfit">Attendance</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">80%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fees & Coupons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fees */}
            <div className="bg-white p-5 rounded-xl">
              <h3 className="font-Outfit flex items-center gap-3 text-gray-800 text-2xl">
                <TbCreditCardFilled className="text-blue-500 bg-blue-100 rounded-md p-2 text-5xl" />
                Fees & Payments
              </h3>

              <div className="flex font-Outfit items-center mt-3 ml-12 gap-4">
                <p className="text-sm text-green-700">Monthly Charges</p>
                <span className="text-sm text-green-600">₹2000</span>
              </div>

              <hr className="my-3" />

              <div className="text-sm text-gray-700 font-Outfit space-y-2">
                <div className="flex justify-between">
                  <p>Remaining Amount</p>
                  <span>₹1000</span>
                </div>
                <div className="flex justify-between">
                  <p>Due</p>
                  <span className="text-red-500">₹100</span>
                </div>
                <div className="flex justify-between">
                  <p>Last Paid</p>
                  <span>₹200 on 15th August 2025</span>
                </div>
              </div>

              <div className="flex font-Outfit justify-end mt-4">
                <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600">
                  Pay Now
                </button>
              </div>
            </div>

            {/* Coupons */}
            <div className="bg-white p-5 font-Outfit rounded-xl">
              {/* 🔹 Header Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FaTicketAlt className="text-blue-500 bg-blue-200 rounded-md p-2 text-5xl" />
                  <div className="flex flex-col">
                    <h3 className="font-Outfit text-gray-800 text-lg">Coupons</h3>
                    <p className="text-sm font-Outfit text-green-600">
                      {allocatedDataOnly?.length} Coupons Available
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRedeemClick}
                  className="bg-green-500 font-Outfit text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Redeem Now
                </button>
              </div>

              {/* 🔹 Info Section */}
              <div className="flex justify-between gap-3 mt-4 px-3 py-2 rounded-lg">
                <p className="text-gray-700 font-Outfit text-sm">
                  You are eligible for this canteen coupon. Copy code & redeem at
                  canteen.
                </p>
                <div className="flex font-Outfit items-center gap-4">
                  <span className="bg-yellow-100 px-3 py-1 rounded font-semibold text-gray-800">
                    STUDYLAB
                  </span>
                  <RiFileCopyFill className="text-gray-600 cursor-pointer hover:text-gray-800" />
                </div>
              </div>

              {/* 🔹 Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">

                  <div className="bg-white p-6 rounded-xl w-full max-w-3xl relative max-h-[90vh] overflow-y-auto shadow-xl font-Outfit">
                    {/* ❌ Close Button */}

                    <button
                      onClick={handleClose}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
                    >
                      ×
                    </button>

                    {/* 🏷️ Heading */}
                    <h2 className="text-lg text-gray-800 mb-6 mt-2 text-center font-semibold">
                      Redeem Coupon
                    </h2>

                    {/* 🧾 Coupon List */}
                    <div className="space-y-4">
                      {allocatedData && allocatedData.length > 0 ? (
                        allocatedData
                          .filter(c => c.status === "allocated") // only allocated
                          .length > 0 ? (
                          allocatedData
                            .filter(c => c.status === "allocated")
                            .map(c => (
                              <div
                                key={c?.coupenId?._id}
                                className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200"
                              >
                                <div>
                                  <p className="font-medium text-gray-800">
                                    Code: <span className="text-green-600">{c?.coupenId?.code}</span>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Valid Till:{" "}
                                    <span className="text-gray-700">
                                      {new Date(c?.validTill).toLocaleDateString()}
                                    </span>
                                  </p>
                                </div>

                                <button
                                  onClick={() => handleRedeem(c?.coupenId?._id)}
                                  disabled={loadingId === c?.coupenId?._id}
                                  className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${loadingId === c?.coupenId?._id
                                    ? "bg-green-300 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                    }`}
                                >
                                  {loadingId === c?.coupenId?._id ? "Processing..." : "Redeem"}
                                </button>
                              </div>
                            ))
                        ) : (
                          <p className="text-center text-gray-500">No active coupons available.</p>
                        )
                      ) : (
                        <p className="text-center text-gray-500">No active coupons available.</p>
                      )}

                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Section (Statistics) */}
        <div className="bg-white p-5 rounded-xl flex flex-col items-center">
          <div className="flex flex-col items-center mb-12">
            <div className="w-28 h-28 rounded-full border-2 mt-10 border-blue-400 flex items-center justify-center p-1">
              <img
                src="3.png"
                alt="avatar"
                className="w-24 h-24 px-3 bg-blue-100 rounded-full"
              />
            </div>
            <p className="mt-2 text-lg font-semibold font-Outfit">Good Morning !!</p>
            <p className="text-sm text-gray-600 font-Outfit text-center">
              Continue Your learning to achieve your goals
            </p>
          </div>

          <WeeklyStatsGraph />
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;


