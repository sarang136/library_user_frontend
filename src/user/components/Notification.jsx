import React from "react";
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";

const Notification= () => {
    return (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-2xl border z-50 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <button className="text-blue-600 text-sm">Mark as all read</button>
            </div>

            {/* Notifications */}
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {/* Seat Booking Reminder */}
                <div className="flex items-start space-x-3">
                    <div className="text-blue-600">
                        <FaCalendarAlt className="text-xl" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">Seat Booking Reminder</p>
                            <span className="text-xs text-gray-500">12 August 2025</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Your booking for <b>Seat A12 (Floor 1)</b> will expire in 3 days.
                        </p>
                    </div>
                </div>

                {/* Payment Successful */}
                <div className="flex items-start space-x-3 bg-blue-50 p-3 rounded-xl">
                    <div className="text-blue-600">
                        <FaCreditCard className="text-xl" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">Payment Successful</p>
                            <span className="text-xs text-gray-500">12 August 2025</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            ₹700 has been successfully paid for your September booking.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
