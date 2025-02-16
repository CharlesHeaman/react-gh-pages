import { TimegridTicketTimeResponseData } from '../types/timegridTicketTime.types';

const filterUserTimegridTicketTime = (timegridTicketTime: Array<TimegridTicketTimeResponseData>, userID: number) => {
    return timegridTicketTime.filter(timegridTicketTime => timegridTicketTime.data.user_id === userID)
}

export default filterUserTimegridTicketTime