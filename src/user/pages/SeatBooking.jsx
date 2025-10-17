
// import React, { useState, useEffect } from "react";
// import ConfirmBooking from "../components/ConfirmBooking";
// import SuccessPage from "../components/SuccessPage";
// import { useGetAllSeatsQuery } from "../redux/api/seatApi";
// import { useGetChargesQuery } from "../redux/api/chargesApi";

// const SeatBooking = () => {
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [selectedFloor, setSelectedFloor] = useState(1);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successData, setSuccessData] = useState(null);
//   const [hoveredSeat, setHoveredSeat] = useState(null);
//   const [amount, setAmount] = useState(0)

//   const [selectedTab, setSelectedTab] = useState("morning")

//   // ✅ Fetch seats
//   const { data: seatData, isLoading, isError } = useGetAllSeatsQuery();
//   const seats = seatData?.data || []

//   const { data: charge } = useGetChargesQuery();

//   const admissionCharge = charge?.charges?.find(item => item.type === "Admission");


//   // ✅ Filter seats based on floor and selected tab
//   const filteredSeats = seats.filter(
//     (seat) => Number(seat.floor) === selectedFloor
//   );

//   const isSeatBooked = (seat) => {
//     // Full day booked seats are considered booked in all tabs
//     if (seat.bookedForFullDay) return true;

//     if (selectedTab === "morning") return seat.bookedForMorning;
//     if (selectedTab === "evening") return seat.bookedForEvening;
//     if (selectedTab === "fullday") return seat.bookedForFullDay;

//     return false;
//   };


//   // ✅ Handle Book Now button click
//   const handleBookNow = () => {
//     if (!selectedSeat) return alert("Please select a seat first!");
//     setAmount(admissionCharge?.price || 0)
//     setShowConfirm(true);
//   };


//   // ✅ Handle close success modal
//   const handleCloseSuccess = () => {
//     setShowSuccess(false);
//     setSelectedSeat(null);
//     setAmount(0);
//   };

//   // ✅ Loading Skeleton
//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center w-full mt-10 gap-4 px-2">
//         <div className="w-full max-w-7xl bg-white rounded-lg p-4 shadow animate-pulse">
//           <div className="h-6 bg-gray-300 rounded mb-2 w-1/4"></div>
//           <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
//           <div className="h-4 bg-gray-300 rounded mb-2 w-1/6"></div>
//         </div>
//         <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-3 justify-center w-full max-w-7xl mt-4">
//           {Array(12).fill(0).map((_, idx) => (
//             <div key={idx} className="h-10 w-10 bg-gray-300 rounded animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // ✅ Error State
//   if (isError) {
//     return <p className="text-center mt-10 text-red-500">Failed to load data.</p>;
//   }

//   return (
//     <div className="flex justify-center w-full font-Outfit px-2 sm:px-4 relative">
//       <div className="w-full max-w-10xl bg-gray-50 shadow font-Outfit rounded-lg px-3 sm:px-6 py-4">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 w-full">
//           {/* Floor selector */}
//           <div className="flex gap-2 items-center">
//             {[1, 2].map((floor) => (
//               <button
//                 key={floor}
//                 className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${selectedFloor === floor ? "bg-blue-600 text-white" : "bg-gray-200"
//                   }`}
//                 onClick={() => setSelectedFloor(floor)}
//               >
//                 Floor {floor}
//               </button>
//             ))}
//           </div>
//           {/* Total seats (floor-wise) */}
//           <p className="bg-green-500 text-white rounded-b-2xl px-3 py-2 text-sm sm:text-base 
//               md:ml-0 md:mr-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 text-center">
//             Total Seats on Floor {filteredSeats.length}
//           </p>


//           <p className="text-gray-600 text-xl font-outfit sm:text-base">
//             Choose your seat from available seats
//           </p>
//         </div>

//         {/* Tab Selector */}
//         <div className="mb-6 border-b border-gray-300">
//           <ul className="flex justify-start -mb-px">
//             {["morning", "evening", "fullday"].map((tab) => (
//               <li key={tab} className="mr-2">
//                 <button
//                   onClick={() => setSelectedTab(tab)}
//                   className={`inline-block px-4 py-2 rounded-t-lg border-b-2 ${selectedTab === tab
//                     ? "border-green-600 text-green-600 font-semibold"
//                     : "border-transparent text-gray-600 hover:text-green-600"
//                     }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>


//         {/* Seat Layout */}
//         <div className="space-y-4">
//           {(() => {
//             // ✅ Group seats by row
//             const groupedByRow = filteredSeats.reduce((acc, seat) => {
//               const rowKey = seat.row || "Unknown";
//               if (!acc[rowKey]) acc[rowKey] = [];
//               acc[rowKey].push(seat);
//               return acc;
//             }, {});

//             // ✅ Sort rows numerically (R1, R2, R3...)
//             const sortedRows = Object.keys(groupedByRow).sort((a, b) => Number(a) - Number(b));

//             return sortedRows.map((rowKey) => (
//               <div
//                 key={rowKey}
//                 className="flex items-start gap-3 flex-wrap border-b border-gray-200 pb-2"
//               >
//                 {/* ✅ Row Label */}
//                 <div className="min-w-[50px] font-semibold text-gray-700 text-sm sm:text-base">
//                   R{rowKey} -
//                 </div>

