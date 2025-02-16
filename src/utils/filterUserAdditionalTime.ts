import { AdditionalTimeResponseData } from "../types/additionalTime.types";

const filterUserAdditionalTime = (additionalTime: Array<AdditionalTimeResponseData>, userID: number) => {
    return additionalTime.filter(additionalTime => additionalTime.data.user_id === userID
    )
}

export default filterUserAdditionalTime