// AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const UserLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main content area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
                    }`}
            >
                {/* Header */}
                <Header pageTitle="Dashboard" onToggleSidebar={toggleSidebar} />

                {/* Page content */}
                <main className="flex-1 p-5 bg-white overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