//                 {/* ✅ Seats for this row (same design as yours) */}
//                 <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3 justify-center">
//                   {groupedByRow[rowKey].map((seat) => (
//                     <div
//                       key={seat._id}
//                       className="flex items-center gap-1 text-[10px] sm:text-xs font-Outfit relative"
//                     >
//                       <span className="w-5 sm:w-6 text-right">
//                         {seat.seatNumber?.toString().padStart(2, "0")}
//                       </span>
//                       <button
//                         onClick={() => !isSeatBooked(seat) && setSelectedSeat(seat)}
//                         onMouseEnter={() => isSeatBooked(seat) && setHoveredSeat(seat)}
//                         onMouseLeave={() => setHoveredSeat(null)}
//                         className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded shadow border transition-all hover:scale-105"
//                       >
//                         <div
//                           className={`w-full h-full flex items-center justify-center rounded ${isSeatBooked(seat)
//                             ? "bg-red-500"
//                             : selectedSeat?._id === seat._id
//                               ? "bg-green-600"
//                               : "bg-green-200 hover:bg-green-300"
//                             }`}
//                         >
//                           <img
//                             src="/1.png"
//                             alt="seat"
//                             className="w-5 h-5 sm:w-8 sm:h-8"
//                           />
//                         </div>
//                       </button>

//                       {/* Hover Info */}
//                       {hoveredSeat?._id === seat._id && (
//                         <div className="absolute top-0 left-full ml-2 bg-white shadow-md rounded p-2 text-xs w-max z-10">
//                           <p className="text-red-600 font-semibold">Booked</p>
//                           <p>Floor: {seat.floor}</p>
//                           <p>Row: {seat.row}</p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ));
//           })()}
//         </div>


//         {/* Bottom Overlay (Seat Info) */}
//         {selectedSeat && (
//           <div
//             className="fixed inset-0 bg-black/40 flex justify-center items-end z-50"
//             onClick={() => setSelectedSeat(null)}
//           >
//             <div
//               className="bg-white w-full m-5 h-auto p-4 sm:p-6 rounded-t-xl shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-[#009503] rounded-xl p-5 flex items-center justify-center">
//                     <img src="/1.png" alt="seat" className="w-10 h-10 sm:w-8 sm:h-8" />
//                   </div>
//                   <div>
//                     <p className="font-Outfit text-base sm:text-lg">
//                       Selected Seat Number {selectedSeat?.seatNumber}
//                     </p>
//                     <p className="text-gray-500 text-sm">
//                       {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <strong className="font-Outfit flex items-baseline gap-2">
//                     <span className="text-3xl sm:text-4xl font-bold">₹{admissionCharge?.price}</span>
//                     <span className="text-sm sm:text-base text-gray-500 font-Outfit">Per Month</span>
//                   </strong>

//                   <button
//                     onClick={handleBookNow}
//                     className="bg-[#009503] text-white px-4 sm:px-6 py-2 rounded text-base sm:text-base"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Confirm Booking Modal */}
//       {showConfirm && (
//         <div
//           className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
//           onClick={() => setShowConfirm(false)}
//         >
//           <div onClick={(e) => e.stopPropagation()}>
//             <ConfirmBooking
//               seatId={selectedSeat._id}
//               seatNumber={selectedSeat.seatNumber}
//               bookingType={selectedTab}
//               seatData={selectedSeat}
//               amount={amount}
//               onConfirm={(bookingDetails) => {
//                 setShowConfirm(false);
//                 setSuccessData(bookingDetails);
//                 setShowSuccess(true);
//               }}
//               onCancel={() => setShowConfirm(false)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccess && successData && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <SuccessPage
//             selectedSeat={{ seatNumber: successData.seatNumber }}
//             bookingType={successData.bookingType}
//             duration={successData.duration}
//             paidAmount={successData.paidAmount}
//             onClose={handleCloseSuccess}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeatBooking;




import React, { useState } from "react";
import ConfirmBooking from "../components/ConfirmBooking";
import SuccessPage from "../components/SuccessPage";
import { useGetAllSeatsQuery } from "../redux/api/seatApi";
import { useGetChargesQuery } from "../redux/api/chargesApi";

