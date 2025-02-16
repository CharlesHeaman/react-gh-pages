import { TimegridResponseData } from './../types/timegrid.types';

const filterUserTimegrids = (timegrids: Array<TimegridResponseData>, userID: number) => {
    return timegrids.filter(timegrid => timegrid.data.user_id === userID);
}

export default filterUserTimegrids