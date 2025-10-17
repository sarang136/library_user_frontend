import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdEventSeat, MdPayment, MdPerson, MdLogout } from "react-icons/md";
import { useLogoutUserMutation } from "../redux/api/userApi";
import { SlCalender } from "react-icons/sl";
import { CreditCard } from "lucide-react";
import { BiSolidCoupon } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [logout, { isLoading }] = useLogoutUserMutation();

    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", path: "/dash", icon: <MdDashboard className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },
        { name: "Seat Booking", path: "/booking", icon: <MdEventSeat className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },
        { name: "My Attendance", path: "/attendance", icon: <SlCalender className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },
        { name: "Fees & Payments", path: "/fees", icon: <CreditCard className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },
        { name: "Coupons", path: "/Coupons", icon: <BiSolidCoupon className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },

        { name: "Profile Management", path: "/management", icon: <MdPerson className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },
        { name: "Settings", path: "/Settings", icon: <CiSettings className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },
        { name: "Updates & Gallery", path: "/updates-gallery", icon: <GrGallery className="w-10 h-10 bg-blue-600 rounded-full p-2 text-white" /> },

        { name: "Logout", path: "/logout", icon: <MdLogout className="w-10 h-10 bg-red-600 rounded-full p-2 text-white" /> },
    ];

    const handleMenuClick = async (item) => {
        if (item.name === "Logout") {
            try {
                await logout().unwrap()


                navigate("/login", { replace: true });
            } catch (error) {
                console.error("Logout failed:", error);
            }
        } else {
            navigate(item.path);
        }

        toggleSidebar(); // Sidebar बंद करना
    };

    return (
        <div
            className={`
                fixed font-outfit top-0 left-0 h-full bg-white shadow-lg z-30
                transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
                transition-transform duration-300 ease-in-out
                w-64
            `}
        >
            <div className="p-4 border-b flex items-center justify-center">
                <img
                    src="/logo.png"
                    alt="Company Logo"
                    className="w-24 h-auto object-contain"
                />
            </div>

            <ul className="p-4 flex flex-col gap-2 ">
                {menuItems.map((item) => (
                    <li
                        key={item.path}
                        className="cursor-pointer hover:bg-gray-100 rounded p-2 flex items-center gap-3"
                        onClick={() => handleMenuClick(item)}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
