import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton"
import TextareaInput from "../../../../../../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ContractResponseData } from "../../../../../../../../../types/contract.types"
import putAPI from "../../../../../../../../../utils/putAPI"

const UpdateContractNotes = (props: {
    contractID: number,
    notes: string | null,
    show: boolean,
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [notes, setNotes] = useState<string>(props.notes ? props.notes : '');    

    const updateContract = () => {
        putAPI(`contracts/${props.contractID}/update_notes`, {}, {
            notes: notes,
        }, (response: any) => {
            const contractData: ContractResponseData = response.data;
            props.setContractData(contractData);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Update Contract Notes'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Update Notes"
                iconFont="edit_note"
                disabled={notes.length === 0}
                clickFunc={updateContract}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem title='Notes'>
                    <TextareaInput
                        name="notes"
                        value={notes}
                        updateFunc={(event) => setNotes(event.target.value)}
                        autoFocus
                        required
                    />
                </GridItem>
            </InfoGrid>            
        </WindowOverlay>
    )
}

export default UpdateContractNotes