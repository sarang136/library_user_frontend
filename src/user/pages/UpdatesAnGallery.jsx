
import React, { useState } from "react";
import { useGetUpdatesQuery, useGetGalleryQuery } from "../redux/api/updateAngalleryApi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";

const UpdatesAnGallery = () => {
    const [activeTab, setActiveTab] = useState("updates")

    const { data: updatesData, isLoading: isUpdatesLoading, isError: isUpdatesError } = useGetUpdatesQuery();
    const updates = updatesData?.data || [];

    const { data: galleryData, isLoading: isGalleryLoading, isError: isGalleryError } = useGetGalleryQuery();
    const gallery = galleryData?.gallery || [];

    // Pagination for updates
    const [currentPage, setCurrentPage] = useState(1);
    const updatesPerPage = 5;
    const indexOfLastUpdate = currentPage * updatesPerPage;
    const indexOfFirstUpdate = indexOfLastUpdate - updatesPerPage;
    const currentUpdates = updates.slice(indexOfFirstUpdate, indexOfLastUpdate);
    const totalPages = Math.ceil(updates.length / updatesPerPage);

    return (
        <div className="min-h-screen p-6 md:p-12 font-Outfit bg-gray-50 rounded-lg">

            {/* 🔹 Tabs (Grouped Buttons) */}
            <div className="flex gap-0 mb-5 w-fit rounded-lg overflow-hidden">
                <button
                    onClick={() => setActiveTab('updates')}
                    className={`px-12 py-3 font-medium transition-colors ${activeTab === 'updates'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-gray-300'
                        }`}
                >
                    Updates
                </button>
                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`px-12 py-3 font-medium transition-colors ${activeTab === 'gallery'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-gray-300'
                        }`}
                >
                    Gallery
                </button>
            </div>



            {/* 🔹 Content */}
            {activeTab === "updates" && (
                <div className="max-w-10xl mx-auto">
                    <h2 className="text-2xl font-Outfit text-green-700 flex items-center gap-2 mb-3">
                        📢 Updates
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Stay tuned with the latest happenings, announcements, and achievements.
                    </p>

                    {isUpdatesLoading ? (
                        <div className="space-y-3 animate-pulse">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-start gap-3 bg-gray-100 rounded-lg p-4">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isUpdatesError ? (
                        <p className="text-red-500">⚠️ Failed to load updates. Please try again.</p>
                    ) : updates.length > 0 ? (
                        <>
                            <div className="space-y-3">
                                {currentUpdates.map((update, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white rounded-lg transition p-4 border border-gray-100">
                                        <FaTrophy className="text-2xl text-green-700" />

                                        <p className="text-gray-800">
                                            <span className="font-Outfit">{update.title} –</span>{" "}
                                            {update.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-3 mt-4">
                                <button
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                <span>{currentPage} / {totalPages}</span>
                                <button
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">No updates available right now.</p>
                    )}
                </div>
            )}

            {activeTab === "gallery" && (
                <div className="max-w-10xl mx-auto">
                    <h2 className="text-2xl font-Outfit text-green-700 flex items-center gap-2 mb-3">
                        📸 Gallery
                    </h2>
                    <p className="text-gray-600 mb-6">
                        A glimpse of our journey, memories, and milestones.
                    </p>

                    {isGalleryLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="rounded-xl bg-gray-200 h-60 w-full" />
                            ))}
                        </div>
                    ) : isGalleryError ? (
                        <p className="text-red-500">⚠️ Failed to load gallery. Please try again.</p>
                    ) : gallery.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {gallery.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl transition flex flex-col overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title || `Gallery ${index}`}
                                        className="w-full h-60 object-cover"
                                    />
                                    <div className="px-4 py-3">
                                        <p className="text-gray-800 font-Outfit text-center break-words">
                                            {item.caption || `Gallery ${index + 1}`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No gallery items available.</p>
                    )}
                </div>
            )}

        </div>
    );
};

export default UpdatesAnGallery;

