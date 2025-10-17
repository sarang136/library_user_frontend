
import { IoClose } from "react-icons/io5";

export default function SuccessPage({
    selectedSeat,
    bookingType,
    duration,
    paidAmount, // { admission, seat, addon, total }
    onClose,
}) {
    return (
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 font-Outfit text-center relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                <IoClose size={24} />
            </button>

            <h3 className="text-green-600 font-Outfit text-xl mb-2">Booking Successful !!</h3>
            <p className="text-gray-500 mb-4">Your seat has been successfully booked.</p>

            <div className="text-left space-y-2 mb-6">
                <p><strong>Seat Number:</strong> {selectedSeat?.seatNumber}</p>
                <p><strong>Booking Type:</strong> {bookingType}</p>
                <p><strong>Duration:</strong> {duration}</p>
                <p><strong>Admission Amount:</strong> ₹{paidAmount?.admission || 0}</p>
                <p><strong>Addon Amount:</strong> ₹{paidAmount?.addon || 0}</p>
                <p className="font-bold"><strong>Total Paid:</strong> ₹{paidAmount?.total || 0}</p>
            </div>

            <div className="flex gap-4 justify-center">
                <button className="bg-green-600 text-white px-4 py-2 rounded">Download receipt</button>
                <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Go to Dashboard</button>
            </div>
        </div>
    );
}
