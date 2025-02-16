import { Dispatch, SetStateAction } from "react"

const updateStateDateParams = (
    date: Date,
    name: string,
    stateSetter: Dispatch<SetStateAction<any>>
) => {
    stateSetter((prevState: any) => {
        return {
            ...prevState, 
            [name]: date
        }
    })
}

export default updateStateDateParams