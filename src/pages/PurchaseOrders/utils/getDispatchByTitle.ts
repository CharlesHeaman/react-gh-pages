
const getDispatchByTitle = (dispatchByType: number): string => {
    switch (dispatchByType) {
        case 2:
            return "48 Hours";
        case 5:
            return "9am Next Day";
        case 4:
            return "12pm Next Day";
        case 9:
            return "Collection";
        default:
            return "Next Day";
    }
}

export default getDispatchByTitle