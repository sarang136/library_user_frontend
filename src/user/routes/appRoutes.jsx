import AdmissionDetails from "../pages/AdmissionDetails";
import AttendancePage2 from "../pages/Attendance";
import AttendanceHistory from "../pages/AttendanceHistory";
import CouponsPage from "../pages/CouponsPage";
import Dashboard from "../pages/Dashbord";
import FeesPayments from "../pages/FeesPayments";
import LoginPage from "../pages/Login";
import MyAttendance from "../pages/MyAttendance";
import PersonalDetail from "../pages/PersonalDetail";
import ProfileManagement from "../pages/ProfileManagement";
import ReferAnEarn from "../pages/ReferAnEarn";
import SeatBooking from "../pages/SeatBooking";
import Settings from "../pages/Settings";
import SignUpPage from "../pages/Signuppage";
import UpdatesAnGallery from "../pages/UpdatesAnGallery";

const appRoutes = [
    {
        path: "/dash",
        element: <Dashboard />,
        name: "Dashboard",
    },
    {
        path: "/login",
        element: <LoginPage />,
        name: "Login",
    },
    {
        path: "/sign",
        element: <SignUpPage />,
        name: "Sign Up",
    },
    {
        path: "/booking",
        element: <SeatBooking />,
        name: "Seat Booking",
    },
    {
        path: "/attendance",
        element: <MyAttendance />,
        name: "My Attendance",
    },
    {
        path: "/history",
        element: <AttendancePage2 />,
        name: "Attendance History",
    },
    {
        path: "/fees",
        element: <FeesPayments />,
        name: "Fees & Payments",
    },
    {
        path: "/coupons",
        element: <CouponsPage />,
        name: "Coupons",
    },
    {
        path: "/management",
        element: <ProfileManagement />,
        name: "Profile Management",
    },
    {
        path: "/settings",
        element: <Settings />,
        name: "Settings",
    },
    {
        path: "/updates-gallery",
        element: <UpdatesAnGallery />,
        name: "Updates & Gallery",
    },
    {
        path: "/personal-detail",
        element: <PersonalDetail />,
        name: "Personal Detail",
    },
    {
        path: "/admission-detail",
        element: <AdmissionDetails />,
        name: "Admission Detail",
    },
    {
        path: "/refer-earn",
        element: <ReferAnEarn />,
        name: "Refer & Earn",
    },
    {
        path: "/attendance-history",
        element: <AttendanceHistory />,
        name: "Attendance History",
    },
    {
        path: "/logout",
        element: null,
        name: "Logout",
    },
];

export default appRoutes;
