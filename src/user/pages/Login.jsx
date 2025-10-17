
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation, useSendOtpMutation } from "../redux/api/userApi";
import { toast } from "react-toastify";
import clsx from "clsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);
    const [isUserExist, setIsUserExist] = useState(true);
    const [sendOtp, { isLoading: sending }] = useSendOtpMutation();
    const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();

    const formik = useFormik({
        initialValues: { contact: "", otp: "" },
        validationSchema: Yup.object({
            contact: Yup.string()
                .matches(/^[0-9]{10}$/, "Enter valid 10-digit contact number")
                .required("Contact number is required"),
            otp: Yup.string()
                .test("otp-required", "OTP is required", function (value) {
                    if (otpSent && !value) return false;
                    return true;
                })
                .matches(/^[0-9]{4,6}$/, "Enter valid OTP"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!navigator.onLine) {
                toast.error("No internet connection. Please check your network.");
                return;
            }
            if (!otpSent) {
                try {
                    const res = await sendOtp({ contact: values.contact }).unwrap();
                    if (res?.success === false || res?.message?.toLowerCase().includes("not exist")) {
                        toast.error("User doesn’t exist!");
                        setIsUserExist(false);
                        return;
                    }
                    toast.success(res?.message || "OTP sent successfully!");
                    setOtpSent(true);
                    setIsUserExist(true);
                } catch (err) {
                    if (err?.data?.message?.toLowerCase().includes("not exist")) {
                        toast.error("User doesn’t exist!");
                        setIsUserExist(false);
                    } else {
                        toast.error(err?.data?.message || "Something went wrong!");
                    }
                }
            } else {
                try {
                    const res = await loginUser({ contact: values.contact, otp: values.otp }).unwrap();
                    toast.success(res?.message || "Login successful!");
                    resetForm();
                    setOtpSent(false);
                    navigate("/dash");
                } catch (err) {
                    toast.error(err?.data?.message || "Invalid OTP!");
                }
            }
        },
    });

    const handleContactChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 10) {
            formik.setFieldValue("contact", value);
            setIsUserExist(true);
        }
    };



    return (
        <div className="w-full h-screen flex">
            <div
                className="hidden lg:flex flex-1 bg-cover"
                style={{ backgroundImage: "url('/2.png')", height: "730px" }}
            ></div>

            <div className="flex-1 flex justify-center items-center bg-[#0079f2]">
                <div className="w-full h-[600px] max-w-xl bg-white p-10 rounded-3xl flex flex-col items-center justify-start">

                    {/* 🔹 Logo Top */}
                    <div className="flex justify-center mb-10 mt-6">
                        <img src="/logo.png" alt="Logo" className="w-32 h-30" />
                    </div>

                    {/* 🔹 Form Column Layout */}
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col items-center justify-center w-[80%] space-y-5" // ✅ increased vertical spacing
                    >
                        {/* Contact Input */}
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                name="contact"
                                value={formik.values.contact}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                    formik.setFieldValue("contact", val, true); // instant validation
                                    setIsUserExist(true); // reset backend check
                                }}
                                onBlur={formik.handleBlur} // mark field as touched
                                placeholder="Enter your mobile number"
                                className={clsx(
                                    "border rounded-lg px-4 py-4 w-full focus:outline-none focus:ring-2 transition-all",
                                    (formik.touched.contact && formik.errors.contact) || !isUserExist
                                        ? "border-red-500 focus:ring-red-400"
                                        : formik.touched.contact && !formik.errors.contact
                                            ? "border-green-500 focus:ring-green-400"
                                            : "border-gray-300 focus:ring-blue-500"
                                )}
                            />

                            {/* Inline error messages */}
                            {formik.touched.contact && formik.errors.contact && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.contact}</p>
                            )}
                            {!isUserExist && formik.values.contact && (
                                <p className="text-red-500 text-sm mt-1">User doesn’t exist!</p>
                            )}
                        </div>


                        {/* OTP Input */}
                        {otpSent && (
                            <div className="flex flex-col w-full">
                                <input
                                    type="text"
                                    name="otp"
                                    value={formik.values.otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                                        formik.setFieldValue("otp", val, true); // instant validation
                                    }}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter OTP"
                                    maxLength={6}
                                    className={clsx(
                                        "border rounded-lg px-4 py-4 w-full focus:outline-none focus:ring-2 transition-all",
                                        formik.touched.otp && formik.errors.otp && "border-red-500 focus:ring-red-400",
                                        formik.touched.otp && !formik.errors.otp && "border-green-500 focus:ring-green-400",
                                        !formik.touched.otp && "border-gray-300 focus:ring-blue-500"
                                    )}
                                />

                            </div>
                        )}

                        {/* 🔹 Center Button */}
                        <div className="flex flex-col items-center mt-2">
                            <button
                                type="submit"
                                disabled={sending || loggingIn || !isUserExist}
                                className={`w-[180px] bg-[#0079f2] text-white font-Outfit text-lg py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#0062c8] transition-all duration-300 ${sending || loggingIn || !isUserExist ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {otpSent ? "Login" : "Send OTP"}
                            </button>
                        </div>
                    </form>

                    {/* Sign Up Text */}
                    {!otpSent && (
                        <p className="mt-8  text-xl font-Outfit text-center">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => navigate("/sign")}
                                className="text-[#059500] font-bold cursor-pointer hover:underline"
                            >
                                Sign Up
                            </span>
                        </p>
                    )}
                </div>
            </div>



        </div>
    );
};

export default LoginPage;

