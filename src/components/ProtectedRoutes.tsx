import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/auth";

const ProtectedRoutes = () => {
    const auth = useAuth();

    return auth && auth.cookies.accessToken ? 
        <Outlet/> : 
        <Navigate to='/login'/>
}

export default ProtectedRoutes
