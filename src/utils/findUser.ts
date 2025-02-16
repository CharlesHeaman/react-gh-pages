import { UserResponseData } from "../types/user.types"

const findUser = (users: Array<UserResponseData>, userID: number) => {
    return users.find(user => user.id === userID)
}

export default findUser