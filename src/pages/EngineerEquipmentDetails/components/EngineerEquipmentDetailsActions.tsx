import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule"
import { EngineerEquipmentDetailsResponseData } from "../../../types/engineerEquipmentDetails.types"
import { TicketResponseData } from "../../../types/tickets.types"
import ProcessEngineerEquipmentDetails from "./ProcessEngineerEquipmenetDetails"

const EngineerEquipmentDetailsActions = (props: {
    engineerEquipmentDetails: EngineerEquipmentDetailsResponseData,
    ticket: TicketResponseData,
    setEngineerEquipmentDetailsData: Dispatch<SetStateAction<EngineerEquipmentDetailsResponseData | undefined>>
}) => {
    const [isShowingProcess, setIsShowingProcess] = useState(false);

    return (
        <>
            {!props.engineerEquipmentDetails.data.is_processed ? <SideBarModule title="Actions">
                <SideBarButton
                    text='Processed Equipment Details'
                    color="dark-blue"
                    iconFont="check_circle"
                    clickEvent={() => setIsShowingProcess(true)}
                />
            </SideBarModule> : null}

            <ProcessEngineerEquipmentDetails 
                engineerEquipmentDetails={props.engineerEquipmentDetails}
                ticket={props.ticket}
                show={isShowingProcess} 
                hideFunc={() => setIsShowingProcess(false)}
                setEngineerEquipmentDetails={props.setEngineerEquipmentDetailsData}
            />
        </>
    )
}

export default EngineerEquipmentDetailsActions