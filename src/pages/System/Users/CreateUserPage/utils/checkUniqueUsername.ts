import { Dispatch, SetStateAction } from "react";
import { UserCollectionResponse } from "../../../../../types/user.types";
import getAPI from "../../../../../utils/getAPI";

const checkUniqueUsername = (
    username: string, 
    setUsernameUnique: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    userID?: number,
) => {
    getAPI('users', {
        username: username
    }, (response: any) => {
        const userData: UserCollectionResponse = response.data;
        const nonMatchingUserID = userData.data.filter(user => user.id !== userID);
        setUsernameUnique(nonMatchingUserID.length === 0);
    }, setIsLoading)
}

export default checkUniqueUsername