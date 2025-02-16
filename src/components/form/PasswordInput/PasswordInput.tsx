import { ChangeEvent } from "react"

const PasswordInput = (props: {
    name: string,
    value: string,
    updateFunc: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
}) => {

    
    return (
        <>
            <input 
                type='password'
                name={props.name}
                value={props.value}
                onChange={props.updateFunc}
            />
        </>
    )
}

export default PasswordInput