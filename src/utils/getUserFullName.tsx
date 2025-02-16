import { UserResponseData } from "../types/user.types"

const getUserFullName = (user: UserResponseData) => {
    return `${user.data.first_name} ${user.data.last_name}`
}

export default getUserFullName