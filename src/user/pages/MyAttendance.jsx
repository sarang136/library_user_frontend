import { useState } from 'react';
import { Calendar, Clock, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const AttendanceDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(2);

  const getDaysInMonth = () => {
    const days = [];
    const firstDay = new Date(2025, 0, 1).getDay(); // January 2025
    const daysInMonth = 31;
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) for (let i = 1; i <= remaining; i++) days.push({ nextMonth: i });
    return days;
  };

  const attendanceData = [
    { day: '17 Sept 2025', checkIn: '1:20 Pm', checkOut: '02:20 Pm', hours: '1h', remark: 'Present', remarkColor: 'text-green-600' },
    { day: '18 Sept 2025', checkIn: '00:00 Pm', checkOut: '00:00 Pm', hours: '0h', remark: 'Absent', remarkColor: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <p className="text-gray-600 text-sm mb-6 text-center sm:text-left">
          Manage your daily lab attendance with check-in and check-out system.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Left Section */}
          <div className="space-y-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Date Card */}
              <div className="bg-blue-50 rounded-2xl p-5 relative flex flex-col items-start">
                <div className="bg-blue-600 text-white p-2.5 rounded-xl w-11 h-11 flex items-center justify-center mb-4 sm:mb-8">
                  <Calendar size={22} />
                </div>
                <p className="text-gray-500 text-xs mb-1">Date</p>
                <h3 className="text-lg font-bold text-gray-900">18 August 2025</h3>
              </div>

              {/* Check In Card */}
              <div className="bg-green-50 rounded-2xl p-5 relative flex flex-col items-start">
                <div className="bg-green-600 text-white p-2.5 rounded-xl w-11 h-11 flex items-center justify-center mb-4 sm:mb-8">
                  <Calendar size={22} />
                </div>
                <p className="text-gray-500 text-xs mb-1">Check In</p>
                <h3 className="text-lg font-bold text-green-600">11:30 Am</h3>
              </div>

              {/* Check Out Card */}
              <div className="bg-red-50 rounded-2xl p-5 relative flex flex-col items-start">
                <div className="bg-red-600 text-white p-2.5 rounded-xl w-11 h-11 flex items-center justify-center mb-4 sm:mb-8">
                  <Calendar size={22} />
                </div>
                <p className="text-gray-500 text-xs mb-1">Check Out</p>
                <h3 className="text-lg font-bold text-red-600">Not Yet</h3>
              </div>
            </div>

            {/* Total Hours */}
            <div className="bg-white flex flex-col sm:flex-row justify-around rounded-2xl p-10 sm:p-16 items-center">
              <div className="flex items-center gap-4 mb-6 sm:mb-0">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <Clock size={22} />
                </div>
                <h3 className="text-lg font-semibold text-blue-400">Total Hours</h3>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-Outfit text-gray-900 mb-4">00 : 00 : 00</div>
                <div className="flex justify-center gap-10 sm:gap-16 text-sm sm:text-base text-gray-400">
                  <span>Hours</span>
                  <span>Mins</span>
                  <span>Sec</span>
                </div>
              </div>
            </div>

            {/* Attendance History */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-3">My Attendance History</h3>
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Day</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Check In</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Check Out</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Hours</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceData.map((record, index) => (
                          <tr key={index} className="border-t border-gray-100">
                            <td className="py-3 px-4 text-gray-700">{record.day}</td>
                            <td className="py-3 px-4 text-gray-700">{record.checkIn}</td>
                            <td className="py-3 px-4 text-gray-700">{record.checkOut}</td>
                            <td className="py-3 px-4 text-gray-700">{record.hours}</td>
                            <td className={`py-3 px-4 font-semibold ${record.remarkColor}`}>{record.remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card */}
                  <div className="md:hidden space-y-3 p-4">
                    {attendanceData.map((record, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900 text-sm">{record.day}</span>
                          <span className={`font-semibold text-sm ${record.remarkColor}`}>{record.remark}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-gray-500">Check In</p>
                            <p className="font-medium text-gray-700">{record.checkIn}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Check Out</p>
                            <p className="font-medium text-gray-700">{record.checkOut}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Hours</p>
                            <p className="font-medium text-gray-700">{record.hours}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Month selector */}
              <div className="hidden md:flex flex-col gap-3 pt-4 md:pt-10">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 min-w-[160px]">
                  <CalendarDays className="text-blue-600" size={16} />
                  <select className="bg-transparent outline-none text-gray-700 font-medium text-sm appearance-none flex-1 cursor-pointer">
                    <option>September 2025</option>
                    <option>October 2025</option>
                    <option>November 2025</option>
                  </select>
                </div>
                <Link to="/attendance-history" className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-4 md:mt-16 text-left">
                  View All
                </Link>
              </div>

              {/* Mobile View All */}
              <div className="md:hidden">
                <div className="p-4 text-right border-t border-gray-100 mt-4">
                  <Link to="/attendance-history" className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            {/* Calendar Card */}
            <div className="bg-blue-50 rounded-2xl p-5">
              <div className="flex items-center gap-1 mb-2">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <CalendarDays size={16} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Calendar</h3>
              </div>
              <div className="bg-white rounded-xl p-2">
                {/* Month/Year Header */}
                <div className="text-start ml-5 p-5 mb-2">
                  <h4 className="text-xl font-bold text-gray-900">January</h4>
                </div>

                {/* Calendar Grid */}
                <div className="mb-2">
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {['m', 't', 'w', 't', 'f', 's', 's'].map((day, i) => (
                      <div key={i} className="text-center text-xs text-gray-500 py-0.5 font-medium">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth().map((day, index) => (
                      <button
                        key={index}
                        onClick={() => day && !day.nextMonth && setSelectedDate(day)}
                        className={`
                          aspect-square flex items-center justify-center rounded text-sm font-medium
                          ${!day ? 'invisible' : ''}
                          ${day && day.nextMonth ? 'text-gray-300' : ''}
                          ${day === selectedDate ? 'bg-blue-600 rounded-3xl h-10 w-10 text-white' : 'text-gray-700 hover:bg-gray-100'}
                          ${day && !day.nextMonth ? 'cursor-pointer' : ''}
                        `}
                        disabled={!day || day.nextMonth}
                      >
                        {day && (day.nextMonth ? day.nextMonth : day)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className='text-center'>
                <p className="text-sm text-red-500 flex justify-center mt-3">
                  Note: Lab will be closed on Sunday
                </p>
              </div>

              {/* Time Slot Card */}
              <div className="bg-white rounded-2xl mt-5 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
                      <Clock size={16} />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">Time Slot</span>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">10:00 Am - 12:00 Pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
