import { useAuth } from "../auth/auth";
import checkPermissions from "./checkPermissions";
import parseUserPermissions from "./parseUserPermissions";

const PermsProtectedComponent = (props: {
    requiredPerms: Record<string, number>,
    children: React.ReactNode
}) => {
    const auth = useAuth();
    const permissionsString = auth && auth.cookies.permissions;
    const permissions = parseUserPermissions(permissionsString ? permissionsString : '');

    return (
        checkPermissions(permissions, props.requiredPerms) ? <>{props.children}</> : <></>
    )
}

export default PermsProtectedComponent
