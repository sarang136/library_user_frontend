import React from "react";
import { useSelector } from "react-redux";
import LoginPage from "../pages/Login";

const UserProtector = ({ compo }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div>
            {user ? (
                <>{compo}</>
            ) : (
                <LoginPage />
            )}
        </div>
    );
};

export default UserProtector;
