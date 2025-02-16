const checkPermissions = (
    userPerms: Record<string, number>, 
    requiredPerms: Record<string, number>
): boolean => {
    if (userPerms === null) return false;
    for (const [requiredKey, requiredValue] of Object.entries(requiredPerms)) {
        if (
            userPerms[requiredKey] === undefined || 
            userPerms[requiredKey] < requiredValue
        ) return false;        
    }
    return true;
}

export default checkPermissions