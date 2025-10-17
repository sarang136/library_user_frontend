import React from "react";
import { Info, FileText, Anchor, RefreshCcw, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileManagement = () => {
    const cards = [
        { id: "personal", title: "Personal Details", icon: <Info className="w-5 h-5 text-blue-600" />, link: "/personal-detail" },
        { id: "admission", title: "Admission Details", icon: <FileText className="w-5 h-5 text-blue-600" />, link: "/admission-detail" },
        { id: "waiting", title: "Position In Waiting List", icon: <Anchor className="w-5 h-5 text-blue-600" />, badge: "10" },
        { id: "refer", title: "Refer & Earn", icon: <RefreshCcw className="w-5 h-5 text-blue-600" />, link: "/refer-earn" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex rounded-xl justify-center px-4 py-8">
            <div className="w-full max-w-10xl flex flex-col gap-4 rounded p-5">
                {cards.map((card) => (
                    <Link
                        key={card.id}
                        to={card.link}   // ✅ Ye card click hone par page navigate karega
                        className="flex items-center justify-between bg-white rounded-lg p-4  transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-full">{card.icon}</div>
                            <p className="text-gray-800 font-Outfit">{card.title}</p>
                        </div>
                        {card.badge ? (
                            <span className="text-gray-600 font-semibold text-lg">{card.badge}</span>
                        ) : (
                            <ChevronRight className="text-gray-400" size={22} />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProfileManagement;

