import { UserResponseData } from './../../../../../../types/user.types';
import getUserFullName from "../../../../../../utils/getUserFullName"

const getTimegridActivityText = (activityType: number, user: UserResponseData | undefined): string => {
    switch (activityType) {
        case 1:
            return `Timegrid automatically marked as requiring authorisation due to calculated overclaim` 
        case 2:
            return `Timegrid returned to engineer by ${user ? getUserFullName(user) : 'Unknown'}` 
        case 3:
            return `Timegrid validated by ${user ? getUserFullName(user) : 'Unknown'}`
        case 4:
            return `Timegrid processed by ${user ? getUserFullName(user) : 'Unknown'}`
        case 5:
            return `Timegrid authorisation signed by ${user ? getUserFullName(user) : 'Unknown'}`  
        case 6:
            return `Timegrid payable period updated by ${user ? getUserFullName(user) : 'Unknown'}`        
        default:
            return `Timegrid submitted by ${user ? getUserFullName(user) : 'Unknown'}` 
    }
}

export default getTimegridActivityText