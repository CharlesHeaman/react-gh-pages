const parseUserPermissions = (permissionsString: string): Record<string, number> => {
    var permissions: Record<string, number> = {};
    if (permissionsString) {
        permissions = JSON.parse(permissionsString);
    }
    return permissions
}

export default parseUserPermissions;