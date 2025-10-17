
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api/userApi";
import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const [registerUser, { isLoading, isError, isSuccess, error }] = useRegisterUserMutation();
    const navigate = useNavigate();

    // ✅ Formik setup
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            address: "",
            registrationAmount: "",
            paymentStatus: "",
            dob: "",
            parentsContact: "",
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
                .required("Name is required"),
            email: yup.string().email("Invalid email format").required("Email is required"),
            address: yup
                .string()
                .min(5, "address must be at least 5 characters")
                .max(100, "address must be under 100 characters")
                .trim()
                .required("address is required"),
            contact: yup
                .string()
                .matches(/^\d{10}$/, "contact number must be exactly 10 digits")
                .required("contact number is required"),
            registrationAmount: yup
                .number()
                .typeError("Must be a number")
                .positive("Must be positive"),
            paymentStatus: yup
                .string()
                .oneOf(["Done", "Pending"], "Invalid payment status"),
            dob: yup
                .date()
                .typeError("Invalid date")
                .required("Date of Birth is required"),
            parentsContact: yup
                .string()
                .matches(/^\d{10}$/, "Parent contact must be exactly 10 digits")
                .required("Parent contact is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!navigator.onLine) {
                toast.error("No internet connection. Please check your network.");
                return;
            }
            try {
                const res = await registerUser(values).unwrap();
                toast.success(res?.message || "Registered successfully!");
                resetForm();
                navigate("/");
            } catch (error) {
                toast.error(error?.data?.message || "Registration failed!");
            }
        },
    })



    // ✅ Dynamic Input Class
    const handleClass = (key) =>
        clsx(
            "w-full border  placeholder:font-Outfit  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all",
            formik.touched[key] && formik.errors[key] && "border-red-500 focus:ring-red-400",
            formik.touched[key] && !formik.errors[key] && "border-green-500 focus:ring-green-400",
            !formik.touched[key] && "border-gray-300 focus:ring-blue-500"
        );

    return (
        <div className="w-full h-screen flex">

            {/* Left side background image */}
            <div
                className="hidden lg:flex flex-1 bg-cover bg-center"
                style={{ backgroundImage: "url('/2.png')" }}
            ></div>

            {/* Right side - white form */}
            <div className="flex-1 flex justify-start items-center bg-[#0079f2] px-6 lg:px-12">
                <div className="w-full max-w-xl bg-white p-6 lg:p-8 rounded-xl h-auto min-h-[700px] space-y-4">

                    {/* Logo */}
                    <div className="flex justify-center">
                        <img src="/logo.png" alt="Logo" className="w-30" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Student Registration
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-3">
                        {/* Name */}
                        <div className="flex flex-col">
                            <input
                                type="text"
                                {...formik.getFieldProps("name")}
                                placeholder="Enter your name"
                                className={handleClass("name")}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <span className="text-red-500 text-sm mt-1">{formik.errors.name}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <input
                                type="email"
                                {...formik.getFieldProps("email")}
                                placeholder="Enter your email"
                                className={handleClass("email")}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-red-500 text-sm mt-1">{formik.errors.email}</span>
                            )}
                        </div>

                        {/* address */}
                        <div className="flex flex-col">
                            <input
                                type="text"
                                {...formik.getFieldProps("address")}
                                placeholder="Enter your address"
                                className={handleClass("address")}
                            />
                            {formik.touched.address && formik.errors.address && (
                                <span className="text-red-500 text-sm mt-1">{formik.errors.address}</span>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div className="flex flex-col">
                            <input
                                type="date"
                                {...formik.getFieldProps("dob")}
                                className={handleClass("dob")}
                            />
                            {formik.touched.dob && formik.errors.dob && (
                                <span className="text-red-500 text-sm mt-1">{formik.errors.dob}</span>
                            )}
                        </div>

                        {/* Contact & Parent Contact Side by Side */}
                        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">

                            {/* Contact */}
                            <div className="flex-1 flex flex-col">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={10}
                                    {...formik.getFieldProps("contact")}
                                    placeholder="Enter your mobile number"
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                        formik.setFieldValue("contact", val);
                                    }}
                                    className={handleClass("contact")}
                                />
                                {formik.touched.contact && formik.errors.contact && (
                                    <span className="text-red-500 text-sm mt-1">{formik.errors.contact}</span>
                                )}
                            </div>

                            {/* Parent Contact */}
                            <div className="flex-1 flex flex-col">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={10}
                                    {...formik.getFieldProps("parentsContact")}
                                    placeholder="Enter parent contact number"
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                        formik.setFieldValue("parentsContact", val, true);
                                    }}
                                    className={handleClass("parentsContact")}
                                />
                                {formik.touched.parentsContact && formik.errors.parentsContact && (
                                    <span className="text-red-500 text-sm mt-1">{formik.errors.parentsContact}</span>
                                )}
                            </div>
                        </div>


                        {/* Submit Button */}
                        <div className="text-center mt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-3 w-40 mx-auto py-3 text-white rounded-lg font-Outfit bg-[#0079f2] hover:bg-blue-700 transition-colors"
                            >
                                {isLoading ? "Processing..." : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <p className="mt-3 text-lg font-Outfit text-center">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/")}
                            className="text-[#059500] font-bold cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>


        </div >
    );
};

export default SignUpPage;


