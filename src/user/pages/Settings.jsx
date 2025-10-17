import React, { useState } from "react";
import { Info, ChevronRight, ChevronDown, Mail, Phone } from "lucide-react";

const Settings = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const items = [
        {
            title: "About Us",
            content: (
                <div className="space-y-2">
                    <p className=" text-gray-900">
                        <strong>Welcome to StudyLab –</strong> a modern learning and study hub designed to provide
                        students with a focused and productive environment.
                    </p>
                    <p>
                        Our mission is to empower students with the right facilities, digital tools,
                        and resources that make their academic journey smoother and more effective.
                    </p>

                    <p className="mt-2 font-Outfit">At StudyLab, we offer:</p>
                    <ul className="list-none space-y-1">
                        <li>📚 Smart Seat Booking System – Choose your study spot with ease, just like booking a movie seat.</li>
                        <li>🕒 Time & Attendance Tracking – Keep track of your study hours with automated check-in and check-out.</li>
                        <li>💳 Hassle-Free Payments – Pay fees online and download receipts instantly.</li>
                        <li>🍴 Canteen Coupons – Save more with student-friendly food discounts.</li>
                        <li>🔔 Instant Notifications – Stay updated on fees, assignments, and announcements.</li>
                    </ul>

                    <p>
                        With 200+ seats across 2 floors, we ensure every student gets a comfortable
                        and distraction-free space. Our system is built to bring transparency,
                        efficiency, and convenience to both students and management.
                    </p>

                    <p className="italic text-blue-700 mt-2">
                        ✨ “When students focus on learning, everything else should be effortless.” ✨
                    </p>
                </div>
            ),
        },
        {
            title: "Terms & Conditions",
            content: (
                <div className="text-gray-700 space-y-2">
                    <p>
                        Welcome to StudyLab. By registering, booking a seat, or using our
                        services, you agree to the following Terms & Conditions:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>
                            <b>Registration & Accounts</b>
                            <ul className="list-disc pl-6">
                                <li>
                                    Students must provide accurate personal and academic details
                                    during registration.
                                </li>
                                <li>Accounts are personal and non-transferable.</li>
                                <li>
                                    Any misuse of the account may result in suspension or
                                    termination.
                                </li>
                            </ul>
                        </li>

                        <li>
                            <b>Seat Booking & Usage</b>
                            <ul className="list-disc pl-6">
                                <li>
                                    Seat reservations are available on a monthly, quarterly, or
                                    yearly basis.
                                </li>
                                <li>
                                    Reserved seats must be confirmed with payment before the due
                                    date; otherwise, they will be released.
                                </li>
                                <li>
                                    Seat availability is shown in real-time (Vacant, Booked,
                                    Expiring Soon).
                                </li>
                                <li>
                                    Students are responsible for maintaining discipline and
                                    cleanliness at their allotted seat.
                                </li>
                            </ul>
                        </li>

                        <li>
                            <b>Attendance System</b>
                            <ul className="list-disc pl-6">
                                <li>
                                    Attendance is marked through check-in and check-out within the
                                    panel.
                                </li>
                                <li>
                                    Fake or proxy check-ins will be considered a violation and may
                                    result in penalties.
                                </li>
                                <li>
                                    Attendance records are automatically tracked for study hours
                                    reporting.
                                </li>
                            </ul>
                        </li>

                    </ol>
                </div>
            ),
        },
        {
            title: "Fee Structure",
            content: (
                <p>
                    Our fee structure is designed to be flexible. Students can pay monthly or yearly.
                    For detailed pricing and discounts, contact our finance office.
                </p>
            ),
        },
        {
            title: "Help Center",
            content: (
                <div className="space-y-6 text-gray-700">
                    {/* FAQ Section */}
                    <div>
                        <h3 className="font-Outfit text-gray-900 mb-2">
                            Frequently Asked Questions
                        </h3>
                        <div className="bg-gray-50 p-3 rounded-lg border">
                            <p className="font-Outfit">Q1: How do I register for a course?</p>
                            <p className="text-sm text-gray-600 mt-1">
                                You can browse available courses in the "Courses" section,
                                select your desired course, and click Enroll.
                            </p>
                        </div>
                    </div>

                    {/* Contact Support */}
                    <div>
                        <h3 className="font-Outfit text-gray-900 mb-2">
                            Contact Support
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-600" />
                                Email: support@yourapp.com
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-600" />
                                Phone: +91-9876543210
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h3 className="font-Outfit text-gray-900 mb-2">
                            Any Query? Feel Free To Reach Out
                        </h3>
                        <form className="flex flex-col sm:flex-row flex-wrap gap-3">
                            <input
                                type="text"
                                placeholder="Name"
                                className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Contact No / Email ID"
                                className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Message"
                                className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen flex justify-center rounded-xl items-start bg-gray-50 p-4">
            <div className=" rounded-xl  w-full max-w-10xl p-4 sm:p-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="mb-3 border rounded-lg bg-white transition-all"
                    >
                        {/* Header Section */}
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex justify-between items-center p-4 text-left"
                        >
                            <div className="flex items-center space-x-3">
                                <Info className="text-blue-600 w-5 h-5" />
                                <span className="font-Outfit text-gray-800 text-sm sm:text-base">
                                    {item.title}
                                </span>
                            </div>

                            {openIndex === index ? (
                                <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-300" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500 transition-transform duration-300" />
                            )}
                        </button>

                        {/* Collapsible content */}
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="px-4 pb-4 text-sm text-gray-600">{item.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;
