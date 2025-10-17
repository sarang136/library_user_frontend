import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useBookSeatMutation, useGetAddonsQuery } from "../redux/api/seatApi"
import { Upload } from "lucide-react"
import { useSelector } from "react-redux"


const ConfirmBooking = ({ seatId, amount: admissionAmount = 0, seatData, seatNumber, onConfirm }) =>  {
    const { data: addonResponse } = useGetAddonsQuery()
    const addons = Array.isArray(addonResponse?.AddOns) ? addonResponse.AddOns : []

    const [selectedAddonId, setSelectedAddonId] = useState("")
    const [addonPrice, setAddonPrice] = useState(0)

    const user = useSelector((state) => state.auth.user?.data)

    const [bookSeat, { isLoading }] = useBookSeatMutation()
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm()
    const watchQuantity = watch("addonQuantity", 1)
    const totalAddonAmount = addonPrice * watchQuantity

    // Add admission amount prop to total price
    const totalPrice = 2000 + totalAddonAmount + Number(admissionAmount)

    // Auto-fill user data on component mount with safe DOB handling
    useEffect(() => {
        if (user) {
            if (user.name) setValue("name", user.name)
            if (user.email) setValue("email", user.email)
            if (user.contact) setValue("personalNo", user.contact)
            if (user.parentsContact) setValue("parentsNo", user.parentsContact)
            if (user.address) setValue("address", user.address)

            if (user.dob) {
                const dobDate = new Date(user.dob)
                if (!isNaN(dobDate.getTime())) {
                    const formattedDob = dobDate.toISOString().split("T")[0]
                    setValue("dob", formattedDob)
                }
            }
        }
    }, [user, setValue])

    const handleAddonChange = (e) => {
        const addonId = e.target.value
        setSelectedAddonId(addonId)
        const addon = addons.find(a => a._id === addonId)
        if (addon) {
            setAddonPrice(Number(addon.price))
            setValue("addonAmount", addon.price)
            setValue("addonQuantity", 1)
        } else {
            setAddonPrice(0)
            setValue("addonAmount", 0)
            setValue("addonQuantity", 1)
        }
    }

    const handleQuantityChange = (e) => {
        const qty = Number(e.target.value)
        setValue("addonQuantity", qty)
        setValue("addonAmount", addonPrice * qty)
    }

    const addonAmount = totalAddonAmount
    const admissionAmountNum = Number(admissionAmount)

    const onSubmit = async (data) => {
        if (!navigator.onLine) {
            alert("No internet connection. Please check your network.")
            return
        }
        try {
            const fd = new FormData()
            fd.append("name", data.name)
            fd.append("contact", data.personalNo)
            fd.append("parentsContact", data.parentsNo)
            fd.append("address", data.address)
            fd.append("timings", data.timeSlot)
            fd.append("dob", data.dob)
            fd.append("email", data.email)
            fd.append("addOnServiceId", selectedAddonId || "")
            fd.append("addOnServiceQuantity", data.addonQuantity || 0)
            fd.append("seatNo", seatData?.seatNumber || seatNumber)
            fd.append("amount", totalPrice)
            fd.append("duration", data.duration)
            if (data.profilePhoto && data.profilePhoto[0]) fd.append("adharF", data.profilePhoto[0])
            if (data.aadhaar && data.aadhaar[0]) fd.append("adharB", data.aadhaar[0])

            await bookSeat({ seatId: seatId, bookingData: fd }).unwrap()

            if (onConfirm) {
                onConfirm({
                    seatNumber: seatData?.seatNumber,
                    bookingType: "Monthly",
                    duration: "1 Month",
                    paidAmount: {
                        admission: admissionAmountNum,
                        addon: addonAmount,
                        total: totalPrice
                    },
                    timings: data.timeSlot,
                })
            }

            reset()
            setSelectedAddonId("")
            setAddonPrice(0)
        } catch (err) {
            console.error("Booking Error:", err)
            const errorMessage = err?.data?.message || err?.error?.message || "Failed to book seat. Please try again."
            if (errorMessage.toLowerCase().includes("already booked")) {
                alert("⚠️ User has already booked this seat for selected slot!")
            } else {
                alert(errorMessage)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
            <div className="bg-white shadow-md rounded-2xl w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 
                h-[90vh] overflow-y-auto flex flex-col">

                {/* Header */}
                <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-Outfit text-gray-800">
                        Confirm your seat booking
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Fill the details below to complete your booking
                    </p>
                </div>

                {/* Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 flex-1">
                    {/* Left Column */}
                    <div className="space-y-4 bg-gray-100 rounded-xl p-4 sm:p-5">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 font-bold text-sm sm:text-base mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                                readOnly
                            />
                            {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Numbers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm mb-1 font-bold">Personal No</label>
                                <input
                                    type="text"
                                    placeholder="Enter"
                                    maxLength={10}
                                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                                    {...register("personalNo", {
                                        required: "Personal No is required",
                                        pattern: { value: /^[0-9]{10}$/, message: "Must be exactly 10 digits" },
                                    })}
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                                    readOnly
                                />
                                {errors.personalNo && <p className="text-red-500 text-xs sm:text-sm">{errors.personalNo.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm mb-1 font-bold">Parents No</label>
                                <input
                                    type="text"
                                    placeholder="Enter"
                                    maxLength={10}
                                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                                    {...register("parentsNo", {
                                        required: "Parents No is required",
                                        pattern: { value: /^[0-9]{10}$/, message: "Must be exactly 10 digits" },
                                    })}
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                                    readOnly
                                />
                                {errors.parentsNo && <p className="text-red-500 text-xs sm:text-sm">{errors.parentsNo.message}</p>}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-1 font-bold">Address</label>
                            <input
                                type="text"
                                placeholder="Enter"
                                {...register("address", { required: "Address is required" })}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                                readOnly
                            />
                            {errors.address && <p className="text-red-500 text-xs sm:text-sm">{errors.address.message}</p>}
                        </div>

                        {/* DOB + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm mb-1 font-bold">Date of Birth</label>
                                <input
                                    type="date"
                                    {...register("dob", { required: "Date of Birth is required" })}
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                                />
                                {errors.dob && <p className="text-red-500 text-xs sm:text-sm">{errors.dob.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm mb-1 font-bold">Email ID</label>
                                <input
                                    type="email"
                                    placeholder="Enter"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                                    })}
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                                    readOnly
                                />
                                {errors.email && <p className="text-red-500 text-xs sm:text-sm">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* File Uploads */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["Profile Photo", "Aadhaar"].map((file, i) => (
                                <div key={i}>
                                    <label className="block text-gray-700 text-sm mb-1 font-bold">Upload {file}</label>
                                    <label className="w-full bg-white border border-gray-200 rounded-md flex items-center justify-between px-3 py-2 cursor-pointer">
                                        <input
                                            type="file"
                                            {...register(file === "Profile Photo" ? "profilePhoto" : "aadhaar", { required: `${file} is required` })}
                                            className="hidden"
                                        />
                                        <span className="text-gray-500 text-sm">Upload</span>
                                        <Upload className="w-4 h-4 text-gray-500" />
                                    </label>
                                    {errors[file === "Profile Photo" ? "profilePhoto" : "aadhaar"] && (
                                        <p className="text-red-500 text-xs sm:text-sm">
                                            {errors[file === "Profile Photo" ? "profilePhoto" : "aadhaar"].message}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 bg-gray-100 rounded-xl p-4 sm:p-5">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1 font-bold">Selected Seat</label>
                            <div className="bg-blue-600 text-white rounded-md px-3 py-2 text-sm sm:text-base">
                                {seatData ? `Seat No ${seatData.seatNumber}` : "No seat selected"}
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1 font-bold">Select time</label>
                            <select
                                {...register("timeSlot", { required: "Please select a time slot" })}
                                className="text-black rounded-md px-3 py-2 text-sm sm:text-base w-full"
                                defaultValue=""
                            >
                                <option value="">Select time</option>
                                <option value="morning">Morning</option>
                                <option value="evening">Evening</option>
                                <option value="fullday">Full Day</option>
                            </select>
                            {errors.timeSlot && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.timeSlot.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1 font-bold">Booking Duration In Months</label>
                            <select
                                {...register("duration", { required: "Please select duration" })}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm sm:text-base"
                            >
                                <option value="">Select Count</option>
                                <option value="1">1 Month</option>
                            </select>
                            {errors.duration && <p className="text-red-500 text-xs sm:text-sm">{errors.duration.message}</p>}
                        </div>

                        {/* Add On Service */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-1 font-bold">Add On Service</label>
                            <select
                                {...register("addOn", { required: "Please select a service" })}
                                value={selectedAddonId}
                                onChange={handleAddonChange}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm sm:text-base"
                            >
                                <option value="">Select Service</option>
                                {addons.map((addon) => (
                                    <option key={addon._id} value={addon._id}>
                                        {addon.serviceName}
                                    </option>
                                ))}
                            </select>
                            {errors.addOn && <p className="text-red-500 text-xs sm:text-sm">{errors.addOn.message}</p>}

                            {selectedAddonId && (
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm mb-1 font-bold">Quantity</label>
                                        <input
                                            type="number"
                                            min={1}
                                            {...register("addonQuantity", { required: true, min: 1 })}
                                            value={watchQuantity}
                                            onChange={handleQuantityChange}
                                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm mb-1 font-bold">Amount</label>
                                        <input
                                            type="number"
                                            {...register("addonAmount", { required: true })}
                                            value={totalAddonAmount}
                                            readOnly
                                            className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-100 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Total Price Display */}
                            <div className="flex justify-between items-center mt-6 sm:mt-8">
                                <p className="text-gray-700 font-bold">Total Price :</p>
                                <p className="text-green-700 text-lg font-bold">
                                    ₹{totalPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proceed Button */}
                <div className="text-center mt-6 sm:mt-8">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#059500] text-white font-Outfit rounded-md px-6 py-2 hover:bg-green-700 transition disabled:opacity-50 text-sm sm:text-base"
                    >
                        {isLoading ? "Booking..." : "Proceed to Payment"}
                    </button>
                </div>
            </div>
        </form>
    )
}


export default ConfirmBooking;