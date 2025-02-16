import { Dispatch, SetStateAction, useState } from "react"
import IntegerInput from "../../../../../components/form/IntegerInput/IntegerInput"
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { DepartmentResponseData } from "../../../../../types/department.types"
import putAPI from "../../../../../utils/putAPI"

const UpdateTicketSeed = (props: {
    department: DepartmentResponseData,
    setDepartmentData: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
}) => {  
    // Form States
    const [isUpdating, setIsUpdating] = useState(false);
    const [seedNumber, setSeedNumber] = useState(props.department.data.ticket_seed.toString())

    const updateSeed = () => {
        if (!formComplete) return;
        putAPI(`departments/${props.department.id}/update_ticket_seed`, {}, {
            ticket_seed: seedNumber,
        }, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            props.setDepartmentData(departmentData);
            props.hideFunc();
        }, setIsUpdating)
    }

    const formComplete = (
        parseInt(seedNumber) >= props.department.data.ticket_seed
    )

    return (
        <WindowOverlay 
            title="Update Ticket Seed"
            maxWidth={300}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={
                <SubmitButton   
                    text="Update Ticket Seed"
                    clickFunc={updateSeed}
                    iconFont="confirmation_number"
                    disabled={!formComplete}
                    submitting={isUpdating}
                    submittingText="Updating..."
                />
            }
        >
            <InfoGrid>
                <GridItem>
                    <p>Enter the new seed number for tickets. The seed number can only be increased.</p>
                </GridItem>
                <GridItem title='Seed Number'>
                    <IntegerInput 
                        name={"seed_number"} 
                        value={seedNumber} 
                        label={"Seed number"} 
                        updateFunc={(event) => setSeedNumber(event.target.value)} 
                        suffix="#"
                        min={props.department.data.ticket_seed}
                        tooSmallText="New seed cannot be smaller"
                        maxWidth={85}
                        autoFocus
                        hasSubmitted={true}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default UpdateTicketSeed