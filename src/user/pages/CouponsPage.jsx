import React, { useEffect, useState } from "react";
import { FiTag } from "react-icons/fi";
import { Copy } from "lucide-react";
import { useGetCouponsQuery } from "../redux/api/CouponApi";
import axios from "axios";

const CouponsPage = () => {
  const { data, isLoading, isError, error } = useGetCouponsQuery();
  const [activeTab, setActiveTab] = useState("active");
  const [activeCoupons, setActiveCoupons] = useState([]);
  const [expiredCoupons, setExpiredCoupons] = useState([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (data?.AllocatedCoupens?.length) {
      const formatted = data.AllocatedCoupens.map((item, index) => ({
        id: index + 1,
        description: item.coupenId?.description || "No Description",
        createdAt: new Date(item.createdAt).toLocaleString(),
        status: item.status || "N/A",
        validTill: item.validTill
          ? new Date(item.validTill).toLocaleDateString()
          : "N/A",
        studentCount: item.students?.length || 0,
        couponCode: item.coupenId?.code || "N/A",
        couponId: item.coupenId?._id,
      }));

      setActiveCoupons(
        formatted.filter((c) => c.status !== "expired" && c.status !== "redeemed")
      );
      setExpiredCoupons(formatted.filter((c) => c.status === "expired"));
      setRedeemedCoupons(formatted.filter((c) => c.status === "redeemed"));
    }
  }, [data]);

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    alert("Coupon code copied!");
  };

  const handleRedeem = async (coupenId) => {
    try {
      setLoadingId(coupenId);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/redeem/${coupenId}`,
        {},
        { withCredentials: true }
      );

      alert("Coupon redeemed successfully!");
      // You can trigger refetch if needed
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-6 animate-pulse border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="bg-blue-200 rounded-2xl w-20 h-20 flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  const renderCoupons = (coupons, type = "active") => {
    if (coupons.length === 0) {
      return (
        <p className="text-center text-gray-500 text-lg mt-10">
          No{" "}
          {type === "expired"
            ? "Expired"
            : type === "redeemed"
            ? "Redeemed"
            : "Active"}{" "}
          Coupons Found
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border transition-all ${
              type === "expired"
                ? "bg-gray-100 border-gray-300 opacity-75"
                : type === "redeemed"
                ? "bg-gray-50 border-gray-300"
                : "bg-white border-green-300"
            }`}
          >
            {/* Icon */}
            <div
              className={`rounded-2xl w-20 h-20 flex items-center justify-center text-3xl flex-shrink-0 ${
                type === "expired"
                  ? "bg-gray-400 text-white"
                  : type === "redeemed"
                  ? "bg-gray-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FiTag />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                {coupon.description}
              </p>

              <p className="text-sm text-blue-600 font-bold mt-1">
                Code: {coupon.couponCode}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Created At: {coupon.createdAt}
              </p>
              <p className="text-sm text-gray-500">
                Valid Till: {coupon.validTill}
              </p>
              <p className="text-sm text-gray-500">
                Students Allocated: {coupon.studentCount}
              </p>

              <p
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  coupon.status === "expired"
                    ? "bg-gray-200 text-gray-700"
                    : coupon.status === "redeemed"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {coupon.status.toUpperCase()}
              </p>
            </div>

            {/* Copy & Redeem */}
            <div className="flex flex-col sm:items-end items-start mt-3 sm:mt-0 gap-2">
              <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-md">
                <span className="text-sm font-bold text-gray-800">
                  {coupon.couponCode}
                </span>
                <button
                  onClick={() => copyCode(coupon.couponCode)}
                  className="text-gray-600 hover:text-black transition p-0.5"
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* Only show redeem if not expired or redeemed */}
              {type === "active" && (
                <button
                  onClick={() => handleRedeem(coupon.couponId)}
                  disabled={loadingId === coupon.couponId}
                  className={`mt-2 px-4 py-1 rounded-md text-white font-semibold transition ${
                    loadingId === coupon.couponId
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loadingId === coupon.couponId ? "Redeeming..." : "Redeem"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold text-lg">
        Error: {error?.message || "Something went wrong!"}
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-green-700 font-semibold text-lg">
          {data?.message || "Coupons Overview"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-300 mb-4">
        {["active", "redeemed", "expired"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 font-medium text-sm rounded-t-md transition-all ${
              activeTab === tab
                ? "bg-white border border-b-0 border-gray-300 text-green-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "active"
              ? "Active"
              : tab === "redeemed"
              ? "Redeemed"
              : "Expired"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white rounded-b-xl border border-gray-300 shadow-sm">
        {activeTab === "active"
          ? renderCoupons(activeCoupons, "active")
          : activeTab === "redeemed"
          ? renderCoupons(redeemedCoupons, "redeemed")
          : renderCoupons(expiredCoupons, "expired")}
      </div>
    </div>
  );
};

export default CouponsPage;
