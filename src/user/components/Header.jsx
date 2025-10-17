import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import Profile from "./Profile";
import NotificationDropdown from "./Notification";

const Header = ({ onToggleSidebar }) => {
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".notification-wrapper")) {
                setShowNotifications(false);
            }
            if (!e.target.closest(".profile-wrapper")) {
                setShowProfile(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Page titles
    const titles = {
        "/": "Dashboard",
        "/booking": "Seat Booking",
        "/attendance": "My Attendance",
        "/fees": "Fees & Payments",
        "/Coupons": "Coupons",
        "/management": "Profile Management",
        "/Settings": "Settings",
        "/updates-gallery": "Updates & Gallery",
        "/personal-detail": "Personal Detail",
        "/admission-detail": "Admission Detail",
        "/refer-earn": "Refer Earn",
    };
    const pageTitle = titles[location.pathname] || "Dashboard";

    return (
        <header className="bg-white p-4 flex items-center justify-between font-outfit shadow-md">
            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="text-white bg-blue-500 rounded-full p-2 text-2xl"
                >
                    <HiMenuAlt2 />
                </button>
                <h1 className="text-xl font-bold">{pageTitle}</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6 relative">
                {/* Notifications */}
                <div className="relative notification-wrapper">
                    <div
                        className="cursor-pointer"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <IoNotificationsSharp className="text-white bg-blue-500 rounded-full p-2 text-4xl" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            3
                        </span>
                    </div>
                    {showNotifications && <NotificationDropdown />}
                </div>

                {/* Profile */}
                <div className="relative profile-wrapper">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white bg-blue-500 p-2"
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <FaUserCircle className="w-10 h-10" />
                    </div>
                    {showProfile && (
                        <div className="absolute right-0 mt-2 w-64 flex  justify-center z-50">
                            <Profile />
                        </div>
                    )}
                </div>

                {/* Logo */}
                <div className="w-20 h-16 p-1 flex items-center justify-center bg-white overflow-hidden">
                    <img
                        src="/logo.png"
                        alt="Company Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
