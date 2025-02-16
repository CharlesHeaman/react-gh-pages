import { ChangeEvent, Dispatch, SetStateAction } from "react"

const updateStateParams = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>,
    stateSetter: Dispatch<SetStateAction<any>>
) => {
    stateSetter((prevState: any) => {
        return {
            ...prevState, 
            [event.target.name]: event.target.value
        }
    });
}

export default updateStateParams