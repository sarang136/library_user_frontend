
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.auth.user?.data)

    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-64 bg-white shadow-lg rounded-xl border p-5 flex flex-col items-center text-center gap-2"
        >
            <img
                src="/3.png"
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-blue-300 object-cover bg-blue-100 p-2"
            />
            <p className="font-Outfit text-base">{user?.name || "John Doe"}</p>
            <p className="text-gray-500 text-sm mb-12">{user?.email || "johndoe@gmail.com"}</p>
            <p className="mt-4 text-sm text-gray-500 border-t pt-2">
                Profile created at:{" "}
                <span className="font-Outfit">
                    {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })
                        : "12 Jan 2024"}
                </span>
            </p>
        </motion.div>
    );
};

export default Profile;
