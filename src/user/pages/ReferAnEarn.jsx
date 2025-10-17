

import React from 'react';
import { Copy, Wallet, Users } from 'lucide-react';

export default function ReferAnEarn() {
    const [copied, setCopied] = React.useState(false);
    const referralCode = "STUDYLAB";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const referrals = [
        { name: "John Doe", date: "18/08/2025", points: 10 }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-10xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Invite Friends & Earn Rewards!
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        Share the Study Lab experience with your friends and unlock exciting rewards every time they join.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                    {/* Referral Code Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-1">
                        <h2 className="text-gray-900 font-Outfit mb-2">Share Your Code</h2>
                        <p className="text-gray-600 font-Outfit text-sm mb-4">
                            Copy your unique referral code to share
                        </p>

                        {/* ✅ Referral code box */}
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-md w-fit">
                                <span className="text-sm font-bold text-gray-800 font-mono">
                                    {referralCode}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="text-gray-600 hover:text-black transition p-0.5"
                                    title="Copy code"
                                >
                                    <Copy size={16} />
                                </button>
                            </div>

                            {/* ✅ Copied message — bottom right */}
                            {copied && (
                                <p className="text-green-600 text-xs mt-1 text-right w-full">
                                    Copied to clipboard!
                                </p>
                            )}
                        </div>
                    </div>


                    {/* Credit Points Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex-col items-start gap-3">
                            <div className=" p-3 rounded-xl">
                                <Wallet className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-gray-600 font-Outfit text-sm mb-1">Your Credit Points</h2>
                                <p className="text-4xl font-Outfit text-gray-900">100</p>
                            </div>
                        </div>
                    </div>

                    {/* Referrals Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex-col items-start gap-3">
                            <div className=" p-3 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-gray-600 font-Outfit text-sm mb-1">Your Referrals</h2>
                                <p className="text-4xl font-Outfit text-gray-900">10</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Referrals Table */}
                <div className="bg-white rounded-2xl p-5 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-50">
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Name</th>
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Date</th>
                                    <th className="text-right py-4 px-6 text-gray-900 font-semibold">Points Earned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referrals.map((referral, idx) => (
                                    <tr key={idx} className="border-t border-gray-100">
                                        <td className="py-4 px-6 text-gray-900">{referral.name}</td>
                                        <td className="py-4 px-6 text-gray-600">{referral.date}</td>
                                        <td className="py-4 px-6 text-right text-green-600 font-semibold">
                                            {referral.points}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}