const SeatBooking = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [amount, setAmount] = useState(0);

  // Fetch seats
  const { data: seatData, isLoading, isError } = useGetAllSeatsQuery();
  const seats = seatData?.data || [];
  const { data: charge } = useGetChargesQuery();
  const admissionCharge = charge?.charges?.find(item => item.type === "Admission");

  // Filter seats by floor
  const filteredSeats = seats.filter(seat => Number(seat.floor) === selectedFloor);

  const isSeatBooked = seat => seat.bookedForFullDay;

  const handleBookNow = () => {
    if (!selectedSeat) return alert("Please select a seat first!");
    setAmount(admissionCharge?.price || 0);
    setShowConfirm(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedSeat(null);
    setAmount(0);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-10 gap-4 px-2">
        <div className="w-full max-w-7xl bg-white rounded-lg p-4 shadow animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-2 w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/6"></div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-3 justify-center w-full max-w-7xl mt-4">
          {Array(12).fill(0).map((_, idx) => (
            <div key={idx} className="h-10 w-10 bg-gray-300 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load data.</p>;
  }

  return (
    <div className="flex justify-center w-full font-Outfit px-2 sm:px-4 relative">
      <div className="w-full max-w-10xl bg-gray-50 shadow font-Outfit rounded-lg px-3 sm:px-6 py-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 w-full">
          {/* Floor selector */}
          <div className="flex gap-2 items-center">
            {[1, 2].map(floor => (
              <button
                key={floor}
                className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${selectedFloor === floor ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedFloor(floor)}
              >
                Floor {floor}
              </button>
            ))}
          </div>

          {/* Total seats */}
          <p className="bg-green-500 text-white rounded-b-2xl px-3 py-2 text-sm sm:text-base 
              md:ml-0 md:mr-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 text-center">
            Total Seats on Floor {filteredSeats.length}
          </p>

          <p className="text-gray-600 text-xl font-outfit sm:text-base">
            Choose your seat from available seats
          </p>
        </div>

        {/* Seat Layout */}
        <div className="space-y-4 mt-16">
          {(() => {
            const groupedByRow = filteredSeats.reduce((acc, seat) => {
              const rowKey = seat.row || "Unknown";
              if (!acc[rowKey]) acc[rowKey] = [];
              acc[rowKey].push(seat);
              return acc;
            }, {});

            const sortedRows = Object.keys(groupedByRow).sort((a, b) => Number(a) - Number(b));

            return sortedRows.map(rowKey => (
              <div key={rowKey} className="flex items-start gap-3 flex-wrap border-b border-gray-200 pb-2">
                <div className="min-w-[50px] font-semibold text-gray-700 text-sm sm:text-base">
                  R{rowKey} -
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3 justify-center">
                  {groupedByRow[rowKey].map(seat => (
                    <div
                      key={seat._id}
                      className="flex items-center gap-1 text-[10px] sm:text-xs font-Outfit relative"
                    >
                      <span className="w-5 sm:w-6 text-right">
                        {seat.seatNumber?.toString().padStart(2, "0")}
                      </span>

                      <button
                        onClick={() => !isSeatBooked(seat) && setSelectedSeat(seat)}
                        onMouseEnter={() => isSeatBooked(seat) && setHoveredSeat(seat)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded shadow border transition-all hover:scale-105"
                      >
                        {/* Top-bottom split */}
                        {seat.bookedForFullDay ? (
                          <div className="w-full h-full bg-red-500 rounded"></div>
                        ) : (
                          <div className="w-full h-full flex flex-col rounded overflow-hidden">
                            <div className={`h-1/2 w-full ${seat.bookedForMorning ? "bg-red-500" : selectedSeat?._id === seat._id ? "bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}></div>
                            <div className={`h-1/2 w-full ${seat.bookedForEvening ? "bg-red-500" : selectedSeat?._id === seat._id ? "bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}></div>
                          </div>
                        )}
                      </button>

                      {/* Hover Info */}
                      {hoveredSeat?._id === seat._id && (
                        <div className="absolute top-0 left-full ml-2 bg-white shadow-md rounded p-2 text-xs w-max z-10">
                          <p className="text-red-600 font-semibold">Booked</p>
                          <p>Floor: {seat.floor}</p>
                          <p>Row: {seat.row}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>

        {/* Bottom Overlay (Seat Info) */}
        {selectedSeat && (
          <div
            className="fixed inset-0 bg-black/40 flex justify-center items-end z-50"
            onClick={() => setSelectedSeat(null)}
          >
            <div
              className="bg-white w-full m-5 h-auto p-4 sm:p-6 rounded-t-xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <div className="flex items-center gap-4">
                  <div className="bg-[#009503] rounded-xl p-5 flex items-center justify-center">
                    <img src="/1.png" alt="seat" className="w-10 h-10 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <p className="font-Outfit text-base sm:text-lg">
                      Selected Seat Number {selectedSeat?.seatNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <strong className="font-Outfit flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold">₹{admissionCharge?.price}</span>
                    <span className="text-sm sm:text-base text-gray-500 font-Outfit">Per Month</span>
                  </strong>

                  <button
                    onClick={handleBookNow}
                    className="bg-[#009503] text-white px-4 sm:px-6 py-2 rounded text-base sm:text-base"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Booking Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setShowConfirm(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ConfirmBooking
              seatId={selectedSeat._id}
              seatNumber={selectedSeat.seatNumber}
              seatData={selectedSeat}
              amount={amount}
              onConfirm={(bookingDetails) => {
                setShowConfirm(false);
                setSuccessData(bookingDetails);
                setShowSuccess(true);
              }}
              onCancel={() => setShowConfirm(false)}
            />
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && successData && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <SuccessPage
            selectedSeat={{ seatNumber: successData.seatNumber }}
            bookingType={successData.bookingType}
            duration={successData.duration}
            paidAmount={successData.paidAmount}
            onClose={handleCloseSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default SeatBooking;

