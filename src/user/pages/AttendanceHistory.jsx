import React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const AttendanceHistory = () => {
    const attendanceData = [
        { day: "17 Sept 2025", checkIn: "1:20 PM", checkOut: "2:20 PM", hours: "1h", remark: "Present" },
        { day: "18 Sept 2025", checkIn: "00:00 PM", checkOut: "00:00 PM", hours: "0h", remark: "Absent" },
        { day: "18 Sept 2025", checkIn: "00:00 PM", checkOut: "00:00 PM", hours: "0h", remark: "Absent" },
        { day: "17 Sept 2025", checkIn: "1:20 PM", checkOut: "2:20 PM", hours: "1h", remark: "Present" },
        { day: "17 Sept 2025", checkIn: "1:20 PM", checkOut: "2:20 PM", hours: "1h", remark: "Present" },
        { day: "17 Sept 2025", checkIn: "1:20 PM", checkOut: "2:20 PM", hours: "1h", remark: "Present" },
        { day: "17 Sept 2025", checkIn: "1:20 PM", checkOut: "2:20 PM", hours: "1h", remark: "Present" },
    ];

    const statsData = [
        { name: "Jan", present: 5, absent: 2 },
        { name: "Feb", present: 3, absent: 4 },
        { name: "Mar", present: 6, absent: 3 },
        { name: "Apr", present: 2, absent: 6 },
        { name: "May", present: 4, absent: 4 },
        { name: "Jun", present: 5, absent: 2 },
        { name: "Jul", present: 3, absent: 3 },
        { name: "Aug", present: 4, absent: 4 },
        { name: "Sep", present: 6, absent: 3 },
        { name: "Oct", present: 7, absent: 5 },
        { name: "Nov", present: 5, absent: 4 },
        { name: "Dec", present: 6, absent: 5 },
    ];

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Attendance History */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 md:p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                            My Attendance History
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-md text-sm">
                            <CalendarDays className="w-4 h-4 text-blue-500" />
                            <span>September</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-100 rounded-lg">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm">
                                    <th className="py-3 px-4 text-left font-semibold">Day</th>
                                    <th className="py-3 px-4 text-left font-semibold">Check In</th>
                                    <th className="py-3 px-4 text-left font-semibold">Check Out</th>
                                    <th className="py-3 px-4 text-left font-semibold">Hours</th>
                                    <th className="py-3 px-4 text-left font-semibold">Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-gray-100 text-sm text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        <td className="py-3 px-4">{row.day}</td>
                                        <td className="py-3 px-4">{row.checkIn}</td>
                                        <td className="py-3 px-4">{row.checkOut}</td>
                                        <td className="py-3 px-4">{row.hours}</td>
                                        <td
                                            className={`py-3 px-4 font-medium ${row.remark === "Present" ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            {row.remark}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Statistics */}
                <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 flex flex-col gap-5">
                    <h2 className="text-lg font-semibold text-gray-800">Statistics</h2>

                    {/* Attendance Chart */}
                    <div className="bg-gray-50 rounded-xl p-4 h-52 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="present" fill="#22c55e" radius={[5, 5, 0, 0]} />
                                <Bar dataKey="absent" fill="#ef4444" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Calendar */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-gray-800 font-medium mb-3">January</h3>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-700">
                            {["m", "t", "w", "t", "f", "s", "s"].map((d) => (
                                <div key={d} className="font-semibold">
                                    {d}
                                </div>
                            ))}
                            {[...Array(31)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`py-2 rounded-lg ${i === 1
                                        ? "bg-blue-100 text-blue-700 font-semibold"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                Present
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                Absent
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceHistory;
