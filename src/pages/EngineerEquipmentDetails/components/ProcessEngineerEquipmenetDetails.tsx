import { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckboxInput from "../../../components/form/CheckboxInput/CheckboxInput"
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { EngineerEquipmentDetailsResponseData } from "../../../types/engineerEquipmentDetails.types"
import { TicketResponseData } from "../../../types/tickets.types"
import putAPI from "../../../utils/putAPI"

const ProcessEngineerEquipmentDetails = (props: {
    engineerEquipmentDetails: EngineerEquipmentDetailsResponseData,
    ticket: TicketResponseData,
    show: boolean,
    hideFunc: () => void,
    setEngineerEquipmentDetails: Dispatch<SetStateAction<EngineerEquipmentDetailsResponseData | undefined>>
}) => {
    const navigate = useNavigate();
    const [isProcessLoading, setIsProcessLoading] = useState(false);
    const [skipCreate, setSkipCreate] = useState(false);

    const markedAsProcessed = () => {
        putAPI(`engineer_equipment_details/${props.engineerEquipmentDetails.id}/process`, {}, {}, (response: any) => {
            const engineerEquipmentDetailsData: EngineerEquipmentDetailsResponseData = response.data;
            if (skipCreate) {                
                props.setEngineerEquipmentDetails(engineerEquipmentDetailsData);
                props.hideFunc();
            } else {
                navigate(`/equipment/create?site_id=${props.ticket.data.site_id}&location=${props.engineerEquipmentDetails.data.location}&description=${props.engineerEquipmentDetails.data.description}&model_number=${props.engineerEquipmentDetails.data.model_number}&model_number=${props.engineerEquipmentDetails.data.model_number}&serial_number=${props.engineerEquipmentDetails.data.serial_number}&gas_council_number=${props.engineerEquipmentDetails.data.gc_number}`)
            }
        }, setIsProcessLoading)
    }


    return (
        <WindowOverlay
            title='Process Engineer Equipment Details'
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text='Process Equipment Details' 
                iconFont="check_circle"
                color='dark-blue' 
                clickFunc={markedAsProcessed} 
                submitting={isProcessLoading} 
                submittingText='Processing...'
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Create equipment from these equipment details or mark these equipment details as processed.</p>
                </GridItem>
                <GridItem title='Skip Create Equipment'>
                    <CheckboxInput
                        name={"skip-create"} 
                        checked={skipCreate} 
                        updateFunc={(event) => setSkipCreate(event.target.checked)}/>
                </GridItem> 
            </InfoGrid>
        </WindowOverlay>
    )
}

export default ProcessEngineerEquipmentDetails