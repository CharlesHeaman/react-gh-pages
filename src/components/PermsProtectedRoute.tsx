import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/auth";
import parseUserPermissions from "./parseUserPermissions";
import checkPermissions from "./checkPermissions";

const PermsProtectedRoute = (props: {
    requiredPerms: Record<string, number>,
}) => {
    const auth = useAuth();
    const permissionsString = auth && auth.cookies.permissions;
    const permissions = parseUserPermissions(permissionsString ? permissionsString : '');

    return checkPermissions(permissions, props.requiredPerms) ? 
        <Outlet/> : 
        <Navigate to='/'/>
}

export default PermsProtectedRoute
