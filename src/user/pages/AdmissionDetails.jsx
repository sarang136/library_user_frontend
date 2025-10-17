
import React from "react";
import {
    Calendar,
    Users,
    CalendarX,
    Clock,
    Wallet,
    CreditCard,
    Plus,
} from "lucide-react";
import {
    useGetAddonsQuery,
    useGetSlotsQuery,
    useMyActiveBookingsQuery,
} from "../redux/api/seatApi";

export default function AdmissionDetails() {
    const { data: Active, isLoading, isError } = useMyActiveBookingsQuery();
    // console.log(Active?.ActiveBookings[0]?.addOnServiceId)
    const activeBooking = Active?.ActiveBookings?.[0] || null;

    // ✅ Add-On Logic (safe mapping)
    const { data: addOnData } = useGetAddonsQuery();
    const addOnServices = Array.isArray(addOnData?.addOnServices)
        ? addOnData.addOnServices
        : [];

    const addOnId = activeBooking?.addOnServiceId;
    const quantity = activeBooking?.addOnServiceQuantity || 1;

    const matchedService = addOnServices.find(
        (service) => service._id === addOnId
    );

    if (isLoading) {
        return (
            <div className="p-6 space-y-4 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-2xl p-5 h-28" />
                ))}
            </div>
        );
    }

    if (isError)
        return (
            <p className="text-center mt-10 text-red-500">
                Something went wrong!
            </p>
        );
    if (!activeBooking)
        return (
            <p className="text-center mt-10 text-gray-500">
                No active booking found.
            </p>
        );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-10xl mx-auto">
                {/* 🔹 Top Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <InfoCard
                        bg="bg-blue-50"
                        iconBg="bg-blue-600"
                        icon={<Calendar className="w-6 h-6 text-white" />}
                        label="Admission Date"
                        value={new Date(activeBooking.createdAt).toLocaleDateString()}
                    />

                    <InfoCard
                        bg="bg-red-50"
                        iconBg="bg-red-600"
                        icon={<Users className="w-6 h-6 text-white" />}
                        label="Seat Number"
                        value={activeBooking.seatNo}
                    />

                    <InfoCard
                        bg="bg-red-50"
                        iconBg="bg-red-600"
                        icon={<CalendarX className="w-6 h-6 text-white" />}
                        label="Expiry Date"
                        value={new Date(activeBooking.expiryDate).toLocaleDateString()}
                    />

                    <InfoCard
                        bg="bg-green-50"
                        iconBg="bg-green-600"
                        icon={<Clock className="w-6 h-6 text-white" />}
                        label="Duration"
                        value={`${activeBooking.duration} Months`}
                    />
                </div>

                {/* 🔹 Bottom Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <InfoCard
                        bg="bg-yellow-50"
                        iconBg="bg-yellow-500"
                        icon={<Wallet className="w-6 h-6 text-white" />}
                        label="Plan Amount"
                        value={`₹${activeBooking.planAmount || activeBooking.amount}`}
                    />

                    <InfoCard
                        bg="bg-green-50"
                        iconBg="bg-green-600"
                        icon={<CreditCard className="w-6 h-6 text-white" />}
                        label="Paid Amount"
                        value={`₹${activeBooking.amount}`}
                    />

                    <InfoCard
                        bg="bg-red-50"
                        iconBg="bg-red-600"
                        icon={<Wallet className="w-6 h-6 text-white" />}
                        label="Remaining Amount"
                        value={`₹${activeBooking.remainingAmount}`}
                    />

                    <InfoCard
                        bg="bg-blue-50"
                        iconBg="bg-blue-600"
                        icon={<Clock className="w-6 h-6 text-white" />}
                        label="Time Slot"
                        value={`${activeBooking.timings}`}
                    />
                    {/* 🔹 Add-On Service Section */}
                    <div className="bg-blue-50 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-gray-600 font-medium">Add On Service</span>
                        </div>

                        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                            {matchedService ? (
                                <>
                                    <div>
                                        <p className="text-gray-900 font-bold text-lg mb-1">
                                            {matchedService.name}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Charges - ₹{matchedService.charges} × {quantity} = ₹
                                            {matchedService.charges * quantity}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${matchedService.status === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {matchedService.status || "Pending"}
                                    </span>
                                </>
                            ) : (
                                <div className="w-full text-center py-10">
                                    <p className="text-gray-500 italic">No Add-On Service Found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

// 🔹 Reusable Info Card Component
const InfoCard = ({ icon, bg, iconBg, label, value }) => (
    <div className={`${bg} rounded-2xl p-5`}>
        <div
            className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}
        >
            {icon}
        </div>
        <p className="text-gray-600 text-sm mb-1">{label}</p>
        <p className="text-gray-900 font-bold text-lg">{value}</p>
    </div>
);
