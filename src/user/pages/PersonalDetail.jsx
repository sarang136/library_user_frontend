import React, { useState } from "react";
import profilePlaceholder from "../../assets/5.jpg";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { useUpdateProfileMutation } from "../redux/api/userApi";
import { BeatLoader } from "react-spinners";

const PersonalDetail = () => {
    const user = useSelector((state) => state.auth.user?.data);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        contact: user?.contact || "",
        dob: user?.dob || "",
        address: user?.address || "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(user?.profileImage || profilePlaceholder);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append("contact", formData.contact);
            form.append("dob", formData.dob);
            form.append("address", formData.address);
            if (profileImage) form.append("profileImage", profileImage);

            const res = await updateProfile(form).unwrap();
            console.log("Profile updated:", res);

            // ✅ update redux & localStorage manually if RTK didn’t yet reflect
            if (res?.user) {
                const updatedUser = { ...user, ...res.user };
                localStorage.setItem(
                    "user",
                    JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), data: updatedUser })
                );
            }

            setShowModal(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-8 font-Outfit">
            <div className="w-full max-w-6xl">
                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={preview}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover shadow"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {user?.name || "John Doe"}
                            </h2>
                            <p className="text-gray-600">{user?.contact || "8485858585"}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                        <MdEdit size={20} /> Edit Profile
                    </button>
                </div>

                {/* Details Section */}
                <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DetailInput label="Name" value={user?.name} />
                        <DetailInput label="Contact No" value={user?.contact} />
                        <DetailInput label="Email ID" value={user?.email} />
                        <DetailInput label="Parent Number" value={user?.parentsContact} />
                        <DetailInput label="Address" value={user?.address} />
                        <DetailInput label="Date of Birth" value={user?.dob} />
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                                Edit Personal Details
                            </h3>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* Profile Image Upload */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover mb-2 border"
                                    />
                                    <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                                        Change Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Contact */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-700 mb-1">Contact No</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* DOB */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Address */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isLoading ? <BeatLoader size={8} color="#fff" /> : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
// 
// 
const DetailInput = ({ label, value }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            value={value || ""}
            readOnly
            className="border border-gray-200 rounded-md px-3 py-2 text-gray-800 bg-gray-50 focus:outline-none"
        />
    </div>
);

export default PersonalDetail;
