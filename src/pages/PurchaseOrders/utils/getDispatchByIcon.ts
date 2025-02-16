
const getDispatchByIcon = (dispatchByType: number): string => {
    switch (dispatchByType) {
        case 2:
            return "date_range";
        case 5:
            return "access_time";
        case 4:
            return "timelapse";
        case 9:
            return "person";
        default:
            return "event";
    }
}

export default getDispatchByIcon