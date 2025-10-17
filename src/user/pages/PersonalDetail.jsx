import React from "react";
import profile from "../../assets/5.jpg";
import { useSelector } from "react-redux";

const PersonalDetail = () => {
    const user = useSelector((state) => state.auth.user.data)

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-8">
            <div className="w-full max-w-10xl">
                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Profile Left */}
                    <div className="flex items-center gap-4">
                        <img
                            src={profile}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-Outfit text-gray-800">{user?.name || "John Doe"}</h2>
                            <p className="text-gray-600">{user?.contact || "8485858585"}</p>
                        </div>
                    </div>

                </div>

                {/* Details Section */}
                <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="text-sm font-Outfit text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={user?.name || "John Doe"}
                                readOnly
                                className="border border-gray-200 rounded-md font-Outfit px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none"
                            />
                        </div>

                        {/* Contact No */}
                        <div className="flex flex-col">
                            <label className="text-sm font-Outfit text-gray-700 mb-1">
                                Contact No
                            </label>
                            <input
                                type="text"
                                value={user?.contact || "8485858585"}
                                readOnly
                                className="border border-gray-200 rounded-md font-Outfit px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none"
                            />
                        </div>

                        {/* Email ID */}
                        <div className="flex flex-col">
                            <label className="text-sm font-Outfit text-gray-700 mb-1">
                                Email ID
                            </label>
                            <input
                                type="text"
                                value={user?.email || "johndoe@gmail.com"}
                                readOnly
                                className="border border-gray-200 rounded-md font-Outfit px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none"
                            />
                        </div>

                        {/* Parent Number */}
                        <div className="flex flex-col">
                            <label className="text-sm font-Outfit text-gray-700 mb-1">
                                Parent Number
                            </label>
                            <input
                                type="text"
                                value={user?.parentsContact || "8485858585"}
                                readOnly
                                className="border border-gray-200 rounded-md font-Outfit px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col md:col-span-1">
                            <label className="text-sm font-Outfit text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                value={user?.address || "Golden City Center, Sambhajinagar"}
                                readOnly
                                className="border border-gray-200 rounded-md font-Outfit px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="flex flex-col">
                            <label className="text-sm font-Outfit text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="text"
                                value={user?.dob || "30/08/2025"}
                                readOnly
                                className="border border-gray-200 rounded-md font-Outfit px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetail;
