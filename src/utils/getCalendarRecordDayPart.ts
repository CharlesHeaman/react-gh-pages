const getCalendarRecordDayPart = (dayPart: number) => {
    switch (dayPart) {
        case 1:
            return '1/2 Day'    
        case 8:
            return 'Unpaid 1/2 Day';    
        case 9:
            return 'Unpaid';
        default:
            return '';
    }
}

export default getCalendarRecordDayPart