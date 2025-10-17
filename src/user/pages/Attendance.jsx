import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AttendancePage2 = () => {
    const [date, setDate] = useState(new Date());

    // Sample bar chart data
    const attendanceData = [
        { month: "Jan", present: 2, absent: 1 },
        { month: "Feb", present: 6, absent: 4 },
        { month: "Mar", present: 5, absent: 3 },
        { month: "Apr", present: 3, absent: 3 },
        { month: "May", present: 4, absent: 2 },
        { month: "Jun", present: 2, absent: 1 },
        { month: "Jul", present: 3, absent: 2 },
        { month: "Aug", present: 5, absent: 2 },
        { month: "Sep", present: 6, absent: 6 },
        { month: "Oct", present: 4, absent: 3 },
        { month: "Nov", present: 5, absent: 2 },
        { month: "Dec", present: 6, absent: 4 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-outfit p-2 sm:p-4">
            {/* Left: Attendance History */}
            <div className="md:col-span-2 order-2 md:order-1">
                {/* Header & Month OUTSIDE the box */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 px-1 gap-2">
                    <h2 className="font-semibold text-base sm:text-lg">My Attendance History</h2>
                    <div className="flex items-center space-x-2 text-blue-600 font-medium cursor-pointer text-sm sm:text-base">
                        <FaRegCalendarAlt className="text-lg" />
                        <span>September</span>
                    </div>
                </div>

                {/* Table INSIDE the box */}
                <div className="bg-white rounded-xl p-2 sm:p-4 border overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-4 min-w-[500px]">
                        <thead>
                            <tr className="text-gray-600 bg-blue-100 text-xs sm:text-sm">
                                <th className="py-2 pl-4 sm:pl-8 text-left rounded-l-xl">Day</th>
                                <th className="text-left">Check In</th>
                                <th className="text-left">Check Out</th>
                                <th className="text-left">Hours</th>
                                <th className="text-left rounded-r-xl">Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white  rounded-lg">
                                <td className="py-2">17 Sept 2025</td>
                                <td>1:20 PM</td>
                                <td>02:20 PM</td>
                                <td>1 h</td>
                                <td className="text-green-600 font-medium">Present</td>
                            </tr>
                            <tr className="bg-white  rounded-lg">
                                <td>18 Sept 2025</td>
                                <td>00:00 PM</td>
                                <td>00:00 PM</td>
                                <td>0 h</td>
                                <td className="text-red-600 font-medium">Absent</td>
                            </tr>
                            <tr className="bg-white  rounded-lg">
                                <td>18 Sept 2025</td>
                                <td>00:00 PM</td>
                                <td>00:00 PM</td>
                                <td>0 h</td>
                                <td className="text-red-600 font-medium">Absent</td>
                            </tr>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i} className="bg-white  rounded-lg">
                                    <td>17 Sept 2025</td>
                                    <td>1:20 PM</td>
                                    <td>02:20 PM</td>
                                    <td>1 h</td>
                                    <td className="text-green-600 font-medium">Present</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right: Statistics + Calendar */}
            <div className="space-y-6 bg-blue-100 p-3 sm:p-4 rounded-xl order-1 md:order-2">
                {/* Statistics card */}
                <div className="bg-white rounded-xl  p-3 sm:p-4">
                    <h2 className="font-semibold mb-3 text-base sm:text-lg">Statistics</h2>
                    <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                        <h3 className="text-sm font-medium mb-2">Attendance statistics</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={attendanceData}>
                                <XAxis dataKey="month" />
                                <Tooltip />
                                <Bar dataKey="present" fill="#22c55e" />
                                <Bar dataKey="absent" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Calendar + Legend */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Calendar card */}
                    <div className="flex-1 bg-white rounded-xl  p-3">
                        <h2 className="font-semibold mb-3">Calendar</h2>
                        <Calendar className="w-full sm:w-56 border-0 [&_.react-calendar__tile--active]:bg-blue-500 [&_.react-calendar__tile--active]:text-white [&_.react-calendar__tile]:rounded-md" />
                    </div>

                    {/* Legend card */}
                    <div className="flex flex-row sm:flex-col sm:space-y-4 justify-around sm:justify-start">
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-xs sm:text-xs">Present 20%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="text-xs sm:text-xs">Absent 20%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendancePage2;
