import { TimegridResponseData } from './../types/timegrid.types';
import { AdditionalTimeResponseData } from "../types/additionalTime.types"
import isSameDay from './isSameData';

const filterTimegridAdditionalTime = (additionalTime: Array<AdditionalTimeResponseData>, timegrid: TimegridResponseData) => {
    return additionalTime.filter(additionalTime => 
        isSameDay(new Date(additionalTime.data.date), new Date(timegrid.data.date)) && 
        additionalTime.data.user_id === timegrid.data.user_id
    )
}

export default filterTimegridAdditionalTime