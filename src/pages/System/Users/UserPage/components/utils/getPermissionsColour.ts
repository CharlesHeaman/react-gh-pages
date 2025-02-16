const getPermissionsColour = (permissions: number): string => {
    switch (permissions) {
        case 3:
            return 'dark-blue';
        case 2:
            return 'light-green';
        case 1:
            return 'orange';
        default:
            return 'red';
    }
}

export default getPermissionsColour