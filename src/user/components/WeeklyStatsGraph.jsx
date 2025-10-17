import React from "react";
import { FaPen } from "react-icons/fa";
import { RiBallPenFill } from "react-icons/ri";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 1 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 4 },
];

const colors = ["#3B82F6", "#FACC15", "#3B82F6", "#FACC15", "#3B82F6", "#FACC15"];

const WeeklyStatsGraph = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Graph Box */}
            <div className="bg-blue-100 p-4 rounded-xl w-80">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="day" />
                        <YAxis tickFormatter={(value) => `${value} hr`} />
                        <Tooltip formatter={(value) => `${value} hr`} />
                        <Bar dataKey="hours">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Text with Icon OUTSIDE the box */}
            <div className="flex justify-center items-center mt-3 text-sm font-medium text-gray-700">
                <RiBallPenFill className="mr-2 text-white bg-blue-500 rounded-md p-2 text-4xl cursor-pointer" />
                <span>Your Weekly Study Hour Statistic</span>
            </div>
        </div>
    );
};

export default WeeklyStatsGraph;
