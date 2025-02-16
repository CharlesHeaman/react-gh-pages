import { ChangeEvent, Dispatch, SetStateAction } from "react"

const updateStateCheckboxParams = (
    event: ChangeEvent<HTMLInputElement>,
    stateSetter: Dispatch<SetStateAction<any>>
) => {
    stateSetter((prevState: any) => {
        return {
            ...prevState, 
            [event.target.name]: event.target.checked
        }
    })
}

export default updateStateCheckboxParams