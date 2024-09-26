import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, allowedRoles }) => {
    const storedUserData = localStorage.getItem("userData");
    const user = storedUserData ? JSON.parse(storedUserData) : null;

    // Check if user exists and their role matches allowedRoles
    if (user && allowedRoles === user.roleId) {
        return children;
    } else {
        // Redirect to login or another appropriate page
        return <Navigate to="" />;
    }
};

export default PrivateRoute;