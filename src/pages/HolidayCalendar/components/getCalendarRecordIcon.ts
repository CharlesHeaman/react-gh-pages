const getCalendarRecordIcon = (activityID: number) => {
    switch (activityID) {
        case 1:
            return 'luggage'        
        case 2:
            return 'sick'
        case 3: 
            return 'coronavirus'
        case 4: 
            return 'school'
        case 10: 
            return 'cottage'
        case 11: 
            return 'verified'
        default: 
            return 'block'

    }
}

export default getCalendarRecordIcon