const getChangeColor = (status: number) => {
    switch (status) {
        case 0:
            return 'light-green';
        case 1:
            return 'orange';
        case 2:
            return 'red';
        case 3:
            return 'purple';
        default: 
            return 'dark-blue';
    } 
}

export default getChangeColor