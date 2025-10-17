import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMoneyBillWave, FaFileInvoiceDollar } from "react-icons/fa";

const FeesPaymentsBody = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg font-Outfit shadow-md">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Booking Date */}
        <div className="bg-blue-100 rounded-lg p-4 flex flex-col">
          <FaCalendarAlt className="text-white bg-blue-500 p-2 rounded-xl text-5xl mb-2" />
          <span className="font-medium text-gray-700 mb-1">Booking Date</span>
          <p className="text-lg font-semibold">18 August 2025</p>
        </div>

        {/* Due Date */}
        <div className="bg-yellow-100 rounded-lg p-4 flex flex-col">
          <FaCalendarAlt className="text-white bg-yellow-500 p-2 rounded-xl text-5xl mb-2" />
          <span className="font-medium text-gray-700 mb-1">Due Date</span>
          <p className="text-lg font-semibold">18 August 2025</p>
        </div>

        {/* Paid Amount */}
        <div className="bg-green-100 rounded-lg p-4 flex flex-col">
          <FaMoneyBillWave className="text-white bg-green-500 rounded-xl p-2 text-5xl mb-2" />
          <span className="font-medium text-gray-700 mb-1">Paid Amount</span>
          <p className="text-lg font-semibold text-green-600">₹2000</p>
        </div>

        {/* Remaining Amount */}
        <div className="bg-red-100 rounded-lg p-4 flex flex-col">
          <FaMoneyBillWave className="text-white rounded-xl bg-red-500 p-2 text-5xl mb-2" />
          <span className="font-medium text-gray-700 mb-1">Remaining Amount</span>
          <p className="text-lg font-semibold text-red-600">₹2000</p>
        </div>
      </div>

      {/* Total + Actions + Payment History */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {/* Left Side */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col gap-6">
          {/* Total Amount in one line */}
          <div className="flex items-center p-5 rounded-xl bg-white justify-between">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-white bg-green-500 p-3 rounded-xl text-7xl" />
              <span className="font-semibold text-lg">Total Amount</span>
            </div>
            <p className="text-2xl font-bold text-green-600">₹5000</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 text-2xl">
            <button className="bg-red-600 hover:bg-red-700 text-white  px-6 py-2 rounded-md  flex items-center gap-2">
              <FaFileInvoiceDollar /> Pay Remaining
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md  flex items-center gap-2">
              <FaFileInvoiceDollar /> Renew Booking
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center gap-2">
              <FaFileInvoiceDollar /> Download Receipt
            </button>
          </div>
        </div>

        {/* Right Side (Payment History) */}
        <div className="bg-yellow-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Payment History</h2>
          <div className="bg-white rounded-lg p-4">
            {/* Header Row */}
            <div className="flex px-4 py-2 font-semibold border-b pb-2 mb-2 bg-blue-100 justify-between ">
              <span>Date</span>
              <span>Amount</span>
            </div>

            {/* History Rows */}
            {["12-08-2025", "12-08-2025", "12-08-2025"].map((date, i) => (
              <div
                key={i}
                className="flex justify-between py-2 px-2 border-b last:border-none"
              >
                <span>{date}</span>
                <span className="text-green-600 font-medium">₹5000</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default FeesPaymentsBody;